import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  MessageSquare,
  ArrowRight,
  ArrowUpRight,
  Star,
  Zap,
  Building2,
  DollarSign,
  CalendarCheck,
  Activity,
  CheckCircle,
  Clock,
  ChevronRight,
  Sparkles,
  Target,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from "recharts";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  monthlyViews,
  properties,
  inquiries,
  revenueData,
  eventTypeBreakdown,
  recentActivity,
} from "@/lib/dashboardMockData";
import { useAuth } from "@/context/AuthContext";

/* ── helpers ──────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    New: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
    Replied: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
    Closed: "bg-slate-500/15 text-slate-400 border border-slate-500/20",
  };
  return map[status] ?? "bg-muted text-muted-foreground";
};

const activityIcon = (type: string) => {
  const icons: Record<string, JSX.Element> = {
    inquiry: <MessageSquare className="w-3.5 h-3.5" />,
    booking: <CheckCircle className="w-3.5 h-3.5" />,
    review: <Star className="w-3.5 h-3.5" />,
    payment: <DollarSign className="w-3.5 h-3.5" />,
  };
  const colors: Record<string, string> = {
    inquiry: "bg-blue-500/20 text-blue-400",
    booking: "bg-emerald-500/20 text-emerald-400",
    review: "bg-amber-500/20 text-amber-400",
    payment: "bg-violet-500/20 text-violet-400",
  };
  return { icon: icons[type], color: colors[type] };
};

/* ── custom tooltip ───────────────────────────────── */
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#0f172a]/95 backdrop-blur border border-white/10 rounded-xl px-3 py-2.5 shadow-xl text-xs">
      <p className="text-slate-400 font-medium mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">
          {p.name}: {typeof p.value === "number" && p.name.toLowerCase().includes("revenue")
            ? `AED ${p.value.toLocaleString()}`
            : p.value}
        </p>
      ))}
    </div>
  );
};

/* ── KPI Card ─────────────────────────────────────── */
interface KpiCardProps {
  label: string;
  value: string;
  sub: string;
  trend: number;
  icon: React.ReactNode;
  gradient: string;
  delay?: number;
}
const KpiCard = ({ label, value, sub, trend, icon, gradient, delay = 0 }: KpiCardProps) => (
  <motion.div
    {...fadeUp(delay)}
    className="relative rounded-2xl overflow-hidden border border-white/8 bg-white/5 backdrop-blur-sm p-5 group hover:border-white/15 transition-all duration-300"
  >
    {/* glow blob */}
    <div className={`absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl opacity-20 group-hover:opacity-35 transition-opacity ${gradient}`} />
    <div className="relative flex items-start justify-between gap-3">
      <div>
        <p className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">{label}</p>
        <p className="text-3xl font-black text-white mt-1 tracking-tight">{value}</p>
        <p className="text-xs text-slate-400 mt-0.5">{sub}</p>
      </div>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${gradient} bg-opacity-20`}>
        {icon}
      </div>
    </div>
    <div className={`mt-3 flex items-center gap-1.5 text-xs font-semibold ${trend >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
      <ArrowUpRight className={`w-3.5 h-3.5 ${trend < 0 ? "rotate-180" : ""}`} />
      {Math.abs(trend)}% vs last month
    </div>
  </motion.div>
);

/* ── main component ───────────────────────────────── */
const Dashboard = () => {
  const { user } = useAuth();
  const [activeProperty, setActiveProperty] = useState(properties[0]?.id);
  const [activeChart, setActiveChart] = useState<"views" | "revenue">("revenue");

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const totalRevenue = revenueData.reduce((s, r) => s + r.revenue, 0);
  const totalViews = monthlyViews.reduce((s, r) => s + r.views, 0);

  return (
    <DashboardLayout>
      {/* ── full-page dark canvas ── */}
      <div className="min-h-screen -m-4 lg:-m-8 p-4 lg:p-8 bg-gradient-to-br from-[#070c18] via-[#0d1629] to-[#0a1020]">
        {/* ── hero greeting ── */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] uppercase tracking-widest text-emerald-400 font-bold">Live Dashboard</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
                {greeting()}, <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">{user?.name?.split(" ")[0] ?? "Partner"}</span> 👋
              </h1>
              <p className="text-slate-400 text-sm mt-1">Here's what's happening with your venues today.</p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/dashboard/plans"
                className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] transition-all duration-200"
              >
                <Sparkles className="w-4 h-4" /> Boost Visibility
              </Link>
            </div>
          </div>
        </motion.div>

        {/* ── KPI cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <KpiCard
            label="Total Revenue"
            value={`AED ${(totalRevenue / 1000).toFixed(1)}k`}
            sub="All time earnings"
            trend={12.4}
            icon={<DollarSign className="w-5 h-5 text-emerald-400" />}
            gradient="bg-emerald-500"
            delay={0.05}
          />
          <KpiCard
            label="Profile Views"
            value={String(totalViews)}
            sub="Last 6 months"
            trend={125}
            icon={<Eye className="w-5 h-5 text-blue-400" />}
            gradient="bg-blue-500"
            delay={0.1}
          />
          <KpiCard
            label="Inquiries"
            value={String(inquiries.length)}
            sub={`${inquiries.filter(i => i.status === "New").length} unread`}
            trend={8.2}
            icon={<MessageSquare className="w-5 h-5 text-violet-400" />}
            gradient="bg-violet-500"
            delay={0.15}
          />
          <KpiCard
            label="Avg. Rating"
            value="4.7"
            sub="Across all venues"
            trend={3.1}
            icon={<Star className="w-5 h-5 text-amber-400" />}
            gradient="bg-amber-500"
            delay={0.2}
          />
        </div>

        {/* ── main grid ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">

          {/* ── CHART PANEL (2/3) ── */}
          <motion.div
            {...fadeUp(0.25)}
            className="xl:col-span-2 rounded-2xl border border-white/8 bg-white/5 backdrop-blur-sm p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-white font-bold text-base">Performance Trends</h2>
                <p className="text-slate-400 text-xs mt-0.5">6-month overview</p>
              </div>
              <div className="flex gap-1.5 bg-white/5 border border-white/8 rounded-xl p-1">
                {(["revenue", "views"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveChart(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                      activeChart === tab
                        ? "bg-white/15 text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {tab === "revenue" ? "Revenue" : "Views"}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                {activeChart === "revenue" ? (
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="tgtGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#10b981" strokeWidth={2.5} fill="url(#revGrad)" dot={{ fill: "#10b981", r: 3, strokeWidth: 0 }} />
                    <Area type="monotone" dataKey="target" name="Target" stroke="#f59e0b" strokeWidth={2} fill="url(#tgtGrad)" dot={false} strokeDasharray="5 4" />
                  </AreaChart>
                ) : (
                  <AreaChart data={monthlyViews}>
                    <defs>
                      <linearGradient id="viewGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" />
                    <XAxis dataKey="month" stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.2)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="views" name="Views" stroke="#3b82f6" strokeWidth={2.5} fill="url(#viewGrad)" dot={{ fill: "#3b82f6", r: 3, strokeWidth: 0 }} />
                    <Area type="monotone" dataKey="inquiries" name="Inquiries" stroke="#8b5cf6" strokeWidth={2} fill="none" dot={false} />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* ── EVENT BREAKDOWN (1/3) ── */}
          <motion.div
            {...fadeUp(0.3)}
            className="rounded-2xl border border-white/8 bg-white/5 backdrop-blur-sm p-5 flex flex-col"
          >
            <h2 className="text-white font-bold text-base mb-1">Event Types</h2>
            <p className="text-slate-400 text-xs mb-4">Inquiry breakdown</p>
            <div className="h-36 mx-auto w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={eventTypeBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={44}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {eventTypeBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} opacity={0.85} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: any, n: any, p: any) => [v, p.payload.type]}
                    contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                    itemStyle={{ color: "#fff" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 mt-2 flex-1">
              {eventTypeBreakdown.map((e) => (
                <div key={e.type} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: e.color }} />
                    <span className="text-slate-300">{e.type}</span>
                  </div>
                  <span className="text-white font-bold">{e.count}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── bottom grid ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

          {/* ── LATEST INQUIRIES (2/3) ── */}
          <motion.div
            {...fadeUp(0.35)}
            className="xl:col-span-2 rounded-2xl border border-white/8 bg-white/5 backdrop-blur-sm overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
              <div>
                <h2 className="text-white font-bold text-base">Latest Inquiries</h2>
                <p className="text-slate-400 text-xs mt-0.5">
                  <span className="text-blue-400 font-semibold">{inquiries.filter(i => i.status === "New").length} new</span> awaiting your reply
                </p>
              </div>
              <Link
                to="/dashboard/inquiries"
                className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-white/5">
              {inquiries.slice(0, 4).map((inq, i) => (
                <motion.div
                  key={inq.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className="px-5 py-3.5 hover:bg-white/5 transition-colors group cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      {/* avatar */}
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500/30 to-violet-500/30 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 border border-white/10">
                        {inq.name[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-white text-sm">{inq.name}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusBadge(inq.status)}`}>
                            {inq.status.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-slate-500 border border-white/8 px-1.5 py-0.5 rounded-md">{inq.eventType}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">{inq.property} · {inq.date}</p>
                        <p className="text-sm text-slate-300 mt-1 truncate">{inq.message}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-right">
                      <p className="text-xs font-bold text-amber-400">{inq.budget}</p>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white group-hover:translate-x-0.5 transition-all mt-2 ml-auto" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-5">

            {/* ── ACTIVITY FEED ── */}
            <motion.div
              {...fadeUp(0.4)}
              className="rounded-2xl border border-white/8 bg-white/5 backdrop-blur-sm p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-violet-400" />
                <h2 className="text-white font-bold text-sm">Live Activity</h2>
              </div>
              <div className="space-y-3">
                {recentActivity.map((a, i) => {
                  const { icon, color } = activityIcon(a.type);
                  return (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + i * 0.07 }}
                      className="flex items-start gap-3"
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                        {icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-slate-200 leading-snug">{a.text}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Clock className="w-2.5 h-2.5 text-slate-500" />
                          <span className="text-[10px] text-slate-500">{a.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* ── BOOST CARD ── */}
            <motion.div
              {...fadeUp(0.45)}
              className="rounded-2xl p-5 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #1e1044 0%, #0f172a 100%)" }}
            >
              {/* animated blobs */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-violet-600/20 blur-3xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-blue-600/15 blur-3xl" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-[11px] uppercase tracking-widest text-amber-400 font-bold">Premium Feature</span>
                </div>
                <h3 className="text-white font-black text-base leading-snug mb-2">
                  Get 10× more visibility with Featured Listing
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">
                  Venues on featured placement receive up to 10× more inquiries per month.
                </p>
                <Link
                  to="/dashboard/plans"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-opacity shadow-lg shadow-amber-500/20"
                >
                  <Target className="w-3.5 h-3.5" /> Explore Packages <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── PROPERTIES ROW ── */}
        <motion.div {...fadeUp(0.5)} className="mt-5 rounded-2xl border border-white/8 bg-white/5 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
            <div>
              <h2 className="text-white font-bold text-base">My Venues</h2>
              <p className="text-slate-400 text-xs mt-0.5">Your listed properties</p>
            </div>
            <Link to="/dashboard/properties" className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
              Manage all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {properties.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                className="flex items-center gap-4 p-5 hover:bg-white/5 transition-colors group"
              >
                <div className="relative flex-shrink-0">
                  <img src={p.image} alt={p.title} className="w-20 h-16 rounded-xl object-cover border border-white/8" />
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md">
                    {p.status.toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-white text-sm truncate group-hover:text-amber-400 transition-colors">{p.title}</h3>
                  <p className="text-xs text-slate-400 truncate mt-0.5">{p.address}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-500" />
                      <span className="text-[11px] text-slate-300 font-semibold">{p.venues} venues</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-[11px] text-slate-300 font-semibold">{p.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarCheck className="w-3 h-3 text-blue-400" />
                      <span className="text-[11px] text-slate-300 font-semibold">{p.totalBookings} bookings</span>
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-black text-white">AED {(p.revenue / 1000).toFixed(1)}k</p>
                  <p className="text-[10px] text-slate-400">Total revenue</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
