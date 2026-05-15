import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Search, Mail, Phone, CalendarDays, MapPin, Loader2 } from "lucide-react";
import { getInquiries, updateInquiryStatus } from "@/services/inquiryService";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

const statusColor = (s: string) =>
  s === "New"
    ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
    : s === "Replied"
    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    : "bg-white/[0.05] text-slate-400 border-white/[0.1]";

const Inquiries = () => {
  const [filter, setFilter] = useState<"All" | "New" | "Replied" | "Closed">("All");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [inquiryList, setInquiryList] = useState<any[]>([]);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const result = await getInquiries();
      if (result.success) {
        setInquiryList(result.data);
      } else {
        toast({
          title: "Error",
          description: "Failed to load inquiries",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Fetch inquiries error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
     try {
       const result = await updateInquiryStatus(id, newStatus);
       if (result.success) {
         setInquiryList(prev => prev.map(inq => inq._id === id ? { ...inq, status: newStatus } : inq));
         toast({ title: "Status Updated", description: `Inquiry marked as ${newStatus}` });
       }
     } catch (error) {
       toast({ title: "Error", description: "Failed to update status", variant: "destructive" });
     }
  };

  const filtered = inquiryList.filter((i) => {
    if (filter !== "All" && i.status !== filter) return false;
    const searchStr = `${i.fullName} ${i.email} ${i.property?.propertyName} ${i.venue}`.toLowerCase();
    if (q && !searchStr.includes(q.toLowerCase()))
      return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Opportunities</h1>
        <p className="text-sm text-slate-400 mb-8">
          Manage and respond to all customer inquiries seamlessly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, email, or venue..."
              className="w-full pl-11 pr-4 py-3 bg-white/[0.02] border border-white/[0.05] rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow placeholder:text-slate-600 backdrop-blur-xl"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto custom-scrollbar pb-2 sm:pb-0">
            {(["All", "New", "Replied", "Closed"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-5 py-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  filter === s
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                    : "bg-white/[0.02] border border-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.05] overflow-hidden">
          {loading ? (
            <div className="text-center py-16">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
              <p className="text-slate-400 text-sm">Loading opportunities...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16">
              <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-sm">No inquiries match your filters.</p>
            </div>
          ) : (
            <div className="divide-y divide-white/[0.05]">
              {filtered.map((inq) => (
                <div
                  key={inq._id}
                  className="p-6 hover:bg-white/[0.02] transition-colors group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <h3 className="font-bold text-white text-lg">{inq.fullName}</h3>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${statusColor(
                            inq.status
                          )}`}
                        >
                          {inq.status.toUpperCase()}
                        </span>
                        {inq.infoType === 'Company' && (
                          <span className="text-[10px] bg-white/[0.05] text-slate-400 px-2 py-1 rounded-md border border-white/[0.1]">
                            {inq.companyName}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-400 mb-3 flex-wrap">
                        <span className="flex items-center gap-1.5 bg-white/[0.03] px-2.5 py-1 rounded-lg">
                           <MapPin className="w-3.5 h-3.5 text-blue-400" />
                           <span className="font-medium text-slate-300">{inq.property?.propertyName} — {inq.venue}</span>
                        </span>
                        <span className="flex items-center gap-1.5">
                           <CalendarDays className="w-3.5 h-3.5" />
                           {format(new Date(inq.eventDate), "MMM dd, yyyy")}
                           {inq.dateFlexible && <span className="text-[10px] text-blue-400 font-bold ml-1">(Flexible)</span>}
                        </span>
                        <span className="flex items-center gap-1.5">
                           <Mail className="w-3.5 h-3.5" />
                           {inq.email}
                        </span>
                      </div>
                      <div className="text-sm text-slate-300 leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/[0.05]">
                         <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] uppercase font-bold text-slate-500">Event Details</span>
                            <span className="text-[10px] font-bold text-[hsl(var(--vp-gold))]">{inq.eventType} • {inq.attendees} PAX • {inq.budget} {inq.budgetCurrency}</span>
                         </div>
                         "{inq.notes || "No special notes provided."}"
                      </div>
                    </div>
                    <div className="flex sm:flex-col gap-2 shrink-0">
                      {inq.status === 'New' && (
                        <button
                          onClick={() => handleStatusUpdate(inq._id, 'Replied')}
                          className="flex items-center justify-center gap-2 bg-[hsl(var(--vp-gold))] text-vp-gold-foreground px-4 py-2.5 rounded-xl hover:bg-[hsl(var(--vp-gold))]/90 transition-colors text-xs font-bold"
                        >
                          Mark as Replied
                        </button>
                      )}
                      <a
                        href={`mailto:${inq.email}?subject=Inquiry for ${inq.property?.propertyName}`}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-500/10 text-blue-400 px-4 py-2.5 rounded-xl hover:bg-blue-500/20 transition-colors border border-blue-500/20 text-xs font-semibold"
                      >
                        <Mail className="w-4 h-4" /> Email
                      </a>
                      <a
                        href={`tel:${inq.phone}`}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2.5 rounded-xl hover:bg-emerald-500/20 transition-colors border border-emerald-500/20 text-xs font-semibold"
                      >
                        <Phone className="w-4 h-4" /> {inq.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Inquiries;
