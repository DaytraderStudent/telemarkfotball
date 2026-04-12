"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Player, TeamSquad } from "@/lib/players";
import type { Club, ClubTeam } from "@/lib/clubs";
import { User } from "lucide-react";

const positionOrder = ["Keeper", "Forsvar", "Midtbane", "Angrep", "Ukjent"] as const;
const positionLabels: Record<string, string> = {
  Alle: "Alle",
  Keeper: "Keeper",
  Forsvar: "Forsvar",
  Midtbane: "Midtbane",
  Angrep: "Angrep",
  Ukjent: "Ikke satt",
};

function getInitials(name: string) {
  const parts = name.split(" ");
  if (parts.length === 1) return parts[0][0];
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function PlayerCard({ player }: { player: Player }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted/40">
        {/* Silhouette / initials placeholder */}
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1e27]">
          <span className="text-3xl font-semibold text-muted-foreground/30 sm:text-4xl select-none">
            {getInitials(player.name)}
          </span>
        </div>

        {/* Number badge */}
        {player.number && (
          <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded bg-background/50 backdrop-blur-sm font-mono text-[11px] font-bold text-foreground/60">
            {player.number}
          </div>
        )}

        {/* Position tag — slides up on hover */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-[#0c0f14]/80 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
          <span className="text-[11px] text-white/70">
            {positionLabels[player.position]}
            {player.number ? ` · #${player.number}` : ""}
          </span>
        </div>
      </div>

      <h3 className="mt-3 text-[14px] font-medium leading-snug tracking-tight text-foreground">
        {player.name}
      </h3>
      <p className="mt-0.5 text-[12px] text-muted-foreground">
        {positionLabels[player.position]}
      </p>
    </motion.div>
  );
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

  // Build filter options with counts
  const filterOptions = ["Alle", ...positionOrder].filter((pos) => {
    if (pos === "Alle") return true;
    return activeSquad?.players.some((p) => p.position === pos);
  });

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
                onClick={() => {
                  if (hasSquad) {
                    setSelectedTeam(team.name);
                    setPosFilter("Alle");
                  }
                }}
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
          {/* Position filter — animated underline like EJAS */}
          <div className="flex flex-wrap gap-6 border-b border-border">
            {filterOptions.map((pos) => (
              <button
                key={pos}
                onClick={() => setPosFilter(pos)}
                className={`relative cursor-pointer whitespace-nowrap pb-3 text-[13px] tracking-wide transition-colors ${
                  posFilter === pos
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground/70"
                }`}
              >
                {positionLabels[pos]}
                {posFilter === pos && (
                  <motion.div
                    layoutId="pos-underline"
                    className="absolute bottom-0 left-0 right-0 h-px bg-foreground"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Player grid */}
          <div className="mt-10">
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              >
                {filteredPlayers.map((player) => (
                  <PlayerCard
                    key={`${player.name}-${player.position}`}
                    player={player}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
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
