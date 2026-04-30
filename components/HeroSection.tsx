"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { SocialProofCounter } from "./SocialProofCounter";

type HeroSectionProps = {
  onStart: () => void;
};

export function HeroSection({ onStart }: HeroSectionProps) {
  return (
    <motion.section
      className="section-shell hero-section"
      initial={{ opacity: 0, filter: "blur(12px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="glass-panel hero-inner"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="micro-label">Waitlist</p>
        <h1 className="hero-title">You're early.</h1>
        <h2 className="hero-subtitle">Join our waitlist</h2>
        <p className="hero-copy">
          Join the waitlist for Pesatrix, Bingwa, the shared Whatsapp contact list,
          and free beginner-friendly Skills training.
        </p>
        <SocialProofCounter />
        <div className="hero-actions">
          <button className="primary-button" type="button" onClick={onStart}>
            Join the Waitlist
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </motion.div>
      <div className="ghost-word" aria-hidden="true">
        Waitlist
      </div>
    </motion.section>
  );
}
