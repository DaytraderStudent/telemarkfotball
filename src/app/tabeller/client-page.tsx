"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { DivisionStandings } from "@/lib/standings-fetcher";

export function StandingsPage({ divisions }: { divisions: DivisionStandings[] }) {
  const [active, setActive] = useState(divisions[0]?.key || "4div");

  const current = divisions.find((d) => d.key === active);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">Tabeller</h1>
      <p className="mb-10 text-sm text-muted-foreground">
        Oppdateres daglig fra fotball.no
      </p>

      <div className="flex gap-8 lg:gap-12">
        {/* Sidebar */}
        <nav className="hidden w-48 shrink-0 md:block">
          <div className="sticky top-20 space-y-0.5">
            <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Divisjoner
            </div>
            {divisions.map((div) => (
              <button
                key={div.key}
                onClick={() => setActive(div.key)}
                className={`relative w-full cursor-pointer rounded-md px-3 py-2 text-left text-[13px] transition-colors ${
                  active === div.key
                    ? "bg-muted text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {div.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile dropdown */}
        <div className="mb-6 w-full md:hidden">
          <select
            value={active}
            onChange={(e) => setActive(e.target.value)}
            className="w-full rounded-md border border-border bg-card px-3 py-2.5 text-sm text-foreground"
          >
            {divisions.map((div) => (
              <option key={div.key} value={div.key}>
                {div.name}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="min-w-0 flex-1">
          {current && (
            <motion.div
              key={current.key}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
                  <h2 className="text-sm font-semibold capitalize">{current.name}</h2>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    2025
                  </span>
                </div>

                {current.rows.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                          <th className="w-10 py-3 pl-5 text-left font-mono">#</th>
                          <th className="py-3 text-left">Lag</th>
                          <th className="w-10 py-3 text-center font-mono">K</th>
                          <th className="w-10 py-3 text-center font-mono">S</th>
                          <th className="w-10 py-3 text-center font-mono">U</th>
                          <th className="w-10 py-3 text-center font-mono">T</th>
                          <th className="w-20 py-3 text-center font-mono">Mål</th>
                          <th className="w-10 py-3 text-center font-mono">+/-</th>
                          <th className="w-12 py-3 pr-5 text-right font-mono">P</th>
                        </tr>
                      </thead>
                      <tbody>
                        {current.rows.map((row) => (
                          <tr
                            key={row.team}
                            className="border-b border-border last:border-0 transition-colors hover:bg-muted/20"
                          >
                            <td className="py-3 pl-5 font-mono text-xs text-muted-foreground">
                              {row.position}
                            </td>
                            <td className="py-3 font-medium">{row.team}</td>
                            <td className="py-3 text-center font-mono text-xs text-muted-foreground">
                              {row.played}
                            </td>
                            <td className="py-3 text-center font-mono text-xs text-muted-foreground">
                              {row.won}
                            </td>
                            <td className="py-3 text-center font-mono text-xs text-muted-foreground">
                              {row.drawn}
                            </td>
                            <td className="py-3 text-center font-mono text-xs text-muted-foreground">
                              {row.lost}
                            </td>
                            <td className="py-3 text-center font-mono text-xs text-muted-foreground">
                              {row.goals}
                            </td>
                            <td className="py-3 text-center font-mono text-xs text-muted-foreground">
                              {row.gd > 0 ? `+${row.gd}` : row.gd}
                            </td>
                            <td className="py-3 pr-5 text-right font-mono text-xs font-bold">
                              {row.pts}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="px-5 py-12 text-center text-sm text-muted-foreground">
                    Tabelldata ikke tilgjengelig ennå
                  </div>
                )}
              </div>

              <p className="mt-3 text-right text-[10px] text-muted-foreground/50">
                Kilde: fotball.no
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
