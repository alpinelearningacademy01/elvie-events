import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const ElvieHero = () => {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <motion.img
        src={heroBg}
        alt="Dubai skyline"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      />
      <div className="absolute inset-0 elvie-overlay" />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-elvie-blue-light/30"
          style={{ left: `${20 + i * 15}%`, top: `${30 + i * 10}%` }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}

      <div className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-[0.2em] text-primary-foreground font-montserrat"
            initial={{ letterSpacing: "0.6em" }}
            animate={{ letterSpacing: "0.2em" }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
          >
            EL<span className="text-elvie-blue-light">V</span>IE
          </motion.h1>
        </motion.div>

        <motion.p
          className="text-lg md:text-xl tracking-[0.6em] text-primary-foreground/80 mt-2 uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          E V E N T S
        </motion.p>

        <motion.div
          className="mt-8 flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <a
            href="#about-us"
            className="px-8 py-3 bg-elvie-blue-light/20 backdrop-blur-sm border border-elvie-blue-light/40 rounded text-primary-foreground font-semibold text-sm tracking-wider hover:bg-elvie-blue-light/40 transition-all duration-300"
          >
            EXPLORE
          </a>
          <a
            href="#booking"
            className="px-8 py-3 bg-primary-foreground text-elvie-navy rounded font-semibold text-sm tracking-wider hover:bg-primary-foreground/90 transition-all duration-300"
          >
            BOOK NOW
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-primary-foreground/50 text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary-foreground/50 to-transparent" />
      </motion.div>
    </section>
  );
};

export default ElvieHero;
