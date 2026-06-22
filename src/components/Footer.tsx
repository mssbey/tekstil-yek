import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { CATEGORIES, SITE } from "@/lib/config";

const SocialIcon = ({ d, label, href }: { d: string; label: string; href: string }) => (
  <a
    href={href}
    aria-label={label}
    className="w-10 h-10 rounded-full inline-flex items-center justify-center bg-white/[.05] border border-white/[.08] hover:bg-primary hover:border-primary hover:-translate-y-0.5 transition-all"
  >
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white/70">
      <path d={d} />
    </svg>
  </a>
);

const SOCIAL_PATHS = {
  facebook:
    "M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0022 12z",
  instagram:
    "M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-1.1.1-1.7.2-2.1.4-.5.2-.9.4-1.2.8-.4.4-.6.7-.8 1.2-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c.1 1.1.2 1.7.4 2.1.2.5.4.9.8 1.2.4.4.7.6 1.2.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c1.1-.1 1.7-.2 2.1-.4.5-.2.9-.4 1.2-.8.4-.4.6-.7.8-1.2.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c-.1-1.1-.2-1.7-.4-2.1-.2-.5-.4-.9-.8-1.2-.4-.4-.7-.6-1.2-.8-.4-.2-1-.3-2.1-.4C15.5 4 15.1 4 12 4zm0 3.2a4.8 4.8 0 110 9.6 4.8 4.8 0 010-9.6zm0 1.8a3 3 0 100 6 3 3 0 000-6zm5-2.6a1.1 1.1 0 110 2.3 1.1 1.1 0 010-2.3z",
  twitter:
    "M22 5.8c-.7.3-1.5.6-2.4.7.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1A4.1 4.1 0 0011.7 9c0 .3 0 .6.1.9A11.6 11.6 0 013 4.8a4.1 4.1 0 001.3 5.5c-.7 0-1.3-.2-1.9-.5v.1a4.1 4.1 0 003.3 4 4.1 4.1 0 01-1.9.1 4.1 4.1 0 003.8 2.9A8.3 8.3 0 012 18.6a11.7 11.7 0 006.3 1.9c7.6 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z",
  youtube:
    "M21.6 7.2a2.5 2.5 0 00-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 00-1.8 1.8A26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 001.8-1.8A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15V9l5 3-5 3z",
};

export function Footer() {
  return (
    <footer className="relative bg-black text-white/60 mt-0 overflow-hidden border-t border-border">
      {/* Orange glow top-left */}
      <div
        className="absolute top-0 left-0 w-[480px] h-[480px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at top left, rgba(255,94,0,.12) 0%, transparent 60%)",
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="container-x relative z-10 pt-16 pb-10">
        <div className="grid gap-10 md:grid-cols-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="font-display text-3xl font-bold mb-5">
              <span className="text-white">Fikret</span>
              <span className="text-gradient"> Tekstil</span>
            </div>
            <p className="text-sm leading-relaxed text-white/45 max-w-sm mb-7">
              1976&apos;dan beri Bursa&apos;dan dünyaya pijama takımı üretimi. Babadan gelen bu
              mesleği kalite, rahatlık ve şıklık ilkeleriyle sürdürüyoruz.
            </p>
            <div className="flex gap-2.5">
              <SocialIcon href={SITE.social.facebook}  label="Facebook"  d={SOCIAL_PATHS.facebook}  />
              <SocialIcon href={SITE.social.instagram} label="Instagram" d={SOCIAL_PATHS.instagram} />
              <SocialIcon href={SITE.social.twitter}   label="Twitter"   d={SOCIAL_PATHS.twitter}   />
              <SocialIcon href={SITE.social.youtube}   label="YouTube"   d={SOCIAL_PATHS.youtube}   />
            </div>
          </div>

          {/* Kurumsal */}
          <div className="md:col-span-2">
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wide">Kurumsal</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/kurumsal" className="hover:text-primary-2 transition-colors">Hakkımızda</Link></li>
              <li><Link href="/iletisim" className="hover:text-primary-2 transition-colors">İletişim</Link></li>
              <li><Link href="/kurumsal" className="hover:text-primary-2 transition-colors">Aydınlatma Metni</Link></li>
              <li><Link href="/kurumsal" className="hover:text-primary-2 transition-colors">KVKK</Link></li>
            </ul>
          </div>

          {/* Ürünler */}
          <div className="md:col-span-3">
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wide">Ürünler</h4>
            <ul className="space-y-3 text-sm">
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link href={`/kategori/${c.slug}`} className="hover:text-primary-2 transition-colors">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div className="md:col-span-3">
            <h4 className="text-white font-semibold mb-5 text-sm tracking-wide">İletişim</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-2 shrink-0" />
                <span>{SITE.address}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-primary-2 shrink-0" />
                <a href={`mailto:${SITE.email}`} className="hover:text-primary-2 transition-colors">{SITE.email}</a>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-primary-2 shrink-0" />
                <a href={`tel:${SITE.phone}`} className="hover:text-primary-2 transition-colors">{SITE.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/30">
          <div>© {new Date().getFullYear()} {SITE.brand}. Tüm hakları saklıdır.</div>
          <div className="flex items-center gap-4">
            <span>%100 Yerli Üretim</span>
            <span className="opacity-40">·</span>
            <span>WhatsApp Sipariş</span>
            <span className="opacity-40">·</span>
            <span>1976&apos;dan beri</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
