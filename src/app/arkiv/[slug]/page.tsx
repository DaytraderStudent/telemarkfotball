import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { articles } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) return { title: "Ikke funnet" };
  return {
    title: `${article.title} — Telemark Fotball`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Hero image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        </div>

        <article className="mx-auto max-w-3xl px-4 sm:px-6">
          {/* Back link */}
          <Link
            href="/arkiv"
            className="mb-6 mt-8 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Tilbake til arkiv
          </Link>

          {/* Meta */}
          <span className="mt-2 block font-mono text-[10px] font-medium uppercase tracking-widest text-[#c5382a]">
            {article.category}
          </span>
          <h1 className="mt-2 font-serif text-3xl leading-tight tracking-tight sm:text-4xl sm:leading-[1.1]">
            {article.title}
          </h1>
          <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-medium text-foreground/70">Redaksjonen</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <time>{article.date}</time>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
            <span>{article.readTime} lesing</span>
          </div>

          {/* Content */}
          <div className="prose prose-invert mt-10 max-w-none pb-16">
            {article.content.split("\n\n").map((p, i) => (
              <p key={i} className="mb-5 text-[15px] leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>
        </article>

        {/* Related */}
        <div className="border-t border-border">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
            <h2 className="mb-6 text-lg font-semibold tracking-tight">Flere saker</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/arkiv/${r.slug}`}
                  className="group overflow-hidden rounded-lg border border-border bg-card transition-colors hover:bg-muted/30"
                >
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={r.image}
                      alt={r.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-[#c5382a]">
                      {r.category}
                    </span>
                    <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug">
                      {r.title}
                    </h3>
                    <time className="mt-2 block text-[11px] text-muted-foreground">{r.date}</time>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
