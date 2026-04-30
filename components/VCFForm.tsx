"use client";

import { BasicWaitlistForm } from "./BasicWaitlistForm";
import { SectionFrame } from "./SectionFrame";
import type { BasicDraft } from "@/types/form";

type VCFFormProps = {
  initialValue?: BasicDraft;
  onProceed: (value: BasicDraft) => void;
  onSkip: () => void;
};

export function VCFForm({ initialValue, onProceed, onSkip }: VCFFormProps) {
  return (
    <SectionFrame
      question="Do you want to be in Whatsapp contact list?"
      description="Import once and have everyone contacts. It help you have a large Whatsapp Status Viewers."
    >
      <BasicWaitlistForm
        section="vcf"
        phoneField="whatsapp"
        phoneLabel="WhatsApp Number"
        note="Your number will be in a shared VCF file that other members can save your contact."
        initialValue={initialValue}
        onProceed={onProceed}
        onSkip={onSkip}
      />
    </SectionFrame>
  );
}
