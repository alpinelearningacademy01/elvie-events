import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MapPin,
  Users,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Clock,
  Star,
  Building2,
  Mail,
  Phone,
  Instagram,
  Linkedin,
  X as XIcon,
} from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

/* ─── Venue images (already in src/assets) ─── */
import venue1 from "@/assets/venue-1.jpg";
import venue2 from "@/assets/venue-2.jpg";
import venue3 from "@/assets/venue-3.jpg";
import venue4 from "@/assets/venue-4.jpg";
import venue5 from "@/assets/venue-5.jpg";
import venue6 from "@/assets/venue-6.jpg";
import heroImage from "@/assets/hero-venue.jpg";

/* ─── Data ─── */
const STATS = [
  { value: "15,019", label: "Venues" },
  { value: "24+", label: "Event types" },
  { value: "7", label: "GCC cities" },
  { value: "20+", label: "Years experience" },
];

const CATEGORIES = [
  { label: "Weddings", count: 1240 },
  { label: "Conferences", count: 860 },
  { label: "Galas", count: 540 },
  { label: "Brand activations", count: 720 },
  { label: "Outdoor", count: 410 },
  { label: "Rooftops", count: 290 },
];

const EVENT_TYPES = [
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

const VENUES = [
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
  },
];

const WHY_FEATURES = [
  {
    icon: Sparkles,
    title: "Curated proposals",
    desc: "Tailored to your brief, with options across budgets.",
  },
  {
    icon: ShieldCheck,
    title: "Fully transparent",
    desc: "No commissions or hidden markups — ever.",
  },
  {
    icon: Clock,
    title: "Fast responses",
    desc: "Most briefs receive proposals within 24 hours.",
  },
];

const GCC_CITIES = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ras Al-Khaimah",
  "Riyadh",
  "Doha",
  "Manama",
];

/* ─── Venue Partner Venue Card ─── */
const VwVenueCard = ({ venue }: { venue: (typeof VENUES)[0] }) => (
  <div className="group relative block overflow-hidden rounded-2xl bg-white vw-shadow-card vw-transition hover:-translate-y-1 hover:vw-shadow-soft cursor-pointer">
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={venue.image}
        alt={venue.name}
        loading="lazy"
        className="h-full w-full object-cover vw-transition group-hover:scale-105 animate-[vw-slow-zoom_18s_ease-out_both]"
      />
      <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-elvie-navy-deep">
        <Star className="h-3 w-3 fill-elvie-gold text-elvie-gold" />
        {venue.rating}
      </div>
      <div className="absolute right-3 top-3 rounded-full bg-elvie-navy-deep/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
        {venue.type.split("/")[0]}
      </div>
    </div>
    <div className="p-5">
      <div className="flex items-center gap-1 text-xs text-gray-400">
        <MapPin className="h-3 w-3" />
        {venue.city}, {venue.country}
      </div>
      <h3 className="mt-1 font-playfair font-bold text-lg leading-tight text-elvie-navy-deep">
        {venue.name}
      </h3>
      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs text-gray-400">
          <Users className="h-3 w-3" /> Up to {venue.capacity}
        </span>
        <span className="text-sm font-bold text-elvie-navy-deep">
          AED {venue.priceFrom.toLocaleString()}
          <span className="text-xs font-medium text-gray-400"> /event</span>
        </span>
      </div>
    </div>
  </div>
);

import { VwHeader, VwFooter } from "@/components/VwLayoutComponents";


/* ─── Main Page ─── */
const VenuePartners = () => {
  const [where, setWhere] = useState("");
  const [eventType, setEventType] = useState("");
  const [guests, setGuests] = useState("");

  return (
    <div
      className="min-h-screen font-montserrat"
      style={{ backgroundColor: "hsl(0 0% 100%)" }}
    >
      <VwHeader />

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section
        className="relative isolate overflow-hidden text-white"
        style={{ backgroundColor: "hsl(var(--elvie-navy-deep))" }}
      >
        {/* Background image */}
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImage}
            alt="Aerial view of a luxury venue at dusk"
            className="h-full w-full object-cover opacity-70 animate-[vw-slow-zoom_18s_ease-out_both]"
          />
          <div className="absolute inset-0 vw-gradient-hero" />
        </div>

        <div className="vw-container relative pb-32 pt-24 md:pb-40 md:pt-32">
          <div className="max-w-4xl animate-[vw-fade-up_0.7s_cubic-bezier(0.4,0,0.2,1)_both]">
            {/* Badge */}
            <div
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur"
            >
              <Sparkles
                className="h-3 w-3"
                style={{ color: "hsl(var(--elvie-gold))" }}
              />
              GCC's largest venue partner network
            </div>

            {/* Headline */}
            <h1 className="font-playfair font-bold text-5xl md:text-7xl lg:text-8xl text-balance">
              GCC's Largest{" "}
              <span style={{ color: "hsl(var(--elvie-gold))" }}>Venue Sourcing</span>{" "}
              Platform
            </h1>

            <p className="mt-6 text-lg text-white/80">
              <span
                className="font-bold"
                style={{ color: "hsl(var(--elvie-gold))" }}
              >
                {VENUES.length * 2503}
              </span>{" "}
              venues. Curated by experts. Free to source.
            </p>
          </div>

          {/* ── Search Bar ── */}
          <div
            className="mt-10 md:mt-14 animate-[vw-fade-up_0.7s_cubic-bezier(0.4,0,0.2,1)_both] rounded-2xl p-3"
            style={{
              backgroundColor: "hsl(0 0% 100%)",
              boxShadow: "0 10px 40px -10px hsl(0 0% 0% / 0.25)",
            }}
          >
            <div className="grid gap-2 md:grid-cols-[1.2fr_1.2fr_1fr_auto] md:divide-x md:divide-gray-200">
              <div className="px-4 py-3">
                <label className="block text-xs font-bold text-elvie-navy-deep">
                  Where's your event?
                </label>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <input
                    value={where}
                    onChange={(e) => setWhere(e.target.value)}
                    placeholder="Country, city, property name"
                    className="w-full bg-transparent text-sm text-elvie-navy-deep outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>
              <div className="px-4 py-3">
                <label className="block text-xs font-bold text-elvie-navy-deep">
                  What's your event?
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-transparent text-sm text-elvie-navy-deep outline-none"
                >
                  <option value="">Enter the preferred event type</option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="px-4 py-3">
                <label className="block text-xs font-bold text-elvie-navy-deep">
                  How many guests?
                </label>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    placeholder="Approx. number of attendees"
                    className="w-full bg-transparent text-sm text-elvie-navy-deep outline-none placeholder:text-gray-400"
                  />
                </div>
              </div>
              <a
                href="#explore"
                onClick={() => { }}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-elvie-navy-deep vw-transition hover:opacity-90"
                style={{ backgroundColor: "hsl(var(--elvie-gold))" }}
              >
                <Search className="h-4 w-4" />
                Explore venues
              </a>
            </div>
          </div>

          {/* City pills */}
          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-white/80">
            <span className="font-semibold">Available across the GCC:</span>
            {GCC_CITIES.map((c) => (
              <a
                key={c}
                href="#explore"
                className="rounded-full border border-white/15 px-3 py-1 text-xs vw-transition hover:border-elvie-gold hover:text-elvie-gold"
              >
                {c}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════ */}
      <section
        className="border-b"
        style={{
          backgroundColor: "hsl(0 0% 100%)",
          borderColor: "hsl(0 0% 90%)",
        }}
      >
        <div className="vw-container grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label}>
              <div
                className="font-playfair font-bold text-4xl md:text-5xl text-elvie-navy-deep"
              >
                {s.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-widest text-gray-400">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          BROWSE BY CATEGORY
      ══════════════════════════════════════ */}
      <section
        id="categories"
        className="py-20"
        style={{ backgroundColor: "hsl(0 0% 100%)" }}
      >
        <div className="vw-container">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-playfair font-bold text-4xl md:text-5xl text-elvie-navy-deep text-balance">
                Browse by category
              </h2>
              <p className="mt-2 max-w-md text-gray-500">
                From intimate boardrooms to stadium-scale productions.
              </p>
            </div>
            <a
              href="#explore"
              className="hidden items-center gap-1 text-sm font-semibold text-elvie-navy-deep hover:text-elvie-gold vw-transition md:inline-flex"
            >
              View all <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((c) => (
              <a
                key={c.label}
                href="#explore"
                className="group rounded-2xl border p-5 vw-transition hover:text-white cursor-pointer"
                style={{ borderColor: "hsl(0 0% 90%)" }}

              >
                <div className="font-playfair font-bold text-xl">{c.label}</div>
                <div className="mt-1 text-xs text-gray-400 group-hover:text-white/70">
                  {c.count} venues
                </div>
                <ChevronRight className="mt-3 h-4 w-4 vw-transition group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURED VENUES
      ══════════════════════════════════════ */}
      <section
        id="explore"
        className="py-20"
        style={{ backgroundColor: "hsl(0 0% 96%)" }}
      >
        <div className="vw-container">
          <div className="flex items-end justify-between">
            <div>
              <span
                className="text-xs font-bold uppercase tracking-widest text-elvie-navy-deep rounded-full px-3 py-1"
                style={{ backgroundColor: "hsl(var(--elvie-gold))" }}
              >
                Hand-picked
              </span>
              <h2 className="mt-3 font-playfair font-bold text-4xl md:text-5xl text-elvie-navy-deep text-balance">
                Featured venues
              </h2>
            </div>
            <a
              href="#explore"
              className="hidden items-center gap-1 text-sm font-semibold text-elvie-navy-deep hover:text-elvie-gold vw-transition md:inline-flex"
            >
              Explore all <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VENUES.map((v) => (
              <VwVenueCard key={v.id} venue={v} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY SECTION — dark ink panel
      ══════════════════════════════════════ */}
      <section
        id="advisor"
        className="py-24 text-white"
        style={{ backgroundColor: "hsl(var(--elvie-navy-deep))" }}
      >
        <div className="vw-container grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-playfair font-bold text-5xl md:text-6xl text-balance">
              Need help finding the{" "}
              <span style={{ color: "hsl(var(--elvie-gold))" }}>perfect venue?</span>
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Our advisors curate proposals tailored to your brief — fully
              transparent, no commissions, no markups.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-elvie-navy-deep vw-transition hover:opacity-90"
                style={{ backgroundColor: "hsl(var(--elvie-gold))" }}
              >
                Ask a venue advisor
              </a>
              <a
                href="#explore"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-sm font-bold text-white vw-transition hover:bg-white/10"
              >
                Browse venues
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            {WHY_FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6"
              >
                <div
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-elvie-navy-deep"
                  style={{ backgroundColor: "hsl(var(--elvie-gold))" }}
                >
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-playfair font-bold text-xl">{f.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          PARTNER JOIN CTA BAND
      ══════════════════════════════════════ */}
      <section
        id="contact"
        className="py-20 relative overflow-hidden"
        style={{ backgroundColor: "hsl(0 0% 100%)" }}
      >
        <div className="vw-container">
          <div className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
            style={{ backgroundColor: "hsl(var(--elvie-navy-deep))" }}>
            {/* glow blobs */}
            <div
              className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-30 blur-3xl"
              style={{ backgroundColor: "hsl(var(--elvie-gold))" }}
            />
            <div
              className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-20 blur-3xl"
              style={{ backgroundColor: "hsl(var(--elvie-gold))" }}
            />

            <Building2
              className="mx-auto mb-6 h-14 w-14"
              style={{ color: "hsl(var(--elvie-gold))" }}
            />
            <h2 className="font-playfair font-bold text-4xl md:text-6xl text-white text-balance">
              Are you a venue owner?{" "}
              <span style={{ color: "hsl(var(--elvie-gold))" }}>Partner with us.</span>
            </h2>
            <p className="mt-5 mx-auto max-w-xl text-lg text-white/70">
              List your venue on GCC's largest platform and receive qualified
              corporate inquiries directly to your dashboard — zero commission.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold text-elvie-navy-deep vw-transition hover:opacity-90"
                style={{ backgroundColor: "hsl(var(--elvie-gold))" }}
              >
                Partner Sign In <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-4 text-sm font-bold text-white vw-transition hover:bg-white/10"
              >
                Request Partnership
              </Link>
            </div>
            <p className="mt-6 text-xs text-white/40">
              Free to list · No commission · Verified venue badge
            </p>
          </div>
        </div>
      </section>

      <VwFooter />
      <ScrollToTop />
    </div>
  );
};

export default VenuePartners;
