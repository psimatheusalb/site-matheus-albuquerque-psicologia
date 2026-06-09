type StoredPhotos = {
  hero?: string | null;
  photo1?: string | null;
  photo2?: string | null;
  photo3?: string | null;
};

const KV_KEY = "site:photos";

export async function getStoredPhotos(): Promise<StoredPhotos> {
  try {
    const { kv } = await import("@vercel/kv");
    const data = (await kv.hgetall<Record<string, string>>(KV_KEY)) ?? {};
    return {
      hero: data.hero ?? null,
      photo1: data.photo1 ?? null,
      photo2: data.photo2 ?? null,
      photo3: data.photo3 ?? null
    };
  } catch {
    return {};
  }
}
