"use client";

import dynamic from "next/dynamic";

const StadiumMap = dynamic(
  () => import("@/components/stadium-map").then((m) => m.StadiumMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[calc(100vh-56px)] items-center justify-center bg-background">
        <div className="text-sm text-muted-foreground">Laster kart...</div>
      </div>
    ),
  }
);

export function StadionkartClient() {
  return <StadiumMap />;
}
