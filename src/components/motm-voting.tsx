"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Crown, Check, Vote } from "lucide-react";
import type { MatchRatings, PlayerMatchRating } from "@/lib/match-ratings";

interface MotmVotingProps {
  match: MatchRatings;
  featuredPlayerSlug?: string;
}

const positionLabels: Record<PlayerMatchRating["position"], string> = {
  Keeper: "GK",
  Forsvar: "DF",
  Midtbane: "MF",
  Angrep: "FW",
  Ukjent: "—",
};

export function MotmVoting({ match, featuredPlayerSlug }: MotmVotingProps) {
  const storageKey = `motm-vote:${match.id}`;
  const [mounted, setMounted] = useState(false);
  const [myVote, setMyVote] = useState<string | null>(null);
  const [extraVotes, setExtraVotes] = useState<Record<string, number>>({});

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setMyVote(stored);
    } catch {}
  }, [storageKey]);

  const featuredClubSlug = match.featuredClubSlug;
  const eligible = match.lineup.filter((p) => {
    const club =
      featuredClubSlug === match.homeClubSlug
        ? match.homeClubSlug
        : match.awayClubSlug;
    return (
      (featuredClubSlug === match.homeClubSlug
        ? match.homeTeam
        : match.awayTeam) &&
      club &&
      match.lineup.includes(p) &&
      p.playerSlug.startsWith(`${featuredClubSlug}-`)
    );
  });

  const totalVotes =
    match.totalVotes +
    Object.values(extraVotes).reduce((s, n) => s + n, 0) +
    (myVote ? 1 : 0);

  const getVotes = (slug: string) => {
    const base = match.lineup.find((p) => p.playerSlug === slug)?.motmVotes ?? 0;
    const extra = extraVotes[slug] ?? 0;
    const mine = myVote === slug ? 1 : 0;
    return base + extra + mine;
  };

  const handleVote = (slug: string) => {
    if (myVote) return;
    setMyVote(slug);
    try {
      localStorage.setItem(storageKey, slug);
    } catch {}
  };

  const sorted = [...eligible].sort(
    (a, b) => getVotes(b.playerSlug) - getVotes(a.playerSlug)
  );

  const winner = sorted[0];
  const dateLabel = new Date(match.date).toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#c5382a]">
            <Vote size={12} />
            Man of the Match
          </div>
          <h2 className="mt-1.5 text-lg font-semibold">
            {match.homeTeam}{" "}
            <span className="font-mono text-muted-foreground">
              {match.homeScore}–{match.awayScore}
            </span>{" "}
            {match.awayTeam}
          </h2>
          <div className="mt-0.5 text-xs text-muted-foreground">
            Runde {match.round} · {dateLabel}
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-2xl font-bold tabular-nums">
            {totalVotes.toLocaleString("nb-NO")}
          </div>
          <div className="text-[11px] text-muted-foreground">stemmer totalt</div>
        </div>
      </div>

      {!mounted ? (
        <div className="mt-6 h-40 animate-pulse rounded-lg bg-card/40" />
      ) : !myVote ? (
        <div className="mt-6">
          <p className="mb-4 text-xs text-muted-foreground">
            Stem på kampens beste spiller. Én stemme per enhet.
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {eligible.map((p) => (
              <button
                key={p.playerSlug}
                onClick={() => handleVote(p.playerSlug)}
                className="group flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5 text-left transition-all hover:border-[#c5382a]/50 hover:bg-card/80"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-[10px] font-semibold text-muted-foreground">
                  {positionLabels[p.position]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">
                    {p.playerName}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    Trener: {p.coachRating.toFixed(1)}
                    {(p.goals ?? 0) > 0 && <> · {p.goals} mål</>}
                    {(p.assists ?? 0) > 0 && <> · {p.assists} ass.</>}
                  </div>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground opacity-0 transition-opacity group-hover:text-[#c5382a] group-hover:opacity-100">
                  Stem →
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-[#c5382a]/30 bg-[#c5382a]/5 px-3 py-2 text-xs text-[#c5382a]">
            <Check size={14} />
            Takk for stemmen! Her er fordelingen så langt.
          </div>
          <div className="space-y-2">
            {sorted.map((p, i) => {
              const votes = getVotes(p.playerSlug);
              const pct = totalVotes > 0 ? (votes / totalVotes) * 100 : 0;
              const isMine = myVote === p.playerSlug;
              const isWinner = i === 0;
              const isFeatured = featuredPlayerSlug === p.playerSlug;
              return (
                <Link
                  key={p.playerSlug}
                  href={`/spiller/${p.playerSlug}`}
                  className={`relative block overflow-hidden rounded-lg border transition-colors ${
                    isFeatured
                      ? "border-[#c5382a]/50"
                      : "border-border hover:border-border/80"
                  }`}
                >
                  <div
                    className="absolute inset-y-0 left-0 transition-all"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: isWinner
                        ? "rgba(197, 56, 42, 0.15)"
                        : "rgba(148, 163, 184, 0.08)",
                    }}
                  />
                  <div className="relative flex items-center gap-3 px-3 py-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted font-mono text-[10px] font-semibold text-muted-foreground">
                      {positionLabels[p.position]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="truncate text-sm font-medium">
                          {p.playerName}
                        </span>
                        {isWinner && (
                          <Crown
                            size={13}
                            className="shrink-0 text-[#c5382a]"
                            fill="#c5382a"
                          />
                        )}
                        {isMine && (
                          <span className="shrink-0 rounded-full bg-foreground/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-foreground/70">
                            Din stemme
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-muted-foreground">
                        {votes.toLocaleString("nb-NO")} stemmer
                      </div>
                    </div>
                    <div className="font-mono text-sm font-bold tabular-nums">
                      {pct.toFixed(1)}%
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          {winner && (
            <div className="mt-5 flex items-start gap-3 rounded-lg border border-border bg-card p-4">
              <Crown className="mt-0.5 shrink-0 text-[#c5382a]" size={16} fill="#c5382a" />
              <div className="min-w-0 flex-1 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {winner.playerName}
                </span>{" "}
                leder kåringen med{" "}
                {((getVotes(winner.playerSlug) / totalVotes) * 100).toFixed(1)}%
                av stemmene. Kåringen avsluttes 48 timer etter kampslutt og
                kandidaten med flest stemmer tas med i Ukens Lag.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
