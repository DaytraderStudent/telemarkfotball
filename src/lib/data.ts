export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
  content: string;
}

export interface GalleryItem {
  slug: string;
  title: string;
  count: string;
  year: string;
  image: string;
}

export interface TeamStanding {
  pos: number;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gd: string;
  pts: number;
}

export interface Division {
  name: string;
  slug: string;
  teams: TeamStanding[];
}

export const articles: Article[] = [
  {
    slug: "oppkjoring-2026",
    title: "Slik blir oppkjøringen til 2026-sesongen",
    excerpt:
      "Vi har samlet treningskampene til flere av Telemarksklubbene i oppkjøringen til årets sesong. Her finner du oversikten.",
    category: "Oppkjøring",
    date: "11. jan 2026",
    image:
      "https://telemarkfotball.wordpress.com/wp-content/uploads/2026/01/img_9448.png?w=1200&h=900&crop=1",
    readTime: "6 min",
    content: `Vi oppdaterer fortløpende med resultater og kampfakta fra treningskampene i Telemark.

Sesongen 2026 nærmer seg med stormskritt, og klubbene i Telemark er allerede godt i gang med forberedelsene. Vi har samlet oversikten over treningskampene som er spilt og de som gjenstår.

Flere av lagene i 4. divisjon har allerede fått testet seg mot motstand fra andre avdelinger, og det tegner til å bli en spennende sesong på gressmattene i Telemark.

Odd 2 har vist sterk form i oppkjøringen med tre seire på rad, mens Pors Grenland har satset på å bygge et ungt lag med spillere fra egen akademi.

Vi følger utviklingen tett og oppdaterer denne oversikten etter hvert som nye kamper spilles.`,
  },
  {
    slug: "nm-trekning",
    title: "Telemark Fotball sender trekningen i NM kvalifiseringen",
    excerpt:
      "Telemark Fotball og NFF Telemark samarbeider i år om gjennomføringen av trekningen til årets NM kvalifisering.",
    category: "NM",
    date: "5. mar 2026",
    image:
      "https://telemarkfotball.wordpress.com/wp-content/uploads/2026/03/grafikker-webside-1.png?w=750",
    readTime: "3 min",
    content: `Telemark Fotball og NFF Telemark samarbeider i år om gjennomføringen av trekningen til årets NM kvalifisering.

Trekningen sendes live på våre kanaler, og alle lag i kvalifiseringen vil bli trukket i en åpen seremoni. Dette er første gang Telemark Fotball får æren av å arrangere trekningen.

Kampene i 1. runde er terminfestet til lørdag 21. mars kl. 14:00, og vi gleder oss til å følge lagene fra Telemark gjennom kvalifiseringen.`,
  },
  {
    slug: "endringer-7-divisjon",
    title: "Endringer i 7. divisjon",
    excerpt:
      "To nye lag skal delta på nivå 8 i Telemark denne sesongen etter påmeldingsfristen.",
    category: "7. divisjon",
    date: "15. feb 2026",
    image:
      "https://telemarkfotball.wordpress.com/wp-content/uploads/2026/02/dsc0030_original.jpg?w=750",
    readTime: "2 min",
    content: `To nye lag skal delta på nivå 8 i Telemark denne sesongen etter at påmeldingsfristen gikk ut.

NFF Telemark har bekreftet at avdelingene i 7. divisjon er oppdatert med de nye lagene. Det betyr at det totalt blir 23 lag i årets 7. divisjon, fordelt på to avdelinger.

Endringene påvirker avdelingen i nedre Telemark, der ett lag har meldt seg på etter fristen etter godkjenning fra kretsen.`,
  },
  {
    slug: "avdelinger-7-divisjon",
    title: "Dette er avdelingene i årets 7. divisjon",
    excerpt:
      "21 lag deltar i årets 7. divisjon. Her er avdelingsoppsettet presentert av NFF Telemark.",
    category: "7. divisjon",
    date: "3. feb 2026",
    image:
      "https://telemarkfotball.wordpress.com/wp-content/uploads/2026/02/7.-divisjon-2026-2.png?w=1200",
    readTime: "3 min",
    content: `21 lag som deltar i årets 7. divisjon er nå fordelt i avdelinger av NFF Telemark.

Det er det høyeste antallet påmeldte lag siden 2017, da 24 lag deltok. Interessen for breddefotballen i Telemark er økende, og 7. divisjon er fortsatt det nivået med flest lag.

Avdelingene er satt opp med hensyn til geografi for å minimere reiseavstander for lagene.`,
  },
  {
    slug: "4-divisjon-kvinner",
    title: "Slik blir årets 4. divisjon kvinner",
    excerpt:
      "Fem lag har meldt seg på for 4. divisjon kvinner med dobbel serie format.",
    category: "Kvinner",
    date: "3. feb 2026",
    image:
      "https://telemarkfotball.wordpress.com/wp-content/uploads/2026/02/4.-div-kvinner.png?w=1200",
    readTime: "2 min",
    content: `Fem lag har meldt seg på for 4. divisjon kvinner denne sesongen.

Divisjonen spilles som dobbel serie, noe som gir totalt 8 serierunder for hvert lag. Det er en liten nedgang fra fjorårets seks lag, men nivået forventes å være jevnt og konkurransedyktig.

Seriestart er satt til april, og kampene spilles primært på lørdager.`,
  },
  {
    slug: "nm-1-runde",
    title: "Dette er 1. runde i kvalifiseringen til NM",
    excerpt:
      "Kampene er terminfestet til lørdag 21. mars kl. 14:00 for kvalifiseringsrunden.",
    category: "NM",
    date: "15. jan 2026",
    image:
      "https://telemarkfotball.wordpress.com/wp-content/uploads/2026/01/dsc00382.jpg?w=1568",
    readTime: "4 min",
    content: `Kampene i 1. runde av NM-kvalifiseringen er terminfestet til lørdag 21. mars kl. 14:00.

NFF har satt opp oppgjørene etter trekningen som ble gjennomført i samarbeid med Telemark Fotball. Lagene fra Telemark møter motstand fra egen krets i de første rundene.

Vi følger alle kampene tett og oppdaterer med resultater fortløpende gjennom dagen.`,
  },
  {
    slug: "ny-nm-modell",
    title: "Dette er den nye NM-modellen",
    excerpt:
      "Ny kvalifiseringsmodell til NM 2027 med fire ordinære kvalifiseringsrunder annonsert.",
    category: "NM",
    date: "23. des 2025",
    image:
      "https://telemarkfotball.wordpress.com/wp-content/uploads/2026/01/dsc0319.jpg?w=1568",
    readTime: "5 min",
    content: `NFF har lansert en ny kvalifiseringsmodell til NM som trer i kraft fra 2027.

Modellen innebærer fire ordinære kvalifiseringsrunder, noe som gir flere lag muligheten til å delta. For Telemarks-klubbene betyr dette at veien til hovedrunden blir lengre, men også mer rettferdig.

Den nye modellen har fått blandet mottakelse, men NFF mener den vil styrke breddefotballen på sikt.`,
  },
  {
    slug: "4-divisjon-kvinner-avslutning",
    title: "Slik endte årets 4. divisjon for kvinner",
    excerpt:
      "Skarphedin 2 trakk det lengste strået i årets høstsesong for kvinner.",
    category: "Kvinner",
    date: "31. okt 2025",
    image:
      "https://telemarkfotball.wordpress.com/wp-content/uploads/2025/10/odd-2-kretsmester-2025.jpeg?w=1568",
    readTime: "3 min",
    content: `Skarphedin 2 trakk det lengste strået i årets 4. divisjon for kvinner.

Laget har vist jevn og god form gjennom hele sesongen, og sikret seg tittelen med god margin. Det er et resultat av systematisk arbeid i klubben over flere år.

Sesongen har vært preget av godt oppmøte og fin stemning på kampene, og interessen for kvinnefotball i Telemark er i vekst.`,
  },
];

export const galleries: GalleryItem[] = [
  {
    slug: "odd-2-vs-bo",
    title: "Odd 2 vs Bø IL",
    count: "24 bilder",
    year: "2026",
    image:
      "https://telemarkfotball.wordpress.com/wp-content/uploads/2026/01/img_9448.png?w=1200&h=900&crop=1",
  },
  {
    slug: "pors-sesongoppstart",
    title: "Pors sesongoppstart",
    count: "18 bilder",
    year: "2026",
    image:
      "https://telemarkfotball.wordpress.com/wp-content/uploads/2026/02/dsc0030_original.jpg?w=750",
  },
  {
    slug: "nm-trekning-2026",
    title: "NM-trekning 2026",
    count: "12 bilder",
    year: "2026",
    image:
      "https://telemarkfotball.wordpress.com/wp-content/uploads/2026/03/grafikker-webside-1.png?w=750",
  },
  {
    slug: "kretsmester-kvinner-2025",
    title: "Kretsmester kvinner 2025",
    count: "31 bilder",
    year: "2025",
    image:
      "https://telemarkfotball.wordpress.com/wp-content/uploads/2025/10/odd-2-kretsmester-2025.jpeg?w=1568",
  },
];

export const divisions: Division[] = [
  {
    name: "4. divisjon herrer",
    slug: "4-divisjon-herrer",
    teams: [
      { pos: 1, name: "Pors Grenland", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
      { pos: 2, name: "Odd 2", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
      { pos: 3, name: "Skien FK", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
      { pos: 4, name: "Urædd", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
      { pos: 5, name: "Notodden FK 2", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
      { pos: 6, name: "Bø IL", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
    ],
  },
  {
    name: "5. divisjon herrer",
    slug: "5-divisjon-herrer",
    teams: [
      { pos: 1, name: "Porsgrunn FK", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
      { pos: 2, name: "Kragerø FK", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
      { pos: 3, name: "Drangedal IL", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
      { pos: 4, name: "Siljan IL", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
      { pos: 5, name: "Holla FK", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
      { pos: 6, name: "Bamble FK", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
    ],
  },
  {
    name: "4. divisjon kvinner",
    slug: "4-divisjon-kvinner",
    teams: [
      { pos: 1, name: "Skarphedin 2", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
      { pos: 2, name: "Odd 2 kvinner", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
      { pos: 3, name: "Pors kvinner", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
      { pos: 4, name: "Urædd kvinner", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
      { pos: 5, name: "Bø IL kvinner", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
    ],
  },
  {
    name: "7. divisjon avd. A",
    slug: "7-divisjon-a",
    teams: [
      { pos: 1, name: "Stathelle FK", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
      { pos: 2, name: "Langesund FK", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
      { pos: 3, name: "Seljord IL", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
      { pos: 4, name: "Kviteseid IL", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
      { pos: 5, name: "Fyresdal IL", played: 0, won: 0, drawn: 0, lost: 0, gd: "0", pts: 0 },
    ],
  },
];

export const stadiums = [
  { name: "Skagerak Arena", club: "Odd", location: "Skien", lat: 59.1986, lng: 9.6117 },
  { name: "Urædd Stadion", club: "Urædd", location: "Porsgrunn", lat: 59.1396, lng: 9.6561 },
  { name: "Pors Stadion", club: "Pors Grenland", location: "Porsgrunn", lat: 59.1392, lng: 9.6522 },
  { name: "Notodden Stadion", club: "Notodden FK", location: "Notodden", lat: 59.5657, lng: 9.2611 },
  { name: "Bø Stadion", club: "Bø IL", location: "Bø", lat: 59.4107, lng: 9.0640 },
  { name: "Kragerø Stadion", club: "Kragerø FK", location: "Kragerø", lat: 58.8692, lng: 9.4119 },
  { name: "Skien Fritidspark", club: "Skien FK", location: "Skien", lat: 59.2075, lng: 9.6055 },
  { name: "Drangedal Stadion", club: "Drangedal IL", location: "Drangedal", lat: 59.0819, lng: 9.0694 },
];
