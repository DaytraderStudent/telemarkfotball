import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { fetchAllStandings } from "@/lib/standings-fetcher";
import { StandingsPage } from "./client-page";

export const revalidate = 86400; // Revalidate daily

export const metadata: Metadata = {
  title: "Tabeller — Telemark Fotball",
  description: "Tabeller for alle divisjoner i Telemark-fotballen.",
};

export default async function TabellerPage() {
  const divisions = await fetchAllStandings();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <StandingsPage divisions={divisions} />
      </main>
      <SiteFooter />
    </>
  );
}
