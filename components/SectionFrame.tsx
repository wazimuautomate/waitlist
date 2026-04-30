"use client";

import { motion } from "framer-motion";

type SectionFrameProps = {
  question: string;
  description: string;
  children: React.ReactNode;
};

export function SectionFrame({
  question,
  description,
  children,
}: SectionFrameProps) {
  return (
    <motion.section
      className="section-shell"
      initial={{ opacity: 0, y: 26, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.985 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="glass-panel section-inner">
        <p className="micro-label">Waitlist question</p>
        <h2 className="section-title">{question}</h2>
        <p className="section-copy">{description}</p>
        {children}
      </div>
    </motion.section>
  );
}
