"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, X, Plus } from "lucide-react";
import type { ProductRecord } from "@/lib/products-db";

const CATEGORIES = [
  { slug: "bayan-pijama", name: "Bayan Pijama" },
  { slug: "erkek-pijama", name: "Erkek Pijama" },
  { slug: "cocuk", name: "Çocuk" },
  { slug: "pijama-takimi", name: "Pijama Takımı" },
  { slug: "hamile-lohusa", name: "Hamile Lohusa" },
  { slug: "buyuk-beden", name: "Büyük Beden" },
];

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "Standart"];
const ALL_TAGS = [
  "Pamuk & Modal",
  "Yerli Üretim",
  "Premium İşçilik",
  "50+ Yıl Tecrübe",
  "Viskon Karışımı",
  "İpek Dokulu",
  "Anti-alerjik",
  "%100 Pamuk",
  "Organik Kumaş",
  "Su Geçirmez",
];

const DEFAULT_FEATURES = [
  "%70 Pamuk, %30 Modal karışımı",
  "Nefes alabilen, terletmeyen kumaş",
  "Dayanıklı dikiş ve sağlam aksesuar",
  "Antialerjik, hassas ciltlere uygun",
  "OEKO-TEX standartlarında üretim",
];

const DEFAULT_CARE = [
  "30°C'de makinede yıkanabilir",
  "Tersten yıkayın, çamaşır suyu kullanmayın",
  "Düşük ısıda ütüleyin",
  "Kuru temizlemeye uygun değildir",
];

const DEFAULT_SHIPPING =
  "Sipariş ve fiyat bilgisi WhatsApp üzerinden alınır. Onaylanan siparişler Türkiye geneline 1–3 iş günü içinde kargoya verilir. Toptan alımlar için özel fiyat ve numune talep edebilirsiniz.";

function makeSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

interface Props {
  mode: "create" | "edit";
  product?: ProductRecord;
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/[0.07] overflow-hidden" style={{ background: "#111" }}>
      <div className="px-6 py-4 border-b border-white/[0.07]">
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="p-6 space-y-5">{children}</div>
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-[.1em] mb-2">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-600 mt-1.5">{hint}</p>}
    </div>
  );
}

const inputCls =
  "w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.06] transition-all text-sm";

const textareaCls =
  "w-full bg-white/[0.04] border border-white/[0.09] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.06] transition-all text-sm resize-none leading-relaxed";

export function ProductForm({ mode, product }: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  // Basic
  const [title, setTitle] = useState(product?.title ?? "");
  const [category, setCategory] = useState(product?.category ?? "bayan-pijama");
  const [image, setImage] = useState(product?.image ?? "/images/products/foot.png");

  // Detail
  const [description, setDescription] = useState(product?.description ?? "");
  const [sizes, setSizes] = useState<string[]>(product?.sizes ?? ["S", "M", "L", "XL", "2XL"]);
  const [tags, setTags] = useState<string[]>(product?.tags ?? ["Pamuk & Modal", "Yerli Üretim", "Premium İşçilik", "50+ Yıl Tecrübe"]);

  // Specs
  const [features, setFeatures] = useState(
    (product?.features ?? DEFAULT_FEATURES).join("\n"),
  );
  const [care, setCare] = useState(
    (product?.care ?? DEFAULT_CARE).join("\n"),
  );
  const [shipping, setShipping] = useState(product?.shipping ?? DEFAULT_SHIPPING);

  // State
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const categoryName = CATEGORIES.find((c) => c.slug === category)?.name ?? "";

  function toggleSize(s: string) {
    setSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);
  }

  function toggleTag(t: string) {
    setTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);
  }

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    if (res.ok) {
      const data = await res.json();
      setImage(data.url);
    } else {
      setError("Görsel yüklenemedi");
    }
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) { setError("Ürün başlığı gereklidir"); return; }
    setSaving(true);
    setError("");

    const body = {
      title: title.trim(),
      image,
      category,
      categoryName,
      description: description.trim() || undefined,
      sizes: sizes.length ? sizes : undefined,
      tags: tags.length ? tags : undefined,
      features: features.trim()
        ? features.split("\n").map((l) => l.trim()).filter(Boolean)
        : undefined,
      care: care.trim()
        ? care.split("\n").map((l) => l.trim()).filter(Boolean)
        : undefined,
      shipping: shipping.trim() || undefined,
    };

    const res =
      mode === "create"
        ? await fetch("/api/admin/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          })
        : await fetch(`/api/admin/products/${product!.slug}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });

    if (res.ok) {
      router.push("/admin/urunler");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? "Kaydetme başarısız");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* ── 1. Temel Bilgiler ── */}
      <Section title="Temel Bilgiler" subtitle="Ürünün görsel, adı ve kategorisi">

        {/* Image upload */}
        <Field label="Ürün Görseli">
          <div
            className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/[0.09] cursor-pointer group hover:border-orange-500/40 transition-all"
            style={{ background: "#0d0d0d" }}
            onClick={() => fileRef.current?.click()}
          >
            <Image
              src={image}
              alt="Önizleme"
              fill
              sizes="700px"
              className="object-contain p-6 transition-opacity group-hover:opacity-70"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Upload className="w-6 h-6 text-orange-400 mb-2" />
              <span className="text-sm font-medium text-white">
                {uploading ? "Yükleniyor..." : "Görsel Değiştir"}
              </span>
              <span className="text-xs text-gray-400 mt-1">JPG, PNG, WebP</span>
            </div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </Field>

        {/* Title */}
        <Field
          label="Ürün Başlığı *"
          hint={
            mode === "create" && title
              ? `Slug: ${makeSlug(title)}`
              : undefined
          }
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputCls}
            placeholder="Örn: Et Vous Kalp Desenli Pijama Takımı 7702"
            required
          />
        </Field>

        {/* Category */}
        <Field label="Kategori *">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputCls}
          >
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug} className="bg-[#111]">
                {c.name}
              </option>
            ))}
          </select>
        </Field>
      </Section>

      {/* ── 2. Açıklama & Bedenler ── */}
      <Section title="Açıklama & Bedenler" subtitle="Müşteriye gösterilen kısa açıklama ve mevcut bedenler">

        <Field label="Ürün Açıklaması" hint="Ürün sayfasında başlığın altında görünür. Boş bırakırsanız varsayılan metin kullanılır.">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={textareaCls}
            rows={3}
            placeholder="%100 doğal kumaştan üretilmiş, rahat kalıbı ile günlük ev kullanımı için ideal..."
          />
        </Field>

        <Field label="Mevcut Bedenler" hint="Müşterinin sipariş ekranında göreceği bedenler">
          <div className="flex flex-wrap gap-2">
            {ALL_SIZES.map((s) => {
              const active = sizes.includes(s);
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleSize(s)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all ${
                    active
                      ? "bg-orange-500/20 border-orange-500/50 text-orange-300"
                      : "bg-white/[0.03] border-white/[0.09] text-gray-500 hover:border-white/20 hover:text-gray-300"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </Field>
      </Section>

      {/* ── 3. Özellik Etiketleri ── */}
      <Section title="Özellik Etiketleri" subtitle="Ürün sayfasında ikonlu rozetler olarak görünür">
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map((t) => {
            const active = tags.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTag(t)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-all ${
                  active
                    ? "bg-orange-500/15 border-orange-500/40 text-orange-300"
                    : "bg-white/[0.03] border-white/[0.09] text-gray-500 hover:border-white/20 hover:text-gray-300"
                }`}
              >
                {active && <span className="mr-1">✓</span>}
                {t}
              </button>
            );
          })}
        </div>
      </Section>

      {/* ── 4. Teknik Özellikler ── */}
      <Section title="Teknik Özellikler" subtitle="'Özellikler & Kumaş' accordion bölümü — her satır bir madde">
        <Field label="Kumaş & Özellikler" hint="Her satır ayrı bir madde olarak listelenir">
          <textarea
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className={textareaCls}
            rows={6}
            placeholder={DEFAULT_FEATURES.join("\n")}
          />
        </Field>
      </Section>

      {/* ── 5. Bakım & Teslimat ── */}
      <Section title="Bakım & Sipariş Bilgisi" subtitle="Accordion'ın son iki bölümü">

        <Field label="Bakım Talimatları" hint="Her satır ayrı bir madde">
          <textarea
            value={care}
            onChange={(e) => setCare(e.target.value)}
            className={textareaCls}
            rows={4}
            placeholder={DEFAULT_CARE.join("\n")}
          />
        </Field>

        <Field label="Sipariş & Teslimat Açıklaması">
          <textarea
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
            className={textareaCls}
            rows={3}
            placeholder={DEFAULT_SHIPPING}
          />
        </Field>
      </Section>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
          <X className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-1 pb-8">
        <button
          type="submit"
          disabled={saving || uploading}
          className="flex-1 font-semibold py-3.5 rounded-xl transition-all text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          style={{
            background: "linear-gradient(135deg, #fb923c 0%, #f97316 60%, #ea6c0a 100%)",
            boxShadow: "0 8px 24px -8px rgba(249,115,22,0.4)",
          }}
        >
          {saving
            ? "Kaydediliyor..."
            : mode === "create"
            ? "Ürünü Yayınla"
            : "Değişiklikleri Kaydet"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/urunler")}
          className="px-6 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.09] text-gray-400 hover:text-white font-semibold py-3.5 rounded-xl transition-all text-sm"
        >
          İptal
        </button>
      </div>
    </form>
  );
}
