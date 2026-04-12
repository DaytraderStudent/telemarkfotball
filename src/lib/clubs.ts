export interface Club {
  name: string;
  division: string;
  location: string;
  lat: number;
  lng: number;
}

// All unique clubs from fotball.no Telemark divisions 2025
// Coordinates are approximate stadium/club locations
export const clubs: Club[] = [
  // 4. divisjon herrer
  { name: "Hei", division: "4. divisjon", location: "Skien", lat: 59.2040, lng: 9.5920 },
  { name: "Langangen", division: "4. divisjon", location: "Langangen", lat: 59.0850, lng: 9.7600 },
  { name: "Eidanger", division: "4. divisjon", location: "Eidanger", lat: 59.1060, lng: 9.6950 },
  { name: "Odd 3", division: "4. divisjon", location: "Skien", lat: 59.1986, lng: 9.6117 },
  { name: "Urædd", division: "4. divisjon", location: "Porsgrunn", lat: 59.1396, lng: 9.6561 },
  { name: "Storm", division: "4. divisjon", location: "Porsgrunn", lat: 59.1450, lng: 9.6700 },
  { name: "Tollnes", division: "4. divisjon", location: "Skien", lat: 59.1870, lng: 9.6240 },
  { name: "Notodden 2", division: "4. divisjon", location: "Notodden", lat: 59.5657, lng: 9.2611 },
  { name: "Brevik", division: "4. divisjon", location: "Brevik", lat: 59.0520, lng: 9.6950 },
  { name: "Gulset", division: "4. divisjon", location: "Skien", lat: 59.2230, lng: 9.5720 },
  { name: "Skarphedin", division: "4. divisjon", location: "Skien", lat: 59.2125, lng: 9.5900 },
  { name: "Stathelle/Langesund", division: "4. divisjon", location: "Stathelle", lat: 59.0489, lng: 9.7167 },

  // 5. divisjon herrer
  { name: "Snøgg", division: "5. divisjon", location: "Heistad", lat: 59.1260, lng: 9.7190 },
  { name: "Sannidal", division: "5. divisjon", location: "Sannidal", lat: 58.9290, lng: 9.4830 },
  { name: "Skidar", division: "5. divisjon", location: "Skien", lat: 59.2100, lng: 9.6100 },
  { name: "Eidanger 2", division: "5. divisjon", location: "Eidanger", lat: 59.1080, lng: 9.6970 },
  { name: "Hei 2", division: "5. divisjon", location: "Skien", lat: 59.2060, lng: 9.5940 },
  { name: "Skiens Grane", division: "5. divisjon", location: "Skien", lat: 59.2150, lng: 9.6050 },
  { name: "Herkules", division: "5. divisjon", location: "Skien", lat: 59.2000, lng: 9.5800 },
  { name: "Storm 2", division: "5. divisjon", location: "Porsgrunn", lat: 59.1470, lng: 9.6720 },
  { name: "Urædd 2", division: "5. divisjon", location: "Porsgrunn", lat: 59.1416, lng: 9.6581 },
  { name: "Langesund/Stathelle", division: "5. divisjon", location: "Langesund", lat: 59.0019, lng: 9.7494 },
  { name: "Kroken", division: "5. divisjon", location: "Kroken", lat: 59.1680, lng: 9.6400 },
  { name: "Kragerø", division: "5. divisjon", location: "Kragerø", lat: 58.8692, lng: 9.4119 },

  // 6. divisjon herrer
  { name: "Borg", division: "6. divisjon", location: "Porsgrunn", lat: 59.1350, lng: 9.6400 },
  { name: "Sundjordet", division: "6. divisjon", location: "Porsgrunn", lat: 59.1300, lng: 9.6350 },
  { name: "Heddal", division: "6. divisjon", location: "Notodden", lat: 59.5450, lng: 9.2800 },
  { name: "Drangedal", division: "6. divisjon", location: "Drangedal", lat: 59.0819, lng: 9.0694 },
  { name: "Nome", division: "6. divisjon", location: "Ulefoss", lat: 59.2825, lng: 9.2753 },
  { name: "Sauherad", division: "6. divisjon", location: "Sauherad", lat: 59.4100, lng: 9.1900 },
  { name: "Brevik 2", division: "6. divisjon", location: "Brevik", lat: 59.0540, lng: 9.6970 },
  { name: "Siljan", division: "6. divisjon", location: "Siljan", lat: 59.2819, lng: 9.7306 },
  { name: "Seljord", division: "6. divisjon", location: "Seljord", lat: 59.4833, lng: 8.6333 },
  { name: "Bamble", division: "6. divisjon", location: "Stathelle", lat: 59.0509, lng: 9.7187 },
  { name: "Herøya", division: "6. divisjon", location: "Herøya", lat: 59.1250, lng: 9.6600 },
  { name: "Gjerpen", division: "6. divisjon", location: "Skien", lat: 59.2180, lng: 9.6200 },

  // 7. divisjon avd. A
  { name: "Skotfoss", division: "7. divisjon", location: "Skotfoss", lat: 59.2450, lng: 9.5200 },
  { name: "Sannidal 2", division: "7. divisjon", location: "Sannidal", lat: 58.9310, lng: 9.4850 },
  { name: "Åfoss", division: "7. divisjon", location: "Ulefoss", lat: 59.2900, lng: 9.2900 },
  { name: "Stridsklev", division: "7. divisjon", location: "Porsgrunn", lat: 59.1380, lng: 9.6650 },
  { name: "Bamble 2", division: "7. divisjon", location: "Stathelle", lat: 59.0529, lng: 9.7207 },
  { name: "Helle", division: "7. divisjon", location: "Helle", lat: 59.1100, lng: 9.7100 },

  // 7. divisjon avd. B
  { name: "Skarphedin 2", division: "7. divisjon", location: "Skien", lat: 59.2145, lng: 9.5920 },
  { name: "Vinje", division: "7. divisjon", location: "Vinje", lat: 59.5700, lng: 7.9900 },
  { name: "Gransherad/Heddal 2", division: "7. divisjon", location: "Notodden", lat: 59.5300, lng: 9.3000 },
  { name: "Nome 2", division: "7. divisjon", location: "Ulefoss", lat: 59.2845, lng: 9.2773 },
  { name: "Drangedal 2", division: "7. divisjon", location: "Drangedal", lat: 59.0839, lng: 9.0714 },
  { name: "Tørn", division: "7. divisjon", location: "Skien", lat: 59.2200, lng: 9.5850 },

  // 7. divisjon avd. C
  { name: "Storm 3", division: "7. divisjon", location: "Porsgrunn", lat: 59.1490, lng: 9.6740 },
  { name: "Pors 3", division: "7. divisjon", location: "Porsgrunn", lat: 59.1412, lng: 9.6542 },
  { name: "Gulset 2", division: "7. divisjon", location: "Skien", lat: 59.2250, lng: 9.5740 },
  { name: "Sundjordet 2", division: "7. divisjon", location: "Porsgrunn", lat: 59.1320, lng: 9.6370 },
  { name: "Urædd 3", division: "7. divisjon", location: "Porsgrunn", lat: 59.1436, lng: 9.6601 },
  { name: "Hei 3", division: "7. divisjon", location: "Skien", lat: 59.2080, lng: 9.5960 },

  // 4. divisjon kvinner
  { name: "Odd 2 kvinner", division: "4. div kvinner", location: "Skien", lat: 59.2006, lng: 9.6137 },
  { name: "Snøgg kvinner", division: "4. div kvinner", location: "Heistad", lat: 59.1280, lng: 9.7210 },
  { name: "Tollnes kvinner", division: "4. div kvinner", location: "Skien", lat: 59.1890, lng: 9.6260 },
  { name: "Skarphedin kvinner", division: "4. div kvinner", location: "Skien", lat: 59.2165, lng: 9.5940 },
  { name: "Fossum/Storm kvinner", division: "4. div kvinner", location: "Porsgrunn", lat: 59.1500, lng: 9.6750 },
  { name: "Urædd kvinner", division: "4. div kvinner", location: "Porsgrunn", lat: 59.1376, lng: 9.6541 },
  { name: "Sauherad kvinner", division: "4. div kvinner", location: "Sauherad", lat: 59.4120, lng: 9.1920 },
  { name: "Herkules kvinner", division: "4. div kvinner", location: "Skien", lat: 59.2020, lng: 9.5820 },
];

// Deduplicate clubs that share same location (within ~200m)
// by keeping the first occurrence and noting others at same venue
export function getUniqueLocations(): Club[] {
  const seen = new Map<string, Club>();
  for (const club of clubs) {
    const key = `${club.lat.toFixed(2)},${club.lng.toFixed(2)}`;
    if (!seen.has(key)) {
      seen.set(key, club);
    }
  }
  return Array.from(seen.values());
}

export const divisionColors: Record<string, string> = {
  "4. divisjon": "#c5382a",
  "5. divisjon": "#2563eb",
  "6. divisjon": "#16a34a",
  "7. divisjon": "#d97706",
  "4. div kvinner": "#a855f7",
};
