"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

interface ComingSoonContextType {
  showToast: (featureName: string) => void;
}

const ComingSoonContext = createContext<ComingSoonContextType | null>(null);

export function ComingSoonProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [feature, setFeature] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = useCallback((featureName: string) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    setFeature(featureName);
    setIsOpen(true);
    
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 4500);
  }, []);

  return (
    <ComingSoonContext.Provider value={{ showToast }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-[9999] flex items-center gap-3 bg-neutral-900 text-white px-4 py-3.5 rounded-2xl shadow-2xl border border-neutral-800 max-w-xs sm:max-w-sm pointer-events-auto"
          >
            <div className="flex items-center justify-center size-8 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
              <Sparkles className="size-4 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-[10px] font-bold font-heading text-amber-400 uppercase tracking-widest">Under Construction</h5>
              <p className="text-xs text-neutral-300 font-semibold mt-0.5 leading-snug">
                The <span className="text-white font-bold">"{feature}"</span> feature is coming soon to EstateFlow!
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-500 hover:text-white transition-colors shrink-0 p-1 cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </ComingSoonContext.Provider>
  );
}

export function useComingSoon() {
  const context = useContext(ComingSoonContext);
  if (!context) {
    throw new Error("useComingSoon must be used within a ComingSoonProvider");
  }
  return context;
}
