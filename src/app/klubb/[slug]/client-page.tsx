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
const positionColors: Record<string, string> = {
  Keeper: "#d97706",
  Forsvar: "#2563eb",
  Midtbane: "#16a34a",
  Angrep: "#c5382a",
  Ukjent: "#6b7280",
};

function getInitials(name: string) {
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0][0];
  return parts[0][0] + parts[parts.length - 1][0];
}

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

  // Group players by position for display
  const groupedPlayers: Record<string, Player[]> = {};
  for (const pos of positionOrder) {
    const inPos = filteredPlayers.filter((p) => p.position === pos);
    if (inPos.length > 0) groupedPlayers[pos] = inPos;
  }

  return (
    <div className="mt-10">
      {/* Team selector tabs */}
      <div className="mb-6">
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

      {/* Squad section */}
      {activeSquad ? (
        <>
          {/* Position filter */}
          <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-1">
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
                  className={`flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    posFilter === pos
                      ? "border-foreground/20 bg-foreground/10 text-foreground"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {pos === "Alle" ? (
                    "Alle"
                  ) : (
                    <>
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: positionColors[pos] }}
                      />
                      {positionLabels[pos]}
                    </>
                  )}
                  <span className="ml-0.5 text-[10px] text-muted-foreground">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Player grid */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {filteredPlayers.map((player, i) => (
              <div
                key={`${player.name}-${i}`}
                className="flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:bg-muted/30"
              >
                {/* Avatar placeholder */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                  {getInitials(player.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium leading-tight">
                    {player.name}
                  </div>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: positionColors[player.position] }}
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {positionLabels[player.position]}
                    </span>
                    {player.number && (
                      <span className="ml-auto font-mono text-[10px] text-muted-foreground/50">
                        #{player.number}
                      </span>
                    )}
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
