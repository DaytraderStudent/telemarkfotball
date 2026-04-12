import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { divisions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Tabeller — Telemark Fotball",
  description: "Tabeller for alle divisjoner i Telemark-fotballen.",
};

export default function TabellerPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">Tabeller</h1>
          <p className="mb-10 text-sm text-muted-foreground">
            Sesongen 2026 har ikke startet ennå. Tabellene oppdateres fortløpende etter seriestart.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {divisions.map((division) => (
              <div
                key={division.slug}
                className="overflow-hidden rounded-lg border border-border bg-card"
              >
                <div className="flex items-center justify-between border-b border-border px-4 py-3">
                  <h2 className="text-sm font-semibold capitalize">{division.name}</h2>
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
                        <th className="w-10 py-2.5 text-center font-mono">K</th>
                        <th className="w-10 py-2.5 text-center font-mono">S</th>
                        <th className="w-10 py-2.5 text-center font-mono">U</th>
                        <th className="w-10 py-2.5 text-center font-mono">T</th>
                        <th className="w-12 py-2.5 text-center font-mono">MF</th>
                        <th className="w-12 py-2.5 pr-4 text-right font-mono">P</th>
                      </tr>
                    </thead>
                    <tbody>
                      {division.teams.map((team) => (
                        <tr
                          key={team.name}
                          className="border-b border-border transition-colors last:border-0 hover:bg-muted/30"
                        >
                          <td className="py-2.5 pl-4 font-mono text-xs text-muted-foreground">
                            {team.pos}
                          </td>
                          <td className="py-2.5 font-medium">{team.name}</td>
                          <td className="py-2.5 text-center font-mono text-xs text-muted-foreground">
                            {team.played}
                          </td>
                          <td className="py-2.5 text-center font-mono text-xs text-muted-foreground">
                            {team.won}
                          </td>
                          <td className="py-2.5 text-center font-mono text-xs text-muted-foreground">
                            {team.drawn}
                          </td>
                          <td className="py-2.5 text-center font-mono text-xs text-muted-foreground">
                            {team.lost}
                          </td>
                          <td className="py-2.5 text-center font-mono text-xs text-muted-foreground">
                            {team.gd}
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
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
