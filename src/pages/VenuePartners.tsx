import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";
import { VwHeader, VwFooter } from "@/components/VwLayoutComponents";

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
  "Meetings", "Corporate Events", "Conferences", "Indoor Dinners/Awards/Galas",
  "Product Launches and Demos", "Weddings-Indoor", "Concerts and Music Performances",
  "Festivals", "Parties and Celebrations", "Outdoor Dinners/Awards/Galas",
  "Seminars", "Networking Events", "Team Building Activities", "Brand Activations",
  "Trainings and Workshops", "Fashion Shows and Weeks", "Trade Shows & Exhibitions",
  "Weddings-Outdoor", "Art Shows", "Theaters and Performances",
  "Photo and Video Shoots", "Movie Premiere", "Graduation Events", "Sports Tournaments",
];

const VENUES = [
  { id: "1", name: "Atlantis Grand Ballroom", city: "Dubai", country: "UAE", type: "Galas", capacity: 1200, priceFrom: 18000, rating: 4.9, image: venue1 },
  { id: "2", name: "Skyline Rooftop — Downtown", city: "Dubai", country: "UAE", type: "Networking", capacity: 220, priceFrom: 9500, rating: 4.8, image: venue2 },
  { id: "3", name: "Nexus Conference Hall", city: "Abu Dhabi", country: "UAE", type: "Conferences", capacity: 850, priceFrom: 12000, rating: 4.7, image: venue3 },
  { id: "4", name: "Palm Cove Beachfront", city: "Ras Al-Khaimah", country: "UAE", type: "Weddings", capacity: 320, priceFrom: 22000, rating: 5.0, image: venue4 },
  { id: "5", name: "Ironworks Loft", city: "Riyadh", country: "KSA", type: "Brand", capacity: 400, priceFrom: 7500, rating: 4.6, image: venue5 },
  { id: "6", name: "Mirage Desert Camp", city: "Sharjah", country: "UAE", type: "Outdoor", capacity: 500, priceFrom: 14000, rating: 4.9, image: venue6 },
];

const WHY_FEATURES = [
  { icon: Sparkles, title: "Curated proposals", desc: "Tailored to your brief, with options across budgets." },
  { icon: ShieldCheck, title: "Fully transparent", desc: "No commissions or hidden markups — ever." },
  { icon: Clock, title: "Fast responses", desc: "Most briefs receive proposals within 24 hours." },
];

const GCC_CITIES = ["Dubai", "Abu Dhabi", "Sharjah", "Ras Al-Khaimah", "Riyadh", "Doha", "Manama"];

const PARTNER_BENEFITS = [
  "Zero commission — keep 100% of bookings",
  "Verified venue badge & priority placement",
  "Real-time inquiry dashboard",
  "Advisor-matched leads, pre-qualified",
];

/* ─── Venue Card ─── */
const VenueCard = ({ venue }: { venue: (typeof VENUES)[0] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    className="group relative overflow-hidden rounded-2xl border border-vp-border bg-vp-surface-elev transition-all duration-300 hover:-translate-y-1"
    style={{ boxShadow: "var(--vp-shadow-card)" }}
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={venue.image}
        alt={venue.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-vp-surface/95 px-2.5 py-1 text-xs font-semibold text-vp-foreground backdrop-blur">
        <Star className="h-3 w-3 fill-current" style={{ color: "hsl(var(--vp-gold))" }} />
        {venue.rating}
      </div>
      <div
        className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-vp-gold-foreground"
        style={{ background: "hsl(var(--vp-gold))" }}
      >
        {venue.type}
      </div>
    </div>
    <div className="p-5">
      <div className="flex items-center gap-1 text-xs text-vp-muted">
        <MapPin className="h-3 w-3" />
        {venue.city}, {venue.country}
      </div>
      <h3 className="mt-1 font-playfair font-bold text-lg leading-tight text-vp-foreground">{venue.name}</h3>
      <div className="mt-3 flex items-center justify-between border-t border-vp-border pt-3">
        <span className="flex items-center gap-1 text-xs text-vp-muted">
          <Users className="h-3 w-3" /> Up to {venue.capacity}
        </span>
        <span className="text-sm font-bold text-vp-foreground">
          AED {venue.priceFrom.toLocaleString()}
          <span className="text-xs font-medium text-vp-muted"> /event</span>
        </span>
      </div>
    </div>
  </motion.div>
);

/* ─── Main Page ─── */
const VenuePartners = () => {
  const [where, setWhere] = useState("");
  const [eventType, setEventType] = useState("");
  const [guests, setGuests] = useState("");

  return (
    <div className="min-h-screen bg-vp-background text-vp-foreground font-montserrat transition-colors">
      <VwHeader />

      {/* ═══ HERO ═══ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroImage}
            alt="Aerial view of a luxury venue at dusk"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "var(--vp-hero-overlay)" }} />
        </div>

        <div className="vw-container relative pb-32 pt-24 md:pb-40 md:pt-32 text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur">
              <Sparkles className="h-3 w-3" style={{ color: "hsl(var(--vp-gold))" }} />
              GCC's largest venue partner network
            </div>

            <h1 className="font-playfair font-bold text-5xl md:text-7xl lg:text-8xl text-balance leading-[1.05]">
              GCC's Largest{" "}
              <span style={{ color: "hsl(var(--vp-gold))" }}>Venue Sourcing</span>{" "}
              Platform
            </h1>

            <p className="mt-6 text-lg text-white/80 max-w-2xl">
              <span className="font-bold" style={{ color: "hsl(var(--vp-gold))" }}>15,019+</span>{" "}
              venues. Curated by experts. Free to source.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="mt-10 md:mt-14 rounded-2xl bg-vp-surface p-3 border border-vp-border"
            style={{ boxShadow: "var(--vp-shadow-soft)" }}
          >
            <div className="grid gap-2 md:grid-cols-[1.2fr_1.2fr_1fr_auto] md:divide-x md:divide-vp-border">
              <div className="px-4 py-3">
                <label className="block text-xs font-bold text-vp-foreground">Where's your event?</label>
                <div className="flex items-center gap-2 mt-1">
                  <MapPin className="h-4 w-4 text-vp-muted" />
                  <input
                    value={where}
                    onChange={(e) => setWhere(e.target.value)}
                    placeholder="Country, city, property name"
                    className="w-full bg-transparent text-sm text-vp-foreground outline-none placeholder:text-vp-muted"
                  />
                </div>
              </div>
              <div className="px-4 py-3">
                <label className="block text-xs font-bold text-vp-foreground">What's your event?</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full mt-1 bg-transparent text-sm text-vp-foreground outline-none"
                >
                  <option value="" className="bg-vp-surface text-vp-foreground">Enter the preferred event type</option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-vp-surface text-vp-foreground">{t}</option>
                  ))}
                </select>
              </div>
              <div className="px-4 py-3">
                <label className="block text-xs font-bold text-vp-foreground">How many guests?</label>
                <div className="flex items-center gap-2 mt-1">
                  <Users className="h-4 w-4 text-vp-muted" />
                  <input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    placeholder="Approx. attendees"
                    className="w-full bg-transparent text-sm text-vp-foreground outline-none placeholder:text-vp-muted"
                  />
                </div>
              </div>
              <a
                href="#explore"
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-vp-gold-foreground transition-opacity hover:opacity-90"
                style={{ background: "hsl(var(--vp-gold))" }}
              >
                <Search className="h-4 w-4" />
                Explore venues
              </a>
            </div>
          </motion.div>

          {/* City pills */}
          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-white/80">
            <span className="font-semibold">Available across the GCC:</span>
            {GCC_CITIES.map((c) => (
              <a
                key={c}
                href="#explore"
                className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs backdrop-blur transition-colors hover:border-[hsl(var(--vp-gold))] hover:text-[hsl(var(--vp-gold))]"
              >
                {c}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="border-b border-vp-border bg-vp-surface">
        <div className="vw-container grid grid-cols-2 gap-6 py-10 md:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="font-playfair font-bold text-4xl md:text-5xl text-vp-foreground">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-vp-muted">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ CATEGORIES ═══ */}
      <section id="categories" className="py-20 bg-vp-background">
        <div className="vw-container">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-playfair font-bold text-4xl md:text-5xl text-vp-foreground text-balance">
                Browse by category
              </h2>
              <p className="mt-2 max-w-md text-vp-muted">
                From intimate boardrooms to stadium-scale productions.
              </p>
            </div>
            <a
              href="#explore"
              className="hidden items-center gap-1 text-sm font-semibold text-vp-foreground hover:text-[hsl(var(--vp-gold))] transition-colors md:inline-flex"
            >
              View all <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((c, i) => (
              <motion.a
                key={c.label}
                href="#explore"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group rounded-2xl border border-vp-border bg-vp-surface p-5 transition-all hover:border-[hsl(var(--vp-gold))] hover:-translate-y-1"
                style={{ boxShadow: "var(--vp-shadow-card)" }}
              >
                <div className="font-playfair font-bold text-xl text-vp-foreground">{c.label}</div>
                <div className="mt-1 text-xs text-vp-muted">{c.count} venues</div>
                <ChevronRight className="mt-3 h-4 w-4 text-vp-muted transition-transform group-hover:translate-x-1 group-hover:text-[hsl(var(--vp-gold))]" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURED VENUES ═══ */}
      <section id="explore" className="py-20 bg-vp-surface-alt">
        <div className="vw-container">
          <div className="flex items-end justify-between">
            <div>
              <span
                className="inline-block text-xs font-bold uppercase tracking-widest rounded-full px-3 py-1 text-vp-gold-foreground"
                style={{ background: "hsl(var(--vp-gold))" }}
              >
                Hand-picked
              </span>
              <h2 className="mt-3 font-playfair font-bold text-4xl md:text-5xl text-vp-foreground text-balance">
                Featured venues
              </h2>
            </div>
            <a
              href="#explore"
              className="hidden items-center gap-1 text-sm font-semibold text-vp-foreground hover:text-[hsl(var(--vp-gold))] transition-colors md:inline-flex"
            >
              Explore all <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VENUES.map((v) => <VenueCard key={v.id} venue={v} />)}
          </div>
        </div>
      </section>

      {/* ═══ WHY + ADVISOR (dark panel both modes) ═══ */}
      <section
        id="advisor"
        className="py-24 relative overflow-hidden"
        style={{ background: "hsl(var(--elvie-navy-deep))" }}
      >
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, hsl(var(--vp-gold)/0.5), transparent 40%), radial-gradient(circle at 80% 70%, hsl(210 100% 55%/0.4), transparent 40%)"
        }} />
        <div className="vw-container relative grid gap-12 md:grid-cols-2 md:items-center">
          <div className="text-white">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "hsl(var(--vp-gold))" }}>
              The advisor advantage
            </span>
            <h2 className="mt-3 font-playfair font-bold text-5xl md:text-6xl text-balance">
              Need help finding the{" "}
              <span style={{ color: "hsl(var(--vp-gold))" }}>perfect venue?</span>
            </h2>
            <p className="mt-5 max-w-md text-white/70 text-lg">
              Our advisors curate proposals tailored to your brief — fully transparent, no commissions, no markups.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-vp-gold-foreground hover:opacity-90 transition-opacity"
                style={{ background: "hsl(var(--vp-gold))" }}
              >
                Ask a venue advisor <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#explore"
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
              >
                Browse venues
              </a>
            </div>
          </div>

          <div className="grid gap-4">
            {WHY_FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
              >
                <div
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-vp-gold-foreground"
                  style={{ background: "hsl(var(--vp-gold))" }}
                >
                  <f.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-playfair font-bold text-xl text-white">{f.title}</h3>
                  <p className="mt-1 text-sm text-white/70">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-24 bg-vp-background">
        <div className="vw-container">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "hsl(var(--vp-gold))" }}>
              Simple process
            </span>
            <h2 className="mt-3 font-playfair font-bold text-4xl md:text-5xl text-vp-foreground text-balance">
              How it works
            </h2>
            <p className="mt-4 text-vp-muted">
              From your first search to a signed contract — in four simple steps.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {[
              { n: "01", title: "Describe", desc: "Tell us your event type, guest count, and date." },
              { n: "02", title: "Match", desc: "Receive a shortlist of perfect-fit venues in 24h." },
              { n: "03", title: "Compare", desc: "Review pricing, photos, and availability side-by-side." },
              { n: "04", title: "Book", desc: "Confirm your venue with zero commission fees." },
            ].map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative rounded-2xl border border-vp-border bg-vp-surface p-6"
                style={{ boxShadow: "var(--vp-shadow-card)" }}
              >
                <div
                  className="font-playfair font-bold text-4xl"
                  style={{ color: "hsl(var(--vp-gold))" }}
                >
                  {s.n}
                </div>
                <h3 className="mt-3 font-playfair font-bold text-xl text-vp-foreground">{s.title}</h3>
                <p className="mt-2 text-sm text-vp-muted">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PARTNER JOIN CTA ═══ */}
      <section id="contact" className="py-20 bg-vp-surface-alt">
        <div className="vw-container">
          <div
            className="relative rounded-3xl overflow-hidden p-10 md:p-16 grid md:grid-cols-2 gap-10 items-center"
            style={{ background: "hsl(var(--elvie-navy-deep))" }}
          >
            <div
              className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30 blur-3xl pointer-events-none"
              style={{ background: "hsl(var(--vp-gold))" }}
            />
            <div
              className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ background: "hsl(210 100% 55%)" }}
            />

            <div className="relative text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur">
                <TrendingUp className="h-3 w-3" style={{ color: "hsl(var(--vp-gold))" }} />
                For venue owners
              </div>
              <h2 className="mt-4 font-playfair font-bold text-4xl md:text-5xl text-balance">
                Are you a venue owner?{" "}
                <span style={{ color: "hsl(var(--vp-gold))" }}>Partner with us.</span>
              </h2>
              <p className="mt-4 text-white/70 text-lg max-w-md">
                List your venue on GCC's largest platform and receive qualified corporate inquiries directly — zero commission.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-vp-gold-foreground hover:opacity-90 transition-opacity"
                  style={{ background: "hsl(var(--vp-gold))" }}
                >
                  Partner Sign In <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-7 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition-colors"
                >
                  Request Partnership
                </Link>
              </div>
            </div>

            <div className="relative grid gap-3">
              {PARTNER_BENEFITS.map((b, i) => (
                <motion.div
                  key={b}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/[0.04] p-4 backdrop-blur"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: "hsl(var(--vp-gold))" }} />
                  <span className="text-sm font-semibold text-white">{b}</span>
                </motion.div>
              ))}
              <div className="mt-2 text-xs text-white/40 flex items-center gap-2">
                <Building2 className="h-3 w-3" />
                Free to list · No commission · Verified badge
              </div>
            </div>
          </div>
        </div>
      </section>

      <VwFooter />
      <ScrollToTop />
    </div>
  );
};

export default VenuePartners;
