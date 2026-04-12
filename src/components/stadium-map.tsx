"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { clubs } from "@/lib/clubs";

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(clubs.map((c) => [c.lat, c.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map]);
  return null;
}

const totalTeams = clubs.reduce((sum, c) => sum + c.teams.length, 0);

export function StadiumMap() {
  return (
    <div className="relative h-[calc(100vh-56px)] w-full">
      <MapContainer
        center={[59.2, 9.3]}
        zoom={9}
        className="h-full w-full"
        zoomControl={false}
        attributionControl={false}
        style={{ background: "#0c0f14" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
        <FitBounds />

        {clubs.map((club) => (
          <CircleMarker
            key={club.slug}
            center={[club.lat, club.lng]}
            radius={club.teams.length > 2 ? 8 : club.teams.length > 1 ? 7 : 5}
            pathOptions={{
              color: "rgba(255,255,255,0.25)",
              fillColor: "#e8e6e1",
              fillOpacity: 0.85,
              weight: 1.5,
            }}
            eventHandlers={{
              mouseover: (e) => {
                e.target.setStyle({
                  weight: 2,
                  color: "#fff",
                  fillColor: "#c5382a",
                  fillOpacity: 1,
                });
              },
              mouseout: (e) => {
                e.target.setStyle({
                  weight: 1.5,
                  color: "rgba(255,255,255,0.25)",
                  fillColor: "#e8e6e1",
                  fillOpacity: 0.85,
                });
              },
            }}
          >
            <Popup closeButton={false} offset={[0, -6]}>
              <div className="min-w-[200px]">
                {/* Header with logo */}
                <div className="flex items-center gap-2.5">
                  <img
                    src={club.logo}
                    alt={club.name}
                    width={32}
                    height={32}
                    className="shrink-0"
                    style={{ imageRendering: "auto" }}
                  />
                  <div>
                    <a
                      href={`/klubb/${club.slug}`}
                      className="text-[13px] font-semibold text-white hover:text-[#c5382a] transition-colors leading-tight"
                    >
                      {club.name}
                    </a>
                    <div className="text-[10px] text-white/40 leading-tight mt-0.5">
                      {club.venue}
                    </div>
                    <div className="text-[10px] text-white/30">{club.location}</div>
                  </div>
                </div>

                {/* Teams */}
                <div className="mt-2.5 border-t border-white/[0.07] pt-2 flex flex-col gap-1">
                  {club.teams.map((team) => (
                    <div
                      key={`${team.name}-${team.division}`}
                      className="flex items-center justify-between gap-3"
                    >
                      <span className="text-[11px] text-white/80">{team.name}</span>
                      <span className="shrink-0 text-[10px] text-white/30">{team.division}</span>
                    </div>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={`/klubb/${club.slug}`}
                  className="mt-2.5 flex items-center justify-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium text-white/60 transition-colors hover:bg-white/[0.1] hover:text-white"
                >
                  Se klubbside
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      {/* Info overlay */}
      <div className="pointer-events-none absolute bottom-6 left-4 z-[1000] sm:bottom-8 sm:left-6">
        <div className="pointer-events-auto rounded-lg border border-white/[0.07] bg-[#13161d]/90 px-4 py-3 backdrop-blur-xl">
          <div className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
            Telemark 2025
          </div>
          <div className="mt-1.5 text-[20px] font-bold leading-none text-white">
            {clubs.length} <span className="text-[13px] font-normal text-white/40">klubber</span>
          </div>
          <div className="mt-0.5 text-[11px] text-white/30">
            {totalTeams} lag i 5 divisjoner
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="pointer-events-none absolute left-4 top-4 z-[1000] sm:left-6 sm:top-6">
        <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          Stadionkart
        </h1>
        <p className="mt-1 text-xs text-white/40">
          Trykk på en prikk for detaljer
        </p>
      </div>
    </div>
  );
}
