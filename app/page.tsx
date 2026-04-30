"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BfastaForm } from "@/components/BfastaForm";
import { HeroSection } from "@/components/HeroSection";
import { ProgressBar } from "@/components/ProgressBar";
import { SkillUpForm } from "@/components/SkillUpForm";
import { ThankYouScreen } from "@/components/ThankYouScreen";
import { TrueEarnForm } from "@/components/TrueEarnForm";
import { VCFForm } from "@/components/VCFForm";
import { submitForm } from "@/lib/submitForm";
import type {
  BasicDraft,
  SkillDraft,
  SubmitState,
  WaitlistDraft,
  WaitlistPayload,
} from "@/types/form";

type SectionIndex = 0 | 1 | 2 | 3 | 4 | 5;

export default function Home() {
  const [currentSection, setCurrentSection] = useState<SectionIndex>(0);
  const [draft, setDraft] = useState<WaitlistDraft>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitError, setSubmitError] = useState("");

  function goToSection(section: SectionIndex) {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function saveBasicAndContinue(
    section: "trueearn" | "bfasta" | "vcf",
    value: BasicDraft,
    index: number,
  ) {
    setDraft((current) => ({ ...current, [section]: value }));
    goToSection(Math.min(index + 1, 5) as SectionIndex);
  }

  function skipCurrent() {
    goToSection(Math.min(currentSection + 1, 5) as SectionIndex);
  }

  async function finishAndSubmit(skills?: SkillDraft) {
    const finalDraft = skills ? { ...draft, skills } : draft;
    setDraft(finalDraft);
    setSubmitError("");
    setSubmitState("submitting");

    const payloads: WaitlistPayload[] = [];

    if (finalDraft.trueearn) {
      payloads.push({
        section: "trueearn",
        name: finalDraft.trueearn.name,
        phone: finalDraft.trueearn.phone,
      });
    }

    if (finalDraft.bfasta) {
      payloads.push({
        section: "bfasta",
        name: finalDraft.bfasta.name,
        phone: finalDraft.bfasta.phone,
      });
    }

    if (finalDraft.vcf) {
      payloads.push({
        section: "vcf",
        name: finalDraft.vcf.name,
        whatsapp: finalDraft.vcf.phone,
      });
    }

    if (finalDraft.skills) {
      payloads.push({
        section: "skills",
        name: finalDraft.skills.name,
        whatsapp: finalDraft.skills.whatsapp,
        email: finalDraft.skills.email,
        skills: finalDraft.skills.skills,
      });
    }

    try {
      await Promise.all(payloads.map((payload) => submitForm(payload)));
      setSubmitState("submitted");
      goToSection(5);
    } catch {
      setSubmitState("idle");
      setSubmitError("We could not submit your waitlist entry. Please try again.");
    }
  }

  return (
    <main className="page-shell">
      <ProgressBar currentSection={currentSection} />
      <AnimatePresence mode="wait">
        {currentSection === 0 ? (
          <HeroSection key="hero" onStart={() => goToSection(1)} />
        ) : null}
        {currentSection === 1 ? (
          <TrueEarnForm
            key="trueearn"
            initialValue={draft.trueearn}
            onProceed={(value) => saveBasicAndContinue("trueearn", value, 1)}
            onSkip={skipCurrent}
          />
        ) : null}
        {currentSection === 2 ? (
          <BfastaForm
            key="bfasta"
            initialValue={draft.bfasta}
            onProceed={(value) => saveBasicAndContinue("bfasta", value, 2)}
            onSkip={skipCurrent}
          />
        ) : null}
        {currentSection === 3 ? (
          <VCFForm
            key="vcf"
            initialValue={draft.vcf}
            onProceed={(value) => saveBasicAndContinue("vcf", value, 3)}
            onSkip={skipCurrent}
          />
        ) : null}
        {currentSection === 4 ? (
          <SkillUpForm
            key="skills"
            initialValue={draft.skills}
            submitState={submitState}
            submitError={submitError}
            onFinish={finishAndSubmit}
          />
        ) : null}
        {currentSection === 5 ? <ThankYouScreen key="thanks" /> : null}
      </AnimatePresence>
    </main>
  );
}
