import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  TrendingUp,
  Users,
  CalendarCheck,
  MessageSquare,
  BarChart3,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  LogIn,
  Globe,
  Star,
  Megaphone,
} from "lucide-react";
import ElvieNavbar from "@/components/ElvieNavbar";
import ElvieFooter from "@/components/ElvieFooter";
import ScrollToTop from "@/components/ScrollToTop";
import { useAuth } from "@/context/AuthContext";

const stats = [
  { value: "500+", label: "Active Venues" },
  { value: "12K+", label: "Monthly Inquiries" },
  { value: "98%", label: "Partner Satisfaction" },
  { value: "24/7", label: "Dedicated Support" },
];

const features = [
  {
    icon: Building2,
    title: "List Your Venues",
    description:
      "Showcase unlimited properties with rich galleries, floor plans, capacity charts and amenity lists in minutes.",
  },
  {
    icon: MessageSquare,
    title: "Unified Inbox",
    description:
      "All inquiries from every channel land in one place. Reply faster, never miss a lead.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Track views, conversion rates, and revenue with intuitive dashboards built for venue owners.",
  },
  {
    icon: CalendarCheck,
    title: "Smart Booking Manager",
    description:
      "Manage availability, holds, and confirmed events on a single calendar shared across your team.",
  },
  {
    icon: Users,
    title: "Contacts & CRM",
    description:
      "Build lasting relationships with planners and corporates through our integrated client database.",
  },
  {
    icon: Megaphone,
    title: "Promotional Boost",
    description:
      "Featured placements, seasonal campaigns, and email blasts to thousands of qualified buyers.",
  },
];

const steps = [
  { num: "01", title: "Create your account", desc: "Sign up in under 2 minutes — no credit card required." },
  { num: "02", title: "Add your venues", desc: "Upload photos, set capacities, define packages and pricing." },
  { num: "03", title: "Receive qualified leads", desc: "Real corporate planners reach out directly through your dashboard." },
  { num: "04", title: "Close more bookings", desc: "Quote, negotiate, and confirm — all from one place." },
];

const benefits = [
  "Zero listing fees on the Starter plan",
  "Verified partner badge for trust",
  "Direct messaging with event planners",
  "Mobile-first dashboard, manage on the go",
  "Export reports for accounting & tax",
  "Priority placement in search results",
];

const testimonials = [
  {
    name: "Rashid Al Mansoori",
    role: "GM, Atlantis Conference Hall",
    quote:
      "Within 60 days we doubled our corporate event bookings. The dashboard is the cleanest we've used in 12 years.",
  },
  {
    name: "Priya Sharma",
    role: "Sales Director, Marina Banquets",
    quote:
      "The inquiry inbox alone is worth it. We respond in minutes instead of hours and our close rate is up 40%.",
  },
  {
    name: "James O'Connor",
    role: "Owner, Skyline Rooftop Venue",
    quote:
      "Elvie's partner network brought us premium clients we'd never have reached on our own. Game changer.",
  },
];

const VenuePartners = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <ElvieNavbar />

      {/* HERO */}
      <section className="relative pt-32 pb-20 elvie-gradient-dark overflow-hidden">
        <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-elvie-blue-light/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-32 w-[500px] h-[500px] bg-elvie-gold/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-elvie-gold/20 border border-elvie-gold/40 text-elvie-gold text-xs font-semibold tracking-wider uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5" /> For Venue Owners & Partners
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-primary-foreground leading-tight mb-6">
                Grow Your Venue
                <span className="block text-elvie-gold">Booking Business</span>
              </h1>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl leading-relaxed">
                Join the Elvie Events partner network — the smartest way to list
                your venues, manage inquiries, and convert more corporate
                bookings from one beautiful dashboard.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to={isAuthenticated ? "/dashboard" : "/login"}
                  className="group inline-flex items-center gap-2 bg-elvie-gold text-elvie-dark px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-elvie-gold/90 transition-all shadow-lg shadow-elvie-gold/30"
                >
                  {isAuthenticated ? "Go to Dashboard" : "Partner Sign In"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 border border-primary-foreground/40 text-primary-foreground px-7 py-3.5 rounded-lg font-semibold text-sm hover:bg-primary-foreground/10 transition-colors"
                >
                  How It Works
                </a>
              </div>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl md:text-3xl font-bold text-elvie-gold font-playfair">
                      {s.value}
                    </div>
                    <div className="text-xs text-primary-foreground/60 uppercase tracking-wider mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-elvie-gold/20 p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Partner Dashboard
                    </p>
                    <p className="text-lg font-bold text-foreground font-playfair">
                      Welcome back, Rashid
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full elvie-gradient-dark flex items-center justify-center text-elvie-gold font-bold">
                    R
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-5">
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-elvie-gold mb-2" />
                    <p className="text-xl font-bold text-foreground">+42%</p>
                    <p className="text-[11px] text-muted-foreground">
                      Inquiries this month
                    </p>
                  </div>
                  <div className="bg-muted/40 p-4 rounded-lg">
                    <CalendarCheck className="w-5 h-5 text-elvie-blue mb-2" />
                    <p className="text-xl font-bold text-foreground">28</p>
                    <p className="text-[11px] text-muted-foreground">
                      Bookings confirmed
                    </p>
                  </div>
                </div>
                <div className="space-y-2.5">
                  {[
                    { name: "DAMAC Properties", t: "2 min ago", new: true },
                    { name: "Emirates Group", t: "1 hour ago", new: true },
                    { name: "Mubadala Investment", t: "Yesterday", new: false },
                  ].map((m) => (
                    <div
                      key={m.name}
                      className="flex items-center justify-between p-3 bg-background rounded-lg border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-elvie-blue/10 flex items-center justify-center text-elvie-blue text-xs font-bold">
                          {m.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {m.name}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {m.t}
                          </p>
                        </div>
                      </div>
                      {m.new && (
                        <span className="w-2 h-2 rounded-full bg-elvie-gold animate-pulse" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-elvie-gold text-elvie-dark px-4 py-2 rounded-lg text-xs font-bold shadow-xl">
                LIVE PREVIEW
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="text-xs font-semibold text-elvie-gold uppercase tracking-[0.2em]">
              Everything You Need
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mt-3 mb-4">
              Built for Modern Venue Owners
            </h2>
            <p className="text-muted-foreground">
              A complete toolkit to list, market, and manage your venues — with
              the elegance and reliability your brand deserves.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-7 rounded-2xl bg-card border border-border hover:border-elvie-gold/40 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-xl elvie-gradient-dark flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6 text-elvie-gold" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 font-playfair">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-elvie-gold uppercase tracking-[0.2em]">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mt-3 mb-4">
              From Listing to Booking in 4 Steps
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-7 bg-card rounded-2xl border border-border"
              >
                <div className="text-5xl font-playfair font-bold text-elvie-gold/30 mb-3">
                  {s.num}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS SPLIT */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="elvie-gradient-dark rounded-2xl p-10 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-elvie-gold/20 rounded-full blur-3xl" />
                <ShieldCheck className="w-14 h-14 text-elvie-gold mb-5" />
                <h3 className="text-2xl md:text-3xl font-playfair font-bold text-primary-foreground mb-3">
                  Verified Partner Program
                </h3>
                <p className="text-primary-foreground/70 text-sm mb-6">
                  Stand out with our verified badge — earned through quality
                  checks and consistent customer satisfaction.
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-elvie-gold text-elvie-gold"
                      />
                    ))}
                  </div>
                  <span className="text-primary-foreground/80 text-xs">
                    Trusted by 500+ venues across UAE
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs font-semibold text-elvie-gold uppercase tracking-[0.2em]">
                Partner Benefits
              </span>
              <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mt-3 mb-6">
                Why Venue Owners Choose Elvie
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-elvie-gold flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-elvie-gold uppercase tracking-[0.2em]">
              Partner Stories
            </span>
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-foreground mt-3">
              Trusted by Leading Venues
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-7 bg-card rounded-2xl border border-border hover:shadow-xl transition-shadow"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-elvie-gold text-elvie-gold"
                    />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed mb-5 italic">
                  "{t.quote}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-bold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="py-20 elvie-gradient-dark relative overflow-hidden">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-elvie-blue-light/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-elvie-gold/20 rounded-full blur-3xl" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Globe className="w-14 h-14 text-elvie-gold mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-primary-foreground mb-5">
              Ready to grow your venue business?
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
              Join hundreds of venues already booking smarter with Elvie. Sign
              in to your partner dashboard or request access today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to={isAuthenticated ? "/dashboard" : "/login"}
                className="inline-flex items-center gap-2 bg-elvie-gold text-elvie-dark px-8 py-4 rounded-lg font-bold text-sm hover:bg-elvie-gold/90 transition-all shadow-xl"
              >
                <LogIn className="w-4 h-4" />
                {isAuthenticated ? "Open Dashboard" : "Partner Sign In"}
              </Link>
              <a
                href="/booking"
                className="inline-flex items-center gap-2 border border-primary-foreground/40 text-primary-foreground px-8 py-4 rounded-lg font-semibold text-sm hover:bg-primary-foreground/10 transition-colors"
              >
                Request Partnership
              </a>
            </div>
            <p className="text-xs text-primary-foreground/50 mt-6">
              Demo credentials: demo@elvie.com / demo123
            </p>
          </div>
        </div>
      </section>

      <ElvieFooter />
      <ScrollToTop />
    </div>
  );
};

export default VenuePartners;
