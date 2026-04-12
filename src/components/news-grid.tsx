import Image from "next/image";

interface Article {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
}

const articles: Article[] = [
  {
    title: "Treningskampene: Komplett oversikt over alle oppgjør i oppkjøringen",
    excerpt:
      "Vi oppdaterer fortløpende med resultater og kampfakta fra treningskampene i Telemark.",
    category: "Oppkjøring",
    date: "5. apr 2026",
    image: "https://picsum.photos/seed/tf-trening1/600/400",
    readTime: "4 min",
  },
  {
    title: "Odd 2 med solid seier i generalprøven mot Bø",
    excerpt:
      "Andrelagsspillerne viste fin form da de slo Bø 3-1 på Skagerak Arena torsdag kveld.",
    category: "3. divisjon",
    date: "2. apr 2026",
    image: "https://picsum.photos/seed/tf-odd2/600/400",
    readTime: "3 min",
  },
  {
    title: "Porsgrunn FK henter to nye foran sesongstart",
    excerpt:
      "Klubben har sikret seg en midtbanespiller og en venstreback fra lokale rivaler i Grenland.",
    category: "4. divisjon",
    date: "29. mar 2026",
    image: "https://picsum.photos/seed/tf-porsgrunn/600/400",
    readTime: "2 min",
  },
  {
    title: "Notodden med ambisiøse planer: Vil tilbake til 2. divisjon",
    excerpt:
      "Styreleder Knut Eriksen forteller om en treårsplan som inkluderer ny kunstgress og spillerbudsjett.",
    category: "3. divisjon",
    date: "26. mar 2026",
    image: "https://picsum.photos/seed/tf-notodden/600/400",
    readTime: "5 min",
  },
  {
    title: "Skien FK satser på lokal ungdom i ny sesong",
    excerpt:
      "Sju spillere fra juniorlaget har fått plass i A-stallen til 2026-sesongen.",
    category: "4. divisjon",
    date: "22. mar 2026",
    image: "https://picsum.photos/seed/tf-skien/600/400",
    readTime: "3 min",
  },
];

export function NewsGrid() {
  const [lead, ...rest] = articles;

  return (
    <section id="nyheter" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-8 flex items-end justify-between border-b border-border pb-4">
        <h2 className="text-lg font-semibold tracking-tight">Siste nytt</h2>
        <a
          href="#"
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Se alle saker
        </a>
      </div>

      <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-5 md:grid-rows-2">
        {/* Lead article — spans 3 cols, 2 rows */}
        <a
          href="#"
          className="group relative col-span-full bg-card md:col-span-3 md:row-span-2"
        >
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:h-full">
            <Image
              src={lead.image}
              alt={lead.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
        </a>

        {/* Remaining articles — 2 cols, stacked */}
        {rest.map((article, i) => (
          <a
            key={i}
            href="#"
            className="group flex gap-4 bg-card p-4 transition-colors hover:bg-muted/50 md:col-span-2"
          >
            <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-md sm:w-24">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex min-w-0 flex-col justify-center">
              <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-[#c5382a]">
                {article.category}
              </span>
              <h3 className="mt-1 text-sm font-semibold leading-snug tracking-tight text-foreground line-clamp-2">
                {article.title}
              </h3>
              <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                <time>{article.date}</time>
                <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/50" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
