// Site-wide configuration. Change WhatsApp number here.
export const SITE = {
  brand: "Fikret Tekstil",
  tagline: "Türkiye'nin Lider Pijama Takımı Üreticisi",
  description:
    "Fikret Tekstil — 1976'dan beri Bursa'dan dünyaya kaliteli pijama takımı üretimi. Toptan ve perakende.",
  email: "info@fikrettekstil.com",
  phone: "0532 178 35 61",
  // tel: link format (international, no spaces).
  phoneHref: "tel:+905321783561",
  address: "Bursa, Türkiye",
  // WhatsApp number for cart checkout (international format, digits only).
  whatsappNumber: "905321783561",
  // Official WhatsApp channel (announcements, new collections, campaigns).
  whatsappChannel: "https://whatsapp.com/channel/0029Vb78SO54yltQcX3J541G",
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    twitter: "https://twitter.com/",
    youtube: "https://youtube.com/",
  },
} as const;

export const CATEGORIES = [
  { slug: "bayan-pijama", name: "Bayan Pijama" },
  { slug: "erkek-pijama", name: "Erkek Pijama" },
  { slug: "cocuk", name: "Çocuk" },
  { slug: "pijama-takimi", name: "Pijama Takımı" },
  { slug: "hamile-lohusa", name: "Hamile Lohusa" },
  { slug: "buyuk-beden", name: "Büyük Beden" },
] as const;
