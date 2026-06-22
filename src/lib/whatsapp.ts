import { SITE } from "./config";
import type { Product } from "./products";

export function buildProductWhatsAppUrl(
  product: Product,
  opts?: { size?: string; qty?: number; name?: string; note?: string },
) {
  const lines = [
    `*${SITE.brand} - Ürün Talebi*`,
    "",
    `Ürün: ${product.title}`,
    `Kategori: ${product.categoryName}`,
  ];
  if (opts?.size) lines.push(`Beden: ${opts.size}`);
  if (opts?.qty) lines.push(`Adet: ${opts.qty}`);
  if (opts?.name) lines.push("", `Ad Soyad: ${opts.name}`);
  if (opts?.note) lines.push(`Not: ${opts.note}`);
  lines.push("", "Fiyat ve stok bilgisi alabilir miyim?");
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function buildSimpleWhatsAppUrl(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
