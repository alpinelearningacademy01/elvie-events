import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";

const ElvieNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = ["HOME", "ABOUT US", "GALLERY", "BOOKING"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 elvie-gradient-dark">
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex flex-col items-center">
          <span className="text-2xl font-bold tracking-[0.3em] text-primary-foreground font-montserrat">
            EL<span className="text-elvie-blue-light">V</span>IE
          </span>
          <span className="text-[10px] tracking-[0.5em] text-primary-foreground/70 uppercase">
            Events
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
              className="px-4 py-2 text-sm font-medium tracking-wider text-primary-foreground/90 hover:text-primary-foreground transition-colors"
            >
              {link}
              {i < links.length - 1 && (
                <span className="ml-4 text-primary-foreground/30">|</span>
              )}
            </a>
          ))}
          <a
            href="tel:+9715029137212"
            className="ml-4 flex items-center gap-2 border border-primary-foreground/50 rounded px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
          >
            <Phone className="w-4 h-4" />
            CALL NOW!
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-primary-foreground"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden elvie-gradient-dark border-t border-primary-foreground/10 pb-4">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
              className="block px-6 py-3 text-sm font-medium tracking-wider text-primary-foreground/90 hover:text-primary-foreground"
              onClick={() => setMobileOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="tel:+9715029137212"
            className="mx-6 mt-2 flex items-center justify-center gap-2 border border-primary-foreground/50 rounded px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            <Phone className="w-4 h-4" />
            CALL NOW!
          </a>
        </div>
      )}
    </nav>
  );
};

export default ElvieNavbar;
