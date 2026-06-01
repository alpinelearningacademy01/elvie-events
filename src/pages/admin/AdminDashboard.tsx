import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import adminApi from "@/lib/adminApi";
import { format } from "date-fns";
import {
  MessageSquare, Users, Shield,
  Search, Trash2, Mail, Phone, MapPin,
  CalendarDays, ChevronLeft, ChevronRight, X, CheckCircle,
  Clock, TrendingUp, Filter, Eye
} from "lucide-react";
import AdminDashboardLayout from "@/components/admin/AdminDashboardLayout";

/* ─── Types ─────────────────────────────────────────── */
interface Stats {
  totalInquiries: number;
  newInquiries: number;
  repliedInquiries: number;
  closedInquiries: number;
  totalPartners: number;
  totalProperties: number;
  recentInquiries: number;
}

interface Inquiry {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  infoType: string;
  venue: string;
  eventType: string;
  eventDate: string;
  attendees: number;
  budget: number;
  budgetCurrency: string;
  notes?: string;
  status: "New" | "Replied" | "Closed";
  dateFlexible: boolean;
  createdAt: string;
  property?: { propertyName: string; location?: string };
}

/* ─── Status helpers ─────────────────────────────────── */
const statusStyle = (s: string) => {
  if (s === "New") return "bg-blue-500/15 text-blue-500 border-blue-500/20";
  if (s === "Replied") return "bg-emerald-500/15 text-emerald-500 border-emerald-500/20";
  return "bg-slate-500/15 text-slate-500 border-slate-500/20";
};

const StatusDot = ({ status }: { status: string }) => {
  const color = status === "New" ? "bg-blue-500" : status === "Replied" ? "bg-emerald-500" : "bg-slate-500";
  return <span className={`inline-block w-1.5 h-1.5 rounded-full ${color} mr-1.5`} />;
};

/* ─── Stat card ──────────────────────────────── */
const StatCard = ({ label, value, sub }: { label: string; value: number | string; sub?: string }) => (
  <div className="rounded-2xl border border-vp-border bg-vp-surface p-6 flex flex-col justify-between">
    <p className="text-sm font-semibold text-vp-foreground mb-4">{label}</p>
    <div className="flex items-baseline gap-2">
      <p className="text-3xl font-black text-vp-foreground tracking-tight">{value}</p>
      {sub && <p className="text-xs text-vp-muted font-medium">{sub}</p>}
    </div>
  </div>
);

/* ─── Detail Modal ───────────────────────────── */
const InquiryModal = ({ inq, onClose, onStatusChange }: {
  inq: Inquiry; onClose: () => void;
  onStatusChange: (id: string, status: string) => void;
}) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
    <div
      className="bg-vp-background border border-vp-border rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-vp-border">
        <div>
          <h2 className="text-lg font-black text-vp-foreground">{inq.fullName}</h2>
          <p className="text-xs text-vp-muted mt-0.5">{inq.infoType === "Company" ? inq.companyName : "Individual"}</p>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-xl bg-vp-surface hover:bg-vp-surface-alt flex items-center justify-center transition-colors">
          <X className="w-4 h-4 text-vp-muted" />
        </button>
      </div>

      <div className="p-6 space-y-4">
        {/* Status badge row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusStyle(inq.status)}`}>
            <StatusDot status={inq.status} />{inq.status.toUpperCase()}
          </span>
          <span className="text-[10px] bg-vp-surface text-vp-muted px-2 py-1 rounded-md border border-vp-border">
            {inq.eventType}
          </span>
          {inq.dateFlexible && (
            <span className="text-[10px] bg-vp-gold/10 text-vp-gold px-2 py-1 rounded-md border border-vp-gold/20">Flexible Date</span>
          )}
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: <Mail className="w-3.5 h-3.5" />, label: "Email", val: inq.email },
            { icon: <Phone className="w-3.5 h-3.5" />, label: "Phone", val: inq.phone },
            { icon: <MapPin className="w-3.5 h-3.5" />, label: "Venue", val: `${inq.property?.propertyName ?? "—"} · ${inq.venue}` },
            { icon: <CalendarDays className="w-3.5 h-3.5" />, label: "Event Date", val: format(new Date(inq.eventDate), "MMM dd, yyyy") },
            { icon: <Users className="w-3.5 h-3.5" />, label: "Attendees", val: `${inq.attendees} pax` },
            { icon: <TrendingUp className="w-3.5 h-3.5" />, label: "Budget", val: `${inq.budget} ${inq.budgetCurrency}` },
          ].map(({ icon, label, val }) => (
            <div key={label} className="bg-vp-surface border border-vp-border rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-vp-muted mb-1">{icon}<span className="text-[10px] uppercase tracking-wider font-bold">{label}</span></div>
              <p className="text-sm text-vp-foreground font-semibold truncate">{val}</p>
            </div>
          ))}
        </div>

        {/* Notes */}
        {inq.notes && (
          <div className="bg-vp-surface border border-vp-border rounded-xl p-4">
            <p className="text-[10px] uppercase tracking-wider font-bold text-vp-muted mb-1.5">Notes</p>
            <p className="text-sm text-vp-foreground leading-relaxed">{inq.notes}</p>
          </div>
        )}

        {/* Created at */}
        <p className="text-xs text-vp-muted flex items-center gap-1.5 mt-4">
          <Clock className="w-3.5 h-3.5" />
          Received {format(new Date(inq.createdAt), "MMM dd, yyyy · hh:mm a")}
        </p>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {inq.status !== "Replied" && (
            <button onClick={() => { onStatusChange(inq._id, "Replied"); onClose(); }}
              className="flex-1 py-2.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl text-xs font-bold hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" /> Mark Replied
            </button>
          )}
          {inq.status !== "Closed" && (
            <button onClick={() => { onStatusChange(inq._id, "Closed"); onClose(); }}
              className="flex-1 py-2.5 bg-slate-500/10 text-slate-500 border border-slate-500/20 rounded-xl text-xs font-bold hover:bg-slate-500/20 transition-colors flex items-center justify-center gap-1.5">
              <X className="w-3.5 h-3.5" /> Close
            </button>
          )}
          <a href={`mailto:${inq.email}`}
            className="flex items-center gap-1.5 py-2.5 px-4 bg-blue-500/10 text-blue-500 border border-blue-500/20 rounded-xl text-xs font-bold hover:bg-blue-500/20 transition-colors">
            <Mail className="w-3.5 h-3.5" /> Email
          </a>
          <a href={`tel:${inq.phone}`}
            className="flex items-center gap-1.5 py-2.5 px-4 bg-purple-500/10 text-purple-500 border border-purple-500/20 rounded-xl text-xs font-bold hover:bg-purple-500/20 transition-colors">
            <Phone className="w-3.5 h-3.5" /> Call
          </a>
        </div>
      </div>
    </div>
  </div>
);

/* ─── Partners Tab ───────────────────────────── */
const PartnersTab = () => {
  const [partners, setPartners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.get("/partners")
      .then(({ data }) => { if (data.success) setPartners(data.data); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 gap-3">
      <div className="w-8 h-8 border-2 border-vp-gold border-t-transparent rounded-full animate-spin" />
      <p className="text-vp-muted text-sm">Loading partners…</p>
    </div>
  );

  return (
    <div className="bg-vp-surface border border-vp-border rounded-2xl overflow-hidden shadow-sm">
      <div className="grid grid-cols-[1fr_1fr_1fr_120px] gap-4 px-5 py-3 border-b border-vp-border bg-vp-surface-alt">
        {["Name", "Email", "Venue", "Joined"].map(h => (
          <span key={h} className="text-[10px] uppercase tracking-widest font-bold text-vp-muted">{h}</span>
        ))}
      </div>
      <div className="divide-y divide-vp-border">
        {partners.length === 0 ? (
          <div className="py-12 text-center text-vp-muted text-sm">No venue partners registered yet.</div>
        ) : (
          partners.map(p => (
            <div key={p._id} className="grid grid-cols-[1fr_1fr_1fr_120px] gap-4 px-5 py-4 hover:bg-vp-surface-alt transition-colors items-center group">
              <div>
                <p className="text-vp-foreground text-sm font-bold group-hover:text-vp-gold transition-colors">{p.name}</p>
                <p className="text-[10px] text-vp-muted">{p.phoneCode} {p.phoneNumber}</p>
              </div>
              <p className="text-vp-foreground text-xs truncate">{p.email}</p>
              <p className="text-vp-foreground text-xs truncate">{p.venueName}</p>
              <p className="text-vp-muted text-xs">{format(new Date(p.createdAt), "MMM dd, yyyy")}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/* ─── Requests Tab ───────────────────────────── */
const RequestsTab = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = () => {
    setLoading(true);
    adminApi.get("/requests")
      .then(({ data }) => { if (data.success) setRequests(data.data); })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleApprove = async (partnerId: string, inquiryId: string) => {
    try {
      const { data } = await adminApi.post("/approve-request", { partnerId, inquiryId });
      if (data.success) {
        setRequests(prev => prev.filter(r => !(r.partnerId === partnerId && r.inquiry._id === inquiryId)));
      }
    } catch { /* ignore */ }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-32 gap-3">
      <div className="w-8 h-8 border-2 border-vp-gold border-t-transparent rounded-full animate-spin" />
      <p className="text-vp-muted text-sm">Loading requests…</p>
    </div>
  );

  return (
    <div className="bg-vp-surface border border-vp-border rounded-2xl overflow-hidden shadow-sm">
      <div className="grid grid-cols-[1fr_1fr_130px] gap-4 px-5 py-3 border-b border-vp-border bg-vp-surface-alt">
        {["Partner", "Requested Inquiry", "Actions"].map(h => (
          <span key={h} className="text-[10px] uppercase tracking-widest font-bold text-vp-muted">{h}</span>
        ))}
      </div>
      <div className="divide-y divide-vp-border">
        {requests.length === 0 ? (
          <div className="py-12 text-center text-vp-muted text-sm">No access requests pending.</div>
        ) : (
          requests.map(r => (
            <div key={`${r.partnerId}-${r.inquiry._id}`} className="grid grid-cols-[1fr_1fr_130px] gap-4 px-5 py-4 hover:bg-vp-surface-alt transition-colors items-center group">
              <div>
                <p className="text-vp-foreground text-sm font-bold group-hover:text-vp-gold transition-colors">{r.partnerName}</p>
                <p className="text-[10px] text-vp-muted">{r.partnerEmail}</p>
              </div>
              <div className="min-w-0">
                <p className="text-vp-foreground text-xs font-semibold truncate">{r.inquiry.fullName} - {r.inquiry.eventType}</p>
                <p className="text-[10px] text-vp-muted truncate">{r.inquiry.property?.propertyName} · {format(new Date(r.inquiry.eventDate), "MMM dd, yyyy")}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => handleApprove(r.partnerId, r.inquiry._id)}
                  className="flex items-center gap-1.5 w-full py-2 bg-[hsl(var(--vp-gold))]/10 text-[hsl(var(--vp-gold))] border border-vp-gold/30 rounded-xl text-xs font-bold hover:bg-vp-gold/20 transition-colors justify-center">
                  <CheckCircle className="w-3.5 h-3.5" /> Approve
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/* ─── Main Dashboard ─────────────────────────── */
const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const LIMIT = 15;

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingInq, setLoadingInq] = useState(true);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "inquiries" | "partners" | "requests">("dashboard");

  /* fetch stats */
  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const { data } = await adminApi.get("/stats");
      if (data.success) setStats(data.data);
    } catch { /* ignore */ }
    finally { setLoadingStats(false); }
  };

  /* fetch inquiries */
  const fetchInquiries = useCallback(async () => {
    setLoadingInq(true);
    try {
      const { data } = await adminApi.get("/inquiries", {
        params: { status: filter, search, page, limit: LIMIT }
      });
      if (data.success) {
        setInquiries(data.data);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      }
    } catch { /* ignore */ }
    finally { setLoadingInq(false); }
  }, [filter, search, page]);

  useEffect(() => { fetchStats(); }, []);
  useEffect(() => { fetchInquiries(); }, [fetchInquiries]);

  /* status update */
  const handleStatusChange = async (id: string, status: string) => {
    try {
      const { data } = await adminApi.put(`/inquiries/${id}`, { status });
      if (data.success) {
        setInquiries(prev => prev.map(i => i._id === id ? { ...i, status: status as any } : i));
        fetchStats();
      }
    } catch { /* ignore */ }
  };

  /* delete */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this inquiry? This cannot be undone.")) return;
    try {
      await adminApi.delete(`/inquiries/${id}`);
      setInquiries(prev => prev.filter(i => i._id !== id));
      setTotal(t => t - 1);
      fetchStats();
    } catch { /* ignore */ }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  return (
    <AdminDashboardLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      onRefresh={() => { fetchStats(); fetchInquiries(); }}
      stats={stats}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 lg:mb-8">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-vp-gold animate-pulse" />
            <span className="text-[11px] uppercase tracking-widest text-vp-gold font-bold">Live Admin View</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-vp-foreground tracking-tight">
            {activeTab === "dashboard" ? "Dashboard" : activeTab === "requests" ? "Access Requests" : activeTab === "inquiries" ? "All Inquiries" : "Venue Partners"}
          </h1>
          <p className="text-sm text-vp-muted mt-1">Manage system-wide records and monitor activity.</p>
        </div>

        {/* ── DASHBOARD TAB ── */}
        {activeTab === "dashboard" && (
          <>
            {/* ── STAT CARDS ── */}
            {!loadingStats && stats && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                <StatCard label="Total Inquiries" value={stats.totalInquiries} sub={`${stats.recentInquiries} this week`} />
                <StatCard label="New" value={stats.newInquiries} />
                <StatCard label="Replied" value={stats.repliedInquiries} />
                <StatCard label="Closed" value={stats.closedInquiries} />
                <StatCard label="Total Partners" value={stats.totalPartners} />
                <StatCard label="Total Properties" value={stats.totalProperties} />
              </div>
            )}

            {/* ── RECENT INQUIRIES CARDS ── */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-vp-foreground tracking-tight">Recent Inquiries</h2>
                <button 
                  onClick={() => setActiveTab("inquiries")} 
                  className="text-xs font-semibold px-4 py-2 rounded-xl border border-vp-border bg-vp-surface hover:bg-vp-surface-alt transition-colors"
                >
                  View All
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {inquiries.slice(0, 3).map(inq => (
                  <div 
                    key={inq._id} 
                    className="rounded-2xl border border-vp-border bg-vp-surface p-5 flex flex-col group hover:border-vp-gold/30 transition-all cursor-pointer shadow-sm"
                    onClick={() => setSelected(inq)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="min-w-0 pr-2">
                        <h3 className="text-base font-bold text-vp-foreground group-hover:text-vp-gold transition-colors truncate">{inq.fullName}</h3>
                        <p className="text-xs text-vp-muted mt-0.5 truncate">{inq.property?.propertyName || inq.venue}</p>
                      </div>
                      <span className={`flex-shrink-0 inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusStyle(inq.status)}`}>
                        {inq.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm text-vp-muted space-y-1.5 mb-5 flex-1">
                      <p className="flex justify-between"><span className="text-vp-foreground/60">Event</span> <span className="font-medium text-vp-foreground">{inq.eventType}</span></p>
                      <p className="flex justify-between"><span className="text-vp-foreground/60">Date</span> <span className="font-medium text-vp-foreground">{format(new Date(inq.eventDate), "MMM dd, yyyy")}</span></p>
                      <p className="flex justify-between"><span className="text-vp-foreground/60">Budget</span> <span className="font-medium text-vp-foreground">{inq.budget} {inq.budgetCurrency}</span></p>
                    </div>
                    <div className="flex gap-3 mt-auto border-t border-vp-border pt-4">
                      <button className="flex items-center gap-1.5 text-xs font-bold text-vp-foreground hover:text-vp-gold transition-colors">
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── INQUIRIES TAB ── */}
        {activeTab === "inquiries" && (
          <>
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              {/* Search */}
              <form onSubmit={handleSearch} className="relative flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-vp-muted" />
                  <input
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    placeholder="Search name, email, venue, event type…"
                    className="w-full pl-10 pr-4 py-2.5 bg-vp-surface border border-vp-border rounded-xl text-sm text-vp-foreground placeholder:text-vp-muted focus:outline-none focus:ring-2 focus:ring-vp-gold/40 transition-all font-medium"
                  />
                </div>
                <button type="submit"
                  className="px-4 py-2.5 bg-vp-gold/90 hover:bg-vp-gold text-white rounded-xl text-sm font-bold transition-colors">
                  Search
                </button>
                {search && (
                  <button type="button" onClick={() => { setSearch(""); setSearchInput(""); setPage(1); }}
                    className="px-3 py-2.5 bg-vp-surface border border-vp-border text-vp-muted rounded-xl text-sm hover:text-vp-foreground transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              {/* Status filter */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <Filter className="w-4 h-4 text-vp-muted self-center flex-shrink-0 mx-1" />
                {["All", "New", "Replied", "Closed"].map(s => (
                  <button key={s} onClick={() => { setFilter(s); setPage(1); }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      filter === s
                        ? "bg-vp-gold text-white shadow-lg shadow-vp-gold/20"
                        : "bg-vp-surface border border-vp-border text-vp-muted hover:text-vp-foreground hover:bg-vp-surface-alt"
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="bg-vp-surface border border-vp-border rounded-2xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-[1fr_1fr_1fr_130px_90px_100px] gap-4 px-5 py-3 border-b border-vp-border bg-vp-surface-alt">
                {["Customer", "Venue / Property", "Event", "Date", "Status", "Actions"].map(h => (
                  <span key={h} className="text-[10px] uppercase tracking-widest font-bold text-vp-muted">{h}</span>
                ))}
              </div>

              {loadingInq ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <div className="w-8 h-8 border-2 border-vp-gold border-t-transparent rounded-full animate-spin" />
                  <p className="text-vp-muted text-sm">Loading inquiries…</p>
                </div>
              ) : inquiries.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 gap-3">
                  <MessageSquare className="w-10 h-10 text-vp-muted/40" />
                  <p className="text-vp-muted text-sm">No inquiries match your filters.</p>
                </div>
              ) : (
                <div className="divide-y divide-vp-border">
                  {inquiries.map(inq => (
                    <div key={inq._id}
                      className="grid grid-cols-[1fr_1fr_1fr_130px_90px_100px] gap-4 px-5 py-4 hover:bg-vp-surface-alt transition-colors group items-center">

                      {/* Customer */}
                      <div className="min-w-0">
                        <p className="text-vp-foreground text-sm font-bold truncate group-hover:text-vp-gold transition-colors">{inq.fullName}</p>
                        {inq.infoType === "Company" && inq.companyName && (
                          <p className="text-[10px] text-vp-muted truncate">{inq.companyName}</p>
                        )}
                        <p className="text-[10px] text-vp-muted truncate">{inq.email}</p>
                      </div>

                      {/* Venue */}
                      <div className="min-w-0">
                        <p className="text-vp-foreground text-xs font-semibold truncate">{inq.property?.propertyName ?? "—"}</p>
                        <p className="text-[10px] text-vp-muted truncate">{inq.venue}</p>
                      </div>

                      {/* Event */}
                      <div className="min-w-0">
                        <p className="text-vp-foreground text-xs font-semibold truncate">{inq.eventType}</p>
                        <p className="text-[10px] text-vp-muted truncate">{inq.attendees} pax · {inq.budget} {inq.budgetCurrency}</p>
                      </div>

                      {/* Date */}
                      <div>
                        <p className="text-vp-foreground text-xs">{format(new Date(inq.eventDate), "MMM dd, yyyy")}</p>
                        {inq.dateFlexible && <p className="text-[10px] text-vp-gold font-bold">Flexible</p>}
                      </div>

                      {/* Status */}
                      <div>
                        <span className={`inline-flex items-center text-[10px] font-bold px-2 py-1 rounded-full border ${statusStyle(inq.status)}`}>
                          <StatusDot status={inq.status} />{inq.status}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => setSelected(inq)}
                          className="w-8 h-8 rounded-lg bg-vp-surface border border-vp-border hover:bg-vp-gold/10 hover:border-vp-gold/30 text-vp-muted hover:text-vp-gold flex items-center justify-center transition-all bg-opacity-50 shadow-sm"
                          title="View details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(inq._id)}
                          className="w-8 h-8 rounded-lg bg-vp-surface border border-vp-border hover:bg-red-500/10 hover:border-red-500/30 text-vp-muted hover:text-red-500 flex items-center justify-center transition-all bg-opacity-50 shadow-sm"
                          title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-5 py-4 border-t border-vp-border bg-vp-surface-alt/50">
                  <p className="text-xs text-vp-muted">
                    Showing {((page - 1) * LIMIT) + 1}–{Math.min(page * LIMIT, total)} of <span className="text-vp-foreground font-bold">{total}</span> inquiries
                  </p>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                      className="w-8 h-8 rounded-lg bg-vp-surface border border-vp-border text-vp-muted hover:text-vp-foreground disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-sm">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      const p = totalPages <= 5 ? i + 1 : page <= 3 ? i + 1 : page + i - 2;
                      if (p < 1 || p > totalPages) return null;
                      return (
                        <button key={p} onClick={() => setPage(p)}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all shadow-sm ${
                            page === p
                              ? "bg-vp-gold text-vp-gold-foreground border-transparent"
                              : "bg-vp-surface border border-vp-border text-vp-muted hover:text-vp-foreground"
                          }`}>{p}</button>
                      );
                    })}
                    <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                      className="w-8 h-8 rounded-lg bg-vp-surface border border-vp-border text-vp-muted hover:text-vp-foreground disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors shadow-sm">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── PARTNERS TAB ── */}
        {activeTab === "partners" && <PartnersTab />}

        {/* ── REQUESTS TAB ── */}
        {activeTab === "requests" && <RequestsTab />}
      </div>

      {/* ── Detail Modal ── */}
      {selected && (
        <InquiryModal
          inq={selected}
          onClose={() => setSelected(null)}
          onStatusChange={(id, status) => { handleStatusChange(id, status); setSelected(null); }}
        />
      )}
    </AdminDashboardLayout>
  );
};

export default AdminDashboard;
