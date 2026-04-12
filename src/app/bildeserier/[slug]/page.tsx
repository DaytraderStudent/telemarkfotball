import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { galleries } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export function generateStaticParams() {
  return galleries.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const gallery = galleries.find((g) => g.slug === slug);
  if (!gallery) return { title: "Ikke funnet" };
  return {
    title: `${gallery.title} — Bildeserier — Telemark Fotball`,
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const gallery = galleries.find((g) => g.slug === slug);
  if (!gallery) notFound();

  // Simulated gallery images (same source, different seeds)
  const images = Array.from({ length: parseInt(gallery.count) > 12 ? 12 : parseInt(gallery.count) }, (_, i) => ({
    src: `https://picsum.photos/seed/${gallery.slug}-${i}/800/600`,
    alt: `${gallery.title} bilde ${i + 1}`,
  }));

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <Link
            href="/bildeserier"
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Tilbake til bildeserier
          </Link>

          <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">{gallery.title}</h1>
          <p className="mb-10 text-sm text-muted-foreground">
            {gallery.count} &middot; {gallery.year}
          </p>

          <div className="columns-2 gap-3 sm:columns-3 sm:gap-4">
            {images.map((img, i) => (
              <div key={i} className="mb-3 overflow-hidden rounded-lg sm:mb-4">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={600}
                  className="w-full"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
