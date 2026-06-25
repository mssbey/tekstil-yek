"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Package, Plus, ExternalLink, LogOut, LayoutGrid } from "lucide-react";

const NAV = [
  { href: "/admin/urunler", icon: LayoutGrid, label: "Tüm Ürünler", exact: false },
  { href: "/admin/urunler/yeni", icon: Plus, label: "Yeni Ürün", exact: true },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  }

  function isActive(href: string, exact: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href) && pathname !== "/admin/urunler/yeni";
  }

  return (
    <div className="flex min-h-screen bg-[#080808] text-white">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 fixed inset-y-0 left-0 flex flex-col border-r border-white/[0.06] z-40"
        style={{ background: "linear-gradient(180deg, #0f0f0f 0%, #0a0a0a 100%)" }}
      >
        {/* Logo */}
        <div className="px-5 pt-6 pb-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-7 h-7 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
              <Package className="w-3.5 h-3.5 text-orange-400" />
            </div>
            <span className="text-[11px] font-bold tracking-[.2em] uppercase text-orange-400">
              Fikret Tekstil
            </span>
          </div>
          <p className="text-[10px] text-gray-600 pl-9">Admin Paneli</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-1">
          <p className="text-[9px] font-bold tracking-[.2em] uppercase text-gray-700 px-3 mb-3">
            Katalog
          </p>
          {NAV.map(({ href, icon: Icon, label, exact }) => {
            const active = isActive(href, exact);
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                  active
                    ? "bg-orange-500/12 text-orange-300 border border-orange-500/18"
                    : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.04]"
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 transition-colors ${active ? "text-orange-400" : "text-gray-600 group-hover:text-gray-400"}`} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 py-4 border-t border-white/[0.06] space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-gray-300 hover:bg-white/[0.04] transition-all group"
          >
            <ExternalLink className="w-4 h-4 shrink-0 group-hover:text-gray-400 transition-colors" />
            Siteyi Görüntüle
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:text-red-400 hover:bg-red-500/[0.05] transition-all group"
          >
            <LogOut className="w-4 h-4 shrink-0 group-hover:text-red-400 transition-colors" />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-56 min-h-screen">
        {children}
      </main>
    </div>
  );
}
