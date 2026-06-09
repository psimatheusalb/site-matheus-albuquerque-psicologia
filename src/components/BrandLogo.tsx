"use client";

import { useState } from "react";

export function BrandLogo({
  alt = "Logo",
  className,
  variant = "horizontal"
}: {
  alt?: string;
  className?: string;
  variant?: "horizontal" | "stacked" | "mark";
}) {
  const [visible, setVisible] = useState(true);
  const src =
    variant === "mark"
      ? "/brand/logo-mark.png"
      : variant === "stacked"
        ? "/brand/logo-stacked.png"
        : "/brand/logo-horizontal.png";

  if (!visible) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setVisible(false)}
      loading="eager"
      decoding="async"
    />
  );
}
