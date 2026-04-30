import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import type { WaitlistPayload } from "@/types/form";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecret =
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.SUPABASE_SECRET_KEY;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

function isWaitlistPayload(value: unknown): value is WaitlistPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const payload = value as Record<string, unknown>;

  if (typeof payload.name !== "string" || !payload.name.trim()) {
    return false;
  }

  if (payload.section === "trueearn" || payload.section === "bfasta") {
    return typeof payload.phone === "string" && Boolean(payload.phone.trim());
  }

  if (payload.section === "vcf") {
    return (
      typeof payload.whatsapp === "string" && Boolean(payload.whatsapp.trim())
    );
  }

  if (payload.section === "skills") {
    return (
      typeof payload.whatsapp === "string" &&
      Boolean(payload.whatsapp.trim()) &&
      typeof payload.email === "string" &&
      Boolean(payload.email.trim()) &&
      Array.isArray(payload.skills) &&
      payload.skills.every((skill) => typeof skill === "string")
    );
  }

  return false;
}

function toInsert(payload: WaitlistPayload) {
  switch (payload.section) {
    case "trueearn":
      return {
        table: "waitlist_trueearn",
        row: {
          full_name: payload.name.trim(),
          phone_number: payload.phone.trim(),
        },
      };
    case "bfasta":
      return {
        table: "waitlist_bfasta",
        row: {
          full_name: payload.name.trim(),
          phone_number: payload.phone.trim(),
        },
      };
    case "vcf":
      return {
        table: "waitlist_vcf",
        row: {
          full_name: payload.name.trim(),
          whatsapp_number: payload.whatsapp.trim(),
        },
      };
    case "skills":
      return {
        table: "waitlist_skills",
        row: {
          full_name: payload.name.trim(),
          whatsapp_number: payload.whatsapp.trim(),
          email: payload.email.trim(),
          skills: payload.skills.map((skill) => skill.trim()).filter(Boolean),
        },
      };
  }
}

export async function POST(request: Request) {
  if (!supabaseUrl || !supabaseSecret) {
    return NextResponse.json(
      { success: false, message: "Supabase environment variables are missing" },
      { status: 500, headers: corsHeaders },
    );
  }

  const payload = await request.json();

  if (!isWaitlistPayload(payload)) {
    return NextResponse.json(
      { success: false, message: "Invalid waitlist payload" },
      { status: 400, headers: corsHeaders },
    );
  }

  const supabase = createClient(supabaseUrl, supabaseSecret, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { table, row } = toInsert(payload);
  const { error } = await supabase.from(table).insert(row);

  if (error) {
    return NextResponse.json(
      { success: false, message: "Submission failed" },
      { status: 502, headers: corsHeaders },
    );
  }

  return NextResponse.json({ success: true }, { headers: corsHeaders });
}
