import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { transactions } from "@/lib/dashboardMockData";
import { Download } from "lucide-react";

const Transactions = () => {
  const total = transactions
    .filter((t) => t.status === "Paid")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">Transactions</h1>
        <p className="text-sm text-muted-foreground mb-6">
          View and download your billing history.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Spent</p>
            <p className="text-2xl font-bold text-foreground mt-1">AED {total}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Transactions</p>
            <p className="text-2xl font-bold text-foreground mt-1">{transactions.length}</p>
          </div>
          <div className="elvie-gradient-dark rounded-xl p-5 text-primary-foreground">
            <p className="text-xs text-elvie-gold uppercase tracking-wider">Next Billing</p>
            <p className="text-2xl font-bold mt-1">May 1, 2025</p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-5 py-3 bg-muted/50 text-xs font-bold uppercase tracking-wider text-foreground border-b border-border">
            <div className="col-span-3">Date</div>
            <div className="col-span-4">Description</div>
            <div className="col-span-2">Method</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-right">Amount</div>
          </div>
          {transactions.map((t) => (
            <div
              key={t.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 px-5 py-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors text-sm"
            >
              <div className="md:col-span-3 text-muted-foreground">{t.date}</div>
              <div className="md:col-span-4 font-medium text-foreground">{t.desc}</div>
              <div className="md:col-span-2 text-muted-foreground">{t.method}</div>
              <div className="md:col-span-2">
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                    t.status === "Paid"
                      ? "bg-elvie-gold/15 text-elvie-gold"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {t.status.toUpperCase()}
                </span>
              </div>
              <div className="md:col-span-1 md:text-right font-bold text-foreground flex md:block items-center justify-between">
                AED {t.amount}
                <button className="md:hidden text-elvie-blue" aria-label="Download">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
