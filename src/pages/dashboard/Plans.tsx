import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { plans } from "@/lib/dashboardMockData";
import { Check, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Plans = () => {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Choose your plan</h1>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
            Boost your visibility and reach more customers with our subscription packages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`relative rounded-2xl p-6 border-2 transition-all ${
                p.popular
                  ? "elvie-gradient-dark text-primary-foreground border-elvie-gold scale-[1.02] shadow-2xl"
                  : "bg-card text-foreground border-border"
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-elvie-gold text-elvie-navy-deep text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> MOST POPULAR
                </div>
              )}
              <h3 className="text-xl font-bold">{p.name}</h3>
              <div className="mt-3">
                <span className="text-4xl font-bold">AED {p.price}</span>
                <span className={`text-sm ${p.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  /mo
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check
                      className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        p.popular ? "text-elvie-gold" : "text-elvie-blue"
                      }`}
                    />
                    <span>{f}</span>
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
                className={`mt-6 w-full py-3 rounded-lg font-bold text-sm transition-colors ${
                  p.current
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : p.popular
                    ? "bg-elvie-gold text-elvie-navy-deep hover:bg-elvie-gold/90"
                    : "elvie-gradient-dark text-primary-foreground"
                }`}
              >
                {p.current ? "Current Plan" : "Upgrade"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Plans;
