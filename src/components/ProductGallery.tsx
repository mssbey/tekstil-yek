"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn, X } from "lucide-react";

export function ProductGallery({ src, alt }: { src: string; alt: string }) {
  const [zoom,   setZoom]   = useState(false);
  const [active, setActive] = useState(0);

  const thumbs = [
    { id: 0, pos: "object-center" },
    { id: 1, pos: "object-top" },
    { id: 2, pos: "object-bottom" },
    { id: 3, pos: "object-[50%_30%]" },
  ];
  const activePos = thumbs[active].pos;

  return (
    <>
      <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[88px_1fr] gap-3 sm:gap-4">
        {/* Thumbs */}
        <div className="flex flex-col gap-3">
          {thumbs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              aria-label={`Görsel ${t.id + 1}`}
              className={`relative aspect-square rounded-lg overflow-hidden border bg-surface-2 transition-all ${
                active === t.id
                  ? "border-primary ring-1 ring-primary/30"
                  : "border-border hover:border-border-bright"
              }`}
            >
              <Image src={src} alt="" fill sizes="88px" className={`object-cover ${t.pos}`} />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div
          className="relative aspect-[3/4] bg-surface-2 rounded-2xl overflow-hidden group cursor-zoom-in shadow-premium ring-1 ring-white/[.04]"
          onClick={() => setZoom(true)}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 600px"
            className={`object-cover transition-transform duration-700 group-hover:scale-105 ${activePos}`}
          />
          {/* Badge */}
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded glass text-[10px] font-bold tracking-[.22em] uppercase text-white/90">
            Yeni Sezon
          </div>
          {/* Zoom icon */}
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-white transition-colors">
            <ZoomIn className="w-4 h-4" />
          </div>
          {/* Subtle gradient bottom */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Fullscreen zoom */}
      {zoom && (
        <div
          className="fixed inset-0 z-[60] bg-black/92 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoom(false)}
        >
          <button
            type="button"
            onClick={() => setZoom(false)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full glass flex items-center justify-center text-white/80 hover:text-white transition-colors"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative w-full max-w-2xl aspect-[3/4]">
            <Image src={src} alt={alt} fill sizes="100vw" className={`object-contain ${activePos}`} />
          </div>
        </div>
      )}
    </>
  );
}
