import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ChevronDown, LogIn, LayoutDashboard, Building2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../assets/Logo.webp";
import { useAuth } from "@/context/AuthContext";

const giftTypes = [
  "Employee Welcome Kits",
  "Business Green Plants",
  "Floral Arrangements for Businesses",
  "Event Cupcake Treats",
  "Celebration Cakes for Offices",
  "Premium Chocolate Gifts",
  "Business Gifting Solutions",
  "Gift Combo Packages",
  "Curated Gift Hampers",
  "Tech Gadgets for Gifting",
  "Travel & Utility Bags",
  "Safety & Outdoor Essentials",
  "Office Stationery Gifts",
  "Corporate Drinkware",
  "Lifestyle Accessories",
  "Promotional Merchandise",
  "Branded Apparel Gifts",
  "Professional Laptop Bags"
];

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "ABOUT US", href: "/aboutus" },
  { label: "GALLERY", href: "/gallery" },
  { label: "BOOKING", href: "/booking" },
];

const ElvieNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategoryClick = (type: string) => {
    setDropdownOpen(false);
    setMobileOpen(false);
    const slug = type.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-').replace(/[^\w-]/g, '');
    navigate(`/corporate/${slug}`);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled || location.pathname.startsWith('/corporate') ? "elvie-gradient-dark shadow-2xl backdrop-blur-md" : "bg-transparent"
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
          {navLinks.map((link) => (
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
              <span className="ml-4 text-primary-foreground/30">|</span>
            </Link>
          ))}

          {/* Corporate Gifts Split Link / Dropdown */}
          <div className="relative group" ref={dropdownRef}>
            <div className="flex items-center">
              <Link
                to="/corporate"
                className={`pl-4 pr-1 py-2 text-sm font-medium tracking-wider relative group transition-colors ${location.pathname.startsWith("/corporate")
                  ? "text-primary-foreground"
                  : "text-primary-foreground/90 hover:text-primary-foreground"
                  }`}
              >
                BUSINESS GIFTS BY TYPE
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-elvie-blue-light rounded-full transition-all duration-300 ${location.pathname.startsWith("/corporate") ? "w-3/4" : "w-0 group-hover:w-3/4"
                    }`}
                />
              </Link>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="p-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="Toggle Gifts Dropdown"
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50 max-h-[70vh] overflow-y-auto custom-scrollbar"
                >
                  <div className="py-2">
                    {giftTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => handleCategoryClick(type)}
                        className="w-full text-left px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors border-b border-border/50 last:border-0"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="ml-3">
            <Link
              to={isAuthenticated ? "/dashboard" : "/venue-partners"}
              className="flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-bold text-xs tracking-wider text-primary-foreground transition-all hover:scale-105 active:scale-95 shadow-[0_4px_14px_rgba(200,150,50,0.3)]"
              style={{ background: "linear-gradient(135deg, hsl(40 80% 55%) 0%, hsl(35 90% 45%) 100%)" }}
            >
              {isAuthenticated ? <LayoutDashboard className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
              {isAuthenticated ? "DASHBOARD" : "VENUE PARTNERS"}
            </Link>
          </motion.div>

          <motion.a
            href="tel:+971521327081"
            className="ml-2 flex items-center gap-2 border border-primary-foreground/50 rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-4 h-4" />
            BOOK NOW!
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
            className="md:hidden elvie-gradient-dark border-t border-primary-foreground/10 pb-4 max-h-[85vh] overflow-y-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <Link
                  to={link.href}
                  className="block px-6 py-3 text-sm font-medium tracking-wider text-primary-foreground/90 hover:text-primary-foreground whitespace-nowrap"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* Mobile Corporate Gifts with Dropdown */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: navLinks.length * 0.05 }}>
              <div className="px-6 py-3">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-between w-full text-sm font-medium tracking-wider text-primary-foreground/90 hover:text-primary-foreground"
                >
                  BUSINESS GIFTS
                  <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-primary-foreground/5 rounded-lg mt-2"
                    >
                      {giftTypes.map((type) => (
                        <button
                          key={type}
                          onClick={() => handleCategoryClick(type)}
                          className="w-full text-left px-4 py-2 text-[13px] text-primary-foreground/70 hover:text-primary-foreground border-b border-primary-foreground/5 last:border-0"
                        >
                          {type}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <Link
              to={isAuthenticated ? "/dashboard" : "/venue-partners"}
              onClick={() => setMobileOpen(false)}
              className="mx-6 mt-4 flex items-center justify-center gap-2 rounded-lg px-4 py-3 font-bold text-sm tracking-wider text-primary-foreground transition-all shadow-[0_4px_14px_rgba(200,150,50,0.3)]"
              style={{ background: "linear-gradient(135deg, hsl(40 80% 55%) 0%, hsl(35 90% 45%) 100%)" }}
            >
              {isAuthenticated ? <LayoutDashboard className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
              {isAuthenticated ? "DASHBOARD" : "VENUE PARTNERS"}
            </Link>

            <a
              href="tel:+971521327081"
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

