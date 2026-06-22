"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu, Search, X, ChevronRight, ChevronDown, MessageCircle,
} from "lucide-react";
import { CATEGORIES, SITE } from "@/lib/config";
import { allProducts } from "@/lib/products";

export function Header() {
  const [open, setOpen]           = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [megaOpen, setMegaOpen]   = useState(false);
  const [mobileColl, setMobileColl] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open, searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMegaOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega     = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setMegaOpen(true); };
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 120);
  };

  return (
    <>
      {/* ── Top info strip ── */}
      <div className="relative z-50 bg-black/90 border-b border-border text-[11px] text-white/40">
        <div className="container-x flex items-center justify-between h-9 overflow-hidden">
          <div className="overflow-hidden flex-1">
            <div className="marquee">
              {Array.from({ length: 2 }).map((_, k) => (
                <div key={k} className="flex items-center gap-10 pr-10 whitespace-nowrap">
                  <span>1976&apos;dan beri %100 yerli üretim</span>
                  <span className="opacity-40">·</span>
                  <span>Dünya geneli sevkiyat</span>
                  <span className="opacity-40">·</span>
                  <span>Sipariş &amp; bilgi için WhatsApp</span>
                  <span className="opacity-40">·</span>
                  <span>50+ yıllık tekstil deneyimi</span>
                  <span className="opacity-40">·</span>
                  <span>Bursa&apos;dan dünyaya</span>
                  <span className="opacity-40">·</span>
                </div>
              ))}
            </div>
          </div>
          <a
            href={`mailto:${SITE.email}`}
            className="hidden md:inline ml-6 shrink-0 hover:text-primary-2 transition-colors"
          >
            {SITE.email}
          </a>
        </div>
      </div>

      {/* ── Main header ── */}
      <header
        className={`sticky top-0 z-40 nav-shell border-b ${
          scrolled
            ? "nav-scrolled border-white/[.06]"
            : "bg-background/80 border-transparent"
        }`}
      >
        <div
          className={`container-x flex items-center justify-between gap-3 transition-[height] duration-300 ${
            scrolled ? "h-14 sm:h-16" : "h-16 sm:h-20"
          }`}
        >
          {/* Left: hamburger + logo */}
          <div className="flex items-center gap-2">
            <button
              aria-label="Menü"
              className="lg:hidden -ml-2 p-2 rounded-full text-white/70 hover:text-white hover:bg-white/[.06] transition-colors"
              onClick={() => setOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            <Link
              href="/"
              className="font-display tracking-tight font-bold text-xl sm:text-2xl lg:text-[1.55rem] whitespace-nowrap"
            >
              <span className="text-foreground">Fikret</span>
              <span className="text-gradient"> Tekstil</span>
            </Link>
          </div>

          {/* Centre: desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9 text-sm">
            <Link href="/" className="nav-link">Ana Sayfa</Link>

            <div
              className="relative"
              onMouseEnter={openMega}
              onMouseLeave={scheduleClose}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={megaOpen}
                onClick={() => setMegaOpen((v) => !v)}
                className="nav-link inline-flex items-center gap-1"
              >
                Koleksiyon
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>

            <Link href="/kategori/erkek-pijama" className="nav-link">Erkek</Link>
            <Link href="/kategori/cocuk" className="nav-link">Çocuk</Link>
            <Link href="/kurumsal" className="nav-link">Kurumsal</Link>
            <Link href="/iletisim" className="nav-link">İletişim</Link>
          </nav>

          {/* Right: search + whatsapp */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              aria-label="Ara"
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-full text-white/60 hover:text-white hover:bg-white/[.06] transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            <a
              href={`https://wa.me/${SITE.whatsappNumber}`}
              target="_blank"
              rel="noopener"
              className="hidden sm:inline-flex items-center gap-2 ml-1 h-10 px-5 rounded-full bg-whatsapp text-white text-sm font-semibold hover:brightness-105 transition-all"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>

        {/* ── Mega menu ── */}
        <div
          className={`hidden lg:block absolute left-0 right-0 top-full transition-all duration-200 z-50 ${
            megaOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          onMouseEnter={openMega}
          onMouseLeave={scheduleClose}
        >
          <div className="bg-surface border-t border-border shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)]">
            <div className="container-x py-8 grid grid-cols-12 gap-8">
              <div className="col-span-3">
                <div className="eyebrow-plain mb-4">Kadın</div>
                <ul className="space-y-3">
                  {CATEGORIES.filter((c) =>
                    ["bayan-pijama", "pijama-takimi", "hamile-lohusa", "buyuk-beden"].includes(c.slug)
                  ).map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/kategori/${c.slug}`}
                        onClick={() => setMegaOpen(false)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                      >
                        {c.name}
                        <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="col-span-3">
                <div className="eyebrow-plain mb-4">Erkek &amp; Çocuk</div>
                <ul className="space-y-3">
                  <li>
                    <Link href="/kategori/erkek-pijama" onClick={() => setMegaOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Erkek Pijama
                    </Link>
                  </li>
                  <li>
                    <Link href="/kategori/cocuk" onClick={() => setMegaOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Çocuk
                    </Link>
                  </li>
                </ul>

                <div className="eyebrow-plain mt-7 mb-4">Hızlı Erişim</div>
                <ul className="space-y-3">
                  <li>
                    <Link href="/kurumsal" onClick={() => setMegaOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      Hakkımızda
                    </Link>
                  </li>
                  <li>
                    <Link href="/iletisim" onClick={() => setMegaOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      İletişim
                    </Link>
                  </li>
                </ul>
              </div>

              {allProducts[0] && (
                <Link
                  href="/kategori/bayan-pijama"
                  onClick={() => setMegaOpen(false)}
                  className="col-span-6 relative aspect-[16/7] rounded-xl overflow-hidden group"
                >
                  <Image
                    src={allProducts[0].image}
                    alt="Yeni sezon"
                    fill
                    sizes="600px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" />
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white max-w-[60%]">
                    <div className="text-[10px] uppercase tracking-widest text-white/60 mb-1">Yeni Sezon</div>
                    <div className="font-display text-2xl font-semibold">Pijama Koleksiyonu</div>
                    <span className="inline-flex items-center gap-1 text-sm mt-3 text-primary-2">
                      Keşfet <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="drawer open absolute left-0 top-0 bottom-0 w-[88%] max-w-sm bg-surface border-r border-border flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <span className="font-display text-xl font-bold">
                <span className="text-foreground">Fikret</span>
                <span className="text-gradient"> Tekstil</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Kapat"
                className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/[.06] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-5 pt-4">
              <button
                onClick={() => { setOpen(false); setSearchOpen(true); }}
                className="w-full flex items-center gap-2 h-11 px-4 rounded-full bg-surface-2 text-sm text-muted-foreground hover:bg-surface-3 transition-colors"
              >
                <Search className="w-4 h-4" />
                Ürün ara…
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 flex flex-col">
              <Link href="/" onClick={() => setOpen(false)} className="py-3 font-medium text-foreground border-b border-border text-sm">Ana Sayfa</Link>

              <button
                type="button"
                onClick={() => setMobileColl((v) => !v)}
                className="py-3 font-medium text-foreground border-b border-border flex items-center justify-between text-sm"
                aria-expanded={mobileColl}
              >
                Koleksiyon
                <ChevronDown className={`w-4 h-4 transition-transform text-muted-foreground ${mobileColl ? "rotate-180" : ""}`} />
              </button>
              {mobileColl && (
                <div className="pl-3 border-b border-border">
                  {CATEGORIES.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/kategori/${c.slug}`}
                      onClick={() => setOpen(false)}
                      className="py-2.5 flex items-center justify-between text-sm text-muted-foreground hover:text-foreground group"
                    >
                      <span>{c.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:text-primary-2 transition-colors" />
                    </Link>
                  ))}
                </div>
              )}

              <Link href="/kategori/erkek-pijama" onClick={() => setOpen(false)} className="py-3 font-medium text-foreground border-b border-border text-sm">Erkek</Link>
              <Link href="/kategori/cocuk"        onClick={() => setOpen(false)} className="py-3 font-medium text-foreground border-b border-border text-sm">Çocuk</Link>
              <Link href="/kurumsal"              onClick={() => setOpen(false)} className="py-3 font-medium text-foreground border-b border-border text-sm">Kurumsal</Link>
              <Link href="/iletisim"              onClick={() => setOpen(false)} className="py-3 font-medium text-foreground border-b border-border text-sm">İletişim</Link>
            </nav>

            <div className="p-5 border-t border-border space-y-2">
              <a
                href={`https://wa.me/${SITE.whatsappNumber}`}
                target="_blank"
                rel="noopener"
                className="btn btn-whatsapp w-full h-12"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp ile İletişim
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="block text-center text-xs text-muted-foreground hover:text-primary-2 transition-colors"
              >
                {SITE.email}
              </a>
            </div>
          </aside>
        </div>
      )}

      {searchOpen && <SearchPopup onClose={() => setSearchOpen(false)} />}
    </>
  );
}

function SearchPopup({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const router = useRouter();

  const results = useMemo(() => {
    const v = q.trim().toLowerCase();
    if (!v) return [];
    return allProducts
      .filter((p) => p.title.toLowerCase().includes(v) || p.categoryName.toLowerCase().includes(v))
      .slice(0, 6);
  }, [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mx-auto mt-24 max-w-2xl px-4">
        <div className="bg-surface border border-border shadow-[0_40px_80px_-20px_rgba(0,0,0,.9)] overflow-hidden rounded-2xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (results[0]) { router.push(`/urun/${results[0].slug}`); onClose(); }
            }}
            className="flex items-center gap-3 px-5 py-4 border-b border-border"
          >
            <Search className="w-5 h-5 text-muted-foreground" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ürün ara…"
              className="flex-1 bg-transparent outline-none text-base text-foreground placeholder-muted-foreground"
            />
            <button type="button" onClick={onClose} aria-label="Kapat" className="p-1.5 rounded-full hover:bg-surface-2 text-muted-foreground">
              <X className="w-4 h-4" />
            </button>
          </form>

          <div className="max-h-[60vh] overflow-y-auto">
            {q.trim() === "" ? (
              <div className="p-6 text-sm text-muted-foreground">
                <div className="eyebrow-plain mb-3">Koleksiyonlar</div>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.slice(0, 5).map((c) => (
                    <Link
                      key={c.slug}
                      href={`/kategori/${c.slug}`}
                      onClick={onClose}
                      className="px-3 py-1.5 rounded-full bg-surface-2 border border-border hover:border-primary/30 hover:text-primary-2 transition-colors text-xs"
                    >
                      {c.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground">Sonuç bulunamadı.</div>
            ) : (
              <ul>
                {results.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/urun/${p.slug}`}
                      onClick={onClose}
                      className="flex items-center gap-4 px-5 py-3 hover:bg-surface-2 transition-colors"
                    >
                      <div className="relative w-12 h-14 overflow-hidden bg-muted shrink-0 rounded-md">
                        <Image src={p.image} alt={p.title} fill sizes="48px" className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] uppercase tracking-widest text-primary-2 font-semibold mb-0.5">{p.categoryName}</div>
                        <div className="text-sm font-medium text-foreground truncate">{p.title}</div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
