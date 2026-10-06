"use client";

import { Phone } from "lucide-react";
import { SITE } from "@/lib/config";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

export function WhatsAppFloat() {
  const url = `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
    `Merhaba ${SITE.brand}, ürünleriniz hakkında bilgi almak istiyorum.`,
  )}`;
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3">
      <a
        href={SITE.phoneHref}
        aria-label={`Telefonla ara: ${SITE.phone}`}
        title={SITE.phone}
        className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center transition-transform hover:scale-110 hover:brightness-110"
        style={{ boxShadow: "0 14px 34px -10px rgba(255,98,0,.55)" }}
      >
        <Phone className="w-5 h-5" />
      </a>
      <a
        href={url}
        target="_blank"
        rel="noopener"
        aria-label="WhatsApp ile iletişim"
        className="pulse-ring bg-whatsapp text-white rounded-full w-14 h-14 flex items-center justify-center transition-transform hover:scale-110 hover:brightness-110"
        style={{ boxShadow: "0 16px 40px -10px rgba(37,211,102,.55), 0 0 30px rgba(37,211,102,.15)" }}
      >
        <WhatsAppIcon className="w-7 h-7" />
      </a>
    </div>
  );
}
