"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Send } from "lucide-react";
import { IconInstagram, IconFacebook } from "@/components/icons";

export function TipsForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="tips" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="mb-8 border-b border-border pb-4">
        <h2 className="text-lg font-semibold tracking-tight">Tips oss</h2>
      </div>

      <div className="grid items-start gap-12 md:grid-cols-5">
        {/* Left — context */}
        <div className="md:col-span-2">
          <h3 className="font-serif text-2xl leading-snug tracking-tight sm:text-3xl">
            Har du et tips eller vet om en treningskamp?
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Vi dekker breddefotballen i hele Telemark og er alltid på jakt etter
            tips om kamper, overganger og hendelser fra lokalmiljøet.
          </p>

          <ul className="mt-8 space-y-4">
            <li>
              <a
                href="mailto:telemarkfotball@gmail.com"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <Mail size={16} strokeWidth={1.5} />
                telemarkfotball@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/telemarkfotball"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <IconInstagram className="size-4" />
                @telemarkfotball
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com/telemarkfotball"
                className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <IconFacebook className="size-4" />
                Telemark Fotball
              </a>
            </li>
          </ul>
        </div>

        {/* Right — form */}
        <div className="rounded-lg border border-border bg-card p-5 sm:p-6 md:col-span-3">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#c5382a]/10">
                <Send size={18} className="text-[#c5382a]" />
              </div>
              <p className="text-sm font-semibold">Takk for tipset!</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Vi tar kontakt om vi trenger mer info.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-xs font-medium"
                  >
                    Navn
                  </label>
                  <Input
                    id="name"
                    placeholder="Ditt navn"
                    className="bg-background"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-medium"
                  >
                    E-post
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="din@epost.no"
                    className="bg-background"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-xs font-medium"
                >
                  Melding
                </label>
                <Textarea
                  id="message"
                  rows={4}
                  placeholder="Fortell oss om treningskamper, overganger, hendelser..."
                  className="bg-background resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full cursor-pointer bg-[#c5382a] text-white hover:bg-[#a82e22]"
              >
                Send inn
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
