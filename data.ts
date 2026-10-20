import floral from "@/assets/floral.jpg";
import marigold from "@/assets/marigold.jpg";
import garden from "@/assets/garden.jpg";
import lights from "@/assets/lights.jpg";
import venue from "@/assets/venue.jpg";
import saveTheDate from "@/assets/24112026_light.png.asset.json";

export type Tone = "light" | "dark";
export type PetalKind = "petal" | "spark" | "leaf";

export const wedding = {
  hosts: {
    names: "Surendra & Sujata Chavan",
    role: "Parents of the groom",
  },
  groom: {
    name: "Ninad",
    surname: "Chavan",
    parents: "Son of Surendra & Sujata Chavan",
  },
  bride: {
    name: "Neha",
    surname: "Jadhav",
    parents: "Daughter of Vilas & Geeta Jadhav",
  },
  date: {
    weekday: "Tuesday",
    day: "24",
    month: "November",
    year: "2026",
    display: "24 · November · 2026",
    short: "24 · 11 · 2026",
    time: "7.30pm onwards",
    // 24 November 2026, 19:30 Calcutta time (UTC+5:30)
    iso: "2026-11-24T14:00:00Z",
  },
  venue: {
    name: "Durga Garden",
    street: "New Link Rd, Near Aura Hotel, Eksar Village",
    area: "Yogi Nagar, Borivali West",
    city: "Mumbai, Maharashtra 400091",
    map: "https://www.google.com/maps/search/?api=1&query=Durga+Garden+New+Link+Road+Eksar+Village+Borivali+West+Mumbai+400091",
  },
};

export type PageDef = {
  id: string;
  label: string;
  image: string;
  tone: Tone;
  petals: PetalKind;
  colors: string[];
  count: number;
  seed: number;
  /** coloured wash layered over the backdrop so every page feels different */
  tint: string;
  /** true = show the artwork as a framed photo instead of a full-bleed backdrop */
  photo?: boolean;
};

export const pages: PageDef[] = [
  {
    id: "shubh-vivah",
    label: "Shubh Vivah",
    image: marigold,
    tone: "light",
    petals: "petal",
    colors: ["#F2B23C", "#F7D98A", "#E8862E"],
    count: 16,
    seed: 11,
    // auspicious saffron & marigold
    tint: "linear-gradient(180deg, rgba(244,180,60,0.30), rgba(214,110,40,0.24))",
  },
  {
    id: "invitation",
    label: "Invitation",
    image: floral,
    tone: "light",
    petals: "petal",
    colors: ["#E8C5C8", "#F3D8D8", "#BEA063"],
    count: 14,
    seed: 3,
    // blush rose
    tint: "linear-gradient(180deg, rgba(226,138,152,0.24), rgba(190,90,110,0.18))",
  },
  {
    id: "reception",
    label: "Reception",
    image: lights,
    tone: "dark",
    petals: "spark",
    colors: ["#F5D07A", "#E8B84B", "#FFF3D0"],
    count: 26,
    seed: 33,
    // royal plum & gold
    tint: "linear-gradient(180deg, rgba(96,32,78,0.38), rgba(58,18,52,0.34))",
  },
  {
    id: "venue",
    label: "Venue",
    image: venue,
    tone: "light",
    petals: "leaf",
    colors: ["#8A9A8E", "#C9D3C4", "#BEA063"],
    count: 12,
    seed: 59,
    // emerald garden
    tint: "linear-gradient(180deg, rgba(64,118,88,0.24), rgba(34,84,64,0.20))",
  },
  {
    id: "rsvp",
    label: "RSVP",
    image: garden,
    tone: "light",
    petals: "petal",
    colors: ["#E8909C", "#F3C1C8", "#BEA063"],
    count: 14,
    seed: 71,
    // rose pink
    tint: "linear-gradient(180deg, rgba(214,96,120,0.22), rgba(160,60,90,0.18))",
  },
  {
    id: "save-the-date",
    label: "Save the Date",
    image: saveTheDate.url,
    tone: "light",
    petals: "petal",
    colors: ["#C6B4BF", "#D2C4CD", "#BEA063"],
    count: 10,
    seed: 83,
    // dusk lavender
    tint: "linear-gradient(180deg, rgba(148,128,188,0.24), rgba(96,80,140,0.20))",
    photo: true,
  },
];
