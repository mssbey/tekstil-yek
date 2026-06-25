import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MessageCircle } from "lucide-react";
import { CATEGORIES, SITE } from "@/lib/config";
import { getCategory, getProductsByCategory } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const products = getProductsByCategory(slug);
  const others   = CATEGORIES.filter((c) => c.slug !== slug);

  return (
    <>
      {/* ── Category hero ── */}
      <section className="relative bg-background overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Orange glow */}
        <div
          className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(255,94,0,.18) 0%, transparent 65%)",
          }}
        />

        <div className="container-x py-16 md:py-24 relative text-foreground">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-7">
            <Link href="/" className="hover:text-primary-2 transition-colors">Ana Sayfa</Link>
            <span className="opacity-30">/</span>
            <span className="text-foreground">{category.name}</span>
          </nav>

          <p className="eyebrow-plain mb-5">Koleksiyon</p>

          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h1
              className="font-display tracking-[-0.025em] leading-[0.95]"
              style={{ fontSize: "clamp(3rem,8vw,7rem)" }}
            >
              {category.name}
            </h1>
            <div className="text-right">
              <div
                className="font-display font-bold"
                style={{
                  fontSize: "clamp(2rem,5vw,3.5rem)",
                  background: "linear-gradient(135deg, #fff 40%, rgba(255,255,255,.5))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {products.length}
              </div>
              <div className="text-[9px] uppercase tracking-[.26em] text-muted-foreground mt-1">ürün</div>
            </div>
          </div>

          <p className="text-muted-foreground mt-5 max-w-xl leading-relaxed text-sm">
            Yumuşak doğal kumaşlar, modern kesimler ve özenli işçilik.
            Fiyat ve stok bilgisi için WhatsApp&apos;tan yazın.
          </p>

          {/* Category pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            <span className="px-5 h-9 inline-flex items-center text-xs font-semibold tracking-wide bg-primary text-white rounded-full">
              {category.name}
            </span>
            {others.map((c) => (
              <Link
                key={c.slug}
                href={`/kategori/${c.slug}`}
                className="px-5 h-9 inline-flex items-center text-xs font-medium border border-border text-muted-foreground hover:border-primary/30 hover:text-primary-2 transition-colors rounded-full"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Filter/sort bar ── */}
      <div className="border-b border-border bg-surface sticky top-[var(--nav-h,64px)] z-30">
        <div className="container-x py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-bold text-foreground text-sm">{products.length}</span>
            <span>ürün listeleniyor</span>
          </div>
        </div>
      </div>

      {/* ── Product grid ── */}
      <section className="bg-background py-10 md:py-14">
        <div className="container-x">
          {products.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground mb-6 text-sm">Bu kategoride henüz ürün bulunmuyor.</p>
              <Link href="/" className="btn btn-primary h-12 px-7">Ana Sayfa</Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border">
              {products.map((p) => (
                <div key={p.slug} className="bg-background">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}

          {/* WhatsApp CTA */}
          <div className="mt-16 border border-border bg-surface-2 p-8 md:p-10 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="eyebrow-plain mb-3">Aradığınızı bulamadınız mı?</div>
              <h3 className="font-display text-2xl md:text-3xl text-foreground tracking-tight">
                Size özel öneri için yazın.
              </h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-md">
                Hangi beden, model veya renk arıyorsanız iletin; size en uygun ürünü önerelim.
              </p>
            </div>
            <a
              href={`https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(
                `Merhaba ${SITE.brand}, ${category.name} kategorisinden öneri istiyorum.`,
              )}`}
              target="_blank"
              rel="noopener"
              className="btn btn-whatsapp h-12 px-7 shrink-0"
            >
              <MessageCircle className="w-5 h-5" /> WhatsApp&apos;tan Sor
            </a>
          </div>

          {/* Other categories */}
          <div className="mt-14">
            <div className="section-label mb-8">Diğer Koleksiyonlar</div>
            <div className="flex flex-wrap gap-3">
              {others.map((c) => (
                <Link
                  key={c.slug}
                  href={`/kategori/${c.slug}`}
                  className="inline-flex items-center gap-2 h-11 px-5 border border-border text-sm font-medium text-muted-foreground hover:border-primary/30 hover:text-primary-2 transition-all group rounded-full"
                >
                  {c.name}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
