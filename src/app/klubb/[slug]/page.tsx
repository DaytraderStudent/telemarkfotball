import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { clubs } from "@/lib/clubs";
import { getSquadsForClub } from "@/lib/players";
import { ClubSquadSection } from "./client-page";
import { IconInstagram, IconFacebook } from "@/components/icons";
import { ArrowLeft, MapPin, Globe, ExternalLink, Calendar } from "lucide-react";
import { fetchMatchesForClub } from "@/lib/matches-fetcher";

export const revalidate = 86400;

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
  const teamNames = club.teams.map((t) => t.name);
  const { played, upcoming } = await fetchMatchesForClub(teamNames);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 sm:pt-16">
          <Link
            href="/stadionkart"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Stadionkart
          </Link>

          {/* Centered hero */}
          <div className="mt-10 flex flex-col items-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white p-3.5 shadow-sm">
              <img src={club.logo} alt={club.name} width={180} height={180} className="h-full w-full object-contain" />
            </div>
            <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              {club.name}
            </h1>

            {/* Venue + address */}
            <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin size={13} className="shrink-0" />
              {club.venue}, {club.location}
            </div>
            {club.address && (
              <p className="mt-1 text-xs text-muted-foreground/60">{club.address}</p>
            )}

            {/* Stats */}
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

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              <a
                href={`https://www.google.com/maps?q=${club.lat},${club.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md bg-[#c5382a] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#a82e22]"
              >
                Vis på kart
              </a>
              {club.website && (
                <a
                  href={club.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Globe size={12} />
                  Nettside
                  <ExternalLink size={10} className="text-muted-foreground/40" />
                </a>
              )}
            </div>

            {/* Social links */}
            {club.instagram && (
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={`https://www.instagram.com/${club.instagram}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <IconInstagram className="h-3.5 w-3.5" />
                  @{club.instagram}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="mx-auto mt-12 max-w-5xl border-t border-border" />

        {/* Matches */}
        {(played.length > 0 || upcoming.length > 0) && (
          <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
            <div className="grid gap-8 md:grid-cols-2">
              {/* Upcoming */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Calendar size={14} className="text-muted-foreground" />
                  <h2 className="text-sm font-semibold">Kommende kamper</h2>
                </div>
                {upcoming.length > 0 ? (
                  <div className="divide-y divide-border rounded-lg border border-border bg-card">
                    {upcoming.map((m, i) => (
                      <div key={i} className="px-4 py-3">
                        <div className="mb-1.5 font-mono text-[10px] text-muted-foreground">
                          {m.date} {m.time && `kl. ${m.time}`}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className={teamNames.some((n) => m.home.toLowerCase().includes(n.toLowerCase())) ? "font-semibold" : "text-muted-foreground"}>
                            {m.home}
                          </span>
                          <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                            vs
                          </span>
                          <span className={teamNames.some((n) => m.away.toLowerCase().includes(n.toLowerCase())) ? "font-semibold" : "text-muted-foreground"}>
                            {m.away}
                          </span>
                        </div>
                        {m.venue && (
                          <div className="mt-1 text-[10px] text-muted-foreground/50">{m.venue}</div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-border bg-card px-4 py-8 text-center text-xs text-muted-foreground">
                    Ingen kommende kamper ennå
                  </div>
                )}
              </div>

              {/* Results */}
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Calendar size={14} className="text-muted-foreground" />
                  <h2 className="text-sm font-semibold">Siste resultater</h2>
                </div>
                {played.length > 0 ? (
                  <div className="divide-y divide-border rounded-lg border border-border bg-card">
                    {played.map((m, i) => (
                      <div key={i} className="px-4 py-3">
                        <div className="mb-1.5 font-mono text-[10px] text-muted-foreground">
                          {m.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className={teamNames.some((n) => m.home.toLowerCase().includes(n.toLowerCase())) ? "font-semibold" : "text-muted-foreground"}>
                            {m.home}
                          </span>
                          <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs font-bold">
                            {m.score}
                          </span>
                          <span className={teamNames.some((n) => m.away.toLowerCase().includes(n.toLowerCase())) ? "font-semibold" : "text-muted-foreground"}>
                            {m.away}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-border bg-card px-4 py-8 text-center text-xs text-muted-foreground">
                    Ingen spilte kamper ennå
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="mx-auto max-w-5xl border-t border-border" />

        {/* Squad */}
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <ClubSquadSection club={club} squads={squads} />
        </div>

        {/* Instagram embed section */}
        {club.instagram && (
          <div className="border-t border-border">
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <IconInstagram className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-semibold">@{club.instagram}</h2>
                </div>
                <a
                  href={`https://www.instagram.com/${club.instagram}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  Følg på Instagram
                </a>
              </div>
              {/* Static Instagram-style grid (placeholder cards since we can't embed without API) */}
              <div className="grid grid-cols-3 gap-1.5 overflow-hidden rounded-lg sm:grid-cols-4 md:grid-cols-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <a
                    key={i}
                    href={`https://www.instagram.com/${club.instagram}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-square bg-[#1a1e27] transition-opacity hover:opacity-80"
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <IconInstagram className="h-6 w-6 text-white/[0.04]" />
                    </div>
                    <div className="absolute inset-0 flex items-end p-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="text-[9px] text-white/50">Se på Instagram</span>
                    </div>
                  </a>
                ))}
              </div>
              <p className="mt-3 text-center text-[11px] text-muted-foreground/50">
                Besøk @{club.instagram} på Instagram for siste oppdateringer
              </p>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
