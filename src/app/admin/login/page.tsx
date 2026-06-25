"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Package } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin/urunler");
    } else {
      const data = await res.json();
      setError(data.error ?? "Hata oluştu");
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "radial-gradient(ellipse at 60% 0%, rgba(249,115,22,0.08) 0%, transparent 60%), #080808",
      }}
    >
      {/* Subtle grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative w-full max-w-[380px]">
        {/* Card */}
        <div
          className="rounded-2xl border border-white/[0.08] p-8"
          style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(20px)" }}
        >
          {/* Icon + brand */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-orange-400" />
            </div>
            <div className="text-[10px] font-bold tracking-[.3em] uppercase text-orange-400 mb-1">
              Fikret Tekstil
            </div>
            <h1 className="text-xl font-bold text-white">Admin Girişi</h1>
            <p className="text-sm text-gray-500 mt-1 text-center">
              Ürün yönetim paneline erişmek için giriş yapın
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-[.12em] mb-2">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/[0.09] rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500/50 focus:bg-white/[0.07] transition-all text-sm"
                  placeholder="••••••••••"
                  required
                  autoFocus
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <span className="shrink-0">✕</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-semibold py-3 rounded-xl transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: loading
                  ? "rgba(249,115,22,0.5)"
                  : "linear-gradient(135deg, #fb923c 0%, #f97316 50%, #ea6c0a 100%)",
                boxShadow: loading ? "none" : "0 8px 24px -8px rgba(249,115,22,0.5)",
              }}
            >
              {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </button>
          </form>
        </div>

        <p className="text-center text-[11px] text-gray-700 mt-5">
          Varsayılan şifre: <code className="text-gray-500">admin123</code>
          &nbsp;·&nbsp; Değiştirmek için <code className="text-gray-500">ADMIN_PASSWORD</code> env kullanın
        </p>
      </div>
    </div>
  );
}
