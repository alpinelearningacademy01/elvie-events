import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../assets/Logo.webp";

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

const eventsList = [
  { name: "SBG Event", href: "/events" },
];

const ElvieNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [eventsDropdownOpen, setEventsDropdownOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const eventsDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
      if (eventsDropdownRef.current && !eventsDropdownRef.current.contains(event.target as Node)) {
        setEventsDropdownOpen(false);
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
          {/* HOME */}
          <Link
            to="/"
            className={`px-4 py-2 text-sm font-medium tracking-wider relative group transition-colors ${location.pathname === "/" ? "text-primary-foreground" : "text-primary-foreground/90 hover:text-primary-foreground"}`}
          >
            HOME
            <span
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-elvie-blue-light rounded-full transition-all duration-300 ${location.pathname === "/" ? "w-3/4" : "w-0 group-hover:w-3/4"}`}
            />
            <span className="ml-4 text-primary-foreground/30">|</span>
          </Link>

          {/* ABOUT US */}
          <Link
            to="/aboutus"
            className={`px-4 py-2 text-sm font-medium tracking-wider relative group transition-colors ${location.pathname === "/aboutus" ? "text-primary-foreground" : "text-primary-foreground/90 hover:text-primary-foreground"}`}
          >
            ABOUT US
            <span
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-elvie-blue-light rounded-full transition-all duration-300 ${location.pathname === "/aboutus" ? "w-3/4" : "w-0 group-hover:w-3/4"}`}
            />
            <span className="ml-4 text-primary-foreground/30">|</span>
          </Link>

          {/* EVENTS Dropdown */}
          <div
            className="relative group"
            ref={eventsDropdownRef}
            onMouseEnter={() => setEventsDropdownOpen(true)}
            onMouseLeave={() => setEventsDropdownOpen(false)}
          >
            <div className="flex items-center">
              <Link
                to="/events"
                className={`pl-4 pr-1 py-2 text-sm font-medium tracking-wider relative group transition-colors ${location.pathname.startsWith("/events")
                  ? "text-primary-foreground"
                  : "text-primary-foreground/90 hover:text-primary-foreground"
                  }`}
              >
                EVENTS
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-elvie-blue-light rounded-full transition-all duration-300 ${location.pathname.startsWith("/events") ? "w-3/4" : "w-0 group-hover:w-3/4"
                    }`}
                />
              </Link>
              <button
                onClick={() => setEventsDropdownOpen(!eventsDropdownOpen)}
                className="p-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="Toggle Events Dropdown"
              >
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${eventsDropdownOpen ? "rotate-180" : ""}`} />
              </button>
              <span className="ml-2 text-primary-foreground/30">|</span>
            </div>

            <AnimatePresence>
              {eventsDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-1 w-56 bg-card border border-border rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  <div className="py-2">
                    {eventsList.map((eventItem) => (
                      <button
                        key={eventItem.name}
                        onClick={() => {
                          setEventsDropdownOpen(false);
                          navigate(eventItem.href);
                        }}
                        className="w-full text-left px-5 py-2.5 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground transition-colors border-b border-border/50 last:border-0"
                      >
                        {eventItem.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* GALLERY */}
          <Link
            to="/gallery"
            className={`px-4 py-2 text-sm font-medium tracking-wider relative group transition-colors ${location.pathname === "/gallery" ? "text-primary-foreground" : "text-primary-foreground/90 hover:text-primary-foreground"}`}
          >
            GALLERY
            <span
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-elvie-blue-light rounded-full transition-all duration-300 ${location.pathname === "/gallery" ? "w-3/4" : "w-0 group-hover:w-3/4"}`}
            />
            <span className="ml-4 text-primary-foreground/30">|</span>
          </Link>

          {/* BOOKING */}
          <Link
            to="/booking"
            className={`px-4 py-2 text-sm font-medium tracking-wider relative group transition-colors ${location.pathname === "/booking"
              ? "text-primary-foreground"
              : "text-primary-foreground/90 hover:text-primary-foreground"
              }`}
          >
            BOOKING
            <span
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-elvie-blue-light rounded-full transition-all duration-300 ${location.pathname === "/booking" ? "w-3/4" : "w-0 group-hover:w-3/4"
                }`}
            />
          </Link>

          <motion.a
            href="tel:+971521327081"
            className="ml-2 flex items-center gap-2 border border-primary-foreground/50 rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors whitespace-nowrap"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Phone className="w-4 h-4" />
            CALL US NOW!
          </motion.a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-primary-foreground"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden elvie-gradient-dark border-t border-primary-foreground/10 pb-4 max-h-[85vh] overflow-y-auto"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Link
                to="/"
                className="block px-6 py-3 text-sm font-medium tracking-wider text-primary-foreground/90 hover:text-primary-foreground whitespace-nowrap"
                onClick={() => setMobileOpen(false)}
              >
                HOME
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Link
                to="/aboutus"
                className="block px-6 py-3 text-sm font-medium tracking-wider text-primary-foreground/90 hover:text-primary-foreground whitespace-nowrap"
                onClick={() => setMobileOpen(false)}
              >
                ABOUT US
              </Link>
            </motion.div>

            {/* Mobile EVENTS Dropdown */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="px-6 py-3">
                <button
                  onClick={() => setMobileEventsOpen(!mobileEventsOpen)}
                  className="flex items-center justify-between w-full text-sm font-medium tracking-wider text-primary-foreground/90 hover:text-primary-foreground"
                >
                  EVENTS
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileEventsOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {mobileEventsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden bg-primary-foreground/5 rounded-lg mt-2"
                    >
                      {eventsList.map((eventItem) => (
                        <button
                          key={eventItem.name}
                          onClick={() => {
                            setMobileEventsOpen(false);
                            setMobileOpen(false);
                            navigate(eventItem.href);
                          }}
                          className="w-full text-left px-4 py-2 text-[13px] text-primary-foreground/70 hover:text-primary-foreground border-b border-primary-foreground/5 last:border-0"
                        >
                          {eventItem.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Link
                to="/gallery"
                className="block px-6 py-3 text-sm font-medium tracking-wider text-primary-foreground/90 hover:text-primary-foreground whitespace-nowrap"
                onClick={() => setMobileOpen(false)}
              >
                GALLERY
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Link
                to="/booking"
                className="block px-6 py-3 text-sm font-medium tracking-wider text-primary-foreground/90 hover:text-primary-foreground whitespace-nowrap"
                onClick={() => setMobileOpen(false)}
              >
                BOOKING
              </Link>
            </motion.div>

            <a
              href="tel:+971521327081"
              className="mx-6 mt-4 flex items-center justify-center gap-2 border border-primary-foreground/50 rounded-lg px-4 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Phone className="w-4 h-4" />
              CALL US NOW!
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default ElvieNavbar;
