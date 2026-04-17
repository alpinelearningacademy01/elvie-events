import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { inquiries } from "@/lib/dashboardMockData";
import { Search, Mail, Phone } from "lucide-react";

const statusColor = (s: string) =>
  s === "New"
    ? "bg-elvie-blue/10 text-elvie-blue"
    : s === "Replied"
    ? "bg-elvie-gold/10 text-elvie-gold"
    : "bg-muted text-muted-foreground";

const Inquiries = () => {
  const [filter, setFilter] = useState<"All" | "New" | "Replied" | "Closed">("All");
  const [q, setQ] = useState("");

  const filtered = inquiries.filter((i) => {
    if (filter !== "All" && i.status !== filter) return false;
    if (q && !`${i.name} ${i.email} ${i.property}`.toLowerCase().includes(q.toLowerCase()))
      return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">Inquiries</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Manage all customer inquiries from one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search inquiries..."
              className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-elvie-blue"
            />
          </div>
          <div className="flex gap-2">
            {(["All", "New", "Replied", "Closed"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                  filter === s
                    ? "elvie-gradient-dark text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12 text-sm">
              No inquiries match your filters.
            </p>
          ) : (
            filtered.map((inq) => (
              <div
                key={inq.id}
                className="p-5 border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bold text-foreground">{inq.name}</h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor(
                          inq.status
                        )}`}
                      >
                        {inq.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      For: <span className="font-semibold text-foreground/80">{inq.property}</span> · {inq.date}
                    </p>
                    <p className="text-sm text-foreground/90 mt-2">{inq.message}</p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`mailto:${inq.email}`}
                      className="bg-elvie-blue/10 text-elvie-blue p-2.5 rounded-lg hover:bg-elvie-blue/20"
                      aria-label="Email"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                    <a
                      href="tel:+971521327081"
                      className="bg-elvie-gold/10 text-elvie-gold p-2.5 rounded-lg hover:bg-elvie-gold/20"
                      aria-label="Call"
                    >
                      <Phone className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Inquiries;
