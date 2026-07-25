"use server";

import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { requireAdmin } from "@/lib/adminAuth";

type PhotoSlot = "hero" | "photo-1" | "photo-2" | "photo-3";

const KV_KEY = "site:photos";

function isSlot(value: unknown): value is PhotoSlot {
  return value === "hero" || value === "photo-1" || value === "photo-2" || value === "photo-3";
}

function slotToField(slot: PhotoSlot): string {
  return slot === "hero"
    ? "hero"
    : slot === "photo-1"
      ? "photo1"
      : slot === "photo-2"
        ? "photo2"
        : "photo3";
}

export async function GET() {
  try {
    const data = (await kv.hgetall<Record<string, string>>(KV_KEY)) ?? {};
    return NextResponse.json({
      hero: data.hero ?? null,
      photo1: data.photo1 ?? null,
      photo2: data.photo2 ?? null,
      photo3: data.photo3 ?? null
    });
  } catch {
    return NextResponse.json({ hero: null, photo1: null, photo2: null, photo3: null });
  }
}

export async function POST(request: Request) {
  await requireAdmin();

  const body = (await request.json().catch(() => null)) as
    | { slot?: string; url?: string }
    | null;

  const slot = body?.slot;
  const url = body?.url;

  if (!isSlot(slot) || typeof url !== "string" || url.trim().length === 0) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const field = slotToField(slot);

  try {
    await kv.hset(KV_KEY, { [field]: url.trim() });
    return NextResponse.json({ ok: true, url: url.trim(), field });
  } catch {
    return NextResponse.json(
      { ok: false, error: "KV não configurado" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  await requireAdmin();

  const url = new URL(request.url);
  const slot = url.searchParams.get("slot");
  if (!isSlot(slot)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const field = slotToField(slot);

  try {
    await kv.hdel(KV_KEY, field);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
