import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const clients = [
  "Palazzo Versace Dubai",
  "Jumeirah Al Qasr",
  "Proxperts",
  "Dubai Airport Freezone",
  "Dubai Holding",
  "Riverland Dubai",
];

const ElvieClients = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-16 bg-background" ref={ref}>
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-foreground tracking-wider uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Featured Clients
        </motion.h2>
        <motion.p
          className="mt-3 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Big names, bigger results. See who's onboard.
        </motion.p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
          {clients.map((client, i) => (
            <motion.div
              key={client}
              className="flex items-center justify-center h-20 px-4 border border-border rounded-lg bg-muted/30 hover:bg-elvie-blue/5 hover:border-elvie-blue/30 transition-all duration-300 cursor-default"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <span className="text-sm font-semibold text-muted-foreground tracking-wider text-center">
                {client}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ElvieClients;
