import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";

const ElvieNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["HOME", "ABOUT US", "GALLERY", "BOOKING"];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "elvie-gradient-dark shadow-2xl backdrop-blur-md" : "bg-transparent"
      }`}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <a href="#" className="flex flex-col items-center">
          <span className="text-2xl font-bold tracking-[0.3em] text-primary-foreground font-montserrat">
            EL<span className="text-elvie-blue-light">V</span>IE
          </span>
          <span className="text-[10px] tracking-[0.5em] text-primary-foreground/70 uppercase">
            Events
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link, i) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
              className="px-4 py-2 text-sm font-medium tracking-wider text-primary-foreground/90 hover:text-primary-foreground relative group transition-colors"
            >
              {link}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-elvie-blue-light group-hover:w-3/4 transition-all duration-300 rounded-full" />
              {i < links.length - 1 && (
                <span className="ml-4 text-primary-foreground/30">|</span>
              )}
            </a>
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
            {links.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                className="block px-6 py-3 text-sm font-medium tracking-wider text-primary-foreground/90 hover:text-primary-foreground"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {link}
              </motion.a>
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
