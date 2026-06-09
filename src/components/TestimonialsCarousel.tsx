"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Testimonial = {
  quote: string;
  author: string;
};

export function TestimonialsCarousel() {
  const items = useMemo<Testimonial[]>(
    () => [
      {
        quote:
          "Me senti acolhido(a) desde a primeira sessão. Hoje tenho mais clareza e ferramentas para lidar com a ansiedade.",
        author: "Paciente"
      },
      {
        quote:
          "O atendimento foi objetivo e humano ao mesmo tempo. Percebi evolução real nas minhas relações e na autoestima.",
        author: "Paciente"
      },
      {
        quote:
          "A terapia trouxe mais equilíbrio emocional e organização mental. Recomendo para quem quer mudanças consistentes.",
        author: "Paciente"
      }
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const current = items[index];

  return (
    <div className="relative overflow-hidden rounded-xl2 bg-white shadow-soft">
      <div className="p-7 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: [0.21, 0.61, 0.35, 1] }}
          >
            <blockquote className="text-pretty text-base leading-relaxed text-ink-800 sm:text-lg">
              “{current.quote}”
            </blockquote>
            <figcaption className="mt-4 text-sm font-medium text-ink-600">
              {current.author}
            </figcaption>
          </motion.figure>
        </AnimatePresence>

        <div className="mt-7 flex items-center justify-between">
          <div className="flex gap-1.5">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Ir para depoimento ${i + 1}`}
                onClick={() => setIndex(i)}
                className={[
                  "h-2.5 w-2.5 rounded-full transition",
                  i === index ? "bg-brand-green" : "bg-ink-200 hover:bg-ink-300"
                ].join(" ")}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
              className="rounded-full border border-brand-gray/70 bg-white px-4 py-2 text-sm text-ink-700 transition hover:bg-brand-beige/45 focus:outline-none focus-visible:shadow-ring"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => setIndex((i) => (i + 1) % items.length)}
              className="rounded-full border border-brand-gray/70 bg-white px-4 py-2 text-sm text-ink-700 transition hover:bg-brand-beige/45 focus:outline-none focus-visible:shadow-ring"
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
