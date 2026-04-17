import Link from "next/link";
import type { Metadata } from "next";
import { Crown, Star, Trophy } from "lucide-react";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import {
  getLatestRound,
  getTeamOfTheWeek,
  type TeamOfTheWeekSlot,
} from "@/lib/match-ratings";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Ukens Lag — Telemark Fotball",
  description:
    "Ukens beste ellever fra bredde­fotballen i Telemark, basert på trenerens kamprating.",
};

function getInitials(name: string) {
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0][0];
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const pitchPositions: Record<
  TeamOfTheWeekSlot["role"],
  Array<{ x: number; y: number }>
> = {
  GK: [{ x: 50, y: 92 }],
  DF: [
    { x: 14, y: 72 },
    { x: 38, y: 74 },
    { x: 62, y: 74 },
    { x: 86, y: 72 },
  ],
  MF: [
    { x: 22, y: 48 },
    { x: 50, y: 50 },
    { x: 78, y: 48 },
  ],
  FW: [
    { x: 22, y: 22 },
    { x: 50, y: 16 },
    { x: 78, y: 22 },
  ],
};

function ratingColor(r: number) {
  if (r >= 8) return "#16a34a";
  if (r >= 7.5) return "#65a30d";
  if (r >= 7) return "#d97706";
  return "#6b7280";
}

export default function UkensLagPage() {
  const round = getLatestRound();
  const { slots, motm } = getTeamOfTheWeek(round);

  const placed: Array<TeamOfTheWeekSlot & { x: number; y: number }> = [];
  const counters: Record<TeamOfTheWeekSlot["role"], number> = {
    GK: 0,
    DF: 0,
    MF: 0,
    FW: 0,
  };
  for (const slot of slots) {
    const positions = pitchPositions[slot.role];
    const idx = counters[slot.role]++;
    const pos = positions[idx] ?? positions[positions.length - 1];
    placed.push({ ...slot, x: pos.x, y: pos.y });
  }

  const totalGoals = slots.reduce((sum, s) => sum + (s.player.goals ?? 0), 0);
  const avgRating =
    slots.reduce((sum, s) => sum + s.player.coachRating, 0) / (slots.length || 1);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-6 sm:pt-16">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#c5382a]">
            <Star size={12} fill="#c5382a" />
            Ukens Lag
          </div>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Runde {round}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            De 11 høyest vurderte spillerne fra siste serierunde, valgt ut fra
            trenernes kamprating. Formasjon 4-3-3.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-lg border border-border bg-card px-4 py-2.5">
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Snitt-rating
              </div>
              <div className="font-mono text-xl font-bold tabular-nums">
                {avgRating.toFixed(2)}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-2.5">
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
                Mål totalt
              </div>
              <div className="font-mono text-xl font-bold tabular-nums">
                {totalGoals}
              </div>
            </div>
            {motm && (
              <Link
                href={`/spiller/${motm.player.playerSlug}`}
                className="group flex items-center gap-3 rounded-lg border border-[#c5382a]/30 bg-[#c5382a]/5 px-4 py-2.5 transition-colors hover:bg-[#c5382a]/10"
              >
                <Crown size={16} className="text-[#c5382a]" fill="#c5382a" />
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-[#c5382a]">
                    Ukens kriger
                  </div>
                  <div className="text-sm font-semibold group-hover:underline">
                    {motm.player.playerName}
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Pitch */}
        <section className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0a4d1f] to-[#083d19] p-4 shadow-xl">
            {/* Pitch markings */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)]"
              aria-hidden
            >
              <rect
                x="0"
                y="0"
                width="100"
                height="100"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.4"
              />
              <line
                x1="0"
                y1="50"
                x2="100"
                y2="50"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.3"
              />
              <circle
                cx="50"
                cy="50"
                r="9"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.3"
              />
              <rect
                x="25"
                y="84"
                width="50"
                height="16"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.3"
              />
              <rect
                x="37"
                y="94"
                width="26"
                height="6"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.3"
              />
              <rect
                x="25"
                y="0"
                width="50"
                height="16"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.3"
              />
              <rect
                x="37"
                y="0"
                width="26"
                height="6"
                fill="none"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="0.3"
              />
              {/* Stripes */}
              {Array.from({ length: 7 }).map((_, i) => (
                <rect
                  key={i}
                  x="0"
                  y={i * 14.3}
                  width="100"
                  height="14.3"
                  fill={i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent"}
                />
              ))}
            </svg>

            <div className="relative aspect-[3/4] w-full sm:aspect-[4/5]">
              {placed.map((slot) => {
                const isMotm = motm?.player.playerSlug === slot.player.playerSlug;
                return (
                  <Link
                    key={slot.player.playerSlug}
                    href={`/spiller/${slot.player.playerSlug}`}
                    className="group absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
                  >
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        {isMotm && (
                          <div className="absolute -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[#c5382a]">
                            <Crown size={10} className="text-white" fill="white" />
                          </div>
                        )}
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg ring-2 ring-white/20 transition-transform group-hover:scale-110 sm:h-14 sm:w-14">
                          <span className="text-[11px] font-bold text-[#083d19] sm:text-xs">
                            {getInitials(slot.player.playerName)}
                          </span>
                        </div>
                        <div
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded px-1 font-mono text-[10px] font-bold leading-tight text-white shadow"
                          style={{
                            backgroundColor: ratingColor(slot.player.coachRating),
                          }}
                        >
                          {slot.player.coachRating.toFixed(1)}
                        </div>
                      </div>
                      <div className="mt-3 max-w-[90px] truncate text-center text-[11px] font-semibold text-white drop-shadow-md sm:max-w-[120px] sm:text-xs">
                        {slot.player.playerName.split(" ").slice(-1)[0]}
                      </div>
                      <div className="text-[9px] uppercase tracking-wider text-white/70">
                        {slot.match.homeTeam === slot.player.playerName
                          ? slot.match.homeTeam
                          : slot.match.lineup.find(
                              (p) => p.playerSlug === slot.player.playerSlug
                            )
                          ? slot.player.playerSlug.split("-")[0]
                          : ""}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* List */}
        <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
          <h2 className="text-lg font-semibold">Alle elleve</h2>
          <div className="mt-4 divide-y divide-border overflow-hidden rounded-lg border border-border bg-card">
            {slots.map((slot) => {
              const isMotm = motm?.player.playerSlug === slot.player.playerSlug;
              return (
                <Link
                  key={slot.player.playerSlug}
                  href={`/spiller/${slot.player.playerSlug}`}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-[10px] font-semibold text-muted-foreground">
                    {slot.role}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-sm font-medium">
                        {slot.player.playerName}
                      </span>
                      {isMotm && (
                        <Crown size={12} className="text-[#c5382a]" fill="#c5382a" />
                      )}
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground">
                      {slot.match.homeTeam} {slot.match.homeScore}–
                      {slot.match.awayScore} {slot.match.awayTeam}
                      {(slot.player.goals ?? 0) > 0 && (
                        <> · {slot.player.goals} mål</>
                      )}
                      {(slot.player.assists ?? 0) > 0 && (
                        <> · {slot.player.assists} ass.</>
                      )}
                    </div>
                  </div>
                  <div
                    className="flex h-10 w-12 flex-col items-center justify-center rounded font-mono text-white"
                    style={{ backgroundColor: ratingColor(slot.player.coachRating) }}
                  >
                    <span className="text-sm font-bold leading-none tabular-nums">
                      {slot.player.coachRating.toFixed(1)}
                    </span>
                    <span className="mt-0.5 text-[8px] uppercase tracking-wider opacity-80">
                      trener
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-card/50 p-4 text-xs text-muted-foreground">
            <Trophy size={14} className="mt-0.5 shrink-0 text-muted-foreground" />
            <div>
              Ukens Lag genereres automatisk fra trenerens offisielle kamprating.
              Ukens kriger er spilleren som vant fan-kåringen Man of the Match i
              kampen med flest avgitte stemmer.
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
