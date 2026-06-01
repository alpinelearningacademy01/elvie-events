import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Search, Mail, Phone, CalendarDays, MapPin, Loader2 } from "lucide-react";
import { getInquiries, updateInquiryStatus, requestInquiryAccess, unlockInquiry } from "@/services/inquiryService";
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

  const handleRequestAccess = async (id: string) => {
    try {
      const result = await requestInquiryAccess(id);
      if (result.success) {
        setInquiryList(prev => prev.map(inq => inq._id === id ? { ...inq, isRequested: true } : inq));
        toast({ title: "Request Sent", description: "Admin has been notified." });
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to request access", variant: "destructive" });
    }
  };

  const handleUnlock = async (id: string) => {
    try {
      const result = await unlockInquiry(id);
      if (result.success) {
        toast({ title: "Unlocked!", description: "Inquiry details are now visible." });
        fetchInquiries(); // Refresh to get the actual unmasked details
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to unlock inquiry", variant: "destructive" });
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
            <>
              <div className="hidden lg:grid grid-cols-[1.5fr_1fr_1fr_100px_160px] gap-4 px-5 py-4 border-b border-white/[0.05] bg-white/[0.02]">
                {["Customer Info", "Event Details", "Date & Budget", "Status", "Actions"].map(h => (
                  <span key={h} className="text-[10px] uppercase tracking-widest font-bold text-slate-500">{h}</span>
                ))}
              </div>
              <div className="divide-y divide-white/[0.05]">
                {filtered.map((inq) => (
                  <div key={inq._id} className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr_1fr_100px_160px] gap-5 px-5 py-5 hover:bg-white/[0.02] transition-colors items-start lg:items-center">
                    
                    {/* Customer Info */}
                    <div className="min-w-0">
                      <p className="font-bold text-white text-sm truncate">{inq.fullName}</p>
                      {inq.infoType === 'Company' && inq.companyName && (
                        <p className="text-[10px] text-slate-400 truncate mt-0.5">{inq.companyName}</p>
                      )}
                      <p className="text-xs text-slate-400 truncate mt-2 flex items-center gap-2"><Mail className="w-3.5 h-3.5"/> {inq.email}</p>
                      {inq.isUnlocked !== false && (
                         <p className="text-xs text-slate-400 truncate mt-1.5 flex items-center gap-2"><Phone className="w-3.5 h-3.5"/> {inq.phone}</p>
                      )}
                    </div>

                    {/* Event Details */}
                    <div className="min-w-0">
                      <p className="font-bold text-slate-200 text-sm truncate flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-blue-500"/> 
                        {inq.property?.propertyName || "Venue"}
                      </p>
                      <p className="text-xs text-slate-400 mt-2 flex items-center justify-between pr-4">
                        <span>{inq.eventType}</span>
                        <span className="font-medium text-slate-300">{inq.attendees} PAX</span>
                      </p>
                    </div>

                    {/* Date & Budget */}
                    <div className="min-w-0">
                       <p className="font-semibold text-slate-200 text-sm truncate flex items-center gap-2">
                         <CalendarDays className="w-3.5 h-3.5 text-emerald-500"/> {format(new Date(inq.eventDate), "MMM dd, yyyy")}
                       </p>
                       {inq.dateFlexible && <p className="text-[10px] text-emerald-400 font-bold ml-5.5 mt-0.5">Flexible Date</p>}
                       <p className="text-sm text-[hsl(var(--vp-gold))] font-bold mt-1.5 ml-5.5">{inq.budget} {inq.budgetCurrency}</p>
                    </div>

                    {/* Status */}
                    <div>
                      <span className={`inline-flex text-[10px] font-bold px-2.5 py-1.5 rounded-md border ${statusColor(inq.status)}`}>
                        {inq.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 shrink-0">
                      {inq.isUnlocked === false ? (
                        <>
                          <button onClick={() => handleUnlock(inq._id)} className="w-full flex items-center justify-center gap-1.5 bg-[hsl(var(--vp-gold))] text-vp-gold-foreground px-4 py-2.5 rounded-xl hover:bg-[hsl(var(--vp-gold))]/90 transition-colors text-xs font-bold shadow-lg shadow-[hsl(var(--vp-gold))]/20">
                            Purchase Access
                          </button>
                          <button onClick={() => !inq.isRequested && handleRequestAccess(inq._id)} disabled={inq.isRequested} className={`w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold border transition-colors ${inq.isRequested ? "bg-white/[0.05] border-white/[0.1] text-slate-500 cursor-not-allowed" : "bg-white/[0.02] border-white/[0.1] text-slate-300 hover:bg-white/[0.05]"}`}>
                            {inq.isRequested ? "Approval Pending" : "Request Access"}
                          </button>
                        </>
                      ) : (
                        <>
                          {inq.status === 'New' && (
                            <button onClick={() => handleStatusUpdate(inq._id, 'Replied')} className="w-full flex items-center justify-center gap-1.5 bg-[hsl(var(--vp-gold))] text-vp-gold-foreground px-4 py-2.5 rounded-xl hover:bg-[hsl(var(--vp-gold))]/90 transition-colors text-xs font-bold">
                              Mark Replied
                            </button>
                          )}
                          <div className="flex gap-2">
                            <a href={`mailto:${inq.email}?subject=Inquiry for ${inq.property?.propertyName}`} className="flex-1 flex items-center justify-center gap-1.5 bg-blue-500/10 text-blue-400 px-2 py-2.5 rounded-xl hover:bg-blue-500/20 transition-colors border border-blue-500/20 text-xs font-bold">
                              <Mail className="w-3.5 h-3.5" /> Email
                            </a>
                            <a href={`tel:${inq.phone}`} className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-2 py-2.5 rounded-xl hover:bg-emerald-500/20 transition-colors border border-emerald-500/20 text-xs font-bold">
                              <Phone className="w-3.5 h-3.5" /> Call
                            </a>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Inquiries;
