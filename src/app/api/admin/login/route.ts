"use server";

import crypto from "crypto";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/adminAuth";
import { createAdminSession } from "@/lib/adminSession";

const ADMIN_EMAIL = "psi.matheusalb@gmail.com";
const ADMIN_PASSWORD = "Ps1colog1@";

function safeEqual(a: string, b: string) {
  const aa = Buffer.from(a);
  const bb = Buffer.from(b);
  if (aa.length !== bb.length) return false;
  return crypto.timingSafeEqual(aa, bb);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { email?: string; password?: string }
    | null;

  const email = body?.email ?? "";
  const password = body?.password ?? "";

  if (!email || !password) {
    return NextResponse.json(
      { ok: false, error: "Credenciais inválidas" },
      { status: 400 }
    );
  }

  const ok = safeEqual(email, ADMIN_EMAIL) && safeEqual(password, ADMIN_PASSWORD);
  if (!ok) {
    return NextResponse.json(
      { ok: false, error: "Credenciais inválidas" },
      { status: 401 }
    );
  }

  const session = createAdminSession(email);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE_NAME, session, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24
  });
  return response;
}
