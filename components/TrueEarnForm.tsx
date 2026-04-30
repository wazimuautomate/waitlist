"use client";

import { BasicWaitlistForm } from "./BasicWaitlistForm";
import { SectionFrame } from "./SectionFrame";
import type { BasicDraft } from "@/types/form";

type TrueEarnFormProps = {
  initialValue?: BasicDraft;
  onProceed: (value: BasicDraft) => void;
  onSkip: () => void;
};

export function TrueEarnForm({
  initialValue,
  onProceed,
  onSkip,
}: TrueEarnFormProps) {
  return (
    <SectionFrame
      question="Do you want to earn from your phone?"
      description="Simple online tasks. Real M-Pesa payouts. Leave your details if Pesatrix is for you."
    >
      <BasicWaitlistForm
        section="trueearn"
        phoneField="phone"
        phoneLabel="Phone Number"
        initialValue={initialValue}
        onProceed={onProceed}
        onSkip={onSkip}
      />
    </SectionFrame>
  );
}
