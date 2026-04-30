"use client";

import { FormEvent, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import type { BasicDraft, SectionKey } from "@/types/form";

type BasicWaitlistFormProps = {
  section: Extract<SectionKey, "trueearn" | "bfasta" | "vcf">;
  phoneField: "phone" | "whatsapp";
  phoneLabel: string;
  note?: string;
  initialValue?: BasicDraft;
  onProceed: (value: BasicDraft) => void;
  onSkip: () => void;
};

export function BasicWaitlistForm({
  section,
  phoneField,
  phoneLabel,
  note,
  initialValue,
  onProceed,
  onSkip,
}: BasicWaitlistFormProps) {
  const [name, setName] = useState(initialValue?.name ?? "");
  const [phone, setPhone] = useState(initialValue?.phone ?? "");
  const [error, setError] = useState("");
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSkip(true), 2000);
    return () => window.clearTimeout(timer);
  }, [section]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim()) {
      setError("Please add your name and number to continue.");
      return;
    }

    onProceed({ name: name.trim(), phone: phone.trim() });
  }

  return (
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
          {phoneLabel}
          <input
            className="text-input"
            type="tel"
            name={phoneField}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            autoComplete="tel"
            inputMode="tel"
            pattern="^(07|2547|\\+2547)[0-9]{8}$"
            title="Use 07XXXXXXXX, 2547XXXXXXXX, or +2547XXXXXXXX"
            required
          />
        </label>
      </div>
      {note ? <p className="form-note">{note}</p> : null}
      {error ? <p className="form-error">{error}</p> : null}
      <div className="form-actions">
        <button className="primary-button" type="submit">
          Proceed
          <ArrowRight size={17} aria-hidden="true" />
        </button>
        {showSkip ? (
          <button className="skip-button" type="button" onClick={onSkip}>
            Skip
          </button>
        ) : null}
      </div>
    </form>
  );
}
