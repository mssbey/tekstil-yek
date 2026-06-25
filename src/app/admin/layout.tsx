import type { Metadata } from "next";

export const metadata: Metadata = { title: "Admin — Fikret Tekstil" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      {children}
    </div>
  );
}
