import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { articles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Arkiv — Telemark Fotball",
  description: "Alle publiserte saker fra Telemark Fotball.",
};

export default function ArkivPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">Arkiv</h1>
          <p className="mb-10 text-sm text-muted-foreground">
            Alle publiserte saker fra Telemark Fotball.
          </p>

          <div className="divide-y divide-border">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/arkiv/${article.slug}`}
                className="group flex gap-5 py-6 first:pt-0 last:pb-0"
              >
                <div className="relative hidden aspect-[3/2] w-40 shrink-0 overflow-hidden rounded-md sm:block">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    unoptimized
                  />
                </div>
                <div className="flex min-w-0 flex-col justify-center">
                  <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-[#c5382a]">
                    {article.category}
                  </span>
                  <h2 className="mt-1 text-base font-semibold leading-snug tracking-tight text-foreground group-hover:text-foreground/80 sm:text-lg">
                    {article.title}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {article.excerpt}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <time>{article.date}</time>
                    <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/50" />
                    <span>{article.readTime}</span>
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
