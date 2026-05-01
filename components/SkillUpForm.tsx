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
