import data from "@/data/products.json";
import { CATEGORIES } from "./config";

export type Product = {
  slug: string;
  title: string;
  image: string;
  category: string;
  categoryName: string;
  // Optional enriched fields (editable via admin)
  description?: string;
  sizes?: string[];
  tags?: string[];
  features?: string[];
  care?: string[];
  shipping?: string;
};

const raw = data as {
  productsBySlug: Record<string, Product>;
};

export const allProducts: Product[] = Object.values(raw.productsBySlug);

export function getProduct(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getProductsByCategory(catSlug: string): Product[] {
  return allProducts.filter((p) => p.category === catSlug);
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}
