import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, CheckCircle, Users, Headphones } from "lucide-react";

const stats = [
  { icon: Award, value: "150+", label: "Successful Events" },
  { icon: CheckCircle, value: "100%", label: "Permit Approval Rate" },
  { icon: Users, value: "95%", label: "Client Retention Rate" },
  { icon: Headphones, value: "24/7", label: "On-Site Support" },
];

const ElvieStats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-0 overflow-hidden" ref={ref}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-muted" />
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: "hsl(var(--elvie-navy))", clipPath: "polygon(0 0, 55% 0, 0 100%)" }} />
        <div className="absolute top-0 left-0 w-full h-full" style={{ background: "hsl(var(--elvie-navy))", clipPath: "polygon(100% 0, 100% 100%, 45% 100%)" }} />
      </div>
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          className="bg-background rounded-2xl py-14 px-8 shadow-2xl border border-border"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center group"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * i }}
              >
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="w-10 h-10 text-primary mb-3 group-hover:text-elvie-blue transition-colors" />
                </motion.div>
                <span className="text-3xl md:text-4xl font-bold text-primary">
                  {stat.value}
                </span>
                <span className="mt-1 text-sm text-muted-foreground font-medium">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ElvieStats;
