import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { clubs } from "@/lib/clubs";
import { getSquadsForClub } from "@/lib/players";
import { ClubSquadSection } from "./client-page";
import { ArrowLeft, MapPin } from "lucide-react";

export function generateStaticParams() {
  return clubs.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const club = clubs.find((c) => c.slug === slug);
  if (!club) return { title: "Ikke funnet" };
  return {
    title: `${club.name} — Telemark Fotball`,
    description: `Oversikt over ${club.name} sine lag i breddefotballen i Telemark.`,
  };
}

export default async function ClubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const club = clubs.find((c) => c.slug === slug);
  if (!club) notFound();

  const squads = getSquadsForClub(slug);
  const totalPlayers = squads.reduce((sum, s) => sum + s.players.length, 0);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Clean hero — centered, minimal */}
        <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 sm:pt-16">
          <Link
            href="/stadionkart"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Stadionkart
          </Link>

          <div className="mt-10 flex flex-col items-center text-center">
            <img
              src={club.logo}
              alt={club.name}
              width={88}
              height={88}
            />
            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              {club.name}
            </h1>
            <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin size={13} className="shrink-0" />
              {club.venue}, {club.location}
            </div>

            {/* Stat pills */}
            <div className="mt-6 flex items-center gap-6 text-center">
              <div>
                <div className="text-2xl font-bold tabular-nums">{club.teams.length}</div>
                <div className="text-[11px] text-muted-foreground">Lag</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <div className="text-2xl font-bold tabular-nums">{totalPlayers || "—"}</div>
                <div className="text-[11px] text-muted-foreground">Spillere</div>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <div className="text-2xl font-bold tabular-nums">2025</div>
                <div className="text-[11px] text-muted-foreground">Sesong</div>
              </div>
            </div>

            {/* Action links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href={`https://www.google.com/maps?q=${club.lat},${club.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#c5382a] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#a82e22]"
              >
                Vis på kart
              </a>
              <a
                href={`https://www.google.com/search?q=${encodeURIComponent(club.name + " IL fotball Telemark")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                Søk på nett
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto mt-12 max-w-5xl border-t border-border" />

        {/* Squad section */}
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <ClubSquadSection club={club} squads={squads} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
