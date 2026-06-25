"use client";

import { useState } from "react";
import { Mail, MapPin, MessageCircle, Phone, Clock, Send, Check } from "lucide-react";
import { SITE } from "@/lib/config";
import { buildSimpleWhatsAppUrl } from "@/lib/whatsapp";

export default function ContactPage() {
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [sent,    setSent]    = useState(false);

  const wa = `https://wa.me/${SITE.whatsappNumber}`;

  const composedUrl = buildSimpleWhatsAppUrl(
    [
      `Merhaba ${SITE.brand},`,
      "",
      name    && `Ad Soyad: ${name}`,
      email   && `E-posta: ${email}`,
      "",
      message || "Bilgi almak istiyorum.",
    ]
      .filter(Boolean)
      .join("\n"),
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    window.open(composedUrl, "_blank", "noopener");
    setTimeout(() => setSent(false), 2500);
  };

  const inputCls =
    "mt-1.5 w-full px-3.5 rounded-xl border border-border bg-surface-3 text-foreground text-sm placeholder-muted-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/15 outline-none transition";

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-background border-b border-border">
        <div
          className="absolute -top-40 -left-32 w-[600px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(255,94,0,.15) 0%, transparent 65%)" }}
        />
        <div className="container-x py-14 md:py-20 text-center max-w-2xl mx-auto relative z-10">
          <p className="eyebrow-plain mb-3">İletişim</p>
          <h1
            className="font-display font-bold tracking-tight"
            style={{ fontSize: "clamp(2.5rem,6vw,4.5rem)" }}
          >
            Bize Ulaşın
          </h1>
          <p className="text-muted-foreground mt-3 text-base">
            Sorularınız, siparişleriniz veya toptan satış için en hızlı yol WhatsApp.
          </p>
          <a href={wa} target="_blank" rel="noopener" className="btn btn-whatsapp h-12 px-7 mt-6 inline-flex">
            <MessageCircle className="w-5 h-5" /> WhatsApp ile Yazın
          </a>
        </div>
      </section>

      {/* INFO CARDS */}
      <section className="bg-background py-14">
        <div className="container-x">
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { i: Phone,  t: "Telefon", v: SITE.phone,   href: `tel:${SITE.phone}` },
              { i: Mail,   t: "E-posta", v: SITE.email,   href: `mailto:${SITE.email}` },
              { i: MapPin, t: "Adres",   v: SITE.address, href: undefined },
            ].map(({ i: I, t, v, href }) => {
              const inner = (
                <div className="bg-surface-2 border border-border p-6 h-full hover:-translate-y-1 hover:border-primary/20 transition-all">
                  <div className="icon-circle mb-4"><I className="w-5 h-5" /></div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{t}</div>
                  <div className="font-semibold text-foreground mt-1">{v}</div>
                </div>
              );
              return href ? (
                <a key={t} href={href} className="block">{inner}</a>
              ) : (
                <div key={t}>{inner}</div>
              );
            })}
          </div>

          {/* Hours */}
          <div className="mt-4 bg-surface-2 border border-border p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="flex items-center gap-3">
              <div className="icon-circle"><Clock className="w-5 h-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Çalışma Saatleri</div>
                <div className="font-semibold text-foreground">Hafta içi 09:00 – 18:00</div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground sm:ml-auto">
              Cumartesi 10:00 – 16:00 &nbsp;·&nbsp; Pazar kapalı
            </div>
          </div>

          {/* FORM + MAP */}
          <div className="mt-8 grid lg:grid-cols-2 gap-6">
            <form onSubmit={onSubmit} className="bg-surface-2 border border-border p-7 rounded-2xl">
              <h2 className="font-display text-2xl text-foreground mb-1.5">Bize Yazın</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Form gönderildiğinde mesajınız WhatsApp&apos;ta açılır; tek tıkla bize iletilir.
              </p>

              <label className="block mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Ad Soyad</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Adınız"
                  className={`${inputCls} h-11`}
                />
              </label>

              <label className="block mb-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">E-posta</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@eposta.com"
                  className={`${inputCls} h-11`}
                />
              </label>

              <label className="block mb-5">
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Mesaj</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="Sorunuzu yazın..."
                  className={`${inputCls} py-2.5 resize-none`}
                />
              </label>

              <button type="submit" className="btn btn-whatsapp w-full h-12">
                {sent ? (
                  <><Check className="w-4 h-4" /> WhatsApp&apos;ta açılıyor</>
                ) : (
                  <><Send className="w-4 h-4" /> WhatsApp ile Gönder</>
                )}
              </button>
            </form>

            <div className="rounded-2xl overflow-hidden border border-border bg-surface-2 min-h-[420px] relative">
              <iframe
                title="Harita"
                src="https://www.google.com/maps?q=Istanbul%2C%20Turkey&output=embed"
                className="absolute inset-0 w-full h-full opacity-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
