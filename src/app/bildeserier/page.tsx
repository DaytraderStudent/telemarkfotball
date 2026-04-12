import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { galleries } from "@/lib/data";

export const metadata: Metadata = {
  title: "Bildeserier — Telemark Fotball",
  description: "Bilder fra kamper og arrangementer i Telemark-fotballen.",
};

export default function BildeserierPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">Bildeserier</h1>
          <p className="mb-10 max-w-xl text-sm text-muted-foreground">
            Bilder fra kamper og arrangementer rundt i Telemark. Om du vil bruke bilder
            privat er det helt greit — vi ber kun om en liten kreditering til Telemark Fotball.
          </p>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {galleries.map((item) => (
              <Link
                key={item.slug}
                href={`/bildeserier/${item.slug}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-sm font-semibold text-white sm:text-base">{item.title}</h3>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                      {item.count}
                    </span>
                    <span className="h-0.5 w-0.5 rounded-full bg-white/40" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                      {item.year}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
