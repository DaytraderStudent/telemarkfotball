import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { articles } from "@/lib/data";

export function Hero() {
  const featured = articles[0];

  return (
    <section className="relative">
      <div className="relative min-h-[70vh] overflow-hidden sm:min-h-[80vh]">
        <Image
          src={featured.image}
          alt={featured.title}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 sm:pb-16">
          <div className="max-w-2xl">
            <Badge
              variant="secondary"
              className="mb-4 border-none bg-[#c5382a] text-[11px] font-semibold uppercase tracking-wider text-white hover:bg-[#c5382a]/90"
            >
              {featured.category}
            </Badge>
            <Link href={`/arkiv/${featured.slug}`}>
              <h1 className="font-serif text-3xl leading-tight tracking-tight text-foreground transition-colors hover:text-foreground/80 sm:text-5xl sm:leading-[1.1]">
                {featured.title}
              </h1>
            </Link>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              {featured.excerpt}
            </p>
            <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground/70">Redaksjonen</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <time>{featured.date}</time>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span>{featured.readTime} lesing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
