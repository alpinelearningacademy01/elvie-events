import { useState, ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  Building2,
  Menu,
  X,
  Bell,
  ChevronDown,
  Search,
  LogOut,
  Shield,
  RefreshCw
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import logoImg from "@/assets/Logo.webp";

interface AdminDashboardLayoutProps {
  children: ReactNode;
  activeTab: "dashboard" | "inquiries" | "partners" | "requests";
  setActiveTab: (tab: "dashboard" | "inquiries" | "partners" | "requests") => void;
  onRefresh?: () => void;
  stats?: any;
}

const AdminDashboardLayout = ({ children, activeTab, setActiveTab, onRefresh, stats }: AdminDashboardLayoutProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  const navSections = [
    {
      label: "ADMIN PANEL",
      items: [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "requests", label: "Access Requests", icon: Bell },
        { id: "inquiries", label: "All Inquiries", icon: MessageSquare, badge: stats?.totalInquiries },
        { id: "partners", label: "Venue Partners", icon: Building2, badge: stats?.totalPartners },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-vp-background text-vp-foreground transition-colors">
      {/* ── TOP NAV ── */}
      <header className="sticky top-0 z-40 border-b border-vp-border bg-vp-surface/90 backdrop-blur-xl transition-colors">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3 gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-vp-muted hover:text-vp-foreground hover:bg-vp-surface-alt transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <Link to="/" className="flex items-center">
              <img src={logoImg} alt="Elvie Events" className="h-9 w-auto" />
            </Link>
            <div className="hidden sm:flex items-center gap-1.5 border border-vp-gold/40 rounded-lg px-2.5 py-1 text-xs font-bold text-vp-gold bg-vp-gold/10 ml-2">
              <Shield className="w-3 h-3" />
              Admin
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-sm justify-center">
             {/* We can place the search here if needed, or leave it for the page content */}
          </div>

          <div className="flex items-center gap-2">
            {onRefresh && (
              <button onClick={onRefresh} className="mr-2 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-vp-border bg-vp-surface-alt text-vp-muted hover:text-vp-foreground transition-all text-xs font-semibold">
                <RefreshCw className="w-3.5 h-3.5" /> Refresh
              </button>
            )}

            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center text-vp-muted hover:text-vp-foreground hover:bg-vp-surface-alt transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>

            <div className="flex items-center gap-2 cursor-pointer group ml-1">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm font-black border border-vp-border bg-gradient-to-br from-vp-gold to-yellow-600 text-white">
                {admin?.name?.[0] ?? "A"}
              </div>
              <div className="hidden lg:block">
                <p className="text-[11px] font-bold leading-none text-vp-foreground">{admin?.name?.split(" ")[0] || "Admin"}</p>
                <p className="text-[10px] leading-none mt-0.5 text-vp-muted truncate max-w-[100px]">{admin?.email}</p>
              </div>
              <ChevronDown className="hidden lg:block w-3.5 h-3.5 text-vp-muted group-hover:text-vp-foreground transition-colors" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
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
                    const isActive = activeTab === item.id;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => { setActiveTab(item.id as "dashboard" | "inquiries" | "partners" | "requests"); setMobileOpen(false); }}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group border ${
                            isActive
                              ? "bg-vp-gold/15 border-vp-gold/30 text-vp-foreground shadow-sm"
                              : "border-transparent text-vp-muted hover:text-vp-foreground hover:bg-vp-surface-alt"
                          }`}
                        >
                          <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? "text-vp-gold" : "text-vp-muted group-hover:text-vp-foreground"}`} />
                          <span className="flex-1 text-left">{item.label}</span>
                          {item.badge !== undefined && (
                            <span className="bg-vp-gold text-vp-gold-foreground text-[9px] font-black rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1.5">
                              {item.badge}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-vp-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        <main className="flex-1 min-w-0 p-4 lg:p-8 overflow-x-hidden bg-vp-background text-vp-foreground">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
