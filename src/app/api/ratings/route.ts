"use server";

import { NextResponse } from "next/server";
import { kv } from "@vercel/kv";

type RatingEntry = {
  id: string;
  stars: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createdAt: number;
};

const KV_KEY = "site:ratings";

function parseEntry(value: unknown): RatingEntry | null {
  try {
    const entry = typeof value === "string" ? (JSON.parse(value) as RatingEntry) : (value as RatingEntry);
    if (!entry) return null;
    if (typeof entry.id !== "string") return null;
    if (typeof entry.comment !== "string") return null;
    if (typeof entry.createdAt !== "number") return null;
    if (![1, 2, 3, 4, 5].includes(entry.stars)) return null;
    return entry;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const data = (await kv.hgetall<Record<string, unknown>>(KV_KEY)) ?? {};
    const entries = Object.values(data)
      .map(parseEntry)
      .filter(Boolean) as RatingEntry[];

    entries.sort((a, b) => b.createdAt - a.createdAt);
    return NextResponse.json({ entries });
  } catch {
    return NextResponse.json({ entries: [] });
  }
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { stars?: number; comment?: string }
    | null;

  const stars = body?.stars;
  const comment = (body?.comment ?? "").trim();

  if (!stars || ![1, 2, 3, 4, 5].includes(stars)) {
    return NextResponse.json(
      { ok: false, error: "Nota inválida" },
      { status: 400 }
    );
  }

  if (comment.length < 3) {
    return NextResponse.json(
      { ok: false, error: "Comentário muito curto" },
      { status: 400 }
    );
  }

  const entry: RatingEntry = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    stars: stars as RatingEntry["stars"],
    comment: comment.slice(0, 500),
    createdAt: Date.now()
  };

  try {
    await kv.hset(KV_KEY, { [entry.id]: JSON.stringify(entry) });
    return NextResponse.json({ ok: true, entry });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Storage não configurado" },
      { status: 500 }
    );
  }
}
