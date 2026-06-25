import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { SplashIntro } from "@/components/SplashIntro";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: `${SITE.brand} – ${SITE.tagline}`,
  description: SITE.description,
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SplashIntro />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
