import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import aboutImg from "@/assets/about-event.jpg";
import { MessageCircle } from "lucide-react";

const ElvieAbout = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about-us" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ width: 0 }}
              animate={inView ? { width: 60 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="h-1 bg-elvie-blue-light rounded-full" style={{ width: "100%" }} />
            </motion.div>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
              Where Every Moment
              <br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "var(--elvie-gradient)" }}>
                BECOMES A SHOWSTOPPER
              </span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed text-sm">
              Elvie Events stands among the UAE's leading event management and production teams, known for delivering seamless, end-to-end experiences across corporate events, exhibitions, weddings, concerts, and fully project-managed activations.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-sm">
              Backed by a strong portfolio of successful events, we blend bold creative direction with cutting-edge technical production and meticulous operational execution.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-sm">
              Every detail is thoughtfully managed to transform ideas into unforgettable experiences that are delivered with precision, aligned with your brand, and executed exactly as envisioned.
            </p>
            <motion.a
              href="https://wa.me/9715029137212"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-elvie-navy text-primary-foreground px-8 py-3 rounded font-semibold text-sm tracking-wider hover:bg-elvie-blue transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="w-5 h-5" />
              MESSAGE US ON WHATSAPP
            </motion.a>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative group">
              <div className="absolute -inset-3 rounded-xl bg-elvie-blue/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={aboutImg}
                alt="Elvie Events luxury gala"
                className="relative w-full rounded-lg shadow-xl object-cover aspect-[4/5] group-hover:shadow-2xl transition-shadow duration-500"
              />
            </div>
            <motion.div
              className="absolute bottom-6 right-6 bg-elvie-navy/90 backdrop-blur-md px-5 py-3 rounded-lg border border-primary-foreground/10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <span className="text-xl font-bold text-primary-foreground tracking-[0.15em]">
                EL<span className="text-elvie-blue-light">V</span>IE
              </span>
              <span className="text-[8px] block tracking-[0.3em] text-primary-foreground/70 uppercase">
                Events
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ElvieAbout;
