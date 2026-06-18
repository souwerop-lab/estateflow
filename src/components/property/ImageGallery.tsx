"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Display thumbnails (excluding the very first image or showing next 4)
  const displayThumbnails = images.slice(1, 5);

  return (
    <div className="relative w-full">
      {/* Desktop Layout: Main (2/3) + 2x2 Grid (1/3) */}
      <div className="hidden md:grid grid-cols-3 gap-3 h-[480px] w-full overflow-hidden rounded-2xl">
        {/* Main Large Image */}
        <div 
          onClick={() => {
            setActiveIdx(0);
            setLightboxOpen(true);
          }}
          className="col-span-2 relative h-full group overflow-hidden cursor-pointer bg-neutral-100"
        >
          {images[0] && (
            <Image
              src={images[0]}
              alt={title}
              fill
              sizes="(max-width: 1024px) 100vw, 66vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              priority
            />
          )}
          {/* Subtle bottom shadow overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
          
          <div className="absolute bottom-6 left-6 z-10 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg text-white font-semibold text-xs tracking-wide uppercase">
            Main View
          </div>
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Thumbnail Grid (2x2) */}
        <div className="grid grid-cols-2 gap-3 h-full">
          {displayThumbnails.map((img, idx) => {
            const isLast = idx === 3;
            const imgIdx = idx + 1;
            return (
              <div
                key={idx}
                onClick={() => {
                  setActiveIdx(imgIdx);
                  setLightboxOpen(true);
                }}
                className="relative h-full overflow-hidden rounded-xl cursor-pointer group bg-neutral-100"
              >
                {img && (
                  <Image
                    src={img}
                    alt={`${title} - Thumbnail ${imgIdx}`}
                    fill
                    sizes="(max-width: 1024px) 25vw, 15vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                )}
                
                {isLast && images.length > 5 ? (
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white transition-colors group-hover:bg-black/70 z-10">
                    <Grid className="size-5 mb-1.5 text-amber-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      View All ({images.length})
                    </span>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Layout: Carousel with Dots */}
      <div className="block md:hidden relative h-[280px] w-full overflow-hidden rounded-xl bg-neutral-100">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
            onClick={() => setLightboxOpen(true)}
          >
            {images[activeIdx] && (
              <Image
                src={images[activeIdx]}
                alt={`${title} - View ${activeIdx + 1}`}
                fill
                sizes="100vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-8 rounded-full bg-white/90 text-neutral-800 shadow-sm backdrop-blur-xs hover:bg-white transition-colors"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center size-8 rounded-full bg-white/90 text-neutral-800 shadow-sm backdrop-blur-xs hover:bg-white transition-colors"
        >
          <ChevronRight className="size-4" />
        </button>

        {/* Page Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx(idx);
              }}
              className={cn(
                "size-1.5 rounded-full transition-all",
                idx === activeIdx ? "w-4 bg-emerald-800" : "bg-white/60"
              )}
            />
          ))}
        </div>
      </div>

      {/* Lightbox / Gallery Dialog Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxOpen(false)}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 md:p-8"
          >
            {/* Top Info Bar */}
            <div className="absolute top-4 left-4 right-16 flex items-center justify-between text-white z-10">
              <span className="font-heading font-bold text-sm md:text-base truncate max-w-[80%]">
                {title}
              </span>
              <span className="text-[10px] font-bold text-neutral-400 bg-neutral-900/80 border border-neutral-800 px-3 py-1 rounded-full shrink-0">
                {activeIdx + 1} of {images.length}
              </span>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-xl transition-all z-20 cursor-pointer"
            >
              <ChevronRight className="size-5 rotate-45" />
            </button>

            {/* Large Image Container */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full h-[60vh] md:h-[70vh] flex items-center justify-center"
            >
              {images[activeIdx] && (
                <Image
                  src={images[activeIdx]}
                  alt={`${title} - Gallery View ${activeIdx + 1}`}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-contain rounded-xl select-none"
                  priority
                />
              )}

              {/* Navigation inside Lightbox */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 flex items-center justify-center size-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 flex items-center justify-center size-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="size-6" />
              </button>
            </div>

            {/* Thumbnail Carousel at Bottom of Lightbox */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="absolute bottom-6 left-4 right-4 flex justify-center gap-2 overflow-x-auto py-2 scrollbar-hide"
            >
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={cn(
                    "relative size-14 md:size-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all bg-neutral-900 cursor-pointer",
                    idx === activeIdx ? "border-amber-400 scale-105 shadow-md" : "border-transparent opacity-50 hover:opacity-100"
                  )}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
