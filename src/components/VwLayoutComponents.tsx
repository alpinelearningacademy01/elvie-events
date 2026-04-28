import { Link } from "react-router-dom";
import { Search, Mail, Phone, Instagram, Linkedin, X as XIcon, Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

export const VwHeader = () => {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const navItems = [
    { to: "/venue-partners#explore", label: "Explore venues" },
    { to: "/venue-partners#categories", label: "Categories" },
    { to: "/venue-partners#advisor", label: "Advisor" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-vp-border bg-vp-surface/90 backdrop-blur-md">
      <div className="vw-container flex h-20 items-center gap-4 md:gap-6">
        {/* Logo */}
        <Link to="/venue-partners" className="flex items-center gap-2.5 shrink-0" aria-label="Venue Partner home">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-md font-playfair font-bold text-lg text-vp-gold-foreground"
            style={{ background: "hsl(var(--vp-gold))", clipPath: "polygon(15% 0, 100% 0, 85% 100%, 0 100%)" }}
          >
            V
          </div>
          <span className="font-playfair font-bold text-sm leading-none tracking-tight text-vp-foreground">
            VENUE<br />PARTNER
          </span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-semibold text-vp-foreground/80 hover:text-vp-gold transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Search */}
        <div className="hidden flex-1 items-center gap-3 rounded-full border border-vp-border bg-vp-surface-alt px-5 py-2.5 lg:flex">
          <Search className="h-4 w-4 text-vp-muted" />
          <input
            placeholder="Search venues, locations, event types..."
            className="w-full bg-transparent text-sm text-vp-foreground outline-none placeholder:text-vp-muted"
          />
        </div>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <ThemeToggle />
          <Link
            to={isAuthenticated ? "/dashboard" : "/login"}
            className="hidden sm:inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-vp-gold-foreground transition-transform hover:scale-[1.02]"
            style={{ background: "hsl(var(--vp-gold))" }}
          >
            {isAuthenticated ? "Dashboard" : "Sign in"}
          </Link>

          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-vp-border text-vp-foreground"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-vp-border bg-vp-surface">
          <div className="vw-container py-4 flex flex-col gap-1">
            {navItems.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-lg text-sm font-semibold text-vp-foreground hover:bg-vp-surface-alt"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to={isAuthenticated ? "/dashboard" : "/login"}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold text-vp-gold-foreground"
              style={{ background: "hsl(var(--vp-gold))" }}
            >
              {isAuthenticated ? "Dashboard" : "Sign in / Sign up"}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export const VwFooter = () => (
  <footer className="border-t border-vp-border bg-vp-surface-alt text-vp-foreground">
    <div className="vw-container py-16">
      <div className="grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-playfair font-bold text-3xl md:text-4xl">
            Find your <span style={{ color: "hsl(var(--vp-gold))" }}>perfect venue</span>.
          </h3>
          <p className="mt-4 max-w-md text-sm text-vp-muted">
            Venue Partner connects organizers with the GCC's largest curated network of venues —
            fast, transparent, and free to use.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-vp-muted">Platform</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/venue-partners#explore" className="hover:text-vp-gold transition-colors">Explore venues</Link></li>
            <li><Link to="/venue-partners#advisor" className="hover:text-vp-gold transition-colors">Ask a venue advisor</Link></li>
            <li><Link to="/signup" className="hover:text-vp-gold transition-colors">Create an account</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-vp-muted">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" style={{ color: "hsl(var(--vp-gold))" }} />
              support@venuepartner.com
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" style={{ color: "hsl(var(--vp-gold))" }} />
              +971 52 137 7986
            </li>
          </ul>
          <div className="mt-6 flex gap-3">
            {[Instagram, Linkedin, XIcon].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-vp-border transition-colors hover:border-vp-gold hover:text-vp-gold"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-vp-border pt-6 text-xs text-vp-muted md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Venue Partner. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy-policy" className="hover:text-vp-foreground transition-colors">Privacy</Link>
          <Link to="/terms-and-conditions" className="hover:text-vp-foreground transition-colors">Terms</Link>
          <a href="#" className="hover:text-vp-foreground transition-colors">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);
