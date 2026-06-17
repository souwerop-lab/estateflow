"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  MapPin, Plus, Minus, Layers, RotateCcw, 
  Home, BedDouble, Bath, Square, ChevronRight 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { properties as defaultProperties } from "@/data/properties";
import { Property } from "@/types";

interface MapPlaceholderProps {
  properties?: Property[];
  className?: string;
}

export function MapPlaceholder({ properties = [], className }: MapPlaceholderProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<"map" | "satellite">("map");
  const [activeProperty, setActiveProperty] = useState<Property | null>(null);
  
  // Drag to pan state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const mapRef = useRef<HTMLDivElement>(null);

  const activeProps = useMemo(() => {
    return properties.length > 0 ? properties : defaultProperties;
  }, [properties]);

  // Compute map bounds based on coordinates of active properties
  const bounds = useMemo(() => {
    if (activeProps.length === 0) return null;
    let minLat = Infinity, maxLat = -Infinity;
    let minLng = Infinity, maxLng = -Infinity;
    
    activeProps.forEach(p => {
      if (p.coordinates) {
        if (p.coordinates.lat < minLat) minLat = p.coordinates.lat;
        if (p.coordinates.lat > maxLat) maxLat = p.coordinates.lat;
        if (p.coordinates.lng < minLng) minLng = p.coordinates.lng;
        if (p.coordinates.lng > maxLng) maxLng = p.coordinates.lng;
      }
    });
    
    // Safety check in case all properties are at the same spot or coordinate range is zero
    if (minLat === maxLat) { minLat -= 0.05; maxLat += 0.05; }
    if (minLng === maxLng) { minLng -= 0.05; maxLng += 0.05; }
    
    return { minLat, maxLat, minLng, maxLng };
  }, [activeProps]);

  // Translate geographic lat/lng coordinates to SVG 1000x600 coordinates
  const getXY = (lat: number, lng: number) => {
    if (!bounds) return { x: 500, y: 300 };
    
    const { minLat, maxLat, minLng, maxLng } = bounds;
    
    // Normalize to [0, 1]
    const pctX = (lng - minLng) / (maxLng - minLng);
    const pctY = 1 - (lat - minLat) / (maxLat - minLat); // SVG y=0 is at the top
    
    // Map to SVG coordinates with generous margins to avoid clipping
    const x = pctX * 680 + 160;
    const y = pctY * 340 + 130;
    
    return { x, y };
  };

  // Recenter map view
  const handleRecenter = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Zoom control
  const handleZoom = (direction: "in" | "out") => {
    setZoom(prev => {
      const step = direction === "in" ? 0.35 : -0.35;
      const nextZoom = Math.min(Math.max(prev + step, 0.75), 3.5);
      return nextZoom;
    });
  };

  // Pan dragging event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".map-controls") || (e.target as HTMLElement).closest(".property-popup")) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1 || (e.target as HTMLElement).closest(".map-controls") || (e.target as HTMLElement).closest(".property-popup")) return;
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX - pan.x, y: touch.clientY - pan.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const touch = e.touches[0];
    setPan({
      x: touch.clientX - dragStart.x,
      y: touch.clientY - dragStart.y
    });
  };

  const formatPriceLabel = (price: number, status: string) => {
    if (status === "for-rent") {
      if (price >= 1000) {
        return `$${(price / 1000).toFixed(1)}K/mo`;
      }
      return `$${price}/mo`;
    }
    if (price >= 1000000) {
      return `$${(price / 1000000).toFixed(1)}M`;
    }
    return `$${(price / 1000).toFixed(0)}K`;
  };

  // Helper for popup gradient background when image is missing or loading
  const getGradientClass = (id: string) => {
    const gradients = [
      "from-emerald-500 to-teal-600",
      "from-blue-500 to-indigo-600",
      "from-amber-500 to-orange-600",
      "from-violet-500 to-purple-600",
      "from-rose-500 to-pink-600",
    ];
    const index = id.charCodeAt(id.length - 1) % gradients.length;
    return gradients[index];
  };

  return (
    <div
      ref={mapRef}
      className={cn(
        "relative w-full h-[450px] rounded-2xl border border-neutral-200 overflow-hidden shadow-xs select-none",
        isDragging ? "cursor-grabbing" : "cursor-grab",
        className
      )}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* MAP BACKGROUND AND LAYERS */}
      <div 
        className="absolute inset-0 transition-transform duration-100 ease-out origin-center"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
        }}
      >
        <svg 
          viewBox="0 0 1000 600" 
          className="w-full h-full min-w-[1000px] min-h-[600px] object-cover"
        >
          {/* Base Background */}
          <rect 
            width="1000" 
            height="600" 
            fill={viewMode === "map" ? "#f4f3ef" : "#0f172a"} 
            className="transition-colors duration-500"
          />

          {/* Water Body / River */}
          <path
            d="M-50,220 C250,150 450,450 1050,320 L1050,650 L-50,650 Z"
            fill={viewMode === "map" ? "#bae6fd" : "#1e293b"}
            className="transition-colors duration-500 opacity-80"
          />
          <path
            d="M-50,220 C250,150 450,450 1050,320"
            stroke={viewMode === "map" ? "#7dd3fc" : "#334155"}
            strokeWidth="8"
            fill="none"
            className="transition-colors duration-500 opacity-60"
          />

          {/* Green Parks */}
          <rect
            x="80"
            y="50"
            width="160"
            height="110"
            rx="16"
            fill={viewMode === "map" ? "#dcfce7" : "#064e3b"}
            className="transition-colors duration-500 opacity-70"
          />
          <path
            d="M 680,220 C 720,150 850,160 890,200 C 920,250 880,310 820,320 C 750,330 700,280 680,220 Z"
            fill={viewMode === "map" ? "#dcfce7" : "#064e3b"}
            className="transition-colors duration-500 opacity-70"
          />
          <rect
            x="320"
            y="420"
            width="180"
            height="140"
            rx="24"
            fill={viewMode === "map" ? "#e2f0d9" : "#022c22"}
            className="transition-colors duration-500 opacity-70"
          />

          {/* Building Blocks / Built-up Areas */}
          {/* Set 1 */}
          <g fill={viewMode === "map" ? "#e5e5e5" : "#1e2937"} opacity="0.4" className="transition-colors duration-500">
            <rect x="280" y="80" width="30" height="20" rx="3" />
            <rect x="320" y="80" width="40" height="20" rx="3" />
            <rect x="280" y="110" width="50" height="30" rx="3" />
            <rect x="340" y="110" width="20" height="30" rx="3" />
            <rect x="120" y="220" width="40" height="40" rx="4" />
            <rect x="170" y="220" width="30" height="40" rx="4" />
            <rect x="120" y="270" width="80" height="25" rx="3" />
          </g>

          {/* Set 2 */}
          <g fill={viewMode === "map" ? "#e5e5e5" : "#1e2937"} opacity="0.4" className="transition-colors duration-500">
            <rect x="520" y="280" width="40" height="20" rx="3" />
            <rect x="570" y="280" width="50" height="20" rx="3" />
            <rect x="520" y="310" width="30" height="30" rx="3" />
            <rect x="560" y="310" width="60" height="30" rx="3" />
            <rect x="420" y="180" width="80" height="60" rx="6" />
            <rect x="450" y="250" width="50" height="30" rx="4" />
          </g>

          {/* Road Network (Background details) */}
          <g stroke={viewMode === "map" ? "#ffffff" : "#334155"} strokeLinecap="round" fill="none" className="transition-colors duration-500">
            {/* Major Highways */}
            <path d="M-50,100 L1050,100" strokeWidth="10" />
            <path d="M-50,480 L1050,480" strokeWidth="12" />
            <path d="M250,-50 L250,650" strokeWidth="10" />
            <path d="M780,-50 L780,650" strokeWidth="10" />
            
            {/* Scenic diagonal road */}
            <path d="M-50,-50 L1050,610" strokeWidth="8" />

            {/* Minor streets */}
            <path d="M-50,280 L1050,280" strokeWidth="4" strokeDasharray="10 5" opacity="0.5" />
            <path d="M480,-50 L480,650" strokeWidth="4" />
            <path d="M120,-50 L120,650" strokeWidth="3" />
            <path d="M620,-50 L620,650" strokeWidth="3" />
            <path d="M900,-50 L900,650" strokeWidth="3" />
            <path d="M-50,180 L480,180" strokeWidth="3" />
            <path d="M480,380 L1050,380" strokeWidth="3" />
          </g>

          {/* Overlay roads for cleaner map look */}
          {viewMode === "map" && (
            <g stroke="#f8fafc" strokeLinecap="round" fill="none">
              <path d="M-50,100 L1050,100" strokeWidth="6" />
              <path d="M-50,480 L1050,480" strokeWidth="8" />
              <path d="M250,-50 L250,650" strokeWidth="6" />
              <path d="M780,-50 L780,650" strokeWidth="6" />
              <path d="M-50,-50 L1050,610" strokeWidth="4" />
            </g>
          )}

          {/* SATELLITE MODE GRID */}
          {viewMode === "satellite" && (
            <g stroke="#ffffff" opacity="0.04" fill="none">
              <path d="M0,0 L1000,0 M0,100 L1000,100 M0,200 L1000,200 M0,300 L1000,300 M0,400 L1000,400 M0,500 L1000,500" strokeWidth="0.5" />
              <path d="M0,0 L0,600 M100,0 L100,600 M200,0 L200,600 M300,0 L300,600 M400,0 L400,600 M500,0 L500,600 M600,0 L600,600 M700,0 L700,600 M800,0 L800,600 M900,0 L900,600" strokeWidth="0.5" />
            </g>
          )}
        </svg>

        {/* PROPERTY PINS IN GRAPHICS LAYER */}
        <div className="absolute inset-0 pointer-events-none">
          {activeProps.map((property) => {
            if (!property.coordinates) return null;
            const { x, y } = getXY(property.coordinates.lat, property.coordinates.lng);
            const isSelected = activeProperty?.id === property.id;
            
            return (
              <div
                key={property.id}
                className="absolute pointer-events-auto"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {/* Custom Styled Pin */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveProperty(property);
                  }}
                  className={cn(
                    "flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-md transition-all duration-300 hover:scale-110",
                    isSelected 
                      ? "bg-amber-500 text-neutral-900 ring-2 ring-white scale-105 z-30" 
                      : "bg-emerald-800 text-white hover:bg-emerald-700 z-20"
                  )}
                >
                  <MapPin className={cn("size-2.5 shrink-0", isSelected ? "animate-bounce" : "")} />
                  <span>{formatPriceLabel(property.price, property.status)}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* FLOATING HEADER & CONTROLS */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none map-controls">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-xs border border-neutral-100 pointer-events-auto">
          <div className="flex items-center justify-center size-5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <h4 className="text-xs font-semibold text-neutral-800">Map Navigation</h4>
            <p className="text-[9px] text-neutral-400 font-medium">Dragging enabled • {activeProps.length} pins active</p>
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex bg-white/90 backdrop-blur-md p-1 rounded-xl shadow-xs border border-neutral-100 pointer-events-auto">
          <button
            onClick={() => setViewMode("map")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all",
              viewMode === "map" 
                ? "bg-emerald-800 text-white" 
                : "text-neutral-600 hover:text-neutral-900"
            )}
          >
            Map
          </button>
          <button
            onClick={() => setViewMode("satellite")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-semibold transition-all",
              viewMode === "satellite" 
                ? "bg-emerald-800 text-white" 
                : "text-neutral-600 hover:text-neutral-900"
            )}
          >
            Satellite
          </button>
        </div>
      </div>

      {/* ZOOM & RECENTER CONTROLS (BOTTOM RIGHT) */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2 pointer-events-auto map-controls">
        <button
          onClick={handleRecenter}
          title="Recenter Map"
          className="flex items-center justify-center size-8 rounded-xl bg-white hover:bg-neutral-50 text-neutral-700 hover:text-emerald-800 shadow-md border border-neutral-100 transition-all hover:scale-105 active:scale-95"
        >
          <RotateCcw className="size-4" />
        </button>
        <div className="flex flex-col rounded-xl overflow-hidden bg-white shadow-md border border-neutral-100">
          <button
            onClick={() => handleZoom("in")}
            title="Zoom In"
            className="flex items-center justify-center size-8 hover:bg-neutral-50 text-neutral-700 hover:text-emerald-800 border-b border-neutral-100 transition-all"
          >
            <Plus className="size-4" />
          </button>
          <button
            onClick={() => handleZoom("out")}
            title="Zoom Out"
            className="flex items-center justify-center size-8 hover:bg-neutral-50 text-neutral-700 hover:text-emerald-800 transition-all"
          >
            <Minus className="size-4" />
          </button>
        </div>
      </div>

      {/* POPUP DETAIL CARD (BOTTOM LEFT OVERLAY) */}
      <AnimatePresence>
        {activeProperty && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute bottom-4 left-4 right-16 sm:right-auto sm:w-[320px] bg-white rounded-2xl shadow-xl border border-neutral-100 overflow-hidden pointer-events-auto property-popup z-40"
          >
            {/* Close trigger overlay background */}
            <div className="relative h-32 w-full bg-neutral-100 overflow-hidden">
              {/* Fallback color gradient */}
              <div className={cn("absolute inset-0 bg-gradient-to-br", getGradientClass(activeProperty.id))} />
              
              {/* Real image if loaded */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeProperty.images[0]}
                alt={activeProperty.title}
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-opacity duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0";
                }}
              />

              <div className="absolute top-3 left-3 flex gap-1">
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-neutral-900/70 text-white backdrop-blur-xs">
                  {activeProperty.status === "for-sale" ? "For Sale" : "For Rent"}
                </span>
                {activeProperty.isNew && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500 text-neutral-900">
                    New
                  </span>
                )}
              </div>

              {/* Close button */}
              <button
                onClick={() => setActiveProperty(null)}
                className="absolute top-3 right-3 flex items-center justify-center size-6 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all shadow-xs"
              >
                <Plus className="size-3.5 rotate-45" />
              </button>
            </div>

            {/* Popup details content */}
            <div className="p-4">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-base font-heading font-black text-emerald-800">
                  {activeProperty.status === "for-rent" ? (
                    <>
                      {activeProperty.price.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
                      <span className="text-xs font-semibold text-neutral-500">/mo</span>
                    </>
                  ) : (
                    activeProperty.price.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
                  )}
                </span>
              </div>
              <h3 className="font-heading font-bold text-sm text-neutral-900 truncate mt-1">
                {activeProperty.title}
              </h3>
              <p className="text-[10px] text-neutral-400 font-semibold truncate mt-0.5">
                {activeProperty.address.full}
              </p>

              {/* Grid of rooms specs */}
              <div className="flex items-center gap-3 mt-3 pt-3 border-t border-neutral-100 text-[10px] text-neutral-500 font-semibold">
                <span className="flex items-center gap-1">
                  <BedDouble className="size-3 text-neutral-400 shrink-0" />
                  <span>{activeProperty.bedrooms} bd</span>
                </span>
                <span className="flex items-center gap-1">
                  <Bath className="size-3 text-neutral-400 shrink-0" />
                  <span>{activeProperty.bathrooms} ba</span>
                </span>
                <span className="flex items-center gap-1">
                  <Square className="size-3 text-neutral-400 shrink-0" />
                  <span>{activeProperty.sqft.toLocaleString()} sqft</span>
                </span>
              </div>

              {/* View Details Link */}
              <Link
                href={`/property/${activeProperty.id}`}
                className="flex items-center justify-center gap-1 w-full mt-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-all shadow-xs"
              >
                <span>View Full Details</span>
                <ChevronRight className="size-3.5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Drag helper note overlay on map edges */}
      <div className="absolute bottom-4 left-4 pointer-events-none select-none">
        {!activeProperty && (
          <div className="bg-black/50 text-[9px] font-semibold text-white/95 px-2.5 py-1.5 rounded-lg backdrop-blur-xs flex items-center gap-1">
            <Home className="size-2.5" />
            <span>Select a pin to inspect property details</span>
          </div>
        )}
      </div>
    </div>
  );
}
