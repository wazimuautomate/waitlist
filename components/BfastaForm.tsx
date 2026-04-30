"use client";

import { BasicWaitlistForm } from "./BasicWaitlistForm";
import { SectionFrame } from "./SectionFrame";
import type { BasicDraft } from "@/types/form";

type BfastaFormProps = {
  initialValue?: BasicDraft;
  onProceed: (value: BasicDraft) => void;
  onSkip: () => void;
};

export function BfastaForm({
  initialValue,
  onProceed,
  onSkip,
}: BfastaFormProps) {
  return (
    <SectionFrame
      question="Do you want to buy bundles even with Okoa debt?"
      description="Buy Safaricom SMS, minutes, and data even if you have outstanding Okoa Jahazi."
    >
      <BasicWaitlistForm
        section="bfasta"
        phoneField="phone"
        phoneLabel="Working Phone Number"
        note="This number is where we'll send you instructions on how to buy."
        initialValue={initialValue}
        onProceed={onProceed}
        onSkip={onSkip}
      />
    </SectionFrame>
  );
}
