import { NextRequest } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  readProductsDB,
  writeProductsDB,
  recountCategories,
} from "@/lib/products-db";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const db = readProductsDB();
  if (!db.productsBySlug[slug]) {
    return Response.json({ error: "Ürün bulunamadı" }, { status: 404 });
  }
  const body = await request.json();
  const existing = db.productsBySlug[slug];

  db.productsBySlug[slug] = {
    slug,
    title: body.title ?? existing.title,
    image: body.image ?? existing.image,
    category: body.category ?? existing.category,
    categoryName: body.categoryName ?? existing.categoryName,
    description: body.description ?? existing.description,
    sizes: body.sizes ?? existing.sizes,
    tags: body.tags ?? existing.tags,
    features: body.features ?? existing.features,
    care: body.care ?? existing.care,
    shipping: body.shipping ?? existing.shipping,
  };

  recountCategories(db);
  writeProductsDB(db);
  return Response.json({ ok: true });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { slug } = await params;
  const db = readProductsDB();
  if (!db.productsBySlug[slug]) {
    return Response.json({ error: "Ürün bulunamadı" }, { status: 404 });
  }
  delete db.productsBySlug[slug];
  recountCategories(db);
  writeProductsDB(db);
  return Response.json({ ok: true });
}
