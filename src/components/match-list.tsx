"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";
import type { Match } from "@/lib/matches-fetcher";
import type { StandingsRow } from "@/lib/standings-fetcher";
import type { TeamSquad } from "@/lib/players";
import { MatchDetailModal } from "@/components/match-detail";

interface MatchListProps {
  played: Match[];
  upcoming: Match[];
  teamNames: string[];
  allStandings: StandingsRow[];
  allSquads: TeamSquad[];
}

function isOurTeam(name: string, teamNames: string[]) {
  return teamNames.some((n) => name.toLowerCase().includes(n.toLowerCase()));
}

export function MatchList({ played, upcoming, teamNames, allStandings, allSquads }: MatchListProps) {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  return (
    <>
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
                <button
                  key={i}
                  onClick={() => setSelectedMatch(m)}
                  className="w-full cursor-pointer px-4 py-3 text-left transition-colors hover:bg-muted/30"
                >
                  <div className="mb-1.5 font-mono text-[10px] text-muted-foreground">
                    {m.date} {m.time && `kl. ${m.time}`}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className={isOurTeam(m.home, teamNames) ? "font-semibold" : "text-muted-foreground"}>
                      {m.home}
                    </span>
                    <span className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                      vs
                    </span>
                    <span className={isOurTeam(m.away, teamNames) ? "font-semibold" : "text-muted-foreground"}>
                      {m.away}
                    </span>
                  </div>
                  {m.venue && (
                    <div className="mt-1 text-[10px] text-muted-foreground/50">{m.venue}</div>
                  )}
                </button>
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
                <button
                  key={i}
                  onClick={() => setSelectedMatch(m)}
                  className="w-full cursor-pointer px-4 py-3 text-left transition-colors hover:bg-muted/30"
                >
                  <div className="mb-1.5 font-mono text-[10px] text-muted-foreground">
                    {m.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className={isOurTeam(m.home, teamNames) ? "font-semibold" : "text-muted-foreground"}>
                      {m.home}
                    </span>
                    <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs font-bold">
                      {m.score}
                    </span>
                    <span className={isOurTeam(m.away, teamNames) ? "font-semibold" : "text-muted-foreground"}>
                      {m.away}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-border bg-card px-4 py-8 text-center text-xs text-muted-foreground">
              Ingen spilte kamper ennå
            </div>
          )}
        </div>
      </div>

      {/* Match detail modal */}
      <AnimatePresence>
        {selectedMatch && (
          <MatchDetailModal
            match={selectedMatch}
            allStandings={allStandings}
            allSquads={allSquads}
            onClose={() => setSelectedMatch(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
