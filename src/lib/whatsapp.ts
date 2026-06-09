export function buildWhatsAppLink(numberE164: string, message?: string) {
  const base = `https://wa.me/${numberE164.replace(/\D/g, "")}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
