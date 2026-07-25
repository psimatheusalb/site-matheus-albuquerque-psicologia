"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export function WhatsAppLeadModal({
  open,
  onClose,
  onSubmit
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; reason: string }) => void;
}) {
  const [name, setName] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    setError(null);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    setName("");
    setReason("");
  }, [open]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedReason = reason.trim();

    if (!trimmedName) {
      setError("Digite seu nome.");
      return;
    }

    if (!trimmedReason) {
      setError("Digite o motivo da procura.");
      return;
    }

    onSubmit({ name: trimmedName, reason: trimmedReason });
    onClose();
  };

  const modalContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto"
    >
      <motion.button
        type="button"
        onClick={onClose}
        className="fixed inset-0 bg-ink-900/50 backdrop-blur-sm"
        aria-label="Fechar"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-ink-100 bg-white p-7 shadow-soft sm:p-10 my-auto">
        <p className="text-sm font-semibold text-ink-900">
          Antes de ir para o WhatsApp
        </p>
        <p className="mt-2 text-sm text-ink-700">
          Informe seu nome e o motivo da procura.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
              Nome
            </p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-900 shadow-soft focus:outline-none focus-visible:shadow-ring"
              placeholder="Seu nome"
              autoFocus
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-500">
              Motivo
            </p>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
              className="mt-2 w-full rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-900 shadow-soft focus:outline-none focus-visible:shadow-ring"
              placeholder="Ex.: ansiedade, depressão, rotina e hábitos..."
            />
          </div>

          {error ? <p className="text-xs font-medium text-brand-brown">{error}</p> : null}

          <div className="flex flex-wrap justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-ink-700 ring-1 ring-ink-100 transition hover:bg-brand-beige/40 focus:outline-none focus-visible:shadow-ring"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-brand-green focus:outline-none focus-visible:shadow-ring"
            >
              Ir para o WhatsApp
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && modalContent}
    </AnimatePresence>,
    document.body
  );
}

