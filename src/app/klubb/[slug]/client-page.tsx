"use client";

import { useState } from "react";
import type { Player, TeamSquad } from "@/lib/players";
import type { Club, ClubTeam } from "@/lib/clubs";
import { User } from "lucide-react";

const positionOrder = ["Keeper", "Forsvar", "Midtbane", "Angrep", "Ukjent"] as const;
const positionLabels: Record<string, string> = {
  Keeper: "Keeper",
  Forsvar: "Forsvar",
  Midtbane: "Midtbane",
  Angrep: "Angrep",
  Ukjent: "Ikke satt",
};

export function ClubSquadSection({
  club,
  squads,
}: {
  club: Club;
  squads: TeamSquad[];
}) {
  const [selectedTeam, setSelectedTeam] = useState<string>(
    squads.length > 0 ? squads[0].teamName : club.teams[0]?.name || ""
  );
  const [posFilter, setPosFilter] = useState<string>("Alle");

  const activeSquad = squads.find((s) => s.teamName === selectedTeam);
  const teamsWithSquad = squads.map((s) => s.teamName);

  const filteredPlayers = activeSquad
    ? posFilter === "Alle"
      ? activeSquad.players
      : activeSquad.players.filter((p) => p.position === posFilter)
    : [];

  return (
    <div className="mt-10">
      {/* Team selector */}
      <div className="mb-8">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Velg lag
        </h2>
        <div className="flex flex-wrap gap-2">
          {club.teams.map((team: ClubTeam) => {
            const hasSquad = teamsWithSquad.includes(team.name);
            const isActive = selectedTeam === team.name;
            return (
              <button
                key={`${team.name}-${team.division}`}
                onClick={() => hasSquad && setSelectedTeam(team.name)}
                className={`cursor-pointer rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "border-[#c5382a] bg-[#c5382a]/10 text-[#c5382a]"
                    : hasSquad
                    ? "border-border bg-card text-foreground hover:bg-muted"
                    : "border-border/50 bg-card/50 text-muted-foreground/50 cursor-default"
                }`}
              >
                <span>{team.name}</span>
                <span className="ml-2 text-[10px] text-muted-foreground">
                  {team.division}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {activeSquad && activeSquad.players.length > 0 ? (
        <>
          {/* Position filter — underline style like the reference image */}
          <div className="mb-8 flex gap-6 border-b border-border">
            {["Alle", ...positionOrder].map((pos) => {
              const count =
                pos === "Alle"
                  ? activeSquad.players.length
                  : activeSquad.players.filter((p) => p.position === pos).length;
              if (pos !== "Alle" && count === 0) return null;
              return (
                <button
                  key={pos}
                  onClick={() => setPosFilter(pos)}
                  className={`cursor-pointer pb-3 text-sm font-medium transition-colors relative ${
                    posFilter === pos
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {pos === "Alle" ? "Alle" : positionLabels[pos]}
                  {posFilter === pos && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Player cards — silhouette style */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {filteredPlayers.map((player, i) => (
              <div key={`${player.name}-${i}`} className="group">
                {/* Silhouette image placeholder */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted/50">
                  {/* SVG silhouette */}
                  <svg
                    viewBox="0 0 200 260"
                    className="absolute inset-0 h-full w-full"
                    fill="none"
                  >
                    {/* Background */}
                    <rect width="200" height="260" fill="rgba(255,255,255,0.03)" />
                    {/* Head */}
                    <ellipse
                      cx="100"
                      cy="95"
                      rx="38"
                      ry="42"
                      fill="rgba(255,255,255,0.06)"
                    />
                    {/* Shoulders/body */}
                    <path
                      d="M30 260 C30 190, 55 175, 100 170 C145 175, 170 190, 170 260"
                      fill="rgba(255,255,255,0.06)"
                    />
                  </svg>
                  {/* Number badge */}
                  {player.number && (
                    <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md bg-background/60 backdrop-blur-sm text-[11px] font-bold text-foreground/70">
                      {player.number}
                    </div>
                  )}
                </div>
                {/* Info below card */}
                <div className="mt-2.5">
                  <div className="text-sm font-semibold leading-snug tracking-tight">
                    {player.name}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {positionLabels[player.position]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-border bg-card py-16 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <User size={20} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">Spillerdata ikke tilgjengelig</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Velg et lag med tilgjengelig tropp, eller sjekk fotball.no
          </p>
        </div>
      )}
    </div>
  );
}
