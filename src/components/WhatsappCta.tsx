"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { WhatsAppLeadModal } from "@/components/WhatsAppLeadModal";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { site } from "@/lib/site";

export function WhatsappCta({
  label = "Agendar Consulta pelo WhatsApp",
  size = "md"
}: {
  label?: string;
  size?: "md" | "lg";
}) {
  const classes =
    size === "lg"
      ? "px-7 py-4 text-base sm:text-lg"
      : "px-6 py-3.5 text-sm sm:text-base";

  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={[
            "inline-flex items-center justify-center gap-2 rounded-full bg-brand-green text-white shadow-soft ring-0 transition focus:outline-none focus-visible:shadow-ring",
            "hover:bg-brand-green active:bg-brand-green",
            classes
          ].join(" ")}
        >
          <span className="font-medium">{label}</span>
          <span aria-hidden className="text-white/90">
            →
          </span>
        </button>
      </motion.div>
      <WhatsAppLeadModal
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={({ name, reason }) => {
          const message = `Olá! Meu nome é ${name}. Motivo da procura: ${reason}. Vim pelo seu site e gostaria de agendar uma consulta.`;
          const href = buildWhatsAppLink(site.whatsappNumberE164, message);
          window.open(href, "_blank", "noopener,noreferrer");
        }}
      />
    </>
  );
}
