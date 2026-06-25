import { cookies } from "next/headers";
import { SESSION_COOKIE, SESSION_VALUE } from "@/lib/admin-auth";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";

export async function POST(request: Request) {
  const body = await request.json();
  if (body.password !== ADMIN_PASSWORD) {
    return Response.json({ error: "Hatalı şifre" }, { status: 401 });
  }
  const store = await cookies();
  store.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return Response.json({ ok: true });
}
