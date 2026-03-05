import { Award, CheckCircle, Users, Headphones } from "lucide-react";

const stats = [
  { icon: Award, value: "150+", label: "Successful Events" },
  { icon: CheckCircle, value: "100%", label: "Permit Approval Rate" },
  { icon: Users, value: "95%", label: "Client Retention Rate" },
  { icon: Headphones, value: "24/7", label: "On-Site Support" },
];

const ElvieStats = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Diagonal background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-muted" />
        <div
          className="absolute top-0 left-0 right-0 h-24 bg-background"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 100%)" }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-24 bg-background"
          style={{ clipPath: "polygon(0 100%, 100% 0%, 100% 100%, 0 100%)" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="bg-elvie-navy rounded-xl py-12 px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <stat.icon className="w-10 h-10 text-elvie-gold mb-3" />
                <span className="text-3xl md:text-4xl font-bold text-primary-foreground">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm text-primary-foreground/70">
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
