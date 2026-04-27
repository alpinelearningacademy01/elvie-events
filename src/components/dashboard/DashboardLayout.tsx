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
  Bell,
  ChevronDown,
  Sparkles,
  Search,
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
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const onNavClick = () => setMobileOpen(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#070c18" }}>

      {/* ── TOP NAV ── */}
      <header className="sticky top-0 z-40 border-b" style={{ background: "rgba(7,12,24,0.9)", backdropFilter: "blur(16px)", borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between px-4 lg:px-6 py-3 gap-4">

          {/* Left: burger + logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/8 transition-colors"
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                placeholder="Search venues, inquiries…"
                className="w-full pl-9 pr-4 py-2 text-xs text-slate-300 placeholder:text-slate-600 rounded-xl outline-none focus:ring-1 focus:ring-white/10 transition-all"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.06)" }}
              />
            </div>
          </div>

          {/* Right: actions + user */}
          <div className="flex items-center gap-2">
            {/* Premium badge */}
            <div className="hidden sm:flex items-center gap-1.5 border rounded-lg px-2.5 py-1.5 text-xs font-bold"
              style={{ borderColor: "rgba(245,158,11,0.3)", color: "#f59e0b", background: "rgba(245,158,11,0.08)" }}>
              <Sparkles className="w-3.5 h-3.5" />
              Premium
            </div>

            {/* Bell */}
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/8 transition-colors">
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-amber-400 rounded-full" />
            </button>

            {/* User avatar */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black border"
                style={{ background: "linear-gradient(135deg,#3b82f6,#8b5cf6)", borderColor: "rgba(255,255,255,0.15)", color: "#fff" }}>
                {user?.name?.[0] ?? "U"}
              </div>
              <div className="hidden lg:block">
                <p className="text-[11px] text-white font-bold leading-none">{user?.name?.split(" ")[0]}</p>
                <p className="text-[10px] text-slate-500 leading-none mt-0.5">Venue Partner</p>
              </div>
              <ChevronDown className="hidden lg:block w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
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
              className="lg:hidden fixed inset-0 bg-black/70 z-30 top-[57px] backdrop-blur-sm"
            />
          )}
        </AnimatePresence>

        {/* ── SIDEBAR ── */}
        <aside
          className={`fixed lg:sticky top-[57px] lg:top-[57px] left-0 z-30 h-[calc(100vh-57px)] w-60 overflow-y-auto transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col border-r ${
            mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
          style={{ background: "rgba(7,12,24,0.97)", borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div className="flex-1 p-3 space-y-5">
            {navSections.map((section) => (
              <div key={section.label}>
                <p className="text-[10px] font-black tracking-[0.15em] mb-2 px-3" style={{ color: "rgba(255,255,255,0.2)" }}>
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
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group ${
                              a
                                ? "text-white shadow-lg"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`
                          }
                          style={({ isActive: a }) =>
                            a ? { background: "linear-gradient(135deg,rgba(59,130,246,0.25),rgba(139,92,246,0.18))", border: "1px solid rgba(255,255,255,0.08)" } : {}
                          }
                        >
                          {({ isActive: a }) => (
                            <>
                              <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${a ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}`} />
                              <span className="flex-1">{item.label}</span>
                              {"badge" in item && item.badge ? (
                                <span className="bg-blue-500 text-white text-[9px] font-black rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
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
          <div className="p-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 min-w-0 p-4 lg:p-8 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
