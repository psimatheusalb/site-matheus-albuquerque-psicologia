"use client";

import { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 }
};

export function MotionInView({
  children,
  delay = 0
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={defaultVariants}
      transition={{ duration: 0.6, ease: [0.21, 0.61, 0.35, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
