import venue1 from "@/assets/venue-1.jpg";
import venue2 from "@/assets/venue-2.jpg";
import venue3 from "@/assets/venue-3.jpg";
import venue4 from "@/assets/venue-4.jpg";
import venue5 from "@/assets/venue-5.jpg";
import venue6 from "@/assets/venue-6.jpg";

export type Venue = {
  id: string;
  slug: string;
  name: string;
  city: string;
  country: string;
  type: string;
  capacity: number;
  priceFrom: number;
  rating: number;
  image: string;
  gallery: string[];
  tags: string[];
  description: string;
  amenities: string[];
};

export const VENUES: Venue[] = [
  {
    id: "1",
    slug: "atlantis-grand-ballroom",
    name: "Atlantis Grand Ballroom",
    city: "Dubai",
    country: "UAE",
    type: "Indoor Dinners/Awards/Galas",
    capacity: 1200,
    priceFrom: 18000,
    rating: 4.9,
    image: venue1,
    gallery: [venue1, venue2, venue3, venue5],
    tags: ["Ballroom", "Luxury", "Chandeliers"],
    description:
      "An icon of Dubai hospitality. The Grand Ballroom blends opulent crystal chandeliers with state-of-the-art AV — engineered to host galas, awards and weddings of any scale.",
    amenities: ["Stage & lighting", "AV production", "Catering", "Valet parking", "Bridal suite", "Wi-Fi"],
  },
  {
    id: "2",
    slug: "skyline-rooftop-downtown",
    name: "Skyline Rooftop — Downtown",
    city: "Dubai",
    country: "UAE",
    type: "Networking Events",
    capacity: 220,
    priceFrom: 9500,
    rating: 4.8,
    image: venue2,
    gallery: [venue2, venue4, venue6, venue1],
    tags: ["Rooftop", "Skyline view", "Outdoor"],
    description:
      "Open-air rooftop with uninterrupted views of the Burj Khalifa. Designed for premium brand activations, sundowners and intimate launches.",
    amenities: ["Bar service", "DJ booth", "String lighting", "Heaters", "Lounge furniture"],
  },
  {
    id: "3",
    slug: "nexus-conference-hall",
    name: "Nexus Conference Hall",
    city: "Abu Dhabi",
    country: "UAE",
    type: "Conferences",
    capacity: 850,
    priceFrom: 12000,
    rating: 4.7,
    image: venue3,
    gallery: [venue3, venue1, venue5, venue2],
    tags: ["Auditorium", "LED stage", "Theater seating"],
    description:
      "A purpose-built conference hall with tiered seating, broadcast-grade lighting and an integrated 24m LED wall — ready for keynotes and large summits.",
    amenities: ["Theater seating", "LED wall", "Translation booths", "Broadcast feed", "Green room"],
  },
  {
    id: "4",
    slug: "palm-cove-beachfront",
    name: "Palm Cove Beachfront",
    city: "Ras Al-Khaimah",
    country: "UAE",
    type: "Weddings-Outdoor",
    capacity: 320,
    priceFrom: 22000,
    rating: 5.0,
    image: venue4,
    gallery: [venue4, venue6, venue2, venue1],
    tags: ["Beach", "Wedding", "Sunset"],
    description:
      "A private stretch of white sand framed by palms. Bespoke wedding setups, golden-hour ceremonies and barefoot receptions — all curated end-to-end.",
    amenities: ["Private beach", "Bridal pavilion", "Catering tent", "Generator power", "Restrooms"],
  },
  {
    id: "5",
    slug: "ironworks-loft",
    name: "Ironworks Loft",
    city: "Riyadh",
    country: "KSA",
    type: "Brand Activations",
    capacity: 400,
    priceFrom: 7500,
    rating: 4.6,
    image: venue5,
    gallery: [venue5, venue3, venue1, venue6],
    tags: ["Industrial", "Loft", "Raw"],
    description:
      "A converted industrial loft with exposed brick, steel trusses and 8m ceilings. Perfect for fashion shows, product reveals and editorial-grade brand events.",
    amenities: ["Loading bay", "Rigging points", "Three-phase power", "Backstage area", "Truck access"],
  },
  {
    id: "6",
    slug: "mirage-desert-camp",
    name: "Mirage Desert Camp",
    city: "Sharjah",
    country: "UAE",
    type: "Outdoor Dinners/Awards/Galas",
    capacity: 500,
    priceFrom: 14000,
    rating: 4.9,
    image: venue6,
    gallery: [venue6, venue4, venue2, venue3],
    tags: ["Desert", "Tents", "Bedouin"],
    description:
      "Bedouin-inspired luxury camp under the stars. Roaring fire pits, hand-woven rugs and bespoke tented majlis — a uniquely Arabian event experience.",
    amenities: ["Tented majlis", "Fire pits", "Live oud", "Shisha lounge", "4x4 transfers"],
  },
];

export const EVENT_TYPES = [
  "Meetings",
  "Corporate Events",
  "Conferences",
  "Indoor Dinners/Awards/Galas",
  "Product Launches and Demos",
  "Weddings-Indoor",
  "Concerts and Music Performances",
  "Festivals",
  "Parties and Celebrations",
  "Outdoor Dinners/Awards/Galas",
  "Seminars",
  "Networking Events",
  "Team Building Activities",
  "Brand Activations",
  "Trainings and Workshops",
  "Fashion Shows and Weeks",
  "Trade Shows & Exhibitions",
  "Weddings-Outdoor",
  "Art Shows",
  "Theaters and Performances",
  "Photo and Video Shoots",
  "Movie Premiere",
  "Graduation Events",
  "Sports Tournaments",
];

export const CITIES = ["Dubai", "Abu Dhabi", "Sharjah", "Ras Al-Khaimah", "Riyadh", "Doha", "Manama"];
