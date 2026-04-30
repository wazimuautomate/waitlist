export type SectionKey = "trueearn" | "bfasta" | "vcf" | "skills";

export type WaitlistPayload =
  | {
      section: "trueearn" | "bfasta";
      name: string;
      phone: string;
    }
  | {
      section: "vcf";
      name: string;
      whatsapp: string;
    }
  | {
      section: "skills";
      name: string;
      whatsapp: string;
      email: string;
      skills: string[];
    };

export type SubmitState = "idle" | "submitting" | "submitted";

export type BasicDraft = {
  name: string;
  phone: string;
};

export type SkillDraft = {
  name: string;
  whatsapp: string;
  email: string;
  skills: string[];
};

export type WaitlistDraft = {
  trueearn?: BasicDraft;
  bfasta?: BasicDraft;
  vcf?: BasicDraft;
  skills?: SkillDraft;
};
