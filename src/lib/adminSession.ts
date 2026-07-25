import crypto from "crypto";

const SESSION_SECRET = "8f3d2a1b9c7e5f4a6d8b0c2e1f3a5b7d9c2e4f6a8b0d1c3e5f7a9b2d4c6e8f0a";

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
  const payload: SessionPayload = {
    email,
    exp: Date.now() + ttlSeconds * 1000
  };

  const body = base64url(JSON.stringify(payload));
  const signature = sign(body, SESSION_SECRET);
  return `${body}.${signature}`;
}

export function verifyAdminSession(token?: string | null) {
  if (!SESSION_SECRET || !token) return null;

  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = sign(body, SESSION_SECRET);
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
