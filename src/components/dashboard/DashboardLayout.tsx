import { useState, ReactNode } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
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
  Bell,
  ChevronDown,
  Sparkles,
  Search,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import ThemeToggle from "@/components/ThemeToggle";
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
      { to: "/dashboard/contacts", label: "Contact Info", icon: Contact },
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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const onNavClick = () => setMobileOpen(false);

  return (
    <div className="min-h-screen flex flex-col bg-vp-background text-vp-foreground transition-colors">
      {/* ── TOP NAV ── */}
      <header className="sticky top-0 z-40 border-b border-vp-border bg-vp-surface/90 backdrop-blur-xl transition-colors">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3 gap-4">
          {/* Left: burger + logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-vp-muted hover:text-vp-foreground hover:bg-vp-surface-alt transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link to="/" className="flex items-center">
              <img src={logoImg} alt="Elvie Events" className="h-9 w-auto" />
            </Link>
          </div>

          {/* Center: search */}
          <div className="hidden md:flex flex-1 max-w-xs">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-vp-muted" />
              <input
                placeholder="Search venues, inquiries…"
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl outline-none bg-vp-surface-alt border border-vp-border text-vp-foreground placeholder:text-vp-muted focus:border-vp-gold transition-colors"
              />
            </div>
          </div>

          {/* Right: actions + user */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 border border-vp-gold/40 rounded-lg px-2.5 py-1.5 text-xs font-bold text-vp-gold bg-vp-gold/10">
              <Sparkles className="w-3.5 h-3.5" />
              Premium
            </div>

            <ThemeToggle />

            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-vp-muted hover:text-vp-foreground hover:bg-vp-surface-alt transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-vp-gold rounded-full" />
            </button>

            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black border border-vp-border bg-gradient-to-br from-elvie-blue to-elvie-navy text-white">
                {user?.name?.[0] ?? "U"}
              </div>
              <div className="hidden lg:block">
                <p className="text-[11px] font-bold leading-none text-vp-foreground">{user?.name?.split(" ")[0]}</p>
                <p className="text-[10px] leading-none mt-0.5 text-vp-muted">Venue Partner</p>
              </div>
              <ChevronDown className="hidden lg:block w-3.5 h-3.5 text-vp-muted group-hover:text-vp-foreground transition-colors" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* ── MOBILE OVERLAY ── */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 z-30 top-[57px] backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        {/* ── SIDEBAR ── */}
        <aside
          className={`fixed lg:sticky top-[57px] lg:top-[57px] left-0 z-30 h-[calc(100vh-57px)] w-60 overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col border-r border-vp-border bg-vp-surface ${
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="flex-1 p-3 space-y-5">
            {navSections.map((section) => (
              <div key={section.label}>
                <p className="text-[10px] font-black tracking-[0.15em] mb-2 px-3 text-vp-muted/70">
                  {section.label}
                </p>
                <ul className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.to}>
                        <NavLink
                          to={item.to}
                          end={item.end}
                          onClick={onNavClick}
                          className={({ isActive: a }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group border ${
                              a
                                ? "bg-vp-gold/15 border-vp-gold/30 text-vp-foreground shadow-sm"
                                : "border-transparent text-vp-muted hover:text-vp-foreground hover:bg-vp-surface-alt"
                            }`
                          }
                        >
                          {({ isActive: a }) => (
                            <>
                              <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${a ? "text-vp-gold" : "text-vp-muted group-hover:text-vp-foreground"}`} />
                              <span className="flex-1">{item.label}</span>
                              {"badge" in item && item.badge ? (
                                <span className="bg-vp-gold text-vp-gold-foreground text-[9px] font-black rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                                  {item.badge}
                                </span>
                              ) : null}
                            </>
                          )}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* Sidebar footer */}
          <div className="p-3 border-t border-vp-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 min-w-0 p-4 lg:p-8 overflow-x-hidden bg-vp-background text-vp-foreground">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
