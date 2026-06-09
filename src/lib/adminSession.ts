import crypto from "crypto";

type SessionPayload = {
  email: string;
  exp: number;
};

function base64url(input: Buffer | string) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input);
  return buf
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64urlToBuffer(input: string) {
  const pad = input.length % 4;
  const base64 = (pad ? input + "=".repeat(4 - pad) : input)
    .replace(/-/g, "+")
    .replace(/_/g, "/");
  return Buffer.from(base64, "base64");
}

function sign(data: string, secret: string) {
  return base64url(crypto.createHmac("sha256", secret).update(data).digest());
}

export function createAdminSession(email: string, ttlSeconds = 60 * 60 * 24) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) throw new Error("Missing ADMIN_SESSION_SECRET");

  const payload: SessionPayload = {
    email,
    exp: Date.now() + ttlSeconds * 1000
  };

  const body = base64url(JSON.stringify(payload));
  const signature = sign(body, secret);
  return `${body}.${signature}`;
}

export function verifyAdminSession(token?: string | null) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || !token) return null;

  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = sign(body, secret);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return null;
  if (!crypto.timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(base64urlToBuffer(body).toString("utf8")) as SessionPayload;
    if (!payload?.email || typeof payload.exp !== "number") return null;
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}
