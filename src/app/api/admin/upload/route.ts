import { NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  if (!file) {
    return Response.json({ error: "Dosya bulunamadı" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `product-${Date.now()}.${ext}`;
  const dest = path.join(process.cwd(), "public", "images", "products", filename);
  await writeFile(dest, buffer);

  return Response.json({ url: `/images/products/${filename}` });
}
