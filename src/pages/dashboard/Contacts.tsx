import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { toast } from "@/hooks/use-toast";
import {
  Plus, Search, Edit2, Trash2, User, Mail, Phone,
  Globe, MapPin, Users, Loader2, Building2,
  Star, Briefcase, ShoppingBag, HeartHandshake
} from "lucide-react";
import {
  getClients,
  deleteClient,
  ClientDirectoryEntry
} from "@/services/clientDirectoryService";

const CATEGORIES = [
  { value: "all",     label: "All",     color: "text-slate-400",   bg: "bg-slate-500/10 border-slate-500/20" },
  { value: "client",  label: "Client",  color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/20" },
  { value: "lead",    label: "Lead",    color: "text-amber-400",  bg: "bg-amber-500/10 border-amber-500/20" },
  { value: "vip",     label: "VIP",     color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
  { value: "partner", label: "Partner", color: "text-emerald-400",bg: "bg-emerald-500/10 border-emerald-500/20" },
  { value: "vendor",  label: "Vendor",  color: "text-rose-400",   bg: "bg-rose-500/10 border-rose-500/20" },
  { value: "other",   label: "Other",   color: "text-slate-400",  bg: "bg-slate-500/10 border-slate-500/20" },
];

const CATEGORY_ICONS: Record<string, any> = {
  client:  Users,
  lead:    Star,
  vip:     Star,
  partner: HeartHandshake,
  vendor:  ShoppingBag,
  other:   Briefcase,
};

const getCategoryMeta = (val: string) =>
  CATEGORIES.find((c) => c.value === val) || CATEGORIES[1];

const avatarColors = [
  "from-blue-500 to-blue-700",
  "from-purple-500 to-purple-700",
  "from-emerald-500 to-emerald-700",
  "from-amber-500 to-amber-700",
  "from-rose-500 to-rose-700",
  "from-teal-500 to-teal-700",
];

const getAvatarColor = (name: string) =>
  avatarColors[name.charCodeAt(0) % avatarColors.length];

const avatarInitials = (name: string) =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

const Contacts = () => {
  const navigate = useNavigate();

  const [clients, setClients]         = useState<ClientDirectoryEntry[]>([]);
  const [total, setTotal]             = useState(0);
  const [loading, setLoading]         = useState(true);
  const [deleting, setDeleting]       = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [search, setSearch]               = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [page, setPage]   = useState(1);
  const [pages, setPages] = useState(1);

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getClients({
        search:   search || undefined,
        category: activeCategory !== "all" ? activeCategory : undefined,
        page,
        limit: 12,
      });
      setClients(res.data   || []);
      setTotal(res.total    || 0);
      setPages(res.pages    || 1);
    } catch (err: any) {
      toast({ title: "Error", description: err?.response?.data?.message || "Failed to load contacts", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [search, activeCategory, page]);

  useEffect(() => {
    const t = setTimeout(fetchClients, 300);
    return () => clearTimeout(t);
  }, [fetchClients]);

  const handleDelete = async (id: string) => {
    try {
      setDeleting(id);
      await deleteClient(id);
      toast({ title: "Deleted", description: "Contact removed successfully." });
      setDeleteConfirm(null);
      fetchClients();
    } catch {
      toast({ title: "Error", description: "Failed to delete contact.", variant: "destructive" });
    } finally {
      setDeleting(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white">Client Directory</h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage your clients, leads and partners — <span className="text-white font-semibold">{total}</span> total
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard/client-directory/add")}
            className="flex items-center gap-2 bg-vp-gold hover:bg-vp-gold/90 text-vp-gold-foreground font-bold px-5 py-3 rounded-xl text-sm transition-all shadow-lg shadow-vp-gold/20 shrink-0"
          >
            <Plus className="w-4 h-4" /> Add Contact
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search by name, company, email, phone..."
              className="w-full pl-11 pr-4 py-3 bg-white/[0.03] border border-white/[0.07] rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-vp-gold/40 focus:border-vp-gold/40 transition-all placeholder:text-slate-600"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => { setActiveCategory(cat.value); setPage(1); }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  activeCategory === cat.value
                    ? `${cat.bg} ${cat.color} border-current`
                    : "bg-white/[0.03] border-white/[0.07] text-slate-500 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-40">
            <Loader2 className="w-10 h-10 animate-spin text-vp-gold" />
          </div>
        ) : clients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-40 text-center space-y-5">
            <div className="w-20 h-20 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center">
              <Users className="w-10 h-10 text-slate-600" />
            </div>
            <div>
              <p className="text-white font-bold text-lg">No contacts found</p>
              <p className="text-slate-500 text-sm mt-1">
                {search ? "Try a different search term." : "Add your first contact to get started."}
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard/client-directory/add")}
              className="flex items-center gap-2 bg-vp-gold hover:bg-vp-gold/90 text-vp-gold-foreground font-bold px-5 py-2.5 rounded-xl text-sm transition-all"
            >
              <Plus className="w-4 h-4" /> Add Contact
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {clients.map((client) => {
                const catMeta = getCategoryMeta(client.category);
                const CatIcon = CATEGORY_ICONS[client.category] || Users;
                return (
                  <div
                    key={client._id}
                    className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all group relative overflow-hidden"
                  >
                    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-vp-gold/5 blur-2xl group-hover:bg-vp-gold/10 transition-all pointer-events-none" />

                    {/* Category Badge */}
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border mb-4 ${catMeta.bg} ${catMeta.color}`}>
                      <CatIcon className="w-3 h-3" />
                      {catMeta.label}
                    </div>

                    {/* Avatar + Name */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getAvatarColor(client.contactName)} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg`}>
                        {avatarInitials(client.contactName)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-white font-bold text-sm truncate">{client.contactName}</p>
                        {client.role    && <p className="text-slate-500 text-xs truncate">{client.role}</p>}
                        {client.company && (
                          <p className="text-slate-400 text-xs truncate flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3 shrink-0" /> {client.company}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-1.5 mb-4">
                      {client.email && (
                        <a href={`mailto:${client.email}`} className="flex items-center gap-2 text-xs text-slate-400 hover:text-vp-gold transition-colors truncate">
                          <Mail className="w-3.5 h-3.5 shrink-0 text-slate-600" />
                          <span className="truncate">{client.email}</span>
                        </a>
                      )}
                      {client.phone && (
                        <a href={`tel:${client.phone}`} className="flex items-center gap-2 text-xs text-slate-400 hover:text-vp-gold transition-colors">
                          <Phone className="w-3.5 h-3.5 shrink-0 text-slate-600" />
                          {client.phone}
                        </a>
                      )}
                      {client.website && (
                        <a href={client.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-slate-400 hover:text-vp-gold transition-colors truncate">
                          <Globe className="w-3.5 h-3.5 shrink-0 text-slate-600" />
                          <span className="truncate">{client.website.replace(/^https?:\/\//, "")}</span>
                        </a>
                      )}
                      {client.address && (
                        <p className="flex items-center gap-2 text-xs text-slate-500 truncate">
                          <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-600" />
                          <span className="truncate">{client.address}</span>
                        </p>
                      )}
                    </div>

                    {/* Tags */}
                    {client.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {client.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-white/[0.05] border border-white/[0.07] text-slate-400 text-[10px] rounded-full">
                            #{tag}
                          </span>
                        ))}
                        {client.tags.length > 3 && (
                          <span className="px-2 py-0.5 bg-white/[0.05] border border-white/[0.07] text-slate-500 text-[10px] rounded-full">
                            +{client.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2 pt-3 border-t border-white/[0.05]">
                      <button
                        onClick={() => navigate(`/dashboard/client-directory/add?id=${client._id}`)}
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-white/[0.04] hover:bg-blue-500/20 border border-white/[0.07] hover:border-blue-500/30 text-slate-400 hover:text-blue-400 rounded-lg text-xs font-bold transition-all"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(client._id!)}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 bg-white/[0.04] hover:bg-rose-500/20 border border-white/[0.07] hover:border-rose-500/30 text-slate-400 hover:text-rose-400 rounded-lg text-xs font-bold transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {pages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-4">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.07] text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                <span className="text-sm text-slate-400">Page {page} of {pages}</span>
                <button
                  disabled={page >= pages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.07] text-sm text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative bg-[#0c1428] border border-white/[0.08] rounded-2xl w-full max-w-sm p-8 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto">
              <Trash2 className="w-8 h-8 text-rose-500" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Delete Contact?</h3>
              <p className="text-slate-400 text-sm mt-1">This action cannot be undone.</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-3 rounded-xl border border-white/[0.1] bg-white/[0.03] text-slate-400 hover:text-white text-sm font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                disabled={deleting === deleteConfirm}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold transition-all disabled:opacity-60"
              >
                {deleting === deleteConfirm
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Deleting...</>
                  : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Contacts;
