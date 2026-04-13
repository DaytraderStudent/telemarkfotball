import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { NewsGrid } from "@/components/news-grid";
import { Standings } from "@/components/standings";
import { Gallery } from "@/components/gallery";
import { TipsForm } from "@/components/tips-form";
import { SiteFooter } from "@/components/site-footer";

export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <NewsGrid />
        <Standings />
        <Gallery />
        <TipsForm />
      </main>
      <SiteFooter />
    </>
  );
}
