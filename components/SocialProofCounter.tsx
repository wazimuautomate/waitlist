"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";

const TARGET = 588;

export function SocialProofCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1300;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setCount(Math.round(TARGET * progress));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  return (
    <div className="proof-counter" aria-live="polite">
      <Users size={20} aria-hidden="true" />
      <span>{count}</span> people already in
    </div>
  );
}
