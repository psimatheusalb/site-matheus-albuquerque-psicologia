"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { WhatsAppLeadModal } from "@/components/WhatsAppLeadModal";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { site } from "@/lib/site";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.11 17.13c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.6-1.5-1.87-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.48-.84-2.03-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.27 0 1.34.98 2.63 1.11 2.81.14.18 1.93 2.95 4.67 4.13.65.28 1.15.45 1.54.58.65.21 1.25.18 1.72.11.52-.08 1.6-.65 1.82-1.27.22-.62.22-1.15.16-1.27-.07-.11-.25-.18-.52-.32z" />
      <path d="M26.67 15.31c0 5.9-4.79 10.69-10.69 10.69-1.88 0-3.72-.5-5.34-1.44L5.33 26.67l2.2-5.15c-1.06-1.69-1.62-3.64-1.62-5.66C5.91 9.96 10.7 5.17 16.6 5.17c5.9 0 10.07 4.6 10.07 10.14zm-10.07-8.34c-4.59 0-8.32 3.73-8.32 8.32 0 1.81.58 3.52 1.69 4.94l.32.41-1.3 3.04 3.13-1.24.39.23c1.39.82 2.97 1.26 4.58 1.26 4.59 0 8.32-3.73 8.32-8.32 0-4.35-3.24-8.64-8.81-8.64z" />
    </svg>
  );
}

export function FloatingWhatsapp() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.21, 0.61, 0.35, 1] }}
        className="fixed bottom-5 right-5 z-50"
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Falar no WhatsApp"
          className="group inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-green text-white shadow-soft transition hover:bg-brand-green focus:outline-none focus-visible:shadow-ring"
        >
          <WhatsAppIcon className="h-7 w-7 transition group-hover:scale-105" />
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
