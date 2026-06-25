import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { readProductsDB } from "@/lib/products-db";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductsTable } from "@/components/admin/ProductsTable";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const db = readProductsDB();
  const products = Object.values(db.productsBySlug);
  const total = products.length;

  return (
    <AdminShell>
      <div className="p-8">
        {/* Page header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Ürün Yönetimi</h1>
            <p className="text-sm text-gray-500 mt-1">
              Toplam <span className="text-gray-300 font-medium">{total}</span> ürün
            </p>
          </div>
          <Link
            href="/admin/urunler/yeni"
            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all"
            style={{
              background: "linear-gradient(135deg, #fb923c 0%, #f97316 60%, #ea6c0a 100%)",
              boxShadow: "0 6px 20px -6px rgba(249,115,22,0.5)",
            }}
          >
            <Plus className="w-4 h-4" />
            Yeni Ürün Ekle
          </Link>
        </div>

        {/* Category stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {db.categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/admin/urunler?cat=${cat.slug}`}
              className="group rounded-xl border border-white/[0.07] p-4 hover:border-orange-500/25 transition-all"
              style={{ background: "#111" }}
            >
              <div className="text-2xl font-bold text-white mb-1">{cat.count}</div>
              <div className="text-[11px] text-gray-500 group-hover:text-gray-300 transition-colors leading-tight">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>

        {/* Table */}
        <ProductsTable products={products} categories={db.categories} />
      </div>
    </AdminShell>
  );
}
