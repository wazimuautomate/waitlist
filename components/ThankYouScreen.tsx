"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const whatsappLink =
  process.env.NEXT_PUBLIC_WA_GROUP_LINK ?? "https://chat.whatsapp.com/LsvaFnO63xeJ2FU8Z7za74";

export function ThankYouScreen() {
  return (
    <motion.section
      className="section-shell"
      initial={{ opacity: 0, y: 26, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="glass-panel hero-inner">
        <p className="micro-label">Complete</p>
        <h2 className="thank-title">You&apos;re in.</h2>
        <p className="thank-copy">
          Join this WhatsApp group for the next steps for each service you
          joined.
        </p>
        <div className="thank-actions">
          <a
            className="primary-button"
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
          >
            Join the WhatsApp Group
            <MessageCircle size={18} aria-hidden="true" />
          </a>
        </div>
        <p className="thank-footnote">
          The VCF file will be shared in the group when it&apos;s ready.
        </p>
      </div>
    </motion.section>
  );
}
