import type { WaitlistPayload } from "@/types/form";

const MAX_ATTEMPTS = 2;

export async function submitForm(payload: WaitlistPayload) {
  let lastError: unknown;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Submission failed");
      }

      return res.json();
    } catch (error) {
      lastError = error;
      if (attempt < MAX_ATTEMPTS) {
        await new Promise((resolve) => setTimeout(resolve, 700));
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error("Submission failed");
}
