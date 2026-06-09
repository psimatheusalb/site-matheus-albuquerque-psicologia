import { cookies } from "next/headers";
import { verifyAdminSession } from "@/lib/adminSession";

export const ADMIN_COOKIE_NAME = "admin_session";

export async function isAdminRequest() {
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value ?? null;
  return Boolean(verifyAdminSession(token));
}

export async function requireAdmin() {
  const ok = await isAdminRequest();
  if (!ok) {
    throw new Error("Unauthorized");
  }
}
