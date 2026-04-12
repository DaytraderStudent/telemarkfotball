import { IconInstagram, IconFacebook, IconYoutube } from "@/components/icons";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  {
    title: "Innhold",
    links: [
      { text: "Nyheter", url: "#nyheter" },
      { text: "Tabeller", url: "#tabeller" },
      { text: "Bildeserier", url: "#galleriet" },
      { text: "Arkiv", url: "#" },
    ],
  },
  {
    title: "Verktøy",
    links: [
      { text: "Stadionkart", url: "#" },
      { text: "Kampprogram", url: "#" },
      { text: "Toppscorere", url: "#" },
    ],
  },
  {
    title: "Om oss",
    links: [
      { text: "Kontakt", url: "#tips" },
      { text: "Tips oss", url: "#tips" },
      { text: "Personvern", url: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-5">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-1.5">
              <span className="text-[15px] font-semibold tracking-tight">
                Telemark
              </span>
              <span className="text-[15px] font-semibold tracking-tight text-[#c5382a]">
                Fotball
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Den enkleste måten å følge med på breddefotballen i Telemark.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://instagram.com/telemarkfotball"
                aria-label="Instagram"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <IconInstagram className="size-3.5" />
              </a>
              <a
                href="https://facebook.com/telemarkfotball"
                aria-label="Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <IconFacebook className="size-3.5" />
              </a>
              <a
                href="https://youtube.com/@telemarkfotball"
                aria-label="YouTube"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <IconYoutube className="size-3.5" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.text}>
                    <a
                      href={link.url}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
          <p>&copy; 2026 Telemark Fotball. Alle rettigheter reservert.</p>
          <div className="flex gap-4">
            <a href="#" className="transition-colors hover:text-foreground">
              Personvern
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Vilkår
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
