"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type RatingEntry = {
  id: string;
  stars: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createdAt: number;
};

const PAGE_SIZE = 4;

async function loadEntries(): Promise<RatingEntry[]> {
  const res = await fetch("/api/ratings", { cache: "no-store" });
  const data = (await res.json().catch(() => null)) as { entries?: RatingEntry[] } | null;
  if (!res.ok || !data?.entries || !Array.isArray(data.entries)) return [];
  return data.entries;
}

function Star({
  filled,
  className
}: {
  filled: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 2l3.09 6.77L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-0.5L12 2z" />
    </svg>
  );
}

export function Ratings() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [entries, setEntries] = useState<RatingEntry[]>([]);
  const [stars, setStars] = useState<1 | 2 | 3 | 4 | 5>(5);
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [visibleTabs, setVisibleTabs] = useState(3);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    loadEntries()
      .then(setEntries)
      .catch(() => setEntries([]));
  }, []);

  useEffect(() => {
    const refreshAdmin = () => {
      fetch("/api/admin/me", { cache: "no-store" })
        .then((r) => r.json())
        .then((d: { authenticated?: boolean }) => setAdmin(Boolean(d?.authenticated)))
        .catch(() => setAdmin(false));
    };

    refreshAdmin();
    window.addEventListener("admin-auth-changed", refreshAdmin);
    return () => window.removeEventListener("admin-auth-changed", refreshAdmin);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry && !entry.isIntersecting) {
          setPage(1);
          setVisibleTabs(3);
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const average = useMemo(() => {
    if (!entries.length) return null;
    const sum = entries.reduce((acc, e) => acc + e.stars, 0);
    return Math.round((sum / entries.length) * 10) / 10;
  }, [entries]);

  const totalPages = useMemo(() => {
    const pages = Math.ceil(entries.length / PAGE_SIZE);
    return pages || 1;
  }, [entries.length]);

  useEffect(() => {
    if (page <= 3) setVisibleTabs(Math.min(3, totalPages));
    setVisibleTabs((current) => {
      const base = Math.max(current, Math.min(3, totalPages));
      const ensured = Math.max(base, page);
      return Math.min(ensured, totalPages);
    });
  }, [page, totalPages]);

  const pagedEntries = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return entries.slice(start, start + PAGE_SIZE);
  }, [entries, page]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const trimmed = comment.trim();
    if (trimmed.length < 3) {
      setError("Escreva um comentário (mínimo de 3 caracteres).");
      return;
    }

    fetch("/api/ratings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stars, comment: trimmed })
    })
      .then(async (res) => {
        const data = (await res.json().catch(() => null)) as
          | { ok?: boolean; error?: string; entry?: RatingEntry }
          | null;
        if (!res.ok || !data?.ok || !data.entry) {
          throw new Error(data?.error ?? "Falha ao enviar avaliação");
        }
        return data.entry;
      })
      .then((entry) => {
        setEntries((current) => [entry, ...current].slice(0, 200));
        setComment("");
        setStars(5);
        setPage(1);
      })
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : "Falha ao enviar avaliação");
      });
  };

  const handleDelete = (id: string) => {
    if (!admin) return;
    fetch(`/api/ratings/${encodeURIComponent(id)}`, { method: "DELETE" })
      .then(async (res) => {
        const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
        if (!res.ok || !data?.ok) throw new Error("Falha ao apagar");
      })
      .then(() => setEntries((current) => current.filter((e) => e.id !== id)))
      .catch(() => null);
  };

  return (
    <div
      ref={rootRef}
      className="rounded-[2rem] border border-ink-100 bg-white p-7 shadow-soft sm:p-10"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-ink-900">Avaliações</p>
          <p className="mt-2 text-sm text-ink-700">
            {average === null ? (
              "Seja a primeira pessoa a avaliar."
            ) : (
              <>
                Nota média <span className="font-semibold text-ink-900">{average}</span>{" "}
                ({entries.length} {entries.length === 1 ? "avaliação" : "avaliações"})
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-1 text-brand-brown">
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              filled={average !== null ? n <= Math.round(average) : n <= 5}
              className="h-5 w-5"
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
            Sua nota
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex items-center gap-1 text-brand-brown">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setStars(n as 1 | 2 | 3 | 4 | 5)}
                  className="rounded-md p-1 focus:outline-none focus-visible:shadow-ring"
                  aria-label={`${n} estrela${n === 1 ? "" : "s"}`}
                >
                  <Star filled={n <= stars} className="h-6 w-6" />
                </button>
              ))}
            </div>
            <p className="text-sm text-ink-700">{stars} / 5</p>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
            Comentário
          </p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="mt-2 w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-900 shadow-soft focus:outline-none focus-visible:shadow-ring"
            placeholder="Como foi sua experiência?"
          />
          {error ? <p className="mt-2 text-xs font-medium text-brand-brown">{error}</p> : null}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-ink-600">
            Avaliações ficam públicas no site.
          </p>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-brand-green focus:outline-none focus-visible:shadow-ring"
          >
            Enviar avaliação
          </button>
        </div>
      </form>

      {entries.length ? (
        <div className="mt-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
              Avaliações
            </p>
            {entries.length > PAGE_SIZE ? (
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: Math.min(visibleTabs, totalPages) }).map((_, idx) => {
                  const n = idx + 1;
                  const active = n === page;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setPage(n)}
                      className={[
                        "rounded-full px-3 py-1 text-xs font-semibold ring-1 transition focus:outline-none focus-visible:shadow-ring",
                        active
                          ? "bg-brand-green text-white ring-brand-green"
                          : "bg-white text-ink-700 ring-ink-100 hover:bg-brand-beige/40"
                      ].join(" ")}
                    >
                      {n}/{totalPages}
                    </button>
                  );
                })}
                {visibleTabs < totalPages ? (
                  <button
                    type="button"
                    onClick={() =>
                      setVisibleTabs((n) => Math.min(n + 5, totalPages))
                    }
                    className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink-700 ring-1 ring-ink-100 transition hover:bg-brand-beige/40 focus:outline-none focus-visible:shadow-ring"
                    aria-label="Mostrar mais páginas"
                  >
                    ...
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="mt-4 grid gap-3">
            {pagedEntries.map((e) => (
              <div
                key={e.id}
                className="rounded-xl bg-white/70 p-4 ring-1 ring-ink-100"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1 text-brand-brown">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} filled={n <= e.stars} className="h-4 w-4" />
                    ))}
                  </div>
                  <p className="text-xs text-ink-500">
                    {new Date(e.createdAt).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-700">{e.comment}</p>
                {admin ? (
                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleDelete(e.id)}
                      className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink-700 ring-1 ring-ink-100 transition hover:bg-brand-beige/40 focus:outline-none focus-visible:shadow-ring"
                    >
                      Apagar
                    </button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
