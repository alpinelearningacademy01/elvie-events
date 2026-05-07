import { Plus, Edit3, Send, ExternalLink, MapPin, Loader2, Building2 } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProperties } from "@/services/propertyService";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=400";

const Properties = () => {
  const [propertyList, setPropertyList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const result = await getProperties();
        if (result.success) {
          setPropertyList(result.data);
        } else {
          setError("Failed to load properties.");
        }
      } catch (err: any) {
        console.error("Failed to fetch properties:", err);
        setError(err.response?.data?.message || "Could not connect to server.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const getStatusStyle = (status: string) => {
    const s = (status || "active").toLowerCase();
    if (s === "active") return { badge: "bg-green-500/10 text-green-400 border-green-500/20", dot: "bg-green-400" };
    if (s === "pending") return { badge: "bg-amber-500/10 text-amber-400 border-amber-500/20", dot: "bg-amber-400" };
    return { badge: "bg-white/[0.05] text-slate-300 border-white/[0.1]", dot: "bg-slate-400" };
  };

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Venue Portfolio</h1>
            <p className="text-sm text-slate-400">
              Manage your venues, listings, and availability in one place.
              {!loading && !error && (
                <span className="ml-2 text-blue-400 font-bold">{propertyList.length} {propertyList.length === 1 ? "property" : "properties"}</span>
              )}
            </p>
          </div>
          <Link
            to="/dashboard/venue-portfolio/add"
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:from-amber-400 hover:to-amber-500 transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]"
          >
            <Plus className="w-5 h-5" /> Add New Property
          </Link>
        </div>

        {/* Table */}
        <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.05] overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-white/[0.02] border-b border-white/[0.05] text-xs font-bold text-slate-400 uppercase tracking-wider">
            <div className="col-span-5">Property Title</div>
            <div className="col-span-2">Venues</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-3 text-right">Action</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-white/[0.05] min-h-[300px] relative">

            {/* Loading State */}
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 py-20">
                <Loader2 className="w-10 h-10 text-amber-500 animate-spin" />
                <p className="text-slate-500 text-sm font-medium">Loading your properties...</p>
              </div>
            )}

            {/* Error State */}
            {!loading && error && (
              <div className="py-20 text-center px-6">
                <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-rose-500" />
                </div>
                <p className="text-rose-400 font-bold mb-2">Failed to Load Properties</p>
                <p className="text-slate-500 text-sm">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 text-amber-500 font-bold hover:underline text-sm"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && propertyList.length === 0 && (
              <div className="py-20 text-center px-6">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-8 h-8 text-slate-500" />
                </div>
                <p className="text-white font-bold text-lg mb-1">No Properties Yet</p>
                <p className="text-slate-500 text-sm mb-6">Start by adding your first venue to the portfolio.</p>
                <Link
                  to="/dashboard/venue-portfolio/add"
                  className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold px-6 py-2.5 rounded-xl text-sm transition-colors inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" /> Add Your First Property
                </Link>
              </div>
            )}

            {/* Property Rows */}
            {!loading && !error && propertyList.map((p) => {
              const statusStyle = getStatusStyle(p.status);
              const heroImage = p.heroImage && p.heroImage.startsWith("http") ? p.heroImage : FALLBACK_IMAGE;
              const city = p.address?.city || p.location?.city || "";
              const country = p.address?.country || p.location?.country || "";
              const locationStr = [city, country].filter(Boolean).join(", ") || "Location not set";
              const venueCount = p.venues?.length || 0;
              const createdDate = p.createdAt ? new Date(p.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—";

              return (
                <div
                  key={p._id}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 md:px-6 md:py-5 items-center hover:bg-white/[0.02] transition-colors group"
                >
                  {/* Property Info */}
                  <div className="md:col-span-5 flex items-center gap-4">
                    <div className="relative overflow-hidden rounded-xl w-20 h-20 flex-shrink-0 border border-white/[0.1]">
                      <img
                        src={heroImage}
                        alt={p.propertyName || "Property"}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {p.propertyType && (
                        <div className="absolute bottom-1 left-1">
                          <span className="text-[8px] font-bold text-white/80 bg-black/50 px-1.5 py-0.5 rounded uppercase">
                            {p.propertyType}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">{createdDate}</p>
                      <h3 className="font-bold text-white text-sm truncate flex items-center gap-2">
                        {p.propertyName || "Unnamed Property"}
                        <ExternalLink className="w-3 h-3 text-slate-500 hover:text-white cursor-pointer transition-colors flex-shrink-0" />
                      </h3>
                      <p className="text-xs text-slate-400 truncate mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{locationStr}</span>
                      </p>
                      {p.brand && (
                        <p className="text-[10px] text-slate-600 mt-0.5 truncate">{p.brand}</p>
                      )}
                    </div>
                  </div>

                  {/* Venues Count */}
                  <div className="md:col-span-2">
                    <div className="inline-flex flex-col">
                      <span className="text-sm font-bold text-white">{venueCount}</span>
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Venues</span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="md:col-span-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border ${statusStyle.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                      {p.status ? p.status.charAt(0).toUpperCase() + p.status.slice(1) : "Active"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="md:col-span-3 flex gap-2 md:justify-end opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white/[0.05] hover:bg-white/[0.1] text-white px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-white/[0.05]">
                      <Send className="w-3.5 h-3.5" /> Review
                    </button>
                    <Link
                      to={`/dashboard/venue-portfolio/add?id=${p._id}`}
                      className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-blue-500/20"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Manage
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Properties;
