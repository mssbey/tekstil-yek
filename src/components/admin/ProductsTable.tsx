"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, Pencil, Trash2, ExternalLink, SlidersHorizontal } from "lucide-react";
import type { ProductRecord } from "@/lib/products-db";

interface Props {
  products: ProductRecord[];
  categories: { slug: string; name: string; count: number }[];
}

export function ProductsTable({ products, categories }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [deleting, setDeleting] = useState<string | null>(null);

  const filtered = products.filter((p) => {
    const matchSearch =
      search === "" || p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || p.category === filterCat;
    return matchSearch && matchCat;
  });

  async function handleDelete(slug: string, title: string) {
    if (!confirm(`"${title}" ürünü kalıcı olarak silinsin mi?`)) return;
    setDeleting(slug);
    const res = await fetch(`/api/admin/products/${slug}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Silme işlemi başarısız oldu");
      setDeleting(null);
    }
  }

  return (
    <div className="rounded-2xl border border-white/[0.07] overflow-hidden" style={{ background: "#111" }}>
      {/* Filters bar */}
      <div className="px-5 py-4 border-b border-white/[0.07] flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
          <input
            type="text"
            placeholder="Ürün ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/40 transition-all"
          />
        </div>
        <div className="relative">
          <SlidersHorizontal className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="appearance-none bg-white/[0.04] border border-white/[0.08] rounded-xl pl-10 pr-6 py-2.5 text-sm text-gray-300 focus:outline-none focus:border-orange-500/40 transition-all cursor-pointer"
          >
            <option value="all" className="bg-[#111]">Tüm Kategoriler</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug} className="bg-[#111]">
                {c.name} ({c.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[.15em] text-gray-600">
                Ürün
              </th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[.15em] text-gray-600 hidden md:table-cell">
                Kategori
              </th>
              <th className="text-left px-5 py-3 text-[10px] font-bold uppercase tracking-[.15em] text-gray-600 hidden lg:table-cell">
                Bedenler
              </th>
              <th className="text-right px-5 py-3 text-[10px] font-bold uppercase tracking-[.15em] text-gray-600">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-16 text-center">
                  <p className="text-gray-600 text-sm">Ürün bulunamadı</p>
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="text-xs text-orange-400 hover:text-orange-300 mt-2 transition-colors"
                    >
                      Aramayı temizle
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              filtered.map((p, i) => (
                <tr
                  key={p.slug}
                  className={`border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group ${
                    i === filtered.length - 1 ? "border-b-0" : ""
                  }`}
                >
                  {/* Product */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/[0.08]"
                        style={{ background: "#0d0d0d" }}>
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          sizes="48px"
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white leading-tight line-clamp-2 max-w-xs">
                          {p.title}
                        </p>
                        <p className="text-[11px] text-gray-600 mt-0.5 font-mono">{p.slug}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-xs font-medium bg-orange-500/10 text-orange-300 border border-orange-500/20 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {p.categoryName}
                    </span>
                  </td>

                  {/* Sizes */}
                  <td className="px-5 py-4 hidden lg:table-cell">
                    {p.sizes?.length ? (
                      <div className="flex gap-1 flex-wrap">
                        {p.sizes.map((s) => (
                          <span
                            key={s}
                            className="text-[10px] font-bold text-gray-500 bg-white/[0.04] border border-white/[0.07] px-2 py-0.5 rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-xs text-gray-700">S M L XL 2XL</span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link
                        href={`/urun/${p.slug}`}
                        target="_blank"
                        className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-gray-600 hover:text-gray-300 hover:border-white/20 transition-all"
                        title="Siteyi Gör"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={`/admin/urunler/${p.slug}/duzenle`}
                        className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-gray-500 hover:text-orange-300 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all"
                        title="Düzenle"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(p.slug, p.title)}
                        disabled={deleting === p.slug}
                        className="w-8 h-8 rounded-lg border border-white/[0.08] flex items-center justify-center text-gray-600 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-all disabled:opacity-30"
                        title="Sil"
                      >
                        {deleting === p.slug ? (
                          <span className="text-[10px] font-bold text-red-400">...</span>
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {filtered.length > 0 && (
        <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
          <span className="text-xs text-gray-600">
            {filtered.length === products.length
              ? `${products.length} ürün`
              : `${filtered.length} / ${products.length} ürün gösteriliyor`}
          </span>
          {(search || filterCat !== "all") && (
            <button
              onClick={() => { setSearch(""); setFilterCat("all"); }}
              className="text-xs text-gray-600 hover:text-orange-400 transition-colors"
            >
              Filtreleri temizle
            </button>
          )}
        </div>
      )}
    </div>
  );
}
