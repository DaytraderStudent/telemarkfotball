import Image from "next/image";

interface GalleryItem {
  title: string;
  count: string;
  image: string;
}

const galleries: GalleryItem[] = [
  {
    title: "Odd 2 vs Bø IL",
    count: "24 bilder",
    image: "https://picsum.photos/seed/gal-odd/500/500",
  },
  {
    title: "Pors sesongoppstart",
    count: "18 bilder",
    image: "https://picsum.photos/seed/gal-pors/500/500",
  },
  {
    title: "Notodden vintertrening",
    count: "31 bilder",
    image: "https://picsum.photos/seed/gal-noto/500/500",
  },
  {
    title: "Skien FK J19 cupfinale",
    count: "12 bilder",
    image: "https://picsum.photos/seed/gal-skien/500/500",
  },
];

export function Gallery() {
  return (
    <section id="galleriet" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-8 flex items-end justify-between border-b border-border pb-4">
        <h2 className="text-lg font-semibold tracking-tight">Bildeserier</h2>
        <a
          href="#"
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          Se alle
        </a>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {galleries.map((item) => (
          <a
            key={item.title}
            href="#"
            className="group relative aspect-square overflow-hidden rounded-lg"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
              <h3 className="text-xs font-semibold leading-snug text-white sm:text-sm">
                {item.title}
              </h3>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-widest text-white/60">
                {item.count}
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
