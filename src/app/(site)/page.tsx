import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MessageCircle,
  Search as SearchIcon,
  PackageCheck,
  Star,
  Quote,
  Award,
  Leaf,
  Headphones,
  CheckCircle2,
} from "lucide-react";
import { CATEGORIES, SITE } from "@/lib/config";
import { allProducts, getProductsByCategory } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { WhatsAppChannel } from "@/components/WhatsAppChannel";

export default function HomePage() {
  const featured = allProducts.slice(0, 8);
  const heroProduct = allProducts.find((p) => p.category === "bayan-pijama") ?? allProducts[0];
  const editorial = allProducts[5];

  const catCards = CATEGORIES.map((c) => ({
    ...c,
    image: getProductsByCategory(c.slug)[0]?.image,
    count: getProductsByCategory(c.slug).length,
  }));

  return (
    <div className="home-light">
      {/* ═══════════════════════════════════════
          HERO — full viewport, white + orange
          ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-background bg-grid">
        {/* Ambient glows */}
        <div className="glow-tr" />
        <div className="glow-bl" />

        {/* Noise overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />

        <div className="container-x relative z-10 grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center py-24 lg:py-0">
          {/* Left — typography */}
          <div className="order-2 lg:order-1">
            <p
              className="eyebrow-plain mb-6 fade-up"
              style={{ animationDelay: "60ms" }}
            >
              Est. 1976 — Premium Tekstil
            </p>

            <h1
              className="font-display leading-[0.95] tracking-[-0.03em] fade-up"
              style={{
                fontSize: "clamp(3.2rem,8vw,6.5rem)",
                animationDelay: "160ms",
              }}
            >
              <span className="text-foreground block">1976&apos;dan</span>
              <span className="text-foreground block">Beri</span>
              <span className="text-gradient-italic block">Rahatlığın</span>
              <span className="text-gradient-italic block">Yeni Tanımı.</span>
            </h1>

            <p
              className="text-muted-foreground text-base sm:text-lg max-w-md leading-relaxed mt-8 mb-10 fade-up"
              style={{ animationDelay: "300ms" }}
            >
              Doğal kumaşlar, dayanıklı dikim ve modern kesimlerle tasarlanan
              premium pijama takımı koleksiyonu. Bursa&apos;dan başlayan yarım
              asırlık tecrübenin sade ifadesi.
            </p>

            <div
              className="flex flex-wrap gap-3 fade-up"
              style={{ animationDelay: "400ms" }}
            >
              <Link href="/kategori/bayan-pijama" className="btn btn-primary h-13 px-8 text-[.95rem]">
                Koleksiyonu Keşfet <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}`}
                target="_blank"
                rel="noopener"
                className="btn btn-glass h-13 px-7 text-[.95rem]"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>

            {/* Trust mini row */}
            <div
              className="flex flex-wrap items-center gap-5 mt-10 pt-8 border-t border-border fade-up"
              style={{ animationDelay: "500ms" }}
            >
              {["50+ Yıllık Tecrübe", "%100 Yerli Üretim", "Dünya Geneli Sevkiyat"].map((t) => (
                <span key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary-2 shrink-0" />
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — product showcase */}
          <div className="order-1 lg:order-2 relative">
            {heroProduct && (
              <div className="relative mx-auto max-w-[420px] w-full">
                {/* Glow behind card */}
                <div
                  className="absolute -inset-6 rounded-full opacity-60 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(255,94,0,.25) 0%, transparent 70%)",
                    filter: "blur(30px)",
                  }}
                />

                {/* Main product card */}
                <div
                  className="relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-premium ring-1 ring-white/[.06] fade-up"
                  style={{ animationDelay: "200ms" }}
                >
                  <Image
                    src={heroProduct.image}
                    alt={heroProduct.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-5 left-5 px-3 py-1.5 rounded-full glass text-[10px] font-semibold tracking-[.2em] uppercase text-white/90">
                    Yeni Sezon
                  </div>

                  {/* Bottom info */}
                  <div className="absolute inset-x-5 bottom-5 flex items-center justify-between text-white">
                    <div>
                      <div className="text-[10px] uppercase tracking-[.22em] text-white/50">Öne çıkan</div>
                      <div className="text-sm font-semibold mt-0.5">{heroProduct.categoryName}</div>
                    </div>
                    <Link
                      href={`/urun/${heroProduct.slug}`}
                      className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-2 transition-colors shadow-glow"
                      aria-label="Ürünü incele"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Floating cards */}
                <div
                  className="hidden sm:flex absolute -left-8 bottom-16 glass home-float-card rounded-2xl px-4 py-3 items-center gap-3 floaty"
                  style={{ animationDelay: "1.5s" }}
                >
                  <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-primary-2" />
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Premium</div>
                    <div className="text-sm font-semibold text-foreground">%100 Pamuk</div>
                  </div>
                </div>

                <div
                  className="hidden sm:flex absolute -right-6 top-14 glass home-float-card rounded-2xl px-4 py-3 items-center gap-3 floaty"
                  style={{ animationDelay: "2.5s" }}
                >
                  <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">
                    ★ 4.9
                  </div>
                  <div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Müşteri</div>
                    <div className="text-sm font-semibold text-foreground">200K+ Memnun</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Marquee strip */}
        <div className="relative border-t border-border mt-auto py-5 overflow-hidden">
          <div className="marquee text-[11px] font-bold tracking-[.3em] uppercase whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex items-center gap-14 pr-14">
                <span className="text-foreground/25">%100 Yerli Üretim</span>
                <span className="text-primary/50">✦</span>
                <span className="text-foreground/25">Premium Kumaş</span>
                <span className="text-primary/50">✦</span>
                <span className="text-foreground/25">50+ Yıllık Tecrübe</span>
                <span className="text-primary/50">✦</span>
                <span className="text-foreground/25">Dünya Geneli Sevkiyat</span>
                <span className="text-primary/50">✦</span>
                <span className="text-foreground/25">WhatsApp Sipariş</span>
                <span className="text-primary/50">✦</span>
                <span className="text-foreground/25">Doğrudan Üreticiden</span>
                <span className="text-primary/50">✦</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS / FIGURES
          ═══════════════════════════════════════ */}
      <section className="border-b border-border bg-surface">
        <div className="container-x">
          <div className="stat-strip grid-cols-3">
            {[
              { val: "50+",   label: "Yıllık Deneyim" },
              { val: "200K+", label: "Mutlu Müşteri" },
              { val: "100%",  label: "Yerli Üretim" },
            ].map(({ val, label }) => (
              <div key={label} className="stat-item">
                <div className="stat-val">{val}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CATEGORIES — Masonry / Pinterest style
          ═══════════════════════════════════════ */}
      <section className="bg-background section-pad">
        <div className="container-x">
          <Reveal className="mb-14">
            <div className="eyebrow-plain mb-4">Koleksiyonlar</div>
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <h2 className="section-title">Kategoriler</h2>
              <p className="section-sub hidden md:block text-sm">
                Her tarz ve her yaş için özenle seçilmiş koleksiyonlar.
              </p>
            </div>
          </Reveal>

          <div
            className="grid grid-cols-2 md:grid-cols-6 gap-3 md:gap-4"
            style={{
              gridAutoRows: "clamp(160px, 22vw, 240px)",
            }}
          >
            {catCards.map((c, idx) => {
              const span =
                idx === 0
                  ? "col-span-2 md:col-span-3 row-span-2"
                  : idx === 3
                  ? "col-span-2 md:col-span-3 row-span-2"
                  : "col-span-1 md:col-span-2 row-span-1";
              return (
                <Reveal key={c.slug} delay={idx * 60} className={span}>
                  <Link href={`/kategori/${c.slug}`} className="cat-card block w-full h-full">
                    {c.image && (
                      <Image
                        src={c.image}
                        alt={c.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover"
                      />
                    )}
                    <div className="cat-body">
                      <div className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Kategori</div>
                      <div className="font-display text-xl md:text-2xl font-semibold leading-tight">
                        {c.name}
                      </div>
                      <div className="text-xs opacity-50 mt-1">{c.count} ürün</div>
                      <div className="cat-cta">
                        Keşfet <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED PRODUCTS
          ═══════════════════════════════════════ */}
      <section className="bg-surface section-pad">
        <div className="container-x">
          <Reveal className="mb-12">
            <div className="eyebrow-plain mb-4">Yeni Sezon</div>
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <h2 className="section-title">Öne Çıkan Ürünler</h2>
              <Link
                href="/kategori/bayan-pijama"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary-2 transition-colors group shrink-0"
              >
                Tümünü Gör <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <p className="section-sub mt-2 text-sm">En yeni koleksiyonlarımızdan özenle seçtiklerimiz.</p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 45} className="bg-background">
                <ProductCard product={p} priority={i < 4} />
              </Reveal>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/kategori/bayan-pijama" className="btn btn-outline h-11 px-6">
              Tüm Ürünler <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW IT WORKS — WhatsApp 3 steps
          ═══════════════════════════════════════ */}
      <section className="bg-background section-pad relative overflow-hidden">
        <div className="glow-tr opacity-60" />

        <div className="container-x relative z-10">
          <Reveal className="mb-14 text-center">
            <div className="eyebrow-plain mb-4">Nasıl Çalışır?</div>
            <h2 className="section-title">3 Adımda WhatsApp Sipariş</h2>
            <p className="section-sub mx-auto mt-3 text-sm text-center">
              Aracı yok, karmaşa yok. Beğendiğiniz ürünü seçin, WhatsApp&apos;tan yazın.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5 md:gap-6 relative">
            {/* connector line */}
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {[
              { i: SearchIcon,    n: "01", t: "Ürünü Seçin",       s: "Koleksiyonu inceleyin, beğendiğiniz ürünün sayfasında beden ve adet seçin." },
              { i: MessageCircle, n: "02", t: "WhatsApp'tan Yazın", s: "Tek tıkla hazır mesajınız oluşur; fiyat ve stok bilgisi anında iletilir." },
              { i: PackageCheck,  n: "03", t: "Kapınızda",          s: "Onayınızdan sonra siparişiniz Türkiye geneline hızlıca kargolanır." },
            ].map(({ i: I, n, t, s }, idx) => (
              <Reveal key={n} delay={idx * 100}>
                <div className="relative bg-surface-2 border border-border p-7 h-full hover:-translate-y-1.5 transition-transform hover:border-primary/20 hover:shadow-glow">
                  <div className="absolute -top-3.5 right-5 text-[9px] font-bold tracking-[.22em] text-primary bg-primary/10 border border-primary/20 px-3 py-1">
                    ADIM {n}
                  </div>
                  <div className="icon-circle mb-5">
                    <I className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2 text-foreground">{t}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          EDITORIAL BANNER — brand story
          ═══════════════════════════════════════ */}
      <section className="bg-surface section-pad">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-border">
              {/* Bg image */}
              <div className="absolute inset-0">
                {editorial && (
                  <Image src={editorial.image} alt="" fill sizes="100vw" className="object-cover scale-105" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/70 to-black/30" />
                {/* orange glow on right */}
                <div
                  className="absolute right-0 top-0 w-1/2 h-full opacity-20"
                  style={{
                    background: "radial-gradient(ellipse at right center, rgba(255,94,0,.4), transparent 70%)",
                  }}
                />
              </div>

              <div className="relative p-10 md:p-20 lg:p-24 max-w-2xl">
                <div className="eyebrow mb-5">Hikayemiz</div>
                <h3 className="font-display leading-[1.02] tracking-[-0.025em]"
                  style={{ fontSize: "clamp(2.2rem,5vw,4.5rem)" }}>
                  İki kuşak,<br />tek tutku:{" "}
                  <span className="text-gradient-italic">kalite.</span>
                </h3>
                <p className="text-white/60 mt-6 max-w-md leading-relaxed">
                  1976&apos;dan bu yana Bursa&apos;dan her ilmek, her kumaş ve her detay aynı
                  özenle seçiliyor. Babadan gelen meslek, bugün dünyaya açılan bir marka.
                </p>
                <Link href="/kurumsal" className="btn btn-primary h-12 px-8 mt-8">
                  Hakkımızda <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════ */}
      <section className="bg-background section-pad relative overflow-hidden">
        <div className="glow-bl opacity-40" />

        <div className="container-x relative z-10">
          <Reveal className="mb-12">
            <div className="eyebrow-plain mb-4">Müşteri Yorumları</div>
            <h2 className="section-title">Sözler Onlardan</h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { n: "Elif Y.",   c: "İstanbul", q: "Kumaşı inanılmaz yumuşak, dikişler çok düzgün. WhatsApp'tan sipariş süreci de hızlıydı." },
              { n: "Mehmet K.", c: "Ankara",   q: "Yıllardır bu kalitede pijama bulamamıştım. Annem için aldım, çok sevdi. Tavsiye ederim." },
              { n: "Aylin D.",  c: "İzmir",    q: "Renkler birebir aynı çıktı, kargo hızlıydı. İletişim çok ilgili, kesinlikle tekrar alacağım." },
            ].map((r, i) => (
              <Reveal key={r.n} delay={i * 80}>
                <div className="bg-surface-2 border border-border p-7 h-full flex flex-col hover:border-primary/20 transition-colors">
                  <Quote className="w-6 h-6 text-primary mb-5 opacity-70" />
                  <p className="text-foreground/70 leading-relaxed flex-1 text-[15px]">&ldquo;{r.q}&rdquo;</p>
                  <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-sm text-foreground">{r.n}</div>
                      <div className="text-xs text-muted-foreground">{r.c}</div>
                    </div>
                    <div className="flex gap-0.5 text-primary-2">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          B2B / WHOLESALE
          ═══════════════════════════════════════ */}
      <section className="bg-surface section-pad">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden border border-border bg-surface-2 p-8 md:p-14 rounded-2xl">
              <div
                className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(255,94,0,.12), transparent 70%)",
                  filter: "blur(40px)",
                }}
              />

              <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-center relative z-10">
                <div>
                  <div className="eyebrow mb-4">Toptan Satış</div>
                  <h3 className="font-display text-3xl md:text-4xl leading-tight mb-4 tracking-tight">
                    Mağazanız için{" "}
                    <span className="text-gradient">özel fiyat</span>
                    {" "}ve numune
                  </h3>
                  <p className="text-muted-foreground max-w-lg leading-relaxed mb-7 text-sm">
                    Perakendeciler, oteller ve kurumsal alıcılar için özel toptan koşulları,
                    numune gönderimi ve özel üretim seçenekleri sunuyoruz.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
                        `Merhaba ${SITE.brand}, toptan satış koşulları hakkında bilgi almak istiyorum.`,
                      )}`}
                      target="_blank"
                      rel="noopener"
                      className="btn btn-whatsapp h-12 px-7"
                    >
                      <MessageCircle className="w-5 h-5" /> Toptan Bilgi Al
                    </a>
                    <Link href="/iletisim" className="btn btn-glass h-12 px-7">
                      İletişim
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { t: "MOQ",     v: "Esnek",    s: "Düşük min. sipariş" },
                    { t: "Numune",  v: "Ücretsiz", s: "Onay sonrası" },
                    { t: "Üretim",  v: "İstanbul", s: "Kendi tesisimiz" },
                    { t: "Etiket",  v: "Özel",     s: "Private label" },
                  ].map((x) => (
                    <div key={x.t} className="bg-background border border-border p-5 hover:border-primary/20 transition-colors">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{x.t}</div>
                      <div className="font-display text-xl font-bold text-foreground">{x.v}</div>
                      <div className="text-xs text-muted-foreground mt-1">{x.s}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURE CARDS
          ═══════════════════════════════════════ */}
      <section className="bg-background section-pad">
        <div className="container-x">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Award,      title: "50+ Yıllık Deneyim",  text: "1976'dan bu yana Bursa'dan dünyanın her yerine kaliteyi prensip edinerek üretiyoruz." },
              { icon: Leaf,       title: "Premium Kumaşlar",     text: "Doğal pamuk, modal ve viskon karışımı kumaşlarla dokunma keyfi." },
              { icon: Headphones, title: "WhatsApp İletişim",    text: "Fiyat, stok ve sipariş için hemen WhatsApp üzerinden bize ulaşın." },
            ].map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 80}>
                <div className="bg-surface-2 border border-border p-8 h-full hover:-translate-y-1.5 hover:border-primary/20 transition-all hover:shadow-glow">
                  <div className="icon-circle mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2 text-foreground">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WHATSAPP CHANNEL
          ═══════════════════════════════════════ */}
      <section className="bg-surface section-pad">
        <div className="container-x">
          <Reveal>
            <WhatsAppChannel />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
