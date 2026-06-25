import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "src", "data", "products.json");

export interface ProductRecord {
  slug: string;
  title: string;
  image: string;
  category: string;
  categoryName: string;
  // Optional editable fields
  description?: string;
  sizes?: string[];
  tags?: string[];
  features?: string[];
  care?: string[];
  shipping?: string;
}

export interface ProductsDB {
  categories: { slug: string; name: string; count: number }[];
  productsBySlug: Record<string, ProductRecord>;
}

export function readProductsDB(): ProductsDB {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8")) as ProductsDB;
}

export function writeProductsDB(data: ProductsDB): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), "utf-8");
}

export function recountCategories(db: ProductsDB): void {
  for (const cat of db.categories) {
    cat.count = Object.values(db.productsBySlug).filter(
      (p) => p.category === cat.slug,
    ).length;
  }
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
