import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../assets/Logo.webp";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/aboutus" },
  { label: "GALLERY", href: "/gallery" },
  { label: "BOOKING", href: "/booking" },
  { label: "CORPORATE GIFTS", href: "/corporate-gifts" },
];

const ElvieNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "elvie-gradient-dark shadow-2xl backdrop-blur-md" : "bg-transparent"
        }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <Link to="/" className="flex items-center">
          <img
            src={logoImg}
            alt="Elvie Events Logo"
            className="h-16 md:h-18 lg:h-20 w-auto object-contain"
            draggable={false}
          />
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <Link
              key={link.label}
              to={link.href}
              className={`px-4 py-2 text-sm font-medium tracking-wider relative group transition-colors ${location.pathname === link.href
                ? "text-primary-foreground"
                : "text-primary-foreground/90 hover:text-primary-foreground"
                }`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-elvie-blue-light rounded-full transition-all duration-300 ${location.pathname === link.href ? "w-3/4" : "w-0 group-hover:w-3/4"
                  }`}
              />
              {i < navLinks.length - 1 && (
                <span className="ml-4 text-primary-foreground/30">|</span>
              )}
            </Link>
          ))}
          <motion.a
            href="tel:+9715029137212"
            className="ml-4 flex items-center gap-2 border border-primary-foreground/50 rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-4 h-4" />
            CALL NOW!
          </motion.a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-primary-foreground"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden elvie-gradient-dark border-t border-primary-foreground/10 pb-4"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Link
                  to={link.href}
                  className="block px-6 py-3 text-sm font-medium tracking-wider text-primary-foreground/90 hover:text-primary-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <a
              href="tel:+9715029137212"
              className="mx-6 mt-2 flex items-center justify-center gap-2 border border-primary-foreground/50 rounded px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              <Phone className="w-4 h-4" />
              CALL NOW!
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default ElvieNavbar;
