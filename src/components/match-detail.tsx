"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Calendar, Clock, TrendingUp, Users } from "lucide-react";
import type { Match } from "@/lib/matches-fetcher";
import type { StandingsRow } from "@/lib/standings-fetcher";
import type { TeamSquad, Player } from "@/lib/players";
import { clubs } from "@/lib/clubs";

interface MatchDetailProps {
  match: Match;
  allStandings: StandingsRow[];
  allSquads: TeamSquad[];
  onClose: () => void;
}

function getClubInfo(teamName: string) {
  const name = teamName.toLowerCase();
  for (const club of clubs) {
    if (club.name.toLowerCase() === name) return club;
    for (const team of club.teams) {
      if (team.name.toLowerCase() === name) return club;
    }
  }
  const base = name.replace(/\s*\d+$/, "").trim();
  for (const club of clubs) {
    if (club.name.toLowerCase().startsWith(base)) return club;
  }
  return null;
}

function getStanding(teamName: string, standings: StandingsRow[]): StandingsRow | null {
  return standings.find((s) => s.team.toLowerCase() === teamName.toLowerCase()) || null;
}

function calcWinProbability(
  homeStanding: StandingsRow | null,
  awayStanding: StandingsRow | null
): { home: number; draw: number; away: number } {
  if (!homeStanding || !awayStanding || (homeStanding.played === 0 && awayStanding.played === 0)) {
    return { home: 40, draw: 25, away: 35 }; // Default with slight home advantage
  }

  const homeStrength =
    (homeStanding.pts / Math.max(homeStanding.played, 1)) * 3 +
    homeStanding.gd * 0.1;
  const awayStrength =
    (awayStanding.pts / Math.max(awayStanding.played, 1)) * 3 +
    awayStanding.gd * 0.1;

  const diff = homeStrength - awayStrength;
  // Sigmoid-like distribution with home advantage
  const homeBase = 50 + diff * 3 + 5; // +5 home advantage
  const home = Math.min(75, Math.max(15, homeBase));
  const draw = Math.min(35, Math.max(15, 30 - Math.abs(diff) * 1.5));
  const away = 100 - home - draw;

  return {
    home: Math.round(Math.max(5, home)),
    draw: Math.round(Math.max(5, draw)),
    away: Math.round(Math.max(5, away)),
  };
}

function getSquadForTeam(teamName: string, allSquads: TeamSquad[]): Player[] {
  const name = teamName.toLowerCase();
  const squad = allSquads.find((s) => s.teamName.toLowerCase() === name);
  if (squad) return squad.players;
  // Try base name
  const base = name.replace(/\s*\d+$/, "").trim();
  const baseSquad = allSquads.find((s) => s.teamName.toLowerCase().startsWith(base));
  return baseSquad?.players || [];
}

const posOrder = ["Keeper", "Forsvar", "Midtbane", "Angrep", "Ukjent"];

export function MatchDetailModal({ match, allStandings, allSquads, onClose }: MatchDetailProps) {
  const homeClub = getClubInfo(match.home);
  const awayClub = getClubInfo(match.away);
  const homeStanding = getStanding(match.home, allStandings);
  const awayStanding = getStanding(match.away, allStandings);
  const prob = calcWinProbability(homeStanding, awayStanding);
  const homeSquad = getSquadForTeam(match.home, allSquads);
  const awaySquad = getSquadForTeam(match.away, allSquads);

  const isPlayed = match.score !== null;
  let homeGoals = 0, awayGoals = 0;
  if (isPlayed && match.score) {
    const parts = match.score.split("-").map((s) => parseInt(s.trim()));
    homeGoals = parts[0] || 0;
    awayGoals = parts[1] || 0;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 pt-16 sm:pt-24"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-2xl rounded-xl border border-border bg-background shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-3 top-3 cursor-pointer rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground z-10"
        >
          <X size={16} />
        </button>

        {/* Match header */}
        <div className="border-b border-border px-6 py-8 text-center">
          {/* Date/venue bar */}
          <div className="mb-6 flex items-center justify-center gap-3 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {match.date}
            </span>
            {match.time && (
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {match.time}
              </span>
            )}
            {match.venue && (
              <span className="flex items-center gap-1">
                <MapPin size={11} />
                {match.venue}
              </span>
            )}
          </div>

          {/* Teams + score */}
          <div className="flex items-center justify-center gap-6 sm:gap-10">
            {/* Home */}
            <div className="flex flex-col items-center gap-2 min-w-0">
              {homeClub ? (
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white p-2">
                  <img src={homeClub.logo} alt="" className="h-full w-full object-contain" />
                </div>
              ) : (
                <div className="h-14 w-14 rounded-xl bg-muted" />
              )}
              <span className="text-sm font-semibold text-center leading-tight">{match.home}</span>
              {homeStanding && (
                <span className="font-mono text-[10px] text-muted-foreground">
                  #{homeStanding.position} &middot; {homeStanding.pts}p
                </span>
              )}
            </div>

            {/* Score / VS */}
            <div className="shrink-0">
              {isPlayed ? (
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-bold tabular-nums ${homeGoals > awayGoals ? "text-foreground" : "text-muted-foreground"}`}>
                    {homeGoals}
                  </span>
                  <span className="text-lg text-muted-foreground/40">-</span>
                  <span className={`text-3xl font-bold tabular-nums ${awayGoals > homeGoals ? "text-foreground" : "text-muted-foreground"}`}>
                    {awayGoals}
                  </span>
                </div>
              ) : (
                <div className="rounded-lg bg-muted px-4 py-2 text-center">
                  <div className="text-lg font-bold">{match.time || "TBD"}</div>
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Avspark</div>
                </div>
              )}
            </div>

            {/* Away */}
            <div className="flex flex-col items-center gap-2 min-w-0">
              {awayClub ? (
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white p-2">
                  <img src={awayClub.logo} alt="" className="h-full w-full object-contain" />
                </div>
              ) : (
                <div className="h-14 w-14 rounded-xl bg-muted" />
              )}
              <span className="text-sm font-semibold text-center leading-tight">{match.away}</span>
              {awayStanding && (
                <span className="font-mono text-[10px] text-muted-foreground">
                  #{awayStanding.position} &middot; {awayStanding.pts}p
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Win probability */}
        <div className="border-b border-border px-6 py-5">
          <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            <TrendingUp size={11} />
            {isPlayed ? "Forventet utfall" : "Sannsynlighet"}
          </div>
          <div className="flex h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="transition-all duration-500"
              style={{ width: `${prob.home}%`, background: "#16a34a" }}
            />
            <div
              className="transition-all duration-500"
              style={{ width: `${prob.draw}%`, background: "#6b7280" }}
            />
            <div
              className="transition-all duration-500"
              style={{ width: `${prob.away}%`, background: "#c5382a" }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[11px]">
            <span className="text-[#16a34a] font-medium">{match.home} {prob.home}%</span>
            <span className="text-muted-foreground">Uavgjort {prob.draw}%</span>
            <span className="text-[#c5382a] font-medium">{match.away} {prob.away}%</span>
          </div>
        </div>

        {/* Season stats comparison */}
        {homeStanding && awayStanding && homeStanding.played > 0 && (
          <div className="border-b border-border px-6 py-5">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Sesongstatistikk
            </div>
            <div className="grid grid-cols-3 gap-y-2.5 text-center text-xs">
              <span className="font-bold">{homeStanding.won}</span>
              <span className="text-muted-foreground">Seire</span>
              <span className="font-bold">{awayStanding.won}</span>

              <span className="font-bold">{homeStanding.drawn}</span>
              <span className="text-muted-foreground">Uavgjort</span>
              <span className="font-bold">{awayStanding.drawn}</span>

              <span className="font-bold">{homeStanding.lost}</span>
              <span className="text-muted-foreground">Tap</span>
              <span className="font-bold">{awayStanding.lost}</span>

              <span className="font-bold">{homeStanding.goals}</span>
              <span className="text-muted-foreground">Mål</span>
              <span className="font-bold">{awayStanding.goals}</span>

              <span className={`font-bold ${homeStanding.gd > 0 ? "text-[#16a34a]" : homeStanding.gd < 0 ? "text-[#c5382a]" : ""}`}>
                {homeStanding.gd > 0 ? `+${homeStanding.gd}` : homeStanding.gd}
              </span>
              <span className="text-muted-foreground">Målforskj.</span>
              <span className={`font-bold ${awayStanding.gd > 0 ? "text-[#16a34a]" : awayStanding.gd < 0 ? "text-[#c5382a]" : ""}`}>
                {awayStanding.gd > 0 ? `+${awayStanding.gd}` : awayStanding.gd}
              </span>
            </div>
          </div>
        )}

        {/* Squads */}
        {(homeSquad.length > 0 || awaySquad.length > 0) && (
          <div className="px-6 py-5">
            <div className="mb-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              <Users size={11} />
              Tropper
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Home squad */}
              <div>
                <div className="mb-2 text-xs font-semibold">{match.home}</div>
                <div className="space-y-px rounded-md border border-border overflow-hidden">
                  {posOrder.map((pos) => {
                    const players = homeSquad.filter((p) => p.position === pos);
                    if (players.length === 0) return null;
                    return players.map((p) => (
                      <div key={p.name} className="flex items-center gap-2 bg-card px-3 py-1.5">
                        {p.number != null && (
                          <span className="w-5 text-right font-mono text-[10px] text-muted-foreground">{p.number}</span>
                        )}
                        <span className="flex-1 truncate text-[12px]">{p.name}</span>
                        <span className="text-[9px] text-muted-foreground/50 uppercase">{pos === "Ukjent" ? "" : pos.slice(0, 3)}</span>
                      </div>
                    ));
                  })}
                </div>
              </div>
              {/* Away squad */}
              <div>
                <div className="mb-2 text-xs font-semibold">{match.away}</div>
                <div className="space-y-px rounded-md border border-border overflow-hidden">
                  {posOrder.map((pos) => {
                    const players = awaySquad.filter((p) => p.position === pos);
                    if (players.length === 0) return null;
                    return players.map((p) => (
                      <div key={p.name} className="flex items-center gap-2 bg-card px-3 py-1.5">
                        {p.number != null && (
                          <span className="w-5 text-right font-mono text-[10px] text-muted-foreground">{p.number}</span>
                        )}
                        <span className="flex-1 truncate text-[12px]">{p.name}</span>
                        <span className="text-[9px] text-muted-foreground/50 uppercase">{pos === "Ukjent" ? "" : pos.slice(0, 3)}</span>
                      </div>
                    ));
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
