import { getPlayerSlug, squads, type Player } from "@/lib/players";

export interface PlayerMatchRating {
  playerSlug: string;
  playerName: string;
  position: Player["position"];
  coachRating: number;
  motmVotes: number;
  goals?: number;
  assists?: number;
}

export interface MatchRatings {
  id: string;
  date: string;
  round: number;
  division: string;
  homeTeam: string;
  awayTeam: string;
  homeClubSlug: string;
  awayClubSlug: string;
  homeScore: number;
  awayScore: number;
  featuredClubSlug: string;
  lineup: PlayerMatchRating[];
  totalVotes: number;
  motmPlayerSlug: string;
}

function findPlayer(clubSlug: string, name: string): Player | null {
  const squad = squads.find((s) => s.clubSlug === clubSlug);
  if (!squad) return null;
  return squad.players.find((p) => p.name === name) ?? null;
}

function rating(
  clubSlug: string,
  name: string,
  coachRating: number,
  motmVotes: number,
  extra: { goals?: number; assists?: number } = {}
): PlayerMatchRating {
  const player = findPlayer(clubSlug, name);
  if (!player) {
    throw new Error(`Player not found: ${clubSlug} / ${name}`);
  }
  return {
    playerSlug: getPlayerSlug(player, clubSlug),
    playerName: player.name,
    position: player.position,
    coachRating,
    motmVotes,
    ...extra,
  };
}

export const matchRatings: MatchRatings[] = [
  {
    id: "eidanger-urædd-r5",
    date: "2026-04-12",
    round: 5,
    division: "4. divisjon",
    homeTeam: "Eidanger",
    awayTeam: "Urædd",
    homeClubSlug: "eidanger",
    awayClubSlug: "uraedd",
    homeScore: 3,
    awayScore: 1,
    featuredClubSlug: "eidanger",
    totalVotes: 487,
    motmPlayerSlug: "eidanger-haakon-aaltvedt-pettersen",
    lineup: [
      rating("eidanger", "Marcus Ferdinand Auraaen Lindberg", 7.5, 18),
      rating("eidanger", "Simen Thon", 7.0, 12),
      rating("eidanger", "Kristián Gallik", 8.0, 41),
      rating("eidanger", "Maximilian Kreutzer", 7.2, 9),
      rating("eidanger", "Marius Kolve Johnsen", 6.8, 7),
      rating("eidanger", "Daniel Kristoffer Breiland Teigen", 7.8, 28),
      rating("eidanger", "Simon Disch Lindvig", 7.4, 19),
      rating("eidanger", "Marcus Engh-Ajer", 8.2, 52, { assists: 2 }),
      rating("eidanger", "Oliver Walsøe Strøm", 7.6, 31, { goals: 1 }),
      rating("eidanger", "Haakon Aaltvedt Pettersen", 9.1, 218, { goals: 2, assists: 1 }),
      rating("eidanger", "Filip Larsen Gripsgård", 7.3, 22),
      rating("uraedd", "Marcus Furevik Utne", 6.2, 2),
      rating("uraedd", "Federico Tisera Johansen", 6.8, 4),
      rating("uraedd", "Leander Meen-Dahlen", 7.1, 6),
      rating("uraedd", "Nemanja Mladenovic", 7.4, 8),
      rating("uraedd", "Kristoffer Skoglund Kristiansen", 6.9, 3),
      rating("uraedd", "Kristoffer Berg Høegh-Larsen", 7.3, 11),
      rating("uraedd", "Prince Allan Mlagulwa", 7.8, 15),
      rating("uraedd", "Mokhmad Sjamsudijevitsj Ibragimov", 7.2, 7),
      rating("uraedd", "Jørgen Aslaksen", 6.6, 2),
      rating("uraedd", "Granit Shala", 7.9, 24, { goals: 1 }),
      rating("uraedd", "Momodou Lamin Touray", 6.5, 5),
    ],
  },
  {
    id: "odd-eidanger-r4",
    date: "2026-04-05",
    round: 4,
    division: "4. divisjon",
    homeTeam: "Odd 3",
    awayTeam: "Eidanger",
    homeClubSlug: "odd",
    awayClubSlug: "eidanger",
    homeScore: 2,
    awayScore: 2,
    featuredClubSlug: "eidanger",
    totalVotes: 392,
    motmPlayerSlug: "eidanger-marcus-engh-ajer",
    lineup: [
      rating("eidanger", "Marcus Ferdinand Auraaen Lindberg", 8.2, 64),
      rating("eidanger", "Simen Thon", 7.4, 14),
      rating("eidanger", "Kristián Gallik", 7.8, 22),
      rating("eidanger", "Maximilian Kreutzer", 7.6, 16),
      rating("eidanger", "Marius Kolve Johnsen", 7.0, 8),
      rating("eidanger", "Daniel Kristoffer Breiland Teigen", 7.5, 17),
      rating("eidanger", "Simon Disch Lindvig", 7.2, 11),
      rating("eidanger", "Marcus Engh-Ajer", 8.7, 142, { goals: 1, assists: 1 }),
      rating("eidanger", "Oliver Walsøe Strøm", 7.3, 18),
      rating("eidanger", "Haakon Aaltvedt Pettersen", 8.0, 48, { goals: 1 }),
      rating("eidanger", "Filip Larsen Gripsgård", 6.9, 6),
      rating("odd", "Sebastian Hansen", 7.2, 9),
      rating("odd", "Jacob Buus Jacobsen", 6.8, 5),
      rating("odd", "Hans Christian Bonnesen", 7.4, 12),
      rating("odd", "Nikolas Walstad", 7.0, 7),
      rating("odd", "Godwill Fabio Ambrose", 7.3, 10),
      rating("odd", "Filip Rønningen Jørgensen", 7.9, 28, { assists: 1 }),
      rating("odd", "Per Daniel Söderberg", 7.6, 19),
      rating("odd", "Syver Aas", 7.1, 8),
      rating("odd", "Sanel Bojadzic", 8.1, 34, { goals: 1 }),
      rating("odd", "Villads Appel Rasmussen", 7.7, 22, { goals: 1 }),
      rating("odd", "Casper Glenna Andersen", 6.7, 3),
    ],
  },
  {
    id: "eidanger-hei-r3",
    date: "2026-03-29",
    round: 3,
    division: "4. divisjon",
    homeTeam: "Eidanger",
    awayTeam: "Hei",
    homeClubSlug: "eidanger",
    awayClubSlug: "hei",
    homeScore: 1,
    awayScore: 0,
    featuredClubSlug: "eidanger",
    totalVotes: 318,
    motmPlayerSlug: "eidanger-kristian-gallik",
    lineup: [
      rating("eidanger", "Marcus Ferdinand Auraaen Lindberg", 7.8, 32),
      rating("eidanger", "Simen Thon", 7.6, 21),
      rating("eidanger", "Kristián Gallik", 8.8, 134),
      rating("eidanger", "Maximilian Kreutzer", 7.5, 18),
      rating("eidanger", "Marius Kolve Johnsen", 7.2, 11),
      rating("eidanger", "Samuel Hoff Fosse", 7.1, 9),
      rating("eidanger", "Simon Disch Lindvig", 6.9, 7),
      rating("eidanger", "Marcus Engh-Ajer", 7.7, 27),
      rating("eidanger", "Oliver Walsøe Strøm", 7.4, 16),
      rating("eidanger", "Haakon Aaltvedt Pettersen", 7.9, 42, { goals: 1 }),
      rating("eidanger", "Martin Søvik Røren", 7.0, 8),
      rating("hei", "Lasse Tørnes Olsen", 6.7, 4),
      rating("hei", "Ole Martin Karlsen Sagarino", 7.4, 12),
      rating("hei", "Daniel André Wingereid Lauritzen", 7.1, 8),
      rating("hei", "Patrick Løvig", 6.8, 5),
      rating("hei", "Andre Gregersen", 7.2, 9),
    ],
  },
];

export function getMatchesForPlayer(playerSlug: string): MatchRatings[] {
  return matchRatings
    .filter((m) => m.lineup.some((p) => p.playerSlug === playerSlug))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPlayerRatingInMatch(
  match: MatchRatings,
  playerSlug: string
): PlayerMatchRating | null {
  return match.lineup.find((p) => p.playerSlug === playerSlug) ?? null;
}

export function getAveragePlayerRating(playerSlug: string): number | null {
  const matches = getMatchesForPlayer(playerSlug);
  if (matches.length === 0) return null;
  const ratings = matches
    .map((m) => getPlayerRatingInMatch(m, playerSlug)?.coachRating)
    .filter((r): r is number => typeof r === "number");
  if (ratings.length === 0) return null;
  return ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
}

export function countMotmWins(playerSlug: string): number {
  return matchRatings.filter((m) => m.motmPlayerSlug === playerSlug).length;
}

export function getLatestRound(): number {
  return Math.max(...matchRatings.map((m) => m.round));
}

export function getMatchesInRound(round: number): MatchRatings[] {
  return matchRatings.filter((m) => m.round === round);
}

export function getMatchById(id: string): MatchRatings | null {
  return matchRatings.find((m) => m.id === id) ?? null;
}

export interface TeamOfTheWeekSlot {
  role: "GK" | "DF" | "MF" | "FW";
  player: PlayerMatchRating;
  match: MatchRatings;
}

const roleForPosition: Record<Player["position"], TeamOfTheWeekSlot["role"]> = {
  Keeper: "GK",
  Forsvar: "DF",
  Midtbane: "MF",
  Angrep: "FW",
  Ukjent: "MF",
};

export function getTeamOfTheWeek(round: number): {
  slots: TeamOfTheWeekSlot[];
  motm: TeamOfTheWeekSlot | null;
  round: number;
} {
  const matches = getMatchesInRound(round);
  const pool: Array<{ entry: PlayerMatchRating; match: MatchRatings }> = [];
  for (const match of matches) {
    for (const entry of match.lineup) {
      pool.push({ entry, match });
    }
  }

  const byRole = (role: TeamOfTheWeekSlot["role"]) =>
    pool
      .filter(({ entry }) => roleForPosition[entry.position] === role)
      .sort((a, b) => b.entry.coachRating - a.entry.coachRating);

  const pick = (
    role: TeamOfTheWeekSlot["role"],
    count: number
  ): TeamOfTheWeekSlot[] =>
    byRole(role)
      .slice(0, count)
      .map(({ entry, match }) => ({ role, player: entry, match }));

  const slots: TeamOfTheWeekSlot[] = [
    ...pick("GK", 1),
    ...pick("DF", 4),
    ...pick("MF", 3),
    ...pick("FW", 3),
  ];

  const motmMatch = matches.reduce<MatchRatings | null>((best, m) => {
    if (!best) return m;
    return m.totalVotes > best.totalVotes ? m : best;
  }, null);

  let motm: TeamOfTheWeekSlot | null = null;
  if (motmMatch) {
    const entry = motmMatch.lineup.find(
      (p) => p.playerSlug === motmMatch.motmPlayerSlug
    );
    if (entry) {
      motm = {
        role: roleForPosition[entry.position],
        player: entry,
        match: motmMatch,
      };
    }
  }

  return { slots, motm, round };
}

export function getLatestMatchForClub(clubSlug: string): MatchRatings | null {
  const matches = matchRatings
    .filter((m) => m.homeClubSlug === clubSlug || m.awayClubSlug === clubSlug)
    .sort((a, b) => b.date.localeCompare(a.date));
  return matches[0] ?? null;
}
