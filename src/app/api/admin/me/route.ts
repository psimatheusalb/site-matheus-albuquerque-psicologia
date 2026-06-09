"use server";

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME } from "@/lib/adminAuth";
import { verifyAdminSession } from "@/lib/adminSession";

export async function GET() {
  const token = (await cookies()).get(ADMIN_COOKIE_NAME)?.value ?? null;
  const payload = verifyAdminSession(token);
  return NextResponse.json({
    authenticated: Boolean(payload),
    email: payload?.email ?? null
  });
}

