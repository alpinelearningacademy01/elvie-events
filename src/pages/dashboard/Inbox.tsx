import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { inboxMessages } from "@/lib/dashboardMockData";
import { Mail } from "lucide-react";

const Inbox = () => {
  const [selected, setSelected] = useState(inboxMessages[0]);
  const unread = inboxMessages.filter((m) => m.unread).length;

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Inbox</h1>
          {unread > 0 && (
            <span className="bg-elvie-gold text-elvie-navy-deep text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center">
              {unread}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {inboxMessages.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelected(m)}
                className={`w-full text-left p-4 border-b border-border last:border-0 transition-colors ${
                  selected?.id === m.id ? "bg-muted" : "hover:bg-muted/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full elvie-gradient-dark flex items-center justify-center text-primary-foreground flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-muted-foreground">{m.from}</p>
                      {m.unread && <span className="w-2 h-2 bg-elvie-blue rounded-full" />}
                    </div>
                    <p className="font-semibold text-foreground text-sm truncate">
                      {m.subject}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {m.preview}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
            {selected ? (
              <>
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
                  <div>
                    <h2 className="text-lg font-bold text-foreground">{selected.subject}</h2>
                    <p className="text-xs text-muted-foreground">From: {selected.from}</p>
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {selected.date}
                  </span>
                </div>
                <p className="text-sm text-foreground/90 leading-relaxed">{selected.preview}</p>
              </>
            ) : (
              <p className="text-center text-muted-foreground py-12">Select a message</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Inbox;
