"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/config";

const STORAGE_KEY = "estateflow-favorites";
const FAVORITES_CHANGE_EVENT = "estateflow-favorites-change";

function readFavoritesSnapshot() {
  if (typeof window === "undefined") {
    return "[]";
  }

  return localStorage.getItem(STORAGE_KEY) ?? "[]";
}

function parseFavorites(snapshot: string) {
  try {
    const parsed = JSON.parse(snapshot);
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch (e) {
    console.error("Failed to parse favorites", e);
    return [];
  }
}

function subscribeToFavorites(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(FAVORITES_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(FAVORITES_CHANGE_EVENT, onStoreChange);
  };
}

function writeFavorites(favorites: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  window.dispatchEvent(new Event(FAVORITES_CHANGE_EVENT));
}

export function useFavorites() {
  const localSnapshot = useSyncExternalStore(
    subscribeToFavorites,
    readFavoritesSnapshot,
    () => "[]"
  );
  const localFavorites = useMemo(() => parseFavorites(localSnapshot), [localSnapshot]);
  const [remoteFavorites, setRemoteFavorites] = useState<string[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [isRemoteLoaded, setIsRemoteLoaded] = useState(false);
  const isSupabaseEnabled = hasSupabaseEnv();

  useEffect(() => {
    if (!isSupabaseEnabled) return;

    let isMounted = true;
    const supabase = createClient();

    async function loadFavorites() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!isMounted) return;

      setUserId(user?.id ?? null);

      if (!user) {
        setRemoteFavorites([]);
        setIsRemoteLoaded(true);
        return;
      }

      const { data, error } = await supabase
        .from("favorites")
        .select("property_id")
        .eq("user_id", user.id);

      if (!isMounted) return;

      if (error) {
        console.error("Failed to load favorites", error);
        setRemoteFavorites([]);
      } else {
        setRemoteFavorites(data.map((favorite) => favorite.property_id));
      }

      setIsRemoteLoaded(true);
    }

    loadFavorites();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      loadFavorites();
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [isSupabaseEnabled]);

  const favorites = isSupabaseEnabled ? remoteFavorites : localFavorites;
  const isLoaded = isSupabaseEnabled ? isRemoteLoaded : true;

  const toggleFavorite = useCallback((propertyId: string) => {
    if (isSupabaseEnabled) {
      if (!userId) {
        window.location.href = `/login?redirectedFrom=${encodeURIComponent(window.location.pathname)}`;
        return;
      }

      const supabase = createClient();
      const isAlreadyFavorite = remoteFavorites.includes(propertyId);
      const nextFavorites = isAlreadyFavorite
        ? remoteFavorites.filter((id) => id !== propertyId)
        : [...remoteFavorites, propertyId];

      setRemoteFavorites(nextFavorites);

      const request = isAlreadyFavorite
        ? supabase.from("favorites").delete().eq("user_id", userId).eq("property_id", propertyId)
        : supabase.from("favorites").upsert({ user_id: userId, property_id: propertyId });

      request.then(({ error }) => {
        if (error) {
          console.error("Failed to update favorite", error);
          setRemoteFavorites(remoteFavorites);
        }
      });
      return;
    }

    const currentFavorites = parseFavorites(readFavoritesSnapshot());
    const nextFavorites = currentFavorites.includes(propertyId)
      ? currentFavorites.filter((id) => id !== propertyId)
      : [...currentFavorites, propertyId];

    writeFavorites(nextFavorites);
  }, [isSupabaseEnabled, remoteFavorites, userId]);

  const isFavorite = useCallback((propertyId: string) => {
    return favorites.includes(propertyId);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    if (isSupabaseEnabled) {
      if (!userId) return;
      setRemoteFavorites([]);
      createClient().from("favorites").delete().eq("user_id", userId).then(({ error }) => {
        if (error) console.error("Failed to clear favorites", error);
      });
      return;
    }

    writeFavorites([]);
  }, [isSupabaseEnabled, userId]);

  return {
    favorites,
    isLoaded,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    count: favorites.length,
  };
}
