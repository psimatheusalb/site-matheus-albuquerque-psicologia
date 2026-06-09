"use client";

import { useEffect, useMemo, useState } from "react";

type AdminMe = { authenticated: boolean; email: string | null };
type PhotosState = { hero: string | null; photo1: string | null; photo2: string | null; photo3: string | null };
type RatingsState = { entries: Array<{ id: string }> };

export function AdminAccess() {
  const [open, setOpen] = useState(false);
  const [me, setMe] = useState<AdminMe>({ authenticated: false, email: null });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<PhotosState>({ hero: null, photo1: null, photo2: null, photo3: null });
  const [ratingsCount, setRatingsCount] = useState<number | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);

  const authenticated = me.authenticated;

  const close = () => {
    setOpen(false);
    setError(null);
    setPassword("");
  };

  const refresh = async () => {
    const [meRes, photosRes, ratingsRes] = await Promise.all([
      fetch("/api/admin/me", { cache: "no-store" }),
      fetch("/api/photos", { cache: "no-store" }),
      fetch("/api/ratings", { cache: "no-store" })
    ]);

    const meData = (await meRes.json()) as AdminMe;
    setMe(meData);

    const photosData = (await photosRes.json()) as PhotosState;
    setPhotos({
      hero: photosData.hero ?? null,
      photo1: photosData.photo1 ?? null,
      photo2: photosData.photo2 ?? null,
      photo3: photosData.photo3 ?? null
    });

    const ratingsData = (await ratingsRes.json()) as RatingsState;
    setRatingsCount(Array.isArray(ratingsData.entries) ? ratingsData.entries.length : 0);
  };

  useEffect(() => {
    if (!open) return;
    refresh().catch(() => null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const title = useMemo(() => (authenticated ? "Painel do profissional" : "Área do profissional"), [authenticated]);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim(), password })
    });

    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
    if (!res.ok || !data?.ok) {
      setError(data?.error ?? "Falha no login");
      return;
    }
    await refresh().catch(() => null);
    setPassword("");
    window.dispatchEvent(new Event("admin-auth-changed"));
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    setMe({ authenticated: false, email: null });
    setPhotos({ hero: null, photo1: null, photo2: null, photo3: null });
    setRatingsCount(null);
    window.dispatchEvent(new Event("admin-auth-changed"));
  };

  const upload = async (slot: "hero" | "photo-1" | "photo-2" | "photo-3", file: File) => {
    setUploading(slot);
    setError(null);
    try {
      const form = new FormData();
      form.set("slot", slot);
      form.set("file", file);
      const res = await fetch("/api/photos", { method: "POST", body: form });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        setError(data?.error ?? "Falha ao enviar foto");
        return;
      }
      await refresh().catch(() => null);
      window.location.reload();
    } finally {
      setUploading(null);
    }
  };

  const resetPhoto = async (slot: "hero" | "photo-1" | "photo-2" | "photo-3") => {
    setUploading(slot);
    setError(null);
    try {
      const res = await fetch(`/api/photos?slot=${encodeURIComponent(slot)}`, { method: "DELETE" });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        setError(data?.error ?? "Falha ao remover foto");
        return;
      }
      await refresh().catch(() => null);
      window.location.reload();
    } finally {
      setUploading(null);
    }
  };

  const PhotoRow = ({
    label,
    slot,
    value
  }: {
    label: string;
    slot: "hero" | "photo-1" | "photo-2" | "photo-3";
    value: string | null;
  }) => {
    return (
      <div className="rounded-xl bg-white/70 p-4 ring-1 ring-ink-100">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">{label}</p>
            <p className="mt-2 break-all text-xs text-ink-700">{value ?? "Padrão do site"}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="inline-flex cursor-pointer items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink-700 ring-1 ring-ink-100 transition hover:bg-brand-beige/40 focus-within:shadow-ring">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  upload(slot, f);
                  e.currentTarget.value = "";
                }}
                disabled={uploading !== null}
              />
              Trocar
            </label>
            <button
              type="button"
              onClick={() => resetPhoto(slot)}
              disabled={uploading !== null}
              className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink-700 ring-1 ring-ink-100 transition hover:bg-brand-beige/40 focus:outline-none focus-visible:shadow-ring disabled:opacity-60"
            >
              Voltar padrão
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink-700 ring-1 ring-ink-100 transition hover:bg-brand-beige/40 focus:outline-none focus-visible:shadow-ring"
      >
        Profissional
      </button>

      {open ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button
            type="button"
            onClick={close}
            className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
            aria-label="Fechar"
          />
          <div className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-ink-100 bg-white p-7 shadow-soft sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-ink-900">{title}</p>
                <p className="mt-2 text-sm text-ink-700">
                  {authenticated ? "Gerencie fotos e avaliações do site." : "Entre com suas credenciais para acessar."}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink-700 ring-1 ring-ink-100 transition hover:bg-brand-beige/40 focus:outline-none focus-visible:shadow-ring"
              >
                Fechar
              </button>
            </div>

            {!authenticated ? (
              <form onSubmit={handleLogin} className="mt-6 grid gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Email</p>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-900 shadow-soft focus:outline-none focus-visible:shadow-ring"
                    placeholder="seuemail@dominio.com"
                    autoComplete="username"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Senha</p>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-900 shadow-soft focus:outline-none focus-visible:shadow-ring"
                    placeholder="Sua senha"
                    autoComplete="current-password"
                  />
                </div>
                {error ? <p className="text-xs font-medium text-brand-brown">{error}</p> : null}
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-brand-green focus:outline-none focus-visible:shadow-ring"
                  >
                    Entrar
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-7 grid gap-6">
                <div className="rounded-xl2 border border-ink-100 bg-white p-6 shadow-soft">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Sessão</p>
                      <p className="mt-2 text-sm font-semibold text-ink-900">{me.email}</p>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="rounded-full bg-white px-5 py-3 text-sm font-medium text-ink-700 ring-1 ring-ink-100 transition hover:bg-brand-beige/40 focus:outline-none focus-visible:shadow-ring"
                    >
                      Sair
                    </button>
                  </div>
                </div>

                <div className="rounded-xl2 border border-ink-100 bg-white p-6 shadow-soft">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Fotos do site</p>
                  <div className="mt-4 grid gap-3">
                    <PhotoRow label="Hero (topo)" slot="hero" value={photos.hero} />
                    <PhotoRow label="Foto 1" slot="photo-1" value={photos.photo1} />
                    <PhotoRow label="Foto 2" slot="photo-2" value={photos.photo2} />
                    <PhotoRow label="Foto 3 (principal)" slot="photo-3" value={photos.photo3} />
                  </div>
                  {uploading ? <p className="mt-4 text-xs text-ink-600">Enviando: {uploading}</p> : null}
                </div>

                <div className="rounded-xl2 border border-ink-100 bg-white p-6 shadow-soft">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">Admin</p>
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-ink-700">
                      Total de avaliações:{" "}
                      <span className="font-semibold text-ink-900">{ratingsCount ?? "—"}</span>
                    </p>
                    <a
                      href="#avaliacoes"
                      onClick={close}
                      className="rounded-full bg-white px-5 py-3 text-sm font-medium text-ink-700 ring-1 ring-ink-100 transition hover:bg-brand-beige/40 focus:outline-none focus-visible:shadow-ring"
                    >
                      Ir para avaliações
                    </a>
                  </div>
                  {error ? <p className="mt-4 text-xs font-medium text-brand-brown">{error}</p> : null}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
