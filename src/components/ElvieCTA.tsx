import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone } from "lucide-react";

const ElvieCTA = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="elvie-gradient-dark text-center" ref={ref}>
      <div className="py-14 px-4">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-primary-foreground tracking-wider uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Plan Your Next Event With Elvie
        </motion.h2>
        <motion.p
          className="mt-3 text-primary-foreground/70 max-w-lg mx-auto text-sm"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          The possibilities are endless with our unparalleled event services
        </motion.p>
      </div>

      <motion.div
        className="container mx-auto px-4 pb-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="max-w-2xl mx-auto aspect-video rounded-xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] ring-1 ring-primary-foreground/10">
          <iframe
            src="https://www.youtube.com/embed/5xQXDTD0SeU"
            title="Elvie Events Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </motion.div>

      <motion.div
        className="pb-14 pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <motion.a
          href="tel:+9715029137212"
          className="inline-flex items-center justify-center gap-2 bg-primary-foreground text-elvie-navy px-16 py-4 rounded-lg font-bold text-sm tracking-wider hover:bg-primary-foreground/90 transition-colors min-w-[280px] shadow-lg"
          whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(255,255,255,0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          <Phone className="w-5 h-5" />
          CALL NOW!
        </motion.a>
      </motion.div>
    </section>
  );
};

export default ElvieCTA;
