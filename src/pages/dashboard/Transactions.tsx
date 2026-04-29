import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { transactions } from "@/lib/dashboardMockData";
import { Download, CreditCard, ArrowUpRight, ArrowDownLeft } from "lucide-react";

const Transactions = () => {
  const total = transactions
    .filter((t) => t.status === "Paid")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Financial Overview</h1>
        <p className="text-sm text-slate-400 mb-8">
          View and download your billing history and invoices.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.05] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <ArrowUpRight className="w-16 h-16 text-blue-500" />
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-2">Total Spent</p>
            <p className="text-3xl font-bold text-white">AED {total}</p>
          </div>
          <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.05] p-6 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <ArrowDownLeft className="w-16 h-16 text-emerald-500" />
            </div>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-2">Transactions</p>
            <p className="text-3xl font-bold text-white">{transactions.length}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-6 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-30 transition-opacity">
               <CreditCard className="w-16 h-16 text-blue-400" />
            </div>
            <p className="text-[10px] text-blue-300 uppercase tracking-wider font-bold mb-2">Next Billing</p>
            <p className="text-3xl font-bold text-white">May 1, 2025</p>
          </div>
        </div>

        <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/[0.05] overflow-hidden">
          <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-white/[0.02] text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-white/[0.05]">
            <div className="col-span-3">Date</div>
            <div className="col-span-4">Description</div>
            <div className="col-span-2">Method</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-1 text-right">Amount</div>
          </div>
          <div className="divide-y divide-white/[0.05]">
            {transactions.map((t) => (
              <div
                key={t.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-5 hover:bg-white/[0.02] transition-colors text-sm items-center group"
              >
                <div className="md:col-span-3 text-slate-400 text-xs">{t.date}</div>
                <div className="md:col-span-4 font-semibold text-white">{t.desc}</div>
                <div className="md:col-span-2 flex items-center gap-2 text-slate-300 text-xs">
                   <CreditCard className="w-3.5 h-3.5 text-slate-500" />
                   {t.method}
                </div>
                <div className="md:col-span-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      t.status === "Paid"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${t.status === "Paid" ? "bg-green-400" : "bg-red-400"}`} />
                    {t.status.toUpperCase()}
                  </span>
                </div>
                <div className="md:col-span-1 md:text-right font-bold text-white flex md:block items-center justify-between">
                  <span>AED {t.amount}</span>
                  <button className="md:hidden bg-white/[0.05] p-2 rounded-lg text-slate-400 hover:text-white" aria-label="Download">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="hidden md:flex ml-auto opacity-0 group-hover:opacity-100 transition-opacity items-center justify-center w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white mt-1">
                     <Download className="w-3.5 h-3.5" />
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

export default Transactions;
