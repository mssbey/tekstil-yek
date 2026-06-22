import Link from "next/link";
import Image from "next/image";
import {
  Factory, Heart, Sparkles, Leaf,
  ShieldCheck, MessageCircle, ArrowRight, Globe,
} from "lucide-react";
import { SITE } from "@/lib/config";
import { allProducts } from "@/lib/products";

export const metadata = { title: `Kurumsal – ${SITE.brand}` };

const TIMELINE = [
  { y: "1976", t: "Kuruluş – Bursa",        d: "Babamız Fikret Bey, Bursa'da küçük bir atölyede pijama takımı üretimine başladı. Babadan gelen bu meslek, ailemizin ortak tutku ve emeğiyle bugünlere taşındı." },
  { y: "1988", t: "Kapasite Artışı",         d: "Artan talep doğrultusunda modern makine parkurunu bünyemize katarak iplik seçiminden dikime kadar tüm üretim sürecini kendi kontrolümüze aldık." },
  { y: "2003", t: "Ulusal Dağıtım Ağı",      d: "Türkiye'nin dört bir yanına düzenli sevkiyat başlattık; bayi ve toptancı partnerliklerimizle ulusal ölçekte tanınan bir marka haline geldik." },
  { y: "2015", t: "İhracata Açılış",         d: "Orta Doğu, Avrupa ve Kuzey Afrika pazarlarına pijama takımı koleksiyonlarımızı ihraç etmeye başladık." },
  { y: "2024", t: "Dünya Geneli Sevkiyat",   d: "Bugün dünyanın her köşesine sevkiyat gerçekleştiriyor; dijital platformlar ve WhatsApp üzerinden de doğrudan tüketicilerimize ulaşıyoruz." },
];

const VALUES = [
  { i: Leaf,       t: "Doğal Kumaş",        d: "Pamuk, modal ve viskon karışımı, cilde dost dokular." },
  { i: ShieldCheck, t: "Kalite Güvencesi",  d: "Her ürün titiz kalite kontrolünden geçer." },
  { i: Heart,      t: "Müşteri Odaklılık",  d: "Her sipariş bizim için kişiseldir, ilgi gösteririz." },
  { i: Globe,      t: "Dünya Geneli",        d: "Türkiye'den tüm dünyaya kesintisiz sevkiyat." },
];

export default function AboutPage() {
  const hero = allProducts[0];
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-background border-b border-border">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div
          className="absolute -top-40 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,94,0,.15) 0%, transparent 65%)" }}
        />

        <div className="container-x grid lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 lg:py-24 relative z-10">
          <div>
            <p className="eyebrow mb-4">Kurumsal</p>
            <h1
              className="font-display font-bold tracking-tight leading-[1.04]"
              style={{ fontSize: "clamp(2.4rem,6vw,5rem)" }}
            >
              1976&apos;dan beri{" "}
              <span className="text-gradient">kalitenin</span> dokusu
            </h1>
            <p className="text-muted-foreground text-lg mt-5 max-w-lg leading-relaxed">
              {SITE.brand}, Bursa&apos;dan başlayan ve yarım asrı aşan tecrübesiyle
              Türkiye&apos;nin önde gelen pijama takımı üreticilerinden biridir.
              Babadan gelen bu meslek, bugün dünyanın dört bir yanına ulaşıyor.
            </p>
            <div className="flex flex-wrap gap-3 mt-7">
              <Link href="/" className="btn btn-primary h-12 px-7">
                Koleksiyonu Gör <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/iletisim" className="btn btn-glass h-12 px-7">İletişim</Link>
            </div>
          </div>

          {hero && (
            <div className="relative">
              <div
                className="absolute -inset-8 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(ellipse at center, rgba(255,94,0,.2) 0%, transparent 70%)", filter: "blur(30px)" }}
              />
              <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-premium max-w-md mx-auto ring-1 ring-white/[.05]">
                <Image src={hero.image} alt="" fill priority sizes="500px" className="object-cover" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border bg-surface">
        <div className="container-x py-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: "50+",   l: "Yıllık Deneyim" },
            { v: "200K+", l: "Mutlu Müşteri" },
            { v: "100%",  l: "Yerli Üretim" },
            { v: "40+",   l: "Ülkeye Sevkiyat" },
          ].map((s) => (
            <div key={s.l}>
              <div className="stat-val" style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)" }}>{s.v}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HIKAYE */}
      <section className="container-x py-16 md:py-24 grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <div className="eyebrow mb-3">Hikayemiz</div>
          <h2 className="section-title">Babadan gelen meslek, kuşaktan kuşağa tutku.</h2>
          <p className="text-muted-foreground leading-relaxed mt-5">
            1976 yılında babamız Fikret Bey, Bursa&apos;nın işlek bir sokağındaki küçük atölyesinde
            ilk makinesini kurdu. Sadece birkaç çalışanla başlayan bu serüven, kısa sürede
            kalitesiyle öne çıktı. Her sabah erken kalkan, her ilmeği bizzat denetleyen bir ustanın
            elinden çıkan ürünler, kıyafet değil; bir yaşam tarzı oldu.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Yıllar içinde aile büyüdü, işletme büyüdü. İkinci kuşak olarak biz de bu mesleği
            babanın elinden aldık; modern üretim teknolojilerini geleneksel işçilikle buluşturduk.
            Bugün Bursa&apos;daki fabrikamızdan Türkiye&apos;nin dört bir yanına, oradan da
            dünyanın kırk&apos;tan fazla ülkesine pijama takımı sevk ediyoruz.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            Bizi farklı kılan tek şey kumaş ya da dikiş değil; her ürünün arkasındaki
            aile sorumluluğu ve babamızdan öğrendiğimiz &ldquo;ya en iyi ya da hiç&rdquo; felsefesidir.
          </p>
        </div>

        {/* TIMELINE */}
        <div className="relative pl-6">
          <div className="absolute left-2 top-2 bottom-2 w-px bg-border" />
          {TIMELINE.map((item) => (
            <div key={item.y} className="relative pb-8 last:pb-0">
              <span className="absolute -left-[1.35rem] top-1.5 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-background" />
              <div className="text-xs font-bold text-primary tracking-widest">{item.y}</div>
              <div className="font-semibold text-foreground mt-1">{item.t}</div>
              <div className="text-sm text-muted-foreground mt-1">{item.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DEĞERLER */}
      <section className="bg-surface section-pad">
        <div className="container-x">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="eyebrow-plain mb-3 mx-auto">Değerlerimiz</div>
            <h2 className="section-title">Neden {SITE.brand}?</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map(({ i: I, t, d }) => (
              <div key={t} className="bg-surface-2 border border-border p-7 hover:-translate-y-1.5 hover:border-primary/20 transition-all hover:shadow-glow">
                <div className="icon-circle mb-5"><I className="w-5 h-5" /></div>
                <div className="font-display text-lg font-semibold mb-2 text-foreground">{t}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background section-pad">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-2xl bg-surface-2 border border-border p-10 md:p-16 text-center">
            <div
              className="absolute inset-x-0 top-0 h-px"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,98,0,.4), transparent)" }}
            />
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] pointer-events-none"
              style={{ background: "radial-gradient(ellipse at top center, rgba(255,94,0,.15) 0%, transparent 65%)" }}
            />
            <div className="relative z-10">
              <Factory className="w-8 h-8 mx-auto text-primary-2 mb-4" />
              <h3 className="font-display text-3xl md:text-4xl text-foreground tracking-tight">
                Doğrudan üreticiden, size özel.
              </h3>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                Bursa&apos;dan dünyanın her yerine aracısız fiyat, samimi iletişim
                ve özenle hazırlanmış pijama takımları.
              </p>
              <a
                href={`https://wa.me/${SITE.whatsappNumber}`}
                target="_blank"
                rel="noopener"
                className="btn btn-whatsapp h-12 px-8 mt-7 inline-flex"
              >
                <MessageCircle className="w-5 h-5" /> WhatsApp ile İletişim
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
