import Image from "next/image";
import Link from "next/link";
import { articles } from "@/lib/data";

export function NewsGrid() {
  const [, ...rest] = articles;
  const displayed = rest.slice(0, 5);
  const [lead, ...side] = displayed;

  return (
    <section id="nyheter" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-8 flex items-end justify-between border-b border-border pb-4">
        <h2 className="text-lg font-semibold tracking-tight">Siste nytt</h2>
        <Link
          href="/arkiv"
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Se alle saker
        </Link>
      </div>

      <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-5 md:grid-rows-2">
        {/* Lead */}
        <Link
          href={`/arkiv/${lead.slug}`}
          className="group relative col-span-full bg-card md:col-span-3 md:row-span-2"
        >
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:h-full">
            <Image
              src={lead.image}
              alt={lead.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
            <span className="mb-2 inline-block font-mono text-[10px] font-medium uppercase tracking-widest text-[#c5382a]">
              {lead.category}
            </span>
            <h3 className="text-xl font-semibold leading-snug tracking-tight text-foreground sm:text-2xl">
              {lead.title}
            </h3>
            <p className="mt-2 hidden text-sm leading-relaxed text-muted-foreground sm:line-clamp-2 sm:block">
              {lead.excerpt}
            </p>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground">
              <time>{lead.date}</time>
              <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/50" />
              <span>{lead.readTime}</span>
            </div>
          </div>
        </Link>

        {/* Side articles */}
        {side.map((article) => (
          <Link
            key={article.slug}
            href={`/arkiv/${article.slug}`}
            className="group flex gap-4 bg-card p-4 transition-colors hover:bg-muted/50 md:col-span-2"
          >
            <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-md sm:w-24">
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
              <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug tracking-tight text-foreground">
                {article.title}
              </h3>
              <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                <time>{article.date}</time>
                <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/50" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
