import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { fetchAllStandings, type StandingsRow } from "@/lib/standings-fetcher";
import { squads, type Player, type TeamSquad } from "@/lib/players";
import { clubs } from "@/lib/clubs";
import { ArrowLeft, MapPin, Calendar, Clock, TrendingUp, Users, ExternalLink } from "lucide-react";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Kampdetaljer — Telemark Fotball",
};

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

function calcProb(home: StandingsRow | null, away: StandingsRow | null) {
  if (!home || !away || (home.played === 0 && away.played === 0)) {
    return { home: 40, draw: 25, away: 35 };
  }
  const hs = (home.pts / Math.max(home.played, 1)) * 3 + home.gd * 0.1;
  const as_ = (away.pts / Math.max(away.played, 1)) * 3 + away.gd * 0.1;
  const diff = hs - as_;
  const h = Math.min(75, Math.max(15, 50 + diff * 3 + 5));
  const d = Math.min(35, Math.max(15, 30 - Math.abs(diff) * 1.5));
  const a = 100 - h - d;
  return { home: Math.round(Math.max(5, h)), draw: Math.round(Math.max(5, d)), away: Math.round(Math.max(5, a)) };
}

function getSquad(teamName: string): Player[] {
  const name = teamName.toLowerCase();
  const s = squads.find((sq) => sq.teamName.toLowerCase() === name);
  if (s) return s.players;
  const base = name.replace(/\s*\d+$/, "").trim();
  const bs = squads.find((sq) => sq.teamName.toLowerCase().startsWith(base));
  return bs?.players || [];
}

const posOrder = ["Keeper", "Forsvar", "Midtbane", "Angrep", "Ukjent"];
const posLabels: Record<string, string> = { Keeper: "KEP", Forsvar: "FOR", Midtbane: "MID", Angrep: "ANG", Ukjent: "" };

export default async function KampPage({
  searchParams,
}: {
  searchParams: Promise<{ home?: string; away?: string; date?: string; time?: string; score?: string; venue?: string }>;
}) {
  const params = await searchParams;
  const home = params.home || "";
  const away = params.away || "";
  const date = params.date || "";
  const time = params.time || "";
  const score = params.score || null;
  const venue = params.venue || "";

  if (!home || !away) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-32">
          <p className="text-muted-foreground">Ingen kampdata tilgjengelig</p>
        </main>
        <SiteFooter />
      </>
    );
  }

  const allDivisions = await fetchAllStandings();
  const allStandings = allDivisions.flatMap((d) => d.rows);

  const homeClub = getClubInfo(home);
  const awayClub = getClubInfo(away);
  const homeStanding = getStanding(home, allStandings);
  const awayStanding = getStanding(away, allStandings);
  const prob = calcProb(homeStanding, awayStanding);
  const homeSquad = getSquad(home);
  const awaySquad = getSquad(away);

  const isPlayed = score !== null && score.includes("-");
  let homeGoals = 0, awayGoals = 0;
  if (isPlayed && score) {
    const parts = score.split("-").map((s) => parseInt(s.trim()));
    homeGoals = parts[0] || 0;
    awayGoals = parts[1] || 0;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6 sm:pt-16">
          <Link
            href={homeClub ? `/klubb/${homeClub.slug}` : "/tabeller"}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Tilbake
          </Link>
        </div>

        {/* Match header */}
        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-16 text-center">
          {/* Date bar */}
          <div className="mb-8 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {date}
            </span>
            {time && (
              <span className="flex items-center gap-1.5">
                <Clock size={12} />
                {time}
              </span>
            )}
          </div>

          {/* Teams + score */}
          <div className="flex items-center justify-center gap-8 sm:gap-14">
            <div className="flex flex-col items-center gap-3 min-w-0 w-32 sm:w-40">
              {homeClub ? (
                <Link href={`/klubb/${homeClub.slug}`} className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-3 transition-transform hover:scale-105">
                  <img src={homeClub.logo} alt="" className="h-full w-full object-contain" />
                </Link>
              ) : (
                <div className="h-20 w-20 rounded-2xl bg-muted" />
              )}
              <div>
                <div className="text-sm font-semibold leading-tight sm:text-base">{home}</div>
                {homeStanding && (
                  <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                    #{homeStanding.position} &middot; {homeStanding.pts} poeng
                  </div>
                )}
              </div>
            </div>

            <div className="shrink-0">
              {isPlayed ? (
                <div className="flex items-baseline gap-3">
                  <span className={`text-4xl font-bold tabular-nums sm:text-5xl ${homeGoals > awayGoals ? "text-foreground" : "text-muted-foreground/50"}`}>
                    {homeGoals}
                  </span>
                  <span className="text-xl text-muted-foreground/30">-</span>
                  <span className={`text-4xl font-bold tabular-nums sm:text-5xl ${awayGoals > homeGoals ? "text-foreground" : "text-muted-foreground/50"}`}>
                    {awayGoals}
                  </span>
                </div>
              ) : (
                <div className="rounded-xl bg-muted px-5 py-3 text-center">
                  <div className="text-xl font-bold sm:text-2xl">{time || "TBD"}</div>
                  <div className="text-[9px] uppercase tracking-widest text-muted-foreground">Avspark</div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-3 min-w-0 w-32 sm:w-40">
              {awayClub ? (
                <Link href={`/klubb/${awayClub.slug}`} className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white p-3 transition-transform hover:scale-105">
                  <img src={awayClub.logo} alt="" className="h-full w-full object-contain" />
                </Link>
              ) : (
                <div className="h-20 w-20 rounded-2xl bg-muted" />
              )}
              <div>
                <div className="text-sm font-semibold leading-tight sm:text-base">{away}</div>
                {awayStanding && (
                  <div className="mt-1 font-mono text-[10px] text-muted-foreground">
                    #{awayStanding.position} &middot; {awayStanding.pts} poeng
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Venue */}
          {venue && (
            <div className="mt-6 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <MapPin size={12} />
              {venue}
            </div>
          )}
        </div>

        {/* Win probability */}
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              <TrendingUp size={12} />
              {isPlayed ? "Forventet utfall" : "Sannsynlighet"}
            </div>
            <div className="flex h-3 overflow-hidden rounded-full bg-muted">
              <div className="rounded-l-full transition-all" style={{ width: `${prob.home}%`, background: "#16a34a" }} />
              <div className="transition-all" style={{ width: `${prob.draw}%`, background: "#52525b" }} />
              <div className="rounded-r-full transition-all" style={{ width: `${prob.away}%`, background: "#c5382a" }} />
            </div>
            <div className="mt-3 flex justify-between text-sm">
              <div>
                <span className="font-bold text-[#16a34a]">{prob.home}%</span>
                <span className="ml-1.5 text-xs text-muted-foreground">{home}</span>
              </div>
              <div className="text-center">
                <span className="font-bold text-muted-foreground">{prob.draw}%</span>
                <span className="ml-1.5 text-xs text-muted-foreground">Uavgjort</span>
              </div>
              <div className="text-right">
                <span className="font-bold text-[#c5382a]">{prob.away}%</span>
                <span className="ml-1.5 text-xs text-muted-foreground">{away}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Season stats */}
        {homeStanding && awayStanding && homeStanding.played > 0 && (
          <div className="mx-auto mt-6 max-w-3xl px-4 sm:px-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Sesongstatistikk
              </div>
              <div className="space-y-3">
                {[
                  { label: "Seire", h: homeStanding.won, a: awayStanding.won },
                  { label: "Uavgjort", h: homeStanding.drawn, a: awayStanding.drawn },
                  { label: "Tap", h: homeStanding.lost, a: awayStanding.lost },
                  { label: "Mål", h: homeStanding.goals, a: awayStanding.goals },
                ].map((stat) => {
                  const hNum = typeof stat.h === "number" ? stat.h : 0;
                  const aNum = typeof stat.a === "number" ? stat.a : 0;
                  const total = Math.max(hNum + aNum, 1);
                  return (
                    <div key={stat.label}>
                      <div className="mb-1 flex justify-between text-xs">
                        <span className="font-bold tabular-nums">{stat.h}</span>
                        <span className="text-muted-foreground">{stat.label}</span>
                        <span className="font-bold tabular-nums">{stat.a}</span>
                      </div>
                      <div className="flex h-1.5 gap-1 rounded-full overflow-hidden">
                        <div className="rounded-l-full bg-foreground/20 transition-all" style={{ width: `${(hNum / total) * 100}%` }} />
                        <div className="rounded-r-full bg-foreground/10 transition-all" style={{ width: `${(aNum / total) * 100}%` }} />
                      </div>
                    </div>
                  );
                })}
                <div className="flex justify-between text-xs pt-1 border-t border-border">
                  <span className={`font-bold tabular-nums ${homeStanding.gd > 0 ? "text-[#16a34a]" : homeStanding.gd < 0 ? "text-[#c5382a]" : ""}`}>
                    {homeStanding.gd > 0 ? `+${homeStanding.gd}` : homeStanding.gd}
                  </span>
                  <span className="text-muted-foreground">Målforskjell</span>
                  <span className={`font-bold tabular-nums ${awayStanding.gd > 0 ? "text-[#16a34a]" : awayStanding.gd < 0 ? "text-[#c5382a]" : ""}`}>
                    {awayStanding.gd > 0 ? `+${awayStanding.gd}` : awayStanding.gd}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Squads */}
        {(homeSquad.length > 0 || awaySquad.length > 0) && (
          <div className="mx-auto mt-6 max-w-3xl px-4 pb-16 sm:px-6">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                <Users size={12} />
                Tropper
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {[{ name: home, squad: homeSquad, club: homeClub }, { name: away, squad: awaySquad, club: awayClub }].map(({ name, squad, club }) => (
                  <div key={name}>
                    <div className="mb-3 flex items-center gap-2">
                      {club && (
                        <div className="flex h-6 w-6 items-center justify-center rounded bg-white p-0.5">
                          <img src={club.logo} alt="" className="h-4 w-4 object-contain" />
                        </div>
                      )}
                      <span className="text-sm font-semibold">{name}</span>
                      <span className="ml-auto font-mono text-[10px] text-muted-foreground">{squad.length} spillere</span>
                    </div>
                    {squad.length > 0 ? (
                      <div className="space-y-px overflow-hidden rounded-md border border-border">
                        {posOrder.map((pos) => {
                          const players = squad.filter((p) => p.position === pos);
                          if (players.length === 0) return null;
                          return (
                            <div key={pos}>
                              <div className="bg-muted/50 px-3 py-1 text-[9px] font-semibold uppercase tracking-widest text-muted-foreground">
                                {pos === "Ukjent" ? "Ikke satt" : pos}
                              </div>
                              {players.map((p) => (
                                <div key={p.name} className="flex items-center gap-2 bg-card px-3 py-1.5 border-t border-border/50">
                                  <span className="w-6 text-right font-mono text-[10px] text-muted-foreground/50">
                                    {p.number ?? "—"}
                                  </span>
                                  <span className="flex-1 truncate text-[12px]">{p.name}</span>
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="rounded-md border border-border bg-muted/20 px-3 py-6 text-center text-[11px] text-muted-foreground">
                        Tropp ikke tilgjengelig
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
