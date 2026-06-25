"use client";

import { useState } from "react";
import { MessageCircle, Minus, Plus, ShieldCheck, Truck, Sparkles } from "lucide-react";
import type { Product } from "@/lib/products";
import { buildProductWhatsAppUrl } from "@/lib/whatsapp";

const DEFAULT_SIZES = ["S", "M", "L", "XL", "2XL"];

export function WhatsAppOrder({ product }: { product: Product }) {
  const sizes = product.sizes?.length ? product.sizes : DEFAULT_SIZES;
  const [size, setSize] = useState(sizes[1] ?? sizes[0]);
  const [qty,  setQty]  = useState(1);

  const href = buildProductWhatsAppUrl(product, { size, qty });

  return (
    <div className="space-y-6">
      {/* Info notice */}
      <div className="flex items-center gap-3 rounded-xl border border-primary/15 bg-primary/5 px-4 py-3">
        <Sparkles className="w-4 h-4 text-primary-2 shrink-0" />
        <p className="text-sm text-foreground/75">
          <span className="font-semibold text-foreground">Fiyat &amp; stok bilgisi</span>{" "}
          WhatsApp üzerinden anında iletilir.
        </p>
      </div>

      {/* Size selection */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-foreground">Beden</span>
          <button
            type="button"
            className="text-xs text-muted-foreground hover:text-primary-2 transition-colors underline-offset-4 hover:underline"
          >
            Beden tablosu
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              className={`min-w-[3.25rem] h-11 px-4 rounded-xl border text-sm font-semibold transition-all ${
                size === s
                  ? "border-primary bg-primary text-white shadow-[0_8px_20px_-8px_rgba(255,98,0,.55)]"
                  : "border-border bg-surface-2 text-foreground/75 hover:border-primary/40 hover:text-foreground hover:-translate-y-0.5"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div>
        <div className="text-sm font-semibold mb-3 text-foreground">Adet</div>
        <div className="inline-flex items-center border border-border bg-surface-2 rounded-xl overflow-hidden">
          <button
            type="button"
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-11 h-11 hover:bg-surface-3 transition-colors flex items-center justify-center text-foreground/70 hover:text-foreground"
            aria-label="Azalt"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-14 text-center font-semibold text-foreground">{qty}</span>
          <button
            type="button"
            onClick={() => setQty(qty + 1)}
            className="w-11 h-11 hover:bg-surface-3 transition-colors flex items-center justify-center text-foreground/70 hover:text-foreground"
            aria-label="Arttır"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <a
        href={href}
        target="_blank"
        rel="noopener"
        className="flex items-center justify-center gap-2.5 w-full h-15 rounded-2xl text-white font-bold text-base tracking-wide transition-all hover:-translate-y-1"
        style={{
          background: "linear-gradient(135deg, #FF9840 0%, #FF6200 55%, #E54D00 100%)",
          boxShadow: "0 14px 40px -14px rgba(255,98,0,.6), 0 0 80px rgba(255,94,0,.12)",
          paddingBlock: "1rem",
        }}
      >
        <MessageCircle className="w-5 h-5" /> WhatsApp ile Sipariş Ver
      </a>

      {/* Trust badges */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="flex items-start gap-2.5 rounded-xl border border-border bg-surface-2 p-3.5">
          <ShieldCheck className="w-4 h-4 text-primary-2 mt-0.5 shrink-0" />
          <div>
            <div className="text-[13px] font-semibold text-foreground leading-tight">Güvenli sipariş</div>
            <div className="text-[11px] text-muted-foreground">Doğrudan üreticiden</div>
          </div>
        </div>
        <div className="flex items-start gap-2.5 rounded-xl border border-border bg-surface-2 p-3.5">
          <Truck className="w-4 h-4 text-primary-2 mt-0.5 shrink-0" />
          <div>
            <div className="text-[13px] font-semibold text-foreground leading-tight">Hızlı kargo</div>
            <div className="text-[11px] text-muted-foreground">Türkiye geneli</div>
          </div>
        </div>
      </div>
    </div>
  );
}
