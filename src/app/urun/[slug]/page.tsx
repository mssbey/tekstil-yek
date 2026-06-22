import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronRight, Leaf, Factory, Sparkles, Award,
  Truck, ShieldCheck, Headphones,
} from "lucide-react";
import { allProducts, getProduct, getProductsByCategory } from "@/lib/products";
import { WhatsAppOrder } from "@/components/WhatsAppOrder";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { Accordion } from "@/components/Accordion";

export function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

function toModelCode(slug: string): string {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return `FT-${String((h % 900) + 100).padStart(3, "0")}`;
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  const modelCode = toModelCode(slug);

  return (
    <>
      <section className="bg-background">
        <div className="container-x pt-7 pb-12 md:pt-10 md:pb-20">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8 flex-wrap">
            <Link href="/" className="hover:text-primary-2 transition-colors">Ana Sayfa</Link>
            <ChevronRight className="w-3 h-3 opacity-30" />
            <Link href={`/kategori/${product.category}`} className="hover:text-primary-2 transition-colors">
              {product.categoryName}
            </Link>
            <ChevronRight className="w-3 h-3 opacity-30" />
            <span className="text-foreground/70 truncate max-w-[60vw]">{product.title}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Gallery */}
            <ProductGallery src={product.image} alt={product.title} />

            {/* Info */}
            <div className="lg:pl-2">
              {/* Badges */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[9px] font-bold tracking-[.22em] uppercase text-muted-foreground border border-border px-3 py-1.5">
                  {modelCode}
                </span>
                <span className="text-[9px] font-bold tracking-[.22em] uppercase bg-primary text-white px-3 py-1.5">
                  {product.categoryName}
                </span>
              </div>

              <h1
                className="font-display leading-[1.04] tracking-[-0.02em] mb-5 text-foreground"
                style={{ fontSize: "clamp(1.9rem,4vw,2.8rem)" }}
              >
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-border">
                <div className="flex items-center gap-0.5 text-primary-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path d="M10 1l2.6 5.3 5.9.9-4.3 4.2 1 5.9L10 14.8 4.8 17.3l1-5.9L1.5 7.2l5.9-.9L10 1z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">4.9 / 5 &nbsp;·&nbsp; 1.200+ memnun müşteri</span>
              </div>

              <p className="text-foreground/65 leading-relaxed mb-7 text-[15px]">
                %100 doğal kumaştan üretilmiş, rahat kalıbı ile günlük ev kullanımı için
                ideal. Yıkamada renk vermez; dokusunu, kalıbını ve formunu uzun süre korur.
                <span className="font-medium text-foreground/80"> Türkiye&apos;de üretilmiştir.</span>
              </p>

              {/* Feature tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  { i: Leaf,     t: "Pamuk & Modal" },
                  { i: Factory,  t: "Yerli Üretim" },
                  { i: Sparkles, t: "Premium İşçilik" },
                  { i: Award,    t: "50+ Yıl Tecrübe" },
                ].map(({ i: I, t }) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-2 bg-surface-2 text-foreground/70 border border-border hover:border-primary/25 transition-colors rounded-md"
                  >
                    <I className="w-3.5 h-3.5 text-primary-2" /> {t}
                  </span>
                ))}
              </div>

              {/* WhatsApp order widget */}
              <WhatsAppOrder product={product} />

              {/* Accordion */}
              <div className="mt-10">
                <Accordion
                  items={[
                    {
                      title: "Ürün Açıklaması",
                      content: (
                        <p>
                          Yumuşak dokulu pamuk-modal karışımı kumaş, ferah kesim ve kaliteli
                          dikiş detaylarıyla hazırlanmıştır. Geceleri rahat bir uyku, gündüzleri
                          özgür bir konfor sunar. Kalıbı standart bedendir; iki beden arasında
                          kaldıysanız bir üst bedeni tercih edebilirsiniz.
                        </p>
                      ),
                    },
                    {
                      title: "Özellikler & Kumaş",
                      content: (
                        <ul className="space-y-2 list-disc pl-5">
                          <li>%70 Pamuk, %30 Modal karışımı</li>
                          <li>Nefes alabilen, terletmeyen kumaş</li>
                          <li>Dayanıklı dikiş ve sağlam aksesuar</li>
                          <li>Antialerjik, hassas ciltlere uygun</li>
                          <li>OEKO-TEX standartlarında üretim</li>
                        </ul>
                      ),
                    },
                    {
                      title: "Bakım Talimatları",
                      content: (
                        <ul className="space-y-2 list-disc pl-5">
                          <li>30°C&apos;de makinede yıkanabilir</li>
                          <li>Tersten yıkayın, çamaşır suyu kullanmayın</li>
                          <li>Düşük ısıda ütüleyin</li>
                          <li>Kuru temizlemeye uygun değildir</li>
                        </ul>
                      ),
                    },
                    {
                      title: "Sipariş & Teslimat",
                      content: (
                        <p>
                          Sipariş ve fiyat bilgisi WhatsApp üzerinden alınır. Onaylanan
                          siparişler Türkiye geneline 1–3 iş günü içinde kargoya verilir.
                          Toptan alımlar için özel fiyat ve numune talep edebilirsiniz.
                        </p>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-border bg-surface">
        <div className="container-x py-7 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { i: Factory,     t: "Doğrudan Üreticiden", s: "Aracısız fiyat" },
            { i: Truck,       t: "Hızlı Teslimat",      s: "1-3 iş günü" },
            { i: ShieldCheck, t: "Güvenli İletişim",    s: "WhatsApp Business" },
            { i: Headphones,  t: "Kişisel Destek",      s: "Her sipariş özeldir" },
          ].map(({ i: I, t, s }) => (
            <div key={t} className="flex items-center justify-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0">
                <I className="w-4 h-4 text-primary-2" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-foreground leading-tight">{t}</div>
                <div className="text-[11px] text-muted-foreground">{s}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="bg-background py-14 md:py-20">
          <div className="container-x">
            <div className="flex items-end justify-between mb-10 gap-6">
              <div>
                <div className="eyebrow-plain mb-3">Sizin için seçtik</div>
                <h2 className="section-title">Benzer Ürünler</h2>
              </div>
              <Link
                href={`/kategori/${product.category}`}
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary-2 transition-colors group shrink-0"
              >
                Tüm {product.categoryName}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
              {related.map((p) => (
                <div key={p.slug} className="bg-background">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
