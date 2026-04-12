export interface Player {
  name: string;
  number: number | null;
  position: "Keeper" | "Forsvar" | "Midtbane" | "Angrep" | "Ukjent";
}

export interface TeamSquad {
  clubSlug: string;
  teamName: string;
  division: string;
  players: Player[];
}

// Real data fetched from fotball.no/fotballdata/lag/spillere/
export const squads: TeamSquad[] = [
  {
    clubSlug: "eidanger",
    teamName: "Eidanger",
    division: "4. divisjon",
    players: [
      { name: "Marcus Ferdinand Auraaen Lindberg", number: 12, position: "Keeper" },
      { name: "Simen Thon", number: 2, position: "Forsvar" },
      { name: "Kristián Gallik", number: 4, position: "Forsvar" },
      { name: "Maximilian Kreutzer", number: 6, position: "Forsvar" },
      { name: "Marius Kolve Johnsen", number: 23, position: "Forsvar" },
      { name: "Daniel Kristoffer Breiland Teigen", number: 21, position: "Midtbane" },
      { name: "Simon Disch Lindvig", number: 22, position: "Midtbane" },
      { name: "Samuel Hoff Fosse", number: 25, position: "Midtbane" },
      { name: "Håvard Mæland Ramslien", number: 26, position: "Midtbane" },
      { name: "Marcus Engh-Ajer", number: 37, position: "Midtbane" },
      { name: "Daniel Ismail Bortne", number: 77, position: "Midtbane" },
      { name: "Oliver Walsøe Strøm", number: 7, position: "Angrep" },
      { name: "Filip Larsen Gripsgård", number: 8, position: "Angrep" },
      { name: "Haakon Aaltvedt Pettersen", number: 10, position: "Angrep" },
      { name: "Martin Søvik Røren", number: 17, position: "Angrep" },
      { name: "Marius Lundeberg Enger", number: 30, position: "Angrep" },
      { name: "Robin Kongsro", number: null, position: "Ukjent" },
      { name: "Ole Myklebust Engh", number: null, position: "Ukjent" },
      { name: "Joakim Holmen Jahnsen", number: null, position: "Ukjent" },
      { name: "Pål Røsvik", number: null, position: "Ukjent" },
      { name: "Gulled Mahamed Omar", number: null, position: "Ukjent" },
      { name: "Edi Coli", number: null, position: "Ukjent" },
      { name: "Bent Linus Bertelsen", number: null, position: "Ukjent" },
      { name: "Hasan Mahamed Omar", number: 28, position: "Ukjent" },
      { name: "Bent Mathias Hoff Fosse", number: 29, position: "Ukjent" },
      { name: "Kristoffer Nygård", number: 39, position: "Ukjent" },
    ],
  },
  {
    clubSlug: "hei",
    teamName: "Hei",
    division: "4. divisjon",
    players: [
      { name: "Lasse Tørnes Olsen", number: 2, position: "Forsvar" },
      { name: "Ole Martin Karlsen Sagarino", number: 10, position: "Midtbane" },
      { name: "Daniel André Wingereid Lauritzen", number: 7, position: "Angrep" },
      { name: "Patrick Løvig", number: 11, position: "Angrep" },
      { name: "Andre Gregersen", number: 17, position: "Angrep" },
      { name: "Nicolay Henriksen Hagen", number: 5, position: "Ukjent" },
      { name: "Jon Anil Solvik Prabhakar", number: 8, position: "Ukjent" },
      { name: "Alexander Lundberg", number: 22, position: "Ukjent" },
      { name: "Bendik Ripegutu Nygård", number: 24, position: "Ukjent" },
      { name: "Daniel Amankona Koranteng", number: 27, position: "Ukjent" },
      { name: "Andreas Ytredal", number: 29, position: "Ukjent" },
    ],
  },
  {
    clubSlug: "uraedd",
    teamName: "Urædd",
    division: "4. divisjon",
    players: [
      { name: "Marcus Furevik Utne", number: 1, position: "Keeper" },
      { name: "Theodor Kronstad Johansen", number: 13, position: "Keeper" },
      { name: "Mathias Haugen", number: 26, position: "Keeper" },
      { name: "Ola Dalene", number: null, position: "Forsvar" },
      { name: "Federico Tisera Johansen", number: 2, position: "Forsvar" },
      { name: "Leander Meen-Dahlen", number: 3, position: "Forsvar" },
      { name: "Torkil Amlie Amundsen", number: 4, position: "Forsvar" },
      { name: "Nemanja Mladenovic", number: 5, position: "Forsvar" },
      { name: "Kristoffer Skoglund Kristiansen", number: 14, position: "Forsvar" },
      { name: "Wahab Fagari", number: 19, position: "Forsvar" },
      { name: "Kristian Berg", number: 22, position: "Forsvar" },
      { name: "Philip Furevik Utne", number: 23, position: "Forsvar" },
      { name: "Andreas Beyer Flohr", number: 27, position: "Forsvar" },
      { name: "Anthony Occean", number: 44, position: "Forsvar" },
      { name: "Kristoffer Berg Høegh-Larsen", number: 6, position: "Midtbane" },
      { name: "Prince Allan Mlagulwa", number: 7, position: "Midtbane" },
      { name: "Elod Coli", number: 8, position: "Midtbane" },
      { name: "Mokhmad Sjamsudijevitsj Ibragimov", number: 10, position: "Midtbane" },
      { name: "Jørgen Aslaksen", number: 17, position: "Midtbane" },
      { name: "Magnus Hagen Noste", number: 20, position: "Midtbane" },
      { name: "Mikkel Kiste-Johnsen", number: 21, position: "Midtbane" },
      { name: "Jesper Skoglund Kristiansen", number: 41, position: "Midtbane" },
      { name: "Teodor Numme", number: 77, position: "Midtbane" },
      { name: "Granit Shala", number: 9, position: "Angrep" },
      { name: "Momodou Lamin Touray", number: 15, position: "Angrep" },
      { name: "Emanuel Valle", number: 24, position: "Angrep" },
    ],
  },
];

export function getSquadsForClub(clubSlug: string): TeamSquad[] {
  return squads.filter((s) => s.clubSlug === clubSlug);
}
