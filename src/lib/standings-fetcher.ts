export interface StandingsRow {
  position: number;
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals: string;
  gd: number;
  pts: number;
}

export interface DivisionStandings {
  key: string;
  name: string;
  fiksId: number;
  rows: StandingsRow[];
}

export const divisionsList = [
  { key: "4div", name: "4. divisjon herrer", fiksId: 199109 },
  { key: "4divk", name: "4. divisjon kvinner", fiksId: 199987 },
  { key: "5div", name: "5. divisjon herrer", fiksId: 199242 },
  { key: "6div", name: "6. divisjon herrer", fiksId: 199243 },
  { key: "7divA", name: "7. divisjon avd. A", fiksId: 199780 },
  { key: "7divB", name: "7. divisjon avd. B", fiksId: 199781 },
  { key: "7divC", name: "7. divisjon avd. C", fiksId: 200655 },
];

async function fetchTable(fiksId: number): Promise<StandingsRow[]> {
  try {
    const res = await fetch(
      `https://www.fotball.no/fotballdata/turnering/tabell/?fiksId=${fiksId}`,
      { next: { revalidate: 86400 } }
    );
    const html = await res.text();

    // Find all tables and pick the second one (index 1) — that's the full standings
    const tables = html.match(/<table[^>]*>[\s\S]*?<\/table>/gi);
    if (!tables || tables.length < 2) return [];

    const standingsTable = tables[1];

    // Extract all cell values
    const tdRegex = /<td[^>]*>([\s\S]*?)<\/td>/gi;
    const cells: string[] = [];
    let m;
    while ((m = tdRegex.exec(standingsTable)) !== null) {
      cells.push(m[1].replace(/<[^>]+>/g, "").trim());
    }

    // Each row has 9 cells: pos, team, played, won, drawn, lost, goals (X - Y), gd, pts
    const rows: StandingsRow[] = [];
    const cellsPerRow = 9;
    const numRows = Math.floor(cells.length / cellsPerRow);

    for (let i = 0; i < numRows; i++) {
      const offset = i * cellsPerRow;
      rows.push({
        position: parseInt(cells[offset]) || i + 1,
        team: cells[offset + 1],
        played: parseInt(cells[offset + 2]) || 0,
        won: parseInt(cells[offset + 3]) || 0,
        drawn: parseInt(cells[offset + 4]) || 0,
        lost: parseInt(cells[offset + 5]) || 0,
        goals: cells[offset + 6],
        gd: parseInt(cells[offset + 7]) || 0,
        pts: parseInt(cells[offset + 8]) || 0,
      });
    }

    return rows;
  } catch {
    return [];
  }
}

export async function fetchAllStandings(): Promise<DivisionStandings[]> {
  const results = await Promise.all(
    divisionsList.map(async (div) => {
      const rows = await fetchTable(div.fiksId);
      return { ...div, rows };
    })
  );
  return results;
}
