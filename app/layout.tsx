import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Waitlist",
  description: "Join the early waitlist for TrueEarn, Bfasta, VCF, and SkillUp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
