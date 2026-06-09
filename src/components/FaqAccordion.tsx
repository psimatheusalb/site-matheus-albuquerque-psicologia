"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Item = {
  q: string;
  a: string;
};

export function FaqAccordion() {
  const items = useMemo<Item[]>(
    () => [
      {
        q: "Como funciona a terapia online?",
        a: "As sessões acontecem por videochamada, com sigilo e a mesma estrutura do atendimento presencial. Você só precisa de um ambiente reservado e conexão estável."
      },
      {
        q: "Qual a duração da sessão?",
        a: "Em geral, a sessão dura cerca de 50 minutos. A frequência (semanal/quinzenal) é combinada conforme seu objetivo terapêutico."
      },
      {
        q: "Atende convênio?",
        a: "Caso você utilize convênio, podemos conversar sobre emissão de recibo para reembolso, quando aplicável. Confirme as regras diretamente com seu plano."
      },
      {
        q: "Como agendar?",
        a: "Clique em qualquer botão de WhatsApp no site. Você será direcionado(a) para uma conversa para escolher o melhor horário."
      }
    ],
    []
  );

  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, idx) => {
        const isOpen = open === idx;
        return (
          <div
            key={item.q}
            className="rounded-xl2 border border-ink-100 bg-white shadow-soft"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-semibold text-ink-900 sm:text-base">
                {item.q}
              </span>
              <span className="text-ink-500">{isOpen ? "—" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.21, 0.61, 0.35, 1] }}
                >
                  <div className="px-6 pb-6 text-sm leading-relaxed text-ink-700 sm:text-base">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
