import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { ProductForm } from "@/components/admin/ProductForm";
import { ChevronLeft } from "lucide-react";

export default async function NewProductPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  return (
    <AdminShell>
      <div className="p-8 max-w-3xl">
        {/* Back + title */}
        <div className="mb-8">
          <Link
            href="/admin/urunler"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" /> Ürün Listesi
          </Link>
          <h1 className="text-2xl font-bold text-white tracking-tight">Yeni Ürün Ekle</h1>
          <p className="text-sm text-gray-500 mt-1">
            Aşağıdaki formu doldurun, kaydettiğinizde ürün sitede anında görünür.
          </p>
        </div>

        <ProductForm mode="create" />
      </div>
    </AdminShell>
  );
}
