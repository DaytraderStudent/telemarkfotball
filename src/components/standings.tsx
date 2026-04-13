import Link from "next/link";
import { fetchAllStandings } from "@/lib/standings-fetcher";
import { clubs } from "@/lib/clubs";

function getLogoForTeam(teamName: string): string | null {
  const name = teamName.toLowerCase();
  for (const club of clubs) {
    if (club.name.toLowerCase() === name) return club.logo;
    for (const team of club.teams) {
      if (team.name.toLowerCase() === name) return club.logo;
    }
  }
  const base = name.replace(/\s*\d+$/, "").trim();
  for (const club of clubs) {
    if (club.name.toLowerCase().startsWith(base)) return club.logo;
  }
  return null;
}

export async function Standings() {
  const allDivisions = await fetchAllStandings();
  // Show only first two divisions on homepage
  const displayed = allDivisions.slice(0, 2);

  return (
    <section id="tabeller" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex items-end justify-between border-b border-border pb-4">
        <h2 className="text-lg font-semibold tracking-tight">Tabeller</h2>
        <Link
          href="/tabeller"
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Alle divisjoner
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {displayed.map((division) => (
          <div
            key={division.key}
            className="overflow-hidden rounded-lg border border-border bg-card"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h3 className="text-sm font-semibold capitalize">{division.name}</h3>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                2025
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    <th className="w-10 py-2.5 pl-4 text-left font-mono">#</th>
                    <th className="py-2.5 text-left">Lag</th>
                    <th className="hidden w-10 py-2.5 text-center font-mono sm:table-cell">K</th>
                    <th className="w-12 py-2.5 pr-4 text-right font-mono">P</th>
                  </tr>
                </thead>
                <tbody>
                  {(division.rows.length > 0 ? division.rows.slice(0, 6) : []).map((team) => {
                    const logo = getLogoForTeam(team.team);
                    return (
                      <tr
                        key={team.team}
                        className="border-b border-border last:border-0 transition-colors hover:bg-muted/20"
                      >
                        <td className="py-2.5 pl-4 font-mono text-xs text-muted-foreground">
                          {team.position}
                        </td>
                        <td className="py-2.5">
                          <div className="flex items-center gap-2">
                            {logo ? (
                              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-white p-0.5">
                                <img src={logo} alt="" width={36} height={36} className="h-3.5 w-3.5 object-contain" loading="lazy" />
                              </div>
                            ) : (
                              <div className="h-5 w-5 shrink-0 rounded bg-muted" />
                            )}
                            <span className="text-sm font-medium">{team.team}</span>
                          </div>
                        </td>
                        <td className="hidden py-2.5 text-center font-mono text-xs text-muted-foreground sm:table-cell">
                          {team.played}
                        </td>
                        <td className="py-2.5 pr-4 text-right font-mono text-xs font-bold">
                          {team.pts}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
