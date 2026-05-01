"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Film,
  Palette,
  Send,
  Share2,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { SkillDraft, SubmitState } from "@/types/form";
import { SectionFrame } from "./SectionFrame";
import { SkillCard } from "./SkillCard";

const skills = [
  {
    name: "Graphic Design",
    Icon: Palette,
    description:
      "Create logos, posters, and visuals using AI tools like Canva and Adobe Firefly",
  },
  {
    name: "Video Editing",
    Icon: Film,
    description:
      "Edit videos for social media, YouTube, and clients using CapCut and AI templates",
  },
  {
    name: "Social Media Management",
    Icon: Share2,
    description:
      "Grow and manage pages, schedule posts, and run content strategies with AI assistants",
  },
  {
    name: "Digital Marketing",
    Icon: TrendingUp,
    description:
      "Run ads, build funnels, and grow audiences online using AI-powered marketing tools",
  },
  {
    name: "Vibe Coding",
    Icon: Code2,
    description:
      "Build apps and websites by describing what you want - no traditional coding needed",
  },
  {
    name: "Cyber Security",
    Icon: Shield,
    description:
      "Learn to protect accounts, devices, and data using AI-guided security training",
  },
  {
    name: "AI Automation",
    Icon: Zap,
    description:
      "Build bots and automated workflows that do repetitive work for you using n8n and AI",
  },
];

type SkillUpFormProps = {
  initialValue?: SkillDraft;
  submitState: SubmitState;
  onFinish: (value?: SkillDraft) => void;
  submitError?: string;
};

export function SkillUpForm({
  initialValue,
  submitState,
  onFinish,
  submitError,
}: SkillUpFormProps) {
  const [name, setName] = useState(initialValue?.name ?? "");
  const [whatsapp, setWhatsapp] = useState(initialValue?.whatsapp ?? "");
  const [email, setEmail] = useState(initialValue?.email ?? "");
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    initialValue?.skills ?? [],
  );
  const [error, setError] = useState("");
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSkip(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);

  function toggleSkill(skill: string) {
    setSelectedSkills((current) =>
      current.includes(skill)
        ? current.filter((item) => item !== skill)
        : [...current, skill],
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (selectedSkills.length === 0) {
      setError("Choose at least one skill.");
      return;
    }

    onFinish({
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      skills: selectedSkills,
    });
  }

  const isSubmitted = submitState === "submitted";

  return (
    <SectionFrame
      question="Which free digital skills do you want?"
      description="Choose one or more. We’ll connect you with free resources and tools."
    >
      <form className="form-panel" onSubmit={handleSubmit}>
        <div className="field-stack">
          <label className="field-label">
            Full Name
            <input
              className="text-input"
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
            />
          </label>
          <label className="field-label">
            WhatsApp Number
            <input
              className="text-input"
              type="tel"
              name="whatsapp"
              value={whatsapp}
              onChange={(event) => setWhatsapp(event.target.value)}
              autoComplete="tel"
              inputMode="tel"
              pattern="^(0[17]|254[17]|\\+254[17])[0-9]{8}$"
              title="Use 07XXXXXXXX, 01XXXXXXXX, 2547XXXXXXXX, 2541XXXXXXXX, +2547XXXXXXXX, or +2541XXXXXXXX"
              required
            />
          </label>
          <label className="field-label">
            Email Address
            <input
              className="text-input"
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
            />
          </label>
        </div>
        <div className="skill-grid" aria-label="Skills">
          {skills.map((skill) => (
            <SkillCard
              key={skill.name}
              name={skill.name}
              description={skill.description}
              Icon={skill.Icon}
              selected={selectedSkills.includes(skill.name)}
              onToggle={() => toggleSkill(skill.name)}
            />
          ))}
        </div>
        {error || submitError ? (
          <p className="form-error">{error || submitError}</p>
        ) : null}
        <div className="form-actions">
          <button
            className="primary-button"
            type="submit"
            disabled={submitState === "submitting" || isSubmitted}
          >
            {submitState === "submitting" ? "Submitting" : "Finish and submit"}
            <Send size={17} aria-hidden="true" />
          </button>
          <span className="submit-status">
            {isSubmitted ? (
              <>
                <CheckCircle2 size={18} aria-hidden="true" />
                Submitted
              </>
            ) : null}
          </span>
          {showSkip ? (
            <button
              className="skip-button"
              type="button"
              onClick={() => onFinish()}
              disabled={submitState === "submitting"}
            >
              Skip and finish
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </form>
    </SectionFrame>
  );
}
