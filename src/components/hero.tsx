import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative">
      {/* Featured article — full bleed image */}
      <div className="relative min-h-[70vh] overflow-hidden sm:min-h-[80vh]">
        <Image
          src="https://picsum.photos/seed/telemarkfotball-hero/1600/900"
          alt="Treningskamp i Telemark"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />

        {/* Content pinned to bottom-left */}
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-10 sm:px-6 sm:pb-16">
          <div className="max-w-2xl">
            <Badge
              variant="secondary"
              className="mb-4 bg-[#c5382a] text-white hover:bg-[#c5382a]/90 border-none text-[11px] font-semibold uppercase tracking-wider"
            >
              Hovedsak
            </Badge>
            <h1 className="font-serif text-3xl leading-tight tracking-tight text-foreground sm:text-5xl sm:leading-[1.1]">
              Slik blir oppkjøringen til 2026-sesongen i Telemark
            </h1>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              Vi har samlet alt du trenger å vite om treningskamper, nye spillere
              og trenerskifter før seriestart i april.
            </p>
            <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground/70">
                Redaksjonen
              </span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <time dateTime="2026-04-08">8. april 2026</time>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
              <span>6 min lesing</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
