import { Plus, Edit3, Send } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { properties } from "@/lib/dashboardMockData";

const Properties = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">My Properties</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Property is an establishment that offers single or multiple venues.
            </p>
          </div>
          <button className="bg-elvie-gold text-elvie-navy-deep px-5 py-3 rounded-lg font-bold text-sm flex items-center gap-2 hover:bg-elvie-gold/90 transition-colors">
            <Plus className="w-4 h-4" /> Add New Property
          </button>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-4 bg-muted/50 border-b border-border text-xs font-bold text-foreground uppercase tracking-wider">
            <div className="col-span-5">Property Title</div>
            <div className="col-span-2">Venues</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-3 text-right">Action</div>
          </div>

          {properties.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-5 md:py-4 items-center border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
            >
              <div className="md:col-span-5 flex items-center gap-3">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  loading="lazy"
                />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">{p.date}</p>
                  <h3 className="font-bold text-foreground text-sm underline truncate">
                    {p.title}
                  </h3>
                  <p className="text-xs text-muted-foreground truncate">{p.address}</p>
                </div>
              </div>
              <div className="md:col-span-2 text-sm text-foreground">multi:{p.venues}</div>
              <div className="md:col-span-2">
                <span className="inline-block bg-elvie-gold/15 text-elvie-gold text-xs font-bold px-3 py-1.5 rounded-full">
                  {p.status}
                </span>
              </div>
              <div className="md:col-span-3 flex gap-2 md:justify-end">
                <button className="bg-muted text-muted-foreground px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                  <Send className="w-3.5 h-3.5" /> Send for review
                </button>
                <button className="elvie-gradient-dark text-primary-foreground px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5" /> Edit & Manage
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Properties;
