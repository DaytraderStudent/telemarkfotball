"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const clubs = [
  {
    name: "Odd",
    venue: "Skagerak Arena",
    division: "Eliteserien",
    location: "Skien",
    lat: 59.1986,
    lng: 9.6117,
  },
  {
    name: "Pors Grenland",
    venue: "Pors Stadion",
    division: "4. divisjon",
    location: "Porsgrunn",
    lat: 59.1392,
    lng: 9.6522,
  },
  {
    name: "Urædd",
    venue: "Urædd Stadion",
    division: "4. divisjon",
    location: "Porsgrunn",
    lat: 59.1356,
    lng: 9.6461,
  },
  {
    name: "Skien FK",
    venue: "Skien Fritidspark",
    division: "4. divisjon",
    location: "Skien",
    lat: 59.2075,
    lng: 9.6055,
  },
  {
    name: "Notodden FK",
    venue: "Notodden Stadion",
    division: "4. divisjon",
    location: "Notodden",
    lat: 59.5657,
    lng: 9.2611,
  },
  {
    name: "Bø IL",
    venue: "Bø Stadion",
    division: "4. divisjon",
    location: "Bø i Telemark",
    lat: 59.4107,
    lng: 9.064,
  },
  {
    name: "Porsgrunn FK",
    venue: "Kjølnes Stadion",
    division: "5. divisjon",
    location: "Porsgrunn",
    lat: 59.1296,
    lng: 9.6761,
  },
  {
    name: "Kragerø FK",
    venue: "Kragerø Stadion",
    division: "5. divisjon",
    location: "Kragerø",
    lat: 58.8692,
    lng: 9.4119,
  },
  {
    name: "Drangedal IL",
    venue: "Drangedal Stadion",
    division: "5. divisjon",
    location: "Drangedal",
    lat: 59.0819,
    lng: 9.0694,
  },
  {
    name: "Siljan IL",
    venue: "Siljan Stadion",
    division: "5. divisjon",
    location: "Siljan",
    lat: 59.2819,
    lng: 9.7306,
  },
  {
    name: "Holla FK",
    venue: "Ulefoss Stadion",
    division: "5. divisjon",
    location: "Ulefoss",
    lat: 59.2825,
    lng: 9.2753,
  },
  {
    name: "Bamble FK",
    venue: "Bamble Stadion",
    division: "5. divisjon",
    location: "Stathelle",
    lat: 59.0489,
    lng: 9.7167,
  },
  {
    name: "Stathelle FK",
    venue: "Stathelle Idrettsplass",
    division: "7. divisjon",
    location: "Stathelle",
    lat: 59.0539,
    lng: 9.7047,
  },
  {
    name: "Langesund FK",
    venue: "Langesund Stadion",
    division: "7. divisjon",
    location: "Langesund",
    lat: 59.0019,
    lng: 9.7494,
  },
  {
    name: "Seljord IL",
    venue: "Seljord Stadion",
    division: "7. divisjon",
    location: "Seljord",
    lat: 59.4833,
    lng: 8.6333,
  },
  {
    name: "Kviteseid IL",
    venue: "Kviteseid Stadion",
    division: "7. divisjon",
    location: "Kviteseid",
    lat: 59.4000,
    lng: 8.4833,
  },
  {
    name: "Fyresdal IL",
    venue: "Fyresdal Stadion",
    division: "7. divisjon",
    location: "Fyresdal",
    lat: 59.1833,
    lng: 8.1000,
  },
  {
    name: "Skarphedin",
    venue: "Skarphedin Stadion",
    division: "4. div kvinner",
    location: "Skien",
    lat: 59.2125,
    lng: 9.5900,
  },
];

function createDotIcon(isActive: boolean) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width: ${isActive ? "16px" : "12px"};
      height: ${isActive ? "16px" : "12px"};
      background: ${isActive ? "#c5382a" : "#e8e6e1"};
      border: 2px solid ${isActive ? "#fff" : "rgba(255,255,255,0.4)"};
      border-radius: 50%;
      box-shadow: 0 0 ${isActive ? "12px" : "6px"} rgba(197, 56, 42, ${isActive ? "0.6" : "0"});
      transition: all 0.2s ease;
      cursor: pointer;
    "></div>`,
    iconSize: [isActive ? 16 : 12, isActive ? 16 : 12],
    iconAnchor: [isActive ? 8 : 6, isActive ? 8 : 6],
    popupAnchor: [0, isActive ? -12 : -10],
  });
}

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(clubs.map((c) => [c.lat, c.lng]));
    map.fitBounds(bounds, { padding: [50, 50] });
  }, [map]);
  return null;
}

export function StadiumMap() {
  const [activeClub, setActiveClub] = useState<string | null>(null);

  return (
    <div className="relative h-[calc(100vh-56px)] w-full">
      <MapContainer
        center={[59.25, 9.3]}
        zoom={9}
        className="h-full w-full"
        zoomControl={false}
        attributionControl={false}
        style={{ background: "#0c0f14" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        <FitBounds />
        {clubs.map((club) => (
          <Marker
            key={club.name}
            position={[club.lat, club.lng]}
            icon={createDotIcon(activeClub === club.name)}
            eventHandlers={{
              click: () => setActiveClub(activeClub === club.name ? null : club.name),
            }}
          >
            <Popup
              closeButton={false}
              className="stadium-popup"
              offset={[0, -4]}
            >
              <div className="min-w-[180px]">
                <div className="text-[13px] font-semibold text-white">{club.name}</div>
                <div className="mt-0.5 text-[11px] text-white/50">{club.venue}</div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-medium text-white/70">
                    {club.division}
                  </span>
                  <span className="text-[10px] text-white/40">{club.location}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend overlay */}
      <div className="pointer-events-none absolute bottom-6 left-4 z-[1000] sm:bottom-8 sm:left-6">
        <div className="pointer-events-auto rounded-lg border border-white/[0.07] bg-[#13161d]/90 px-4 py-3 backdrop-blur-xl">
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-white/40">
            Divisjoner
          </div>
          <div className="flex flex-col gap-1.5">
            {["Eliteserien", "4. divisjon", "5. divisjon", "7. divisjon", "4. div kvinner"].map((div) => (
              <div key={div} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#e8e6e1]" />
                <span className="text-[11px] text-white/60">{div}</span>
                <span className="ml-auto font-mono text-[10px] text-white/30">
                  {clubs.filter((c) => c.division === div).length}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Title overlay */}
      <div className="pointer-events-none absolute left-4 top-4 z-[1000] sm:left-6 sm:top-6">
        <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">Stadionkart</h1>
        <p className="mt-1 text-xs text-white/40">
          {clubs.length} lag i Telemark &middot; Trykk på en prikk for detaljer
        </p>
      </div>
    </div>
  );
}
