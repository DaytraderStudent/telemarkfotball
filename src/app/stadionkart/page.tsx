import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { stadiums } from "@/lib/data";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Stadionkart — Telemark Fotball",
  description: "Finn alle baner og stadioner i Telemark-fotballen.",
};

export default function StadionkartPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">Stadionkart</h1>
          <p className="mb-10 text-sm text-muted-foreground">
            Oversikt over baner og stadioner i Telemark-fotballen.
          </p>

          {/* Map embed */}
          <div className="mb-10 aspect-[16/9] overflow-hidden rounded-lg border border-border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d250000!2d9.4!3d59.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sno!2sno!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Stadionkart Telemark"
            />
          </div>

          {/* Stadium list */}
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {stadiums.map((stadium) => (
              <div
                key={stadium.name}
                className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#c5382a]/10">
                  <MapPin size={14} className="text-[#c5382a]" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{stadium.name}</h3>
                  <p className="text-xs text-muted-foreground">{stadium.club}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground/60">{stadium.location}</p>
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
