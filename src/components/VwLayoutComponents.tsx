import { Link } from "react-router-dom";
import { Search, MapPin, Users, Mail, Phone, Instagram, Linkedin, X as XIcon, Star } from "lucide-react";

export const VwHeader = () => (
  <header
    className="sticky top-0 z-50 shadow-lg"
    style={{ backgroundColor: "hsl(var(--elvie-navy-deep))" }}
  >
    <div className="vw-container flex h-20 items-center gap-6">
      {/* Logo */}
      <Link
        to="/venue-partners"
        className="flex items-center gap-2"
        aria-label="Venue Partner home"
      >
        <div
          className="flex h-9 w-9 items-center justify-center rounded-md font-playfair font-bold text-lg bg-white text-elvie-navy-deep"
          style={{ clipPath: "polygon(15% 0, 100% 0, 85% 100%, 0 100%)" }}
        >
          V
        </div>
        <span className="font-playfair font-bold text-base leading-none tracking-tight text-white">
          VENUE
          <br />
          PARTNER
        </span>
      </Link>

      {/* Nav */}
      <nav className="hidden items-center gap-6 md:flex">
        <Link
          to="/venue-partners#explore"
          className="text-sm font-semibold text-white/90 hover:text-elvie-gold vw-transition"
        >
          Explore venues
        </Link>
        <Link
          to="/venue-partners#categories"
          className="text-sm font-semibold text-white/90 hover:text-elvie-gold vw-transition"
        >
          Categories
        </Link>
      </nav>

      {/* Search bar */}
      <div className="hidden flex-1 items-center gap-3 rounded-full bg-white/10 px-5 py-2.5 lg:flex">
        <Search className="h-4 w-4 text-white/70" />
        <input
          placeholder="Search venues, locations, event types..."
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/60"
        />
      </div>

      {/* CTA */}
      <div className="ml-auto flex items-center gap-4">
        <Link
          to="/venue-partners#advisor"
          className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-white px-6 py-2.5 text-base font-bold text-white vw-transition hover:bg-white/10"
        >
          Ask a venue advisor
        </Link>
        <Link
          to="/login"
          className="inline-flex items-center justify-center rounded-xl border border-white px-6 py-2.5 text-base font-bold text-white vw-transition hover:bg-white/10"
        >
          Sign in / Sign up
        </Link>
      </div>
    </div>
  </header>
);

export const VwFooter = () => (
  <footer style={{ backgroundColor: "hsl(var(--elvie-navy-deep))" }} className="text-white">
    <div className="vw-container py-16">
      <div className="grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-playfair font-bold text-3xl md:text-4xl">
            Find your{" "}
            <span style={{ color: "hsl(var(--elvie-gold))" }}>perfect venue</span>.
          </h3>
          <p className="mt-4 max-w-md text-sm text-white/70">
            Venue Partner connects organizers with the GCC's largest curated network
            of venues — fast, transparent, and free to use.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">
            Platform
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link to="/venue-partners#explore" className="hover:text-elvie-gold vw-transition">
                Explore venues
              </Link>
            </li>
            <li>
              <Link to="/venue-partners#advisor" className="hover:text-elvie-gold vw-transition">
                Ask a venue advisor
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-elvie-gold vw-transition">
                Create an account
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail
                className="h-4 w-4"
                style={{ color: "hsl(var(--elvie-gold))" }}
              />
              support@venuepartner.com
            </li>
            <li className="flex items-center gap-2">
              <Phone
                className="h-4 w-4"
                style={{ color: "hsl(var(--elvie-gold))" }}
              />
              +971 52 137 7986
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            {[Instagram, Linkedin, XIcon].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 vw-transition hover:border-elvie-gold hover:bg-elvie-gold hover:text-elvie-navy-deep"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Venue Partner. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy-policy" className="hover:text-white vw-transition">
            Privacy
          </Link>
          <Link to="/terms-and-conditions" className="hover:text-white vw-transition">
            Terms
          </Link>
          <a href="#" className="hover:text-white vw-transition">
            Cookies
          </a>
        </div>
      </div>
    </div>
  </footer>
);
