"use client";

import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/config";

export function WhatsAppFloat() {
  const url = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    `Merhaba ${SITE.brand}, ürünleriniz hakkında bilgi almak istiyorum.`,
  )}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener"
      aria-label="WhatsApp ile iletişim"
      className="pulse-ring fixed bottom-6 right-6 z-40 bg-whatsapp text-white rounded-full w-14 h-14 flex items-center justify-center transition-transform hover:scale-110 hover:brightness-110"
      style={{ boxShadow: "0 16px 40px -10px rgba(37,211,102,.55), 0 0 30px rgba(37,211,102,.15)" }}
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
