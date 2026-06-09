"use client";

import { useMemo, useState } from "react";

export function SmartImage({
  alt,
  className,
  sources,
  loading = "lazy"
}: {
  alt: string;
  className?: string;
  sources: string[];
  loading?: "eager" | "lazy";
}) {
  const sanitized = useMemo(() => sources.filter(Boolean), [sources]);
  const [index, setIndex] = useState(0);
  const src = sanitized[index];

  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={() => setIndex((i) => i + 1)}
    />
  );
}
