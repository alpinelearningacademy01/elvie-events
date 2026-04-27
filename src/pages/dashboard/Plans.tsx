import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { plans } from "@/lib/dashboardMockData";
import { Check, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Plans = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3">Choose your plan</h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Boost your visibility and reach more customers with our subscription packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`relative rounded-3xl p-8 border transition-all duration-300 ${
                p.popular
                  ? "bg-gradient-to-b from-white/[0.08] to-white/[0.02] border-amber-500/50 scale-[1.02] shadow-[0_0_40px_rgba(245,158,11,0.15)] backdrop-blur-xl"
                  : "bg-white/[0.02] border-white/[0.05] backdrop-blur-xl hover:bg-white/[0.04]"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 text-[10px] font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-[0_0_20px_rgba(245,158,11,0.3)] tracking-wider">
                  <Star className="w-3 h-3 fill-current" /> MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold text-white">{p.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-white">AED {p.price}</span>
                <span className="text-sm text-slate-400 ml-1">
                  /mo
                </span>
              </div>

              <div className="h-px w-full bg-white/[0.05] mb-6" />

              <ul className="space-y-4 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-slate-300">
                    <div className={`mt-0.5 rounded-full p-0.5 ${p.popular ? "bg-amber-500/20 text-amber-400" : "bg-blue-500/20 text-blue-400"}`}>
                       <Check className="w-3 h-3 flex-shrink-0" />
                    </div>
                    <span className="leading-tight">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() =>
                  toast({
                    title: p.current ? "Current plan" : `Selected ${p.name}`,
                    description: p.current
                      ? "You are already on this plan."
                      : "This is a demo — no charge will be made.",
                  })
                }
                disabled={p.current}
                className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-300 ${
                  p.current
                    ? "bg-white/[0.05] text-slate-500 cursor-not-allowed border border-white/[0.05]"
                    : p.popular
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 text-amber-950 hover:from-amber-400 hover:to-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]"
                    : "bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                }`}
              >
                {p.current ? "Current Plan" : "Upgrade to " + p.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Plans;
