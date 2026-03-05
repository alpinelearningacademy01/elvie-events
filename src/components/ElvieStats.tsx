import { Award, CheckCircle, Users, Headphones } from "lucide-react";

const stats = [
  { icon: Award, value: "150+", label: "Successful Events" },
  { icon: CheckCircle, value: "100%", label: "Permit Approval Rate" },
  { icon: Users, value: "95%", label: "Client Retention Rate" },
  { icon: Headphones, value: "24/7", label: "On-Site Support" },
];

const ElvieStats = () => {
  return (
    <section className="relative py-0 overflow-hidden">
      {/* Diagonal geometric background */}
      <div className="absolute inset-0">
        {/* Main gray background */}
        <div className="absolute inset-0 bg-muted" />
        {/* Top-left navy triangle */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "hsl(222 62% 18%)",
            clipPath: "polygon(0 0, 55% 0, 0 100%)",
          }}
        />
        {/* Bottom-right navy triangle */}
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: "hsl(222 62% 18%)",
            clipPath: "polygon(100% 0, 100% 100%, 45% 100%)",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="bg-background rounded-xl py-12 px-8 shadow-2xl border border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <stat.icon className="w-10 h-10 text-primary mb-3" />
                <span className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm text-muted-foreground font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElvieStats;
