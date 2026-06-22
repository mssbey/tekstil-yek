"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { buildProductWhatsAppUrl } from "@/lib/whatsapp";

const WISH_KEY = "fikret-wishlist";

function readWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(WISH_KEY) ?? "[]"); } catch { return []; }
}

function toModelCode(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return `FT-${String((h % 900) + 100).padStart(3, "0")}`;
}

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [wished,  setWished]  = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setWished(readWishlist().includes(product.slug));
  }, [product.slug]);

  const isNew = useMemo(() => {
    let h = 0;
    for (let i = 0; i < product.slug.length; i++) h = (h * 33 + product.slug.charCodeAt(i)) >>> 0;
    return h % 3 === 0;
  }, [product.slug]);

  const modelCode = useMemo(() => toModelCode(product.slug), [product.slug]);
  const waUrl = buildProductWhatsAppUrl(product);

  const toggleWish = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    const list = readWishlist();
    const next = list.includes(product.slug)
      ? list.filter((s) => s !== product.slug)
      : [...list, product.slug];
    localStorage.setItem(WISH_KEY, JSON.stringify(next));
    setWished(next.includes(product.slug));
  };

  return (
    <Link href={`/urun/${product.slug}`} className="pc-root group block">
      {/* Image area */}
      <div className="pc-media">
        <Image
          src={product.image}
          alt={product.title}
          fill
          priority={priority}
          loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover pc-img"
        />

        {/* Top: model code + wishlist */}
        <div className="pc-top">
          <span className="pc-model">{modelCode}</span>
          <button
            type="button"
            onClick={toggleWish}
            aria-label="Favorilere ekle"
            className={`pc-wish${mounted && wished ? " active" : ""}`}
          >
            <Heart className={`w-3.5 h-3.5${mounted && wished ? " fill-current" : ""}`} />
          </button>
        </div>

        {isNew && <span className="pc-badge">Yeni Sezon</span>}

        {/* WhatsApp hover overlay */}
        <div className="pc-overlay">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener"
            onClick={(e) => e.stopPropagation()}
            className="pc-wa-btn"
          >
            WhatsApp&apos;tan Sor
          </a>
        </div>
      </div>

      {/* Body */}
      <div className="pc-body">
        <div className="pc-cat">{product.categoryName}</div>
        <h3 className="pc-title">{product.title}</h3>
        <div className="pc-footer">
          <span className="pc-price">Fiyat için iletişim</span>
          <span className="pc-cta">İncele →</span>
        </div>
      </div>
    </Link>
  );
}
