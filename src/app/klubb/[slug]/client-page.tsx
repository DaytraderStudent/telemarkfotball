"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { ResolvedPlayer } from "@/lib/players";
import type { Club, ClubTeam } from "@/lib/clubs";
import { User } from "lucide-react";

interface ResolvedSquad {
  clubSlug: string;
  teamName: string;
  division: string;
  players: ResolvedPlayer[];
}

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

function overallColor(overall: number) {
  if (overall >= 85) return "#c5382a";
  if (overall >= 75) return "#d97706";
  if (overall >= 65) return "#65a30d";
  return "#6b7280";
}

function PlayerCard({ player }: { player: ResolvedPlayer }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="group"
    >
      <Link href={`/spiller/${player.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#1a1e27] transition-transform duration-300 group-hover:scale-[1.02]">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-semibold text-white/[0.06] select-none sm:text-5xl">
              {getInitials(player.name)}
            </span>
          </div>

          {player.number != null && (
            <div className="absolute right-2.5 top-2.5 rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[10px] font-bold text-white/30">
              {player.number}
            </div>
          )}

          {player.overall != null && (
            <div
              className="absolute left-2.5 top-2.5 flex flex-col items-center rounded px-1.5 py-1"
              style={{ backgroundColor: overallColor(player.overall) }}
            >
              <span className="font-mono text-sm font-bold leading-none text-white tabular-nums">
                {player.overall}
              </span>
              <span className="mt-0.5 text-[7px] font-semibold uppercase tracking-wider text-white/75">
                {positionLabels[player.position].slice(0, 3).toUpperCase()}
              </span>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/70 to-transparent p-3 transition-transform duration-300 group-hover:translate-y-0">
            <span className="text-[11px] text-white/70">
              Se profil →
            </span>
          </div>
        </div>

        <h3 className="mt-3 text-[13px] font-medium leading-snug text-foreground transition-colors group-hover:text-[#c5382a]">
          {player.name}
        </h3>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          {positionLabels[player.position]}
        </p>
      </Link>
    </motion.div>
  );
}

export function ClubSquadSection({
  club,
  squads,
}: {
  club: Club;
  squads: ResolvedSquad[];
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

  const filterOptions = ["Alle", ...positionOrder].filter((pos) => {
    if (pos === "Alle") return true;
    return activeSquad?.players.some((p) => p.position === pos);
  });

  return (
    <div>
      {/* Team tabs — clean inline style */}
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
              className={`cursor-pointer rounded-full px-4 py-1.5 text-[13px] font-medium transition-all ${
                isActive
                  ? "bg-foreground text-background"
                  : hasSquad
                  ? "bg-muted text-foreground hover:bg-muted/80"
                  : "bg-muted/30 text-muted-foreground/40 cursor-default"
              }`}
            >
              {team.name}
            </button>
          );
        })}
      </div>

      {activeSquad && activeSquad.players.length > 0 ? (
        <>
          {/* Position filter */}
          <div className="mt-8 flex gap-6 border-b border-border">
            {filterOptions.map((pos) => (
              <button
                key={pos}
                onClick={() => setPosFilter(pos)}
                className={`relative cursor-pointer whitespace-nowrap pb-3 text-[13px] transition-colors ${
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

          {/* Players */}
          <div className="mt-8">
            <AnimatePresence mode="popLayout">
              <motion.div
                layout
                className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
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
        <div className="mt-10 flex flex-col items-center justify-center rounded-lg border border-border bg-card py-16 text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <User size={20} className="text-muted-foreground" />
          </div>
          <p className="text-sm font-medium">Spillerdata ikke tilgjengelig ennå</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Troppen er ikke registrert for dette laget
          </p>
        </div>
      )}
    </div>
  );
}
