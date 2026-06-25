import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  readProductsDB,
  writeProductsDB,
  recountCategories,
  generateSlug,
} from "@/lib/products-db";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const db = readProductsDB();
  return Response.json(db);
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { title, image, category, categoryName, description, sizes, tags, features, care, shipping } = body;

  if (!title || !category || !categoryName) {
    return Response.json({ error: "Eksik alan" }, { status: 400 });
  }

  const slug = generateSlug(title);
  const db = readProductsDB();

  if (db.productsBySlug[slug]) {
    return Response.json(
      { error: "Bu başlıkla zaten bir ürün mevcut" },
      { status: 409 },
    );
  }

  const product = {
    slug,
    title,
    image: image || "/images/products/foot.png",
    category,
    categoryName,
    ...(description && { description }),
    ...(sizes?.length && { sizes }),
    ...(tags?.length && { tags }),
    ...(features?.length && { features }),
    ...(care?.length && { care }),
    ...(shipping && { shipping }),
  };

  db.productsBySlug[slug] = product;
  recountCategories(db);
  writeProductsDB(db);

  return Response.json({ ok: true, product }, { status: 201 });
}
