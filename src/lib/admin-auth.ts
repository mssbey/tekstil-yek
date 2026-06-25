import { cookies } from "next/headers";

export const SESSION_COOKIE = "admin_session";
const SESSION_VALUE = "authenticated";

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value === SESSION_VALUE;
}

export { SESSION_VALUE };
