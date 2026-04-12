import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { StadionkartClient } from "./client-page";

export const metadata: Metadata = {
  title: "Stadionkart — Telemark Fotball",
  description: "Finn alle baner og stadioner i Telemark-fotballen.",
};

export default function StadionkartPage() {
  return (
    <>
      <Navbar />
      <StadionkartClient />
    </>
  );
}
