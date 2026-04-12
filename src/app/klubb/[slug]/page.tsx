import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { clubs } from "@/lib/clubs";
import { getSquadsForClub } from "@/lib/players";
import { ClubSquadSection } from "./client-page";
import { IconInstagram, IconFacebook } from "@/components/icons";
import { ArrowLeft, MapPin, ExternalLink } from "lucide-react";

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

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero banner */}
        <div className="border-b border-border bg-card">
          <div className="mx-auto max-w-5xl px-4 pb-8 pt-6 sm:px-6 sm:pb-10 sm:pt-8">
            <Link
              href="/stadionkart"
              className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={14} />
              Stadionkart
            </Link>

            <div className="flex items-start gap-5 sm:gap-6">
              <img
                src={club.logo}
                alt={club.name}
                width={80}
                height={80}
                className="shrink-0 sm:h-[96px] sm:w-[96px]"
              />
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {club.name}
                </h1>
                <div className="mt-1.5 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin size={14} className="shrink-0" />
                  <span>{club.venue}</span>
                  <span className="text-muted-foreground/30">&middot;</span>
                  <span>{club.location}</span>
                </div>

                {/* Stats row */}
                <div className="mt-4 flex flex-wrap gap-4">
                  <div className="rounded-md border border-border bg-background px-3 py-1.5">
                    <div className="text-lg font-bold leading-none">{club.teams.length}</div>
                    <div className="mt-0.5 text-[10px] text-muted-foreground">Lag</div>
                  </div>
                  {squads.length > 0 && (
                    <div className="rounded-md border border-border bg-background px-3 py-1.5">
                      <div className="text-lg font-bold leading-none">
                        {squads.reduce((sum, s) => sum + s.players.length, 0)}
                      </div>
                      <div className="mt-0.5 text-[10px] text-muted-foreground">Spillere</div>
                    </div>
                  )}
                  <div className="rounded-md border border-border bg-background px-3 py-1.5">
                    <div className="text-lg font-bold leading-none">2025</div>
                    <div className="mt-0.5 text-[10px] text-muted-foreground">Sesong</div>
                  </div>
                </div>

                {/* Social/external links */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <a
                    href={`https://www.google.com/maps?q=${club.lat},${club.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <MapPin size={12} />
                    Google Maps
                  </a>
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(club.name + " IL fotball Telemark")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <ExternalLink size={12} />
                    Søk på nett
                  </a>
                  <a
                    href={`https://www.instagram.com/explore/tags/${club.name.toLowerCase().replace(/[^a-zæøå0-9]/g, "")}il/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <IconInstagram className="h-3 w-3" />
                    Instagram
                  </a>
                  <a
                    href={`https://www.facebook.com/search/top/?q=${encodeURIComponent(club.name + " fotball")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <IconFacebook className="h-3 w-3" />
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
          {/* Divisions overview */}
          <div className="mb-10">
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Divisjoner
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {club.teams.map((team) => (
                <a
                  key={`${team.name}-${team.division}`}
                  href={
                    team.division === "4. divisjon"
                      ? "https://www.fotball.no/fotballdata/turnering/hjem/?fiksId=199109"
                      : team.division === "5. divisjon"
                      ? "https://www.fotball.no/fotballdata/turnering/hjem/?fiksId=199242"
                      : team.division === "6. divisjon"
                      ? "https://www.fotball.no/fotballdata/turnering/hjem/?fiksId=199243"
                      : team.division === "7. divisjon"
                      ? "https://www.fotball.no/fotballdata/turnering/hjem/?fiksId=199780"
                      : team.division === "4. div kvinner"
                      ? "https://www.fotball.no/fotballdata/turnering/hjem/?fiksId=199987"
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3.5 transition-colors hover:bg-muted/30"
                >
                  <img src={club.logo} alt="" width={28} height={28} className="shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">{team.name}</div>
                    <div className="text-[11px] text-muted-foreground">{team.division}</div>
                  </div>
                  <ExternalLink
                    size={14}
                    className="shrink-0 text-muted-foreground/30 transition-colors group-hover:text-muted-foreground"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Squad section */}
          <ClubSquadSection club={club} squads={squads} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
