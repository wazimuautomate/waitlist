"use client";

import { motion } from "framer-motion";

type ProgressBarProps = {
  currentSection: number;
};

const labels = [
  "Start",
  "Pesatrix",
  "Bfasta",
  "Whatsapp Contact List",
  "Skills",
  "Complete",
];

export function ProgressBar({ currentSection }: ProgressBarProps) {
  const progress = (currentSection / (labels.length - 1)) * 100;

  return (
    <div className="progress-wrap" aria-label="Waitlist progress">
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      </div>
      <div className="progress-label">
        {labels[currentSection]} {currentSection + 1}/{labels.length}
      </div>
    </div>
  );
}
