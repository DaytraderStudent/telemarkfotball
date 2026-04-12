import Link from "next/link";
import { divisions } from "@/lib/data";

export function Standings() {
  const displayed = divisions.slice(0, 2);

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
            key={division.name}
            className="overflow-hidden rounded-lg border border-border bg-card"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h3 className="text-sm font-semibold capitalize">{division.name}</h3>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                2026
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    <th className="w-10 py-2.5 pl-4 text-left font-mono">#</th>
                    <th className="py-2.5 text-left">Lag</th>
                    <th className="hidden w-10 py-2.5 text-center font-mono sm:table-cell">K</th>
                    <th className="hidden w-10 py-2.5 text-center font-mono sm:table-cell">S</th>
                    <th className="hidden w-10 py-2.5 text-center font-mono sm:table-cell">U</th>
                    <th className="hidden w-10 py-2.5 text-center font-mono sm:table-cell">T</th>
                    <th className="w-12 py-2.5 pr-4 text-right font-mono">P</th>
                  </tr>
                </thead>
                <tbody>
                  {division.teams.map((team) => (
                    <tr
                      key={team.name}
                      className="border-b border-border last:border-0 transition-colors hover:bg-muted/30"
                    >
                      <td className="py-2.5 pl-4 font-mono text-xs text-muted-foreground">
                        {team.pos}
                      </td>
                      <td className="py-2.5 font-medium">{team.name}</td>
                      <td className="hidden py-2.5 text-center font-mono text-xs text-muted-foreground sm:table-cell">
                        {team.played}
                      </td>
                      <td className="hidden py-2.5 text-center font-mono text-xs text-muted-foreground sm:table-cell">
                        {team.won}
                      </td>
                      <td className="hidden py-2.5 text-center font-mono text-xs text-muted-foreground sm:table-cell">
                        {team.drawn}
                      </td>
                      <td className="hidden py-2.5 text-center font-mono text-xs text-muted-foreground sm:table-cell">
                        {team.lost}
                      </td>
                      <td className="py-2.5 pr-4 text-right font-mono text-xs font-bold">
                        {team.pts}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
