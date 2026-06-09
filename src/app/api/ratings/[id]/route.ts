"use server";

import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { requireAdmin } from "@/lib/adminAuth";

const KV_KEY = "site:ratings";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  await requireAdmin();
  const { id } = await params;
  if (!id) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  try {
    await kv.hdel(KV_KEY, id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
