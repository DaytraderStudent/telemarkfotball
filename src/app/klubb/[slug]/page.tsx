import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { clubs } from "@/lib/clubs";
import { ArrowLeft, MapPin } from "lucide-react";

export function generateStaticParams() {
  return clubs.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const club = clubs.find((c) => c.slug === slug);
  if (!club) return { title: "Ikke funnet" };
  return {
    title: `${club.name} — Telemark Fotball`,
    description: `Oversikt over ${club.name} sine lag i breddefotballen i Telemark.`,
  };
}

export default async function ClubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const club = clubs.find((c) => c.slug === slug);
  if (!club) notFound();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
          {/* Back */}
          <Link
            href="/stadionkart"
            className="mb-8 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Tilbake til stadionkart
          </Link>

          {/* Club header */}
          <div className="flex items-center gap-5">
            <img
              src={club.logo}
              alt={club.name}
              width={72}
              height={72}
              className="shrink-0"
            />
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {club.name}
              </h1>
              <div className="mt-1.5 flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="shrink-0" />
                <span>{club.venue}</span>
                <span className="text-muted-foreground/40">&middot;</span>
                <span>{club.location}</span>
              </div>
            </div>
          </div>

          {/* Teams */}
          <div className="mt-10">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Lag ({club.teams.length})
            </h2>
            <div className="divide-y divide-border rounded-lg border border-border bg-card">
              {club.teams.map((team) => (
                <div
                  key={`${team.name}-${team.division}`}
                  className="flex items-center gap-4 px-5 py-4"
                >
                  <img
                    src={club.logo}
                    alt={team.name}
                    width={36}
                    height={36}
                    className="shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold">{team.name}</div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      {team.division} &middot; Sesong 2025
                    </div>
                  </div>
                  <a
                    href={
                      team.division === "4. divisjon"
                        ? "https://www.fotball.no/fotballdata/turnering/hjem/?fiksId=199109"
                        : team.division === "5. divisjon"
                        ? "https://www.fotball.no/fotballdata/turnering/hjem/?fiksId=199242"
                        : team.division === "6. divisjon"
                        ? "https://www.fotball.no/fotballdata/turnering/hjem/?fiksId=199243"
                        : team.division === "7. divisjon"
                        ? "https://www.fotball.no/fotballdata/turnering/hjem/?fiksId=199780"
                        : team.division === "4. div kvinner"
                        ? "https://www.fotball.no/fotballdata/turnering/hjem/?fiksId=199987"
                        : "#"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 rounded-md border border-border px-3 py-1.5 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    Se på fotball.no
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Map link */}
          <div className="mt-8 rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Vis på kart</div>
                <div className="mt-0.5 text-xs text-muted-foreground">
                  {club.venue}, {club.location}
                </div>
              </div>
              <a
                href={`https://www.google.com/maps?q=${club.lat},${club.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-md bg-[#c5382a] px-3.5 py-1.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#a82e22]"
              >
                Åpne i Google Maps
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
