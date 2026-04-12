"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { clubs, divisionColors, type Club } from "@/lib/clubs";

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(clubs.map((c) => [c.lat, c.lng]));
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map]);
  return null;
}

const divisions = Object.keys(divisionColors);

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

        {clubs.map((club) => {
          const color = divisionColors[club.division] || "#e8e6e1";
          return (
            <CircleMarker
              key={`${club.name}-${club.division}`}
              center={[club.lat, club.lng]}
              radius={6}
              pathOptions={{
                color: "rgba(255,255,255,0.3)",
                fillColor: color,
                fillOpacity: 0.9,
                weight: 1.5,
              }}
              eventHandlers={{
                mouseover: (e) => {
                  e.target.setRadius(9);
                  e.target.setStyle({ weight: 2, color: "#fff", fillOpacity: 1 });
                },
                mouseout: (e) => {
                  e.target.setRadius(6);
                  e.target.setStyle({ weight: 1.5, color: "rgba(255,255,255,0.3)", fillOpacity: 0.9 });
                },
              }}
            >
              <Popup closeButton={false} offset={[0, -6]}>
                <div className="min-w-[170px]">
                  <div className="text-[13px] font-semibold text-white leading-tight">
                    {club.name}
                  </div>
                  <div className="mt-0.5 text-[11px] text-white/50">
                    {club.venue}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span
                      className="inline-flex items-center gap-1.5 rounded px-1.5 py-0.5 text-[10px] font-medium"
                      style={{ background: `${color}22`, color }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: color }}
                      />
                      {club.division}
                    </span>
                    <span className="text-[10px] text-white/30">
                      {club.location}
                    </span>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Legend */}
      <div className="pointer-events-none absolute bottom-6 left-4 z-[1000] sm:bottom-8 sm:left-6">
        <div className="pointer-events-auto rounded-lg border border-white/[0.07] bg-[#13161d]/90 px-4 py-3 backdrop-blur-xl">
          <div className="mb-2.5 text-[10px] font-semibold uppercase tracking-widest text-white/40">
            Divisjoner
          </div>
          <div className="flex flex-col gap-2">
            {divisions.map((div) => (
              <div key={div} className="flex items-center gap-2.5">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: divisionColors[div] }}
                />
                <span className="text-[11px] text-white/60">{div}</span>
                <span className="ml-auto pl-3 font-mono text-[10px] text-white/25">
                  {clubs.filter((c) => c.division === div).length}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-2.5 border-t border-white/[0.07] pt-2 text-[10px] text-white/25">
            {clubs.length} lag totalt
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="pointer-events-none absolute left-4 top-4 z-[1000] sm:left-6 sm:top-6">
        <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          Stadionkart
        </h1>
        <p className="mt-1 text-xs text-white/40">
          Alle lag i breddefotballen i Telemark
        </p>
      </div>
    </div>
  );
}
