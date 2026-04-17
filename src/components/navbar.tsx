"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { IconInstagram, IconFacebook, IconYoutube } from "@/components/icons";

const navLinks = [
  { label: "Nyheter", href: "/arkiv" },
  { label: "Tabeller", href: "/tabeller" },
  { label: "Ukens Lag", href: "/ukens-lag" },
  { label: "Bildeserier", href: "/bildeserier" },
  { label: "Stadionkart", href: "/stadionkart" },
  { label: "Tips oss", href: "/tips" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            Telemark
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-[#c5382a]">
            Fotball
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social + mobile toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 md:flex">
            <a
              href="https://instagram.com/telemarkfotball"
              aria-label="Instagram"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconInstagram className="size-4" />
            </a>
            <a
              href="https://facebook.com/telemarkfotball"
              aria-label="Facebook"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconFacebook className="size-4" />
            </a>
            <a
              href="https://youtube.com/@telemarkfotball"
              aria-label="YouTube"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <IconYoutube className="size-4" />
            </a>
          </div>
          <button
            onClick={() => setOpen(!open)}
            className="cursor-pointer rounded-md p-1.5 text-muted-foreground transition-colors hover:text-foreground md:hidden"
            aria-label="Åpne meny"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border bg-background px-4 pb-6 pt-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-4 flex items-center gap-4 border-t border-border px-3 pt-4">
            <a href="https://instagram.com/telemarkfotball" aria-label="Instagram" className="text-muted-foreground hover:text-foreground">
              <IconInstagram className="size-[18px]" />
            </a>
            <a href="https://facebook.com/telemarkfotball" aria-label="Facebook" className="text-muted-foreground hover:text-foreground">
              <IconFacebook className="size-[18px]" />
            </a>
            <a href="https://youtube.com/@telemarkfotball" aria-label="YouTube" className="text-muted-foreground hover:text-foreground">
              <IconYoutube className="size-[18px]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
