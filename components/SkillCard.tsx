"use client";

import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type SkillCardProps = {
  name: string;
  description: string;
  Icon: LucideIcon;
  selected: boolean;
  onToggle: () => void;
};

export function SkillCard({
  name,
  description,
  Icon,
  selected,
  onToggle,
}: SkillCardProps) {
  return (
    <label className={`skill-card ${selected ? "selected" : ""}`}>
      <input type="checkbox" checked={selected} onChange={onToggle} />
      <span className="poll-check" aria-hidden="true">
        {selected ? <Check size={14} /> : null}
      </span>
      <span className="skill-icon">
        <Icon size={20} aria-hidden="true" />
      </span>
      <span>
        <span className="skill-name">{name}</span>
        <span className="skill-description">{description}</span>
      </span>
    </label>
  );
}
