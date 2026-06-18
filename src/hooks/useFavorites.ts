"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

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
  const snapshot = useSyncExternalStore(
    subscribeToFavorites,
    readFavoritesSnapshot,
    () => "[]"
  );
  const favorites = useMemo(() => parseFavorites(snapshot), [snapshot]);

  const toggleFavorite = useCallback((propertyId: string) => {
    const currentFavorites = parseFavorites(readFavoritesSnapshot());
    const nextFavorites = currentFavorites.includes(propertyId)
      ? currentFavorites.filter((id) => id !== propertyId)
      : [...currentFavorites, propertyId];

    writeFavorites(nextFavorites);
  }, []);

  const isFavorite = useCallback((propertyId: string) => {
    return favorites.includes(propertyId);
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    writeFavorites([]);
  }, []);

  return {
    favorites,
    isLoaded: true,
    toggleFavorite,
    isFavorite,
    clearFavorites,
    count: favorites.length,
  };
}
