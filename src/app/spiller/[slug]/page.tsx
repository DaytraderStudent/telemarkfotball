import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Trophy, Crown, Goal, Target } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { RadarChart } from "@/components/radar-chart";
import { MotmVoting } from "@/components/motm-voting";
import {
  getAllResolvedPlayers,
  getResolvedPlayerBySlug,
  type PlayerAttributes,
} from "@/lib/players";
import { clubs } from "@/lib/clubs";
import {
  getMatchesForPlayer,
  getPlayerRatingInMatch,
  getAveragePlayerRating,
  countMotmWins,
  getLatestMatchForClub,
} from "@/lib/match-ratings";

export const revalidate = 86400;

export function generateStaticParams() {
  return getAllResolvedPlayers().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const player = getResolvedPlayerBySlug(slug);
  if (!player) return { title: "Spiller ikke funnet" };
  return {
    title: `${player.name} — ${player.teamName} | Telemark Fotball`,
    description: `Profil, attributter og rating for ${player.name} (${player.teamName}, ${player.division}).`,
  };
}

function getInitials(name: string) {
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0][0];
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const positionLabels: Record<string, string> = {
  Keeper: "Keeper",
  Forsvar: "Forsvar",
  Midtbane: "Midtbane",
  Angrep: "Angrep",
  Ukjent: "Posisjon ikke satt",
};

const attrList: Array<{ key: keyof PlayerAttributes; label: string }> = [
  { key: "hurtighet", label: "Hurtighet" },
  { key: "dribling", label: "Dribling" },
  { key: "skudd", label: "Skudd" },
  { key: "pasning", label: "Pasning" },
  { key: "forsvar", label: "Forsvar" },
  { key: "fysikk", label: "Fysikk" },
];

function overallTier(overall: number) {
  if (overall >= 85) return { label: "Elite", color: "#c5382a" };
  if (overall >= 75) return { label: "Sterk", color: "#d97706" };
  if (overall >= 65) return { label: "Solid", color: "#65a30d" };
  return { label: "Utviklende", color: "#6b7280" };
}

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const player = getResolvedPlayerBySlug(slug);
  if (!player) notFound();

  const club = clubs.find((c) => c.slug === player.clubSlug);
  const tier = overallTier(player.overall!);
  const matches = getMatchesForPlayer(player.slug);
  const avgRating = getAveragePlayerRating(player.slug);
  const motmWins = countMotmWins(player.slug);
  const latestClubMatch = getLatestMatchForClub(player.clubSlug);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 sm:pt-16">
          {club && (
            <Link
              href={`/klubb/${club.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={14} />
              {club.name}
            </Link>
          )}

          <div className="mt-10 grid gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
            {/* Player visual */}
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative aspect-[3/4] w-56 overflow-hidden rounded-2xl bg-[#1a1e27]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-semibold text-white/[0.08] select-none">
                    {getInitials(player.name)}
                  </span>
                </div>
                {player.number != null && (
                  <div className="absolute right-3 top-3 rounded bg-white/[0.08] px-2 py-1 font-mono text-xs font-bold text-white/40">
                    {player.number}
                  </div>
                )}
                <div
                  className="absolute left-3 top-3 flex flex-col items-center rounded-lg px-2 py-1.5"
                  style={{ backgroundColor: tier.color }}
                >
                  <span className="font-mono text-2xl font-bold leading-none text-white tabular-nums">
                    {player.overall}
                  </span>
                  <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/80">
                    {positionLabels[player.position].slice(0, 3).toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider" style={{ color: tier.color }}>
                {tier.label}
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="text-xs font-medium text-muted-foreground">
                {player.teamName} · {player.division}
              </div>
              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                {player.name}
              </h1>
              <div className="mt-2 text-sm text-muted-foreground">
                {positionLabels[player.position]}
                {player.number != null && <> · Draktnummer {player.number}</>}
              </div>

              {player.bio && (
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {player.bio}
                </p>
              )}

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {attrList.map(({ key, label }) => (
                  <div
                    key={key}
                    className="rounded-lg border border-border bg-card px-3 py-2.5"
                  >
                    <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                      {label}
                    </div>
                    <div className="mt-0.5 flex items-baseline gap-1.5">
                      <span className="font-mono text-xl font-bold tabular-nums">
                        {player.attributes![key]}
                      </span>
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${player.attributes![key]}%`,
                            backgroundColor: "#c5382a",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-5xl border-t border-border" />

        {/* Radar */}
        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <div className="grid items-center gap-10 md:grid-cols-[auto_1fr]">
            <div className="text-muted-foreground">
              <RadarChart attributes={player.attributes!} size={340} />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Attributtprofil</h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                Radaren viser spillerens seks kjerneattributter fra 0 til 99.
                Demoverdiene er generert fra posisjonsarketyper — senere vil
                trener kunne sette disse manuelt.
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl border-t border-border" />

        {/* Season stats */}
        {(avgRating != null || motmWins > 0) && (
          <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-semibold">Sesongstatistikk</h2>
              <span className="text-[11px] text-muted-foreground">
                {matches.length} kamp{matches.length === 1 ? "" : "er"}
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {avgRating != null && (
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                    <Target size={12} />
                    Snitt-rating
                  </div>
                  <div className="mt-1 font-mono text-2xl font-bold tabular-nums">
                    {avgRating.toFixed(2)}
                    <span className="ml-0.5 text-sm text-muted-foreground">/10</span>
                  </div>
                </div>
              )}
              {motmWins > 0 && (
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                    <Crown size={12} />
                    Man of the Match
                  </div>
                  <div className="mt-1 font-mono text-2xl font-bold tabular-nums">
                    {motmWins}
                    <span className="ml-0.5 text-sm text-muted-foreground">
                      × kåret
                    </span>
                  </div>
                </div>
              )}
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                  <Goal size={12} />
                  Mål + ass.
                </div>
                <div className="mt-1 font-mono text-2xl font-bold tabular-nums">
                  {matches.reduce((sum, m) => {
                    const r = getPlayerRatingInMatch(m, player.slug);
                    return sum + (r?.goals ?? 0) + (r?.assists ?? 0);
                  }, 0)}
                </div>
              </div>
              <div className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                  <Trophy size={12} />
                  Overall
                </div>
                <div className="mt-1 font-mono text-2xl font-bold tabular-nums">
                  {player.overall}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Match history */}
        {matches.length > 0 && (
          <>
            <div className="mx-auto max-w-5xl border-t border-border" />
            <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
              <h2 className="text-lg font-semibold">Siste kamper</h2>
              <div className="mt-5 divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
                {matches.map((m) => {
                  const r = getPlayerRatingInMatch(m, player.slug)!;
                  const isMotm = m.motmPlayerSlug === player.slug;
                  const ratingColor =
                    r.coachRating >= 8
                      ? "#16a34a"
                      : r.coachRating >= 7
                      ? "#65a30d"
                      : r.coachRating >= 6
                      ? "#d97706"
                      : "#dc2626";
                  return (
                    <div
                      key={m.id}
                      className="flex items-center gap-4 px-4 py-3.5"
                    >
                      <div className="w-14 shrink-0 text-[11px] text-muted-foreground">
                        R{m.round}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium">
                          {m.homeTeam}{" "}
                          <span className="font-mono text-muted-foreground">
                            {m.homeScore}–{m.awayScore}
                          </span>{" "}
                          {m.awayTeam}
                        </div>
                        <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                          <span>
                            {new Date(m.date).toLocaleDateString("nb-NO", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                          {(r.goals ?? 0) > 0 && (
                            <span className="inline-flex items-center gap-0.5">
                              <Goal size={10} />
                              {r.goals}
                            </span>
                          )}
                          {(r.assists ?? 0) > 0 && (
                            <span className="inline-flex items-center gap-0.5">
                              <span className="font-medium">A</span>
                              {r.assists}
                            </span>
                          )}
                          {isMotm && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#c5382a]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#c5382a]">
                              <Crown size={10} /> MOTM
                            </span>
                          )}
                        </div>
                      </div>
                      <div
                        className="flex h-10 w-12 flex-col items-center justify-center rounded font-mono text-white"
                        style={{ backgroundColor: ratingColor }}
                      >
                        <span className="text-sm font-bold leading-none tabular-nums">
                          {r.coachRating.toFixed(1)}
                        </span>
                        <span className="mt-0.5 text-[8px] uppercase tracking-wider opacity-80">
                          trener
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {/* MOTM voting for club's latest match */}
        {latestClubMatch && (
          <>
            <div className="mx-auto max-w-5xl border-t border-border" />
            <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
              <MotmVoting
                match={latestClubMatch}
                featuredPlayerSlug={player.slug}
              />
            </section>
          </>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
