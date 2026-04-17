import { useState, ReactNode } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Inbox,
  Building2,
  MessageSquare,
  Contact,
  Megaphone,
  RefreshCw,
  UserCircle,
  LogOut,
  Menu,
  X,
  Heart,
  Bell,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import logoImg from "@/assets/Logo.webp";

const navSections = [
  {
    label: "MAIN",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
      { to: "/dashboard/inbox", label: "Inbox", icon: Inbox, badge: 1 },
    ],
  },
  {
    label: "MANAGE",
    items: [
      { to: "/dashboard/properties", label: "My Properties", icon: Building2 },
      { to: "/dashboard/inquiries", label: "Inquiries", icon: MessageSquare },
      { to: "/dashboard/contacts", label: "Contact Information", icon: Contact },
    ],
  },
  {
    label: "BILLING",
    items: [
      { to: "/dashboard/plans", label: "Plans", icon: Megaphone },
      { to: "/dashboard/transactions", label: "Transactions", icon: RefreshCw },
    ],
  },
  {
    label: "ACCOUNT",
    items: [{ to: "/dashboard/profile", label: "My Profile", icon: UserCircle }],
  },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // close drawer on route change
  const onNavClick = () => setMobileOpen(false);

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* TOP NAV */}
      <header className="elvie-gradient-dark border-b border-primary-foreground/10 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-primary-foreground p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link to="/" className="flex items-center">
              <img src={logoImg} alt="Elvie Events" className="h-10 w-auto" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-primary-foreground/90">
            <Link to="/corporate" className="hover:text-primary-foreground">Explore Gifts</Link>
            <Link to="/booking" className="hover:text-primary-foreground">Ask an Advisor</Link>
          </nav>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-primary-foreground/80 hover:text-primary-foreground">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-elvie-gold rounded-full" />
            </button>
            <div className="hidden sm:flex items-center gap-2 border border-elvie-gold/40 rounded-lg px-3 py-1.5 text-elvie-gold text-xs font-semibold">
              <Heart className="w-4 h-4 fill-elvie-gold" />
              Favorites
            </div>
            <div className="w-9 h-9 rounded-full bg-elvie-gold/20 border border-elvie-gold/40 flex items-center justify-center text-elvie-gold font-bold text-sm">
              {user?.name?.[0] ?? "U"}
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* SIDEBAR */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-30 top-[64px]"
            />
          )}
        </AnimatePresence>

        <aside
          className={`fixed lg:sticky top-[64px] lg:top-[64px] left-0 z-30 h-[calc(100vh-64px)] w-64 bg-card border-r border-border overflow-y-auto transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="p-4 space-y-6">
            {navSections.map((section) => (
              <div key={section.label}>
                <p className="text-[11px] font-bold tracking-widest text-muted-foreground/70 mb-2 px-3">
                  {section.label}
                </p>
                <ul className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      item.end ? location.pathname === item.to : location.pathname === item.to;
                    return (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          end={item.end}
                          onClick={onNavClick}
                          className={({ isActive: a }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                              a
                                ? "elvie-gradient-dark text-primary-foreground shadow-md"
                                : "text-foreground/80 hover:bg-muted hover:text-foreground"
                            }`
                          }
                        >
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="flex-1">{item.label}</span>
                          {"badge" in item && item.badge ? (
                            <span className="bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                              {item.badge}
                            </span>
                          ) : null}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}

            <div className="pt-4 border-t border-border">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 min-w-0 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
