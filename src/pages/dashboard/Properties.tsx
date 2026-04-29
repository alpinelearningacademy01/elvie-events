import { Plus, Edit3, Send, ExternalLink, MapPin } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { properties } from "@/lib/dashboardMockData";
import { Link } from "react-router-dom";

const Properties = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Venue Portfolio</h1>
            <p className="text-sm text-slate-400">
              Manage your venues, listings, and availability in one place.
            </p>
          </div>
          <Link 
            to="/dashboard/venue-portfolio/add"
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:from-amber-400 hover:to-amber-500 transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]"
          >
            <Plus className="w-5 h-5" /> Add New Property
          </Link>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.05] overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-white/[0.02] border-b border-white/[0.05] text-xs font-bold text-slate-400 uppercase tracking-wider">
            <div className="col-span-5">Property Title</div>
            <div className="col-span-2">Venues</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-3 text-right">Action</div>
          </div>

          <div className="divide-y divide-white/[0.05]">
            {properties.map((p) => (
              <div
                key={p.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 md:px-6 md:py-5 items-center hover:bg-white/[0.02] transition-colors group"
              >
                <div className="md:col-span-5 flex items-center gap-4">
                  <div className="relative overflow-hidden rounded-xl w-24 h-24 flex-shrink-0 border border-white/[0.1]">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-1">{p.date}</p>
                    <h3 className="font-bold text-white text-base truncate flex items-center gap-2">
                      {p.title}
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
                    </h3>
                    <p className="text-xs text-slate-400 truncate mt-1 flex items-center gap-1">
                       <MapPin className="w-3.5 h-3.5" /> {p.address}
                    </p>
                  </div>
                </div>
                <div className="md:col-span-2">
                   <div className="inline-flex flex-col">
                      <span className="text-sm font-bold text-white">{p.venues}</span>
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Venues</span>
                   </div>
                </div>
                <div className="md:col-span-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border ${
                    p.status.toLowerCase() === 'active' 
                      ? "bg-green-500/10 text-green-400 border-green-500/20" 
                      : p.status.toLowerCase() === 'pending'
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                      : "bg-white/[0.05] text-slate-300 border-white/[0.1]"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      p.status.toLowerCase() === 'active' ? 'bg-green-400' : p.status.toLowerCase() === 'pending' ? 'bg-amber-400' : 'bg-slate-400'
                    }`} />
                    {p.status}
                  </span>
                </div>
                <div className="md:col-span-3 flex gap-2 md:justify-end opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-white/[0.05] hover:bg-white/[0.1] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors border border-white/[0.05]">
                    <Send className="w-3.5 h-3.5" /> Review
                  </button>
                  <button className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors border border-blue-500/20">
                    <Edit3 className="w-3.5 h-3.5" /> Manage
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Properties;
