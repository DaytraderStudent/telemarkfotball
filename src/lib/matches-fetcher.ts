export interface Match {
  date: string;
  time: string;
  home: string;
  score: string | null; // null = not played yet
  away: string;
  venue: string;
}

const fiksIds = [199109, 199987, 199242, 199243, 199780, 199781, 200655];

export async function fetchMatchesForClub(
  clubTeamNames: string[]
): Promise<{ played: Match[]; upcoming: Match[] }> {
  const played: Match[] = [];
  const upcoming: Match[] = [];
  const namesLower = clubTeamNames.map((n) => n.toLowerCase());

  for (const fiksId of fiksIds) {
    try {
      const res = await fetch(
        `https://www.fotball.no/fotballdata/turnering/hjem/?fiksId=${fiksId}`,
        { next: { revalidate: 86400 } }
      );
      const html = await res.text();

      // Find the match table (table index 3 has match data)
      const tables = html.match(/<table[^>]*>[\s\S]*?<\/table>/gi);
      if (!tables) continue;

      // Match table has: round, date, day, time, home, score, away, venue, matchId, format
      for (const table of tables) {
        const rows = table.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi);
        if (!rows || rows.length < 20) continue; // Match tables have many rows

        for (const row of rows) {
          const cells: string[] = [];
          const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
          let m;
          while ((m = tdRegex.exec(row)) !== null) {
            let text = m[1].replace(/<[^>]+>/g, "").trim();
            text = text.replace(/&#x([0-9A-Fa-f]+);/g, (_, hex: string) =>
              String.fromCharCode(parseInt(hex, 16))
            );
            text = text.replace(/&#(\d+);/g, (_, dec: string) =>
              String.fromCharCode(parseInt(dec, 10))
            );
            cells.push(text);
          }

          // Expected: round, date, day, time, home, score, away, venue, matchId, format
          if (cells.length < 8) continue;

          const home = cells[4];
          const scoreRaw = cells[5];
          const away = cells[6];

          if (!home || !away) continue;

          // Check if this match involves one of our teams
          const homeLower = home.toLowerCase();
          const awayLower = away.toLowerCase();
          const involves = namesLower.some(
            (n) => homeLower.includes(n) || awayLower.includes(n)
          );
          if (!involves) continue;

          const match: Match = {
            date: cells[1] || "",
            time: cells[3] || "",
            home,
            score: scoreRaw.includes("-") ? scoreRaw.trim() : null,
            away,
            venue: cells[7] || "",
          };

          if (match.score) {
            played.push(match);
          } else {
            upcoming.push(match);
          }
        }
        break; // Only process first large table per fiksId
      }
    } catch {
      // Skip failed fetches
    }
  }

  // Sort: played by date desc, upcoming by date asc
  played.sort((a, b) => b.date.localeCompare(a.date));
  upcoming.sort((a, b) => a.date.localeCompare(b.date));

  return {
    played: played.slice(0, 10),
    upcoming: upcoming.slice(0, 5),
  };
}

export interface H2HResult {
  date: string;
  home: string;
  away: string;
  score: string;
  homeGoals: number;
  awayGoals: number;
}

export interface H2HStats {
  matches: H2HResult[];
  homeWins: number;
  awayWins: number;
  draws: number;
  homeGoalsTotal: number;
  awayGoalsTotal: number;
}

export async function fetchHeadToHead(
  teamA: string,
  teamB: string
): Promise<H2HStats> {
  const results: H2HResult[] = [];
  const aLower = teamA.toLowerCase();
  const bLower = teamB.toLowerCase();

  for (const fiksId of fiksIds) {
    try {
      const res = await fetch(
        `https://www.fotball.no/fotballdata/turnering/hjem/?fiksId=${fiksId}`,
        { next: { revalidate: 86400 } }
      );
      const html = await res.text();
      const tables = html.match(/<table[^>]*>[\s\S]*?<\/table>/gi);
      if (!tables) continue;

      for (const table of tables) {
        const rows = table.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi);
        if (!rows || rows.length < 20) continue;

        for (const row of rows) {
          const cells: string[] = [];
          const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
          let m;
          while ((m = tdRegex.exec(row)) !== null) {
            let text = m[1].replace(/<[^>]+>/g, "").trim();
            text = text.replace(/&#x([0-9A-Fa-f]+);/g, (_, hex: string) =>
              String.fromCharCode(parseInt(hex, 16))
            );
            text = text.replace(/&#(\d+);/g, (_, dec: string) =>
              String.fromCharCode(parseInt(dec, 10))
            );
            cells.push(text);
          }

          if (cells.length < 8) continue;

          const home = cells[4];
          const scoreRaw = cells[5];
          const away = cells[6];

          if (!home || !away || !scoreRaw.includes("-")) continue;

          const homeLower = home.toLowerCase();
          const awayLower = away.toLowerCase();

          const isH2H =
            (homeLower === aLower && awayLower === bLower) ||
            (homeLower === bLower && awayLower === aLower);

          if (!isH2H) continue;

          const parts = scoreRaw.trim().split("-").map((s) => parseInt(s.trim()));
          results.push({
            date: cells[1] || "",
            home,
            away,
            score: scoreRaw.trim(),
            homeGoals: parts[0] || 0,
            awayGoals: parts[1] || 0,
          });
        }
        break;
      }
    } catch {
      // skip
    }
  }

  results.sort((a, b) => b.date.localeCompare(a.date));

  // Calculate stats relative to teamA
  let homeWins = 0, awayWins = 0, draws = 0;
  let homeGoalsTotal = 0, awayGoalsTotal = 0;

  for (const r of results) {
    const aIsHome = r.home.toLowerCase() === aLower;
    const aGoals = aIsHome ? r.homeGoals : r.awayGoals;
    const bGoals = aIsHome ? r.awayGoals : r.homeGoals;

    homeGoalsTotal += aGoals;
    awayGoalsTotal += bGoals;

    if (aGoals > bGoals) homeWins++;
    else if (bGoals > aGoals) awayWins++;
    else draws++;
  }

  return {
    matches: results,
    homeWins,
    awayWins,
    draws,
    homeGoalsTotal,
    awayGoalsTotal,
  };
}
