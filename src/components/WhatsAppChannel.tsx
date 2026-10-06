import { BadgeCheck, Bell, Phone, Sparkles, Tag, Truck } from "lucide-react";
import { SITE } from "@/lib/config";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";

const PERKS = [
  { i: Sparkles, t: "Yeni koleksiyonlar", s: "Sezonun modellerini ilk siz görün" },
  { i: Tag,      t: "Özel kampanyalar",   s: "Kanala özel indirim ve fırsatlar" },
  { i: Truck,    t: "Stok & sevkiyat",    s: "Gelen ürünlerden anında haberdar olun" },
];

const PREVIEW = [
  { t: "Yeni sezon pijama takımları vitrinde! Toptan ve perakende siparişlerinizi bekliyoruz.", h: "09:41" },
  { t: "Bu haftaya özel: seçili modellerde kampanya. Detaylar için kanalı takipte kalın.", h: "12:15" },
];

/** Premium WhatsApp channel + phone call-to-action section. */
export function WhatsAppChannel() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-surface-2 p-7 md:p-12">
      {/* green + orange glows */}
      <div
        className="absolute -top-40 -left-24 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,211,102,.16), transparent 70%)", filter: "blur(30px)" }}
      />
      <div
        className="absolute -bottom-40 -right-24 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,98,0,.12), transparent 70%)", filter: "blur(30px)" }}
      />

      <div className="relative z-10 grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
        {/* Copy */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-whatsapp/30 bg-whatsapp/10 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[.18em] text-whatsapp">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-70" />
              <span className="relative w-2 h-2 rounded-full bg-whatsapp" />
            </span>
            WhatsApp Kanalı
          </div>

          <h3 className="font-display text-3xl md:text-4xl leading-tight tracking-tight mt-5 mb-4 text-foreground">
            Yenilikleri <span className="text-whatsapp">ilk siz</span> öğrenin
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-lg mb-7">
            {SITE.brand} WhatsApp kanalına katılın; yeni modeller, kampanyalar ve stok
            duyuruları doğrudan telefonunuza gelsin. Ücretsiz, reklamsız, tek dokunuşla.
          </p>

          <ul className="grid sm:grid-cols-3 gap-3 mb-8">
            {PERKS.map(({ i: I, t, s }) => (
              <li key={t} className="rounded-xl border border-border bg-background/60 p-4">
                <I className="w-4 h-4 text-whatsapp mb-2" />
                <div className="text-sm font-semibold text-foreground">{t}</div>
                <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{s}</div>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-3">
            <a href={SITE.whatsappChannel} target="_blank" rel="noopener" className="btn btn-whatsapp h-12 px-7">
              <WhatsAppIcon className="w-5 h-5" /> Kanala Katıl
            </a>
            <a href={SITE.phoneHref} className="btn btn-glass h-12 px-6">
              <Phone className="w-4 h-4" /> {SITE.phone}
            </a>
          </div>
        </div>

        {/* Channel preview */}
        <a
          href={SITE.whatsappChannel}
          target="_blank"
          rel="noopener"
          aria-label="WhatsApp kanalını aç"
          className="group block mx-auto w-full max-w-sm"
        >
          <div className="rounded-[28px] border border-border bg-background shadow-2xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:rotate-[-.5deg]">
            {/* header */}
            <div className="flex items-center gap-3 px-5 py-4 bg-[#075E54] text-white">
              <div className="w-11 h-11 rounded-full bg-white/15 flex items-center justify-center font-display font-bold text-lg">
                F
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 font-semibold text-sm">
                  {SITE.brand} <BadgeCheck className="w-4 h-4 text-[#25D366]" />
                </div>
                <div className="text-[11px] text-white/70">Kanal · Pijama & Tekstil</div>
              </div>
              <Bell className="w-4 h-4 text-white/80" />
            </div>

            {/* messages */}
            <div
              className="px-4 py-5 space-y-3 min-h-[220px]"
              style={{
                background:
                  "radial-gradient(circle at 20% 20%, rgba(37,211,102,.07), transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,98,0,.06), transparent 50%)",
              }}
            >
              {PREVIEW.map((m) => (
                <div key={m.h} className="max-w-[88%] rounded-2xl rounded-tl-sm bg-surface-2 border border-border px-3.5 py-2.5 shadow-sm">
                  <p className="text-[13px] leading-snug text-foreground/90">{m.t}</p>
                  <div className="text-[10px] text-muted-foreground text-right mt-1">{m.h}</div>
                </div>
              ))}
            </div>

            {/* follow bar */}
            <div className="px-4 pb-4">
              <div className="flex items-center justify-center gap-2 rounded-full bg-whatsapp text-white text-sm font-semibold h-11 transition-all group-hover:brightness-110">
                <WhatsAppIcon className="w-4 h-4" /> Takip Et
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
