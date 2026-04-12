export interface Club {
  name: string;
  venue: string;
  division: string;
  location: string;
  lat: number;
  lng: number;
}

// All clubs from fotball.no Telemark 2025 with GPS from fotball.no facility maps
export const clubs: Club[] = [
  // 4. divisjon herrer
  { name: "Hei", venue: "Mortens Plass KG", division: "4. divisjon", location: "Skien", lat: 59.08838, lng: 9.68080 },
  { name: "Langangen", venue: "Myrhaug stadion", division: "4. divisjon", location: "Langangen", lat: 59.08267, lng: 9.80952 },
  { name: "Eidanger", venue: "Eidangerbanen KG", division: "4. divisjon", location: "Eidanger", lat: 59.11544, lng: 9.69604 },
  { name: "Odd 3", venue: "Skagerak Arena", division: "4. divisjon", location: "Skien", lat: 59.21151, lng: 9.58986 },
  { name: "Urædd", venue: "Urædd KG", division: "4. divisjon", location: "Porsgrunn", lat: 59.14167, lng: 9.66643 },
  { name: "Storm", venue: "Bratsberg KG", division: "4. divisjon", location: "Bratsberg", lat: 59.20429, lng: 9.62406 },
  { name: "Tollnes", venue: "Tollnes Stadion KG", division: "4. divisjon", location: "Skien", lat: 59.16105, lng: 9.62841 },
  { name: "Notodden 2", venue: "Idrettsparken KG", division: "4. divisjon", location: "Notodden", lat: 59.56364, lng: 9.25984 },
  { name: "Brevik", venue: "Furulund KG", division: "4. divisjon", location: "Brevik", lat: 59.05617, lng: 9.69432 },
  { name: "Gulset", venue: "Gulset KG", division: "4. divisjon", location: "Skien", lat: 59.21169, lng: 9.55546 },
  { name: "Skarphedin", venue: "Sandvoll Kunstgress", division: "4. divisjon", location: "Bø i Telemark", lat: 59.41802, lng: 9.07809 },
  { name: "Stathelle/Langesund", venue: "Bunes KG", division: "4. divisjon", location: "Stathelle", lat: 59.03696, lng: 9.70568 },

  // 5. divisjon herrer
  { name: "Snøgg", venue: "Notodden KG", division: "5. divisjon", location: "Notodden", lat: 59.57093, lng: 9.27054 },
  { name: "Sannidal", venue: "Kolbånn KG", division: "5. divisjon", location: "Sannidal", lat: 58.90143, lng: 9.31200 },
  { name: "Skidar", venue: "Helges Plass KG", division: "5. divisjon", location: "Skien", lat: 59.19427, lng: 9.62885 },
  { name: "Eidanger 2", venue: "Eidangerbanen KG", division: "5. divisjon", location: "Eidanger", lat: 59.11544, lng: 9.69604 },
  { name: "Hei 2", venue: "Mortens Plass KG", division: "5. divisjon", location: "Skien", lat: 59.08838, lng: 9.68080 },
  { name: "Skiens Grane", venue: "Granebanen KG", division: "5. divisjon", location: "Skien", lat: 59.20065, lng: 9.59477 },
  { name: "Herkules", venue: "Herkules KG", division: "5. divisjon", location: "Skien", lat: 59.18246, lng: 9.59941 },
  { name: "Storm 2", venue: "Bratsberg KG", division: "5. divisjon", location: "Bratsberg", lat: 59.20429, lng: 9.62406 },
  { name: "Urædd 2", venue: "Urædd KG", division: "5. divisjon", location: "Porsgrunn", lat: 59.14167, lng: 9.66643 },
  { name: "Langesund/Stathelle", venue: "Slåttenes KG", division: "5. divisjon", location: "Langesund", lat: 59.00000, lng: 9.74279 },
  { name: "Kroken", venue: "Sandvann stadion", division: "5. divisjon", location: "Neslandsvatn", lat: 58.93230, lng: 9.12725 },
  { name: "Kragerø", venue: "Kragerø Stadion KG", division: "5. divisjon", location: "Kragerø", lat: 58.87111, lng: 9.40673 },

  // 6. divisjon herrer
  { name: "Borg", venue: "Borg 2 KG", division: "6. divisjon", location: "Skien", lat: 59.16788, lng: 9.66011 },
  { name: "Sundjordet", venue: "Frednes Hovedbane KG", division: "6. divisjon", location: "Porsgrunn", lat: 59.13427, lng: 9.64132 },
  { name: "Heddal", venue: "Bama kunstgressbane", division: "6. divisjon", location: "Heddal", lat: 59.59144, lng: 9.15361 },
  { name: "Drangedal", venue: "Drangedal Stadion KG", division: "6. divisjon", location: "Drangedal", lat: 59.09389, lng: 9.05064 },
  { name: "Nome", venue: "Lunde Hovedbane (Kåsa)", division: "6. divisjon", location: "Lunde", lat: 59.29899, lng: 9.09587 },
  { name: "Sauherad", venue: "Kjapp Hovedbane", division: "6. divisjon", location: "Sauherad", lat: 59.42137, lng: 9.32548 },
  { name: "Brevik 2", venue: "Furulund KG", division: "6. divisjon", location: "Brevik", lat: 59.05617, lng: 9.69432 },
  { name: "Siljan", venue: "Siljan Idrettspark KG", division: "6. divisjon", location: "Siljan", lat: 59.27226, lng: 9.70745 },
  { name: "Seljord", venue: "Eventyrøy Stadion KG", division: "6. divisjon", location: "Seljord", lat: 59.48755, lng: 8.64091 },
  { name: "Bamble", venue: "Rugtvedt KG", division: "6. divisjon", location: "Bamble", lat: 59.03981, lng: 9.67041 },
  { name: "Herøya", venue: "Herøya Hovedbane", division: "6. divisjon", location: "Herøya", lat: 59.11503, lng: 9.64717 },
  { name: "Gjerpen", venue: "Gjerpen Stadion KG", division: "6. divisjon", location: "Skien", lat: 59.22633, lng: 9.60513 },

  // 7. divisjon avd. A
  { name: "Skotfoss", venue: "Skotfoss Stadion KG", division: "7. divisjon", location: "Skotfoss", lat: 59.21042, lng: 9.53375 },
  { name: "Sannidal 2", venue: "Kolbånn KG", division: "7. divisjon", location: "Sannidal", lat: 58.90143, lng: 9.31200 },
  { name: "Åfoss", venue: "Åfoss KG", division: "7. divisjon", location: "Ulefoss", lat: 59.19656, lng: 9.54288 },
  { name: "Stridsklev", venue: "Stridsklev KG", division: "7. divisjon", location: "Porsgrunn", lat: 59.11288, lng: 9.66952 },
  { name: "Bamble 2", venue: "Rugtvedt KG", division: "7. divisjon", location: "Bamble", lat: 59.03981, lng: 9.67041 },
  { name: "Helle", venue: "Hellebanen KG", division: "7. divisjon", location: "Helle", lat: 58.90321, lng: 9.37090 },

  // 7. divisjon avd. B
  { name: "Skarphedin 2", venue: "Telemarkshallen KG", division: "7. divisjon", location: "Bø i Telemark", lat: 59.44961, lng: 9.07090 },
  { name: "Vinje", venue: "Åmot Stadion KG", division: "7. divisjon", location: "Vinje", lat: 59.57086, lng: 7.98863 },
  { name: "Gransherad/Heddal 2", venue: "Lerkelunden", division: "7. divisjon", location: "Gransherad", lat: 59.69276, lng: 9.02849 },
  { name: "Nome 2", venue: "Lunde Hovedbane (Kåsa)", division: "7. divisjon", location: "Lunde", lat: 59.29899, lng: 9.09587 },
  { name: "Drangedal 2", venue: "Drangedal Stadion KG", division: "7. divisjon", location: "Drangedal", lat: 59.09389, lng: 9.05064 },
  { name: "Tørn", venue: "Bø Stadion Tørdal", division: "7. divisjon", location: "Tørdal", lat: 59.15308, lng: 8.81356 },

  // 7. divisjon avd. C
  { name: "Storm 3", venue: "Tores Plass KG", division: "7. divisjon", location: "Bratsberg", lat: 59.20429, lng: 9.62406 },
  { name: "Pors 3", venue: "Pors 2 KG", division: "7. divisjon", location: "Porsgrunn", lat: 59.15134, lng: 9.64253 },
  { name: "Gulset 2", venue: "Gulset KG", division: "7. divisjon", location: "Skien", lat: 59.21169, lng: 9.55546 },
  { name: "Sundjordet 2", venue: "Frednes Hovedbane KG", division: "7. divisjon", location: "Porsgrunn", lat: 59.13427, lng: 9.64132 },
  { name: "Urædd 3", venue: "Kjølnes 6", division: "7. divisjon", location: "Porsgrunn", lat: 59.14167, lng: 9.66643 },
  { name: "Hei 3", venue: "Jan & Geirsplass KG", division: "7. divisjon", location: "Skien", lat: 59.08838, lng: 9.68080 },

  // 4. divisjon kvinner
  { name: "Odd 2 kvinner", venue: "Odd Treningsbane KG", division: "4. div kvinner", location: "Skien", lat: 59.21004, lng: 9.58982 },
  { name: "Snøgg kvinner", venue: "Notodden KG", division: "4. div kvinner", location: "Notodden", lat: 59.57093, lng: 9.27054 },
  { name: "Tollnes kvinner", venue: "Tollnes Stadion KG", division: "4. div kvinner", location: "Skien", lat: 59.16105, lng: 9.62841 },
  { name: "Skarphedin kvinner", venue: "Telemarkshallen KG", division: "4. div kvinner", location: "Bø i Telemark", lat: 59.44961, lng: 9.07090 },
  { name: "Fossum/Storm kvinner", venue: "Bratsberg KG", division: "4. div kvinner", location: "Bratsberg", lat: 59.20429, lng: 9.62406 },
  { name: "Urædd kvinner", venue: "Urædd KG", division: "4. div kvinner", location: "Porsgrunn", lat: 59.14167, lng: 9.66643 },
  { name: "Sauherad kvinner", venue: "Kjapp KG", division: "4. div kvinner", location: "Sauherad", lat: 59.42137, lng: 9.32548 },
  { name: "Herkules kvinner", venue: "Herkules KG", division: "4. div kvinner", location: "Skien", lat: 59.18246, lng: 9.59941 },
];

export const divisionColors: Record<string, string> = {
  "4. divisjon": "#c5382a",
  "5. divisjon": "#2563eb",
  "6. divisjon": "#16a34a",
  "7. divisjon": "#d97706",
  "4. div kvinner": "#a855f7",
};
