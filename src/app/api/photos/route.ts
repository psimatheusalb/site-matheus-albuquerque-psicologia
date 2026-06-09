"use server";

import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { put } from "@vercel/blob";
import { requireAdmin } from "@/lib/adminAuth";

type PhotoSlot = "hero" | "photo-1" | "photo-2" | "photo-3";

const KV_KEY = "site:photos";

function isSlot(value: unknown): value is PhotoSlot {
  return value === "hero" || value === "photo-1" || value === "photo-2" || value === "photo-3";
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

  const form = await request.formData();
  const slot = form.get("slot");
  const file = form.get("file");

  if (!isSlot(slot) || !(file instanceof File)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const ext =
    file.type === "image/png"
      ? "png"
      : file.type === "image/webp"
        ? "webp"
        : "jpg";

  const pathname = `photos/${slot}-${Date.now()}.${ext}`;
  try {
    const blob = await put(pathname, file, { access: "public" });

    const field =
      slot === "hero"
        ? "hero"
        : slot === "photo-1"
          ? "photo1"
          : slot === "photo-2"
            ? "photo2"
            : "photo3";

    await kv.hset(KV_KEY, { [field]: blob.url });
    return NextResponse.json({ ok: true, url: blob.url, field });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Storage não configurado" },
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

  const field =
    slot === "hero"
      ? "hero"
      : slot === "photo-1"
        ? "photo1"
        : slot === "photo-2"
          ? "photo2"
          : "photo3";

  try {
    await kv.hdel(KV_KEY, field);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
