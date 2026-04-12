import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { TipsForm } from "@/components/tips-form";

export const metadata: Metadata = {
  title: "Tips oss — Telemark Fotball",
  description:
    "Send oss tips om treningskamper, overganger og nyheter fra breddefotballen i Telemark.",
};

export default function TipsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <TipsForm />
      </main>
      <SiteFooter />
    </>
  );
}
