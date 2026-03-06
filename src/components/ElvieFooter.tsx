import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

const ElvieFooter = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer className="relative overflow-hidden" ref={ref}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(222 72% 10%) 0%, hsl(222 62% 18%) 40%, hsl(240 50% 30%) 70%, hsl(260 50% 35%) 100%)",
        }}
      />

      <div className="relative z-10">
        {/* Logo */}
        <motion.div
          className="text-center pt-14 pb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block">
            <div className="w-20 h-px bg-primary-foreground/40 mx-auto mb-4" />
            <span className="text-3xl font-bold tracking-[0.2em] text-primary-foreground">
              EL<span className="text-elvie-blue-light">V</span>IE
            </span>
            <p className="text-[10px] tracking-[0.5em] text-primary-foreground/60 uppercase mt-1">
              E V E N T S
            </p>
            <div className="w-20 h-px bg-primary-foreground/40 mx-auto mt-4" />
          </div>
        </motion.div>

        {/* Bottom section */}
        <div className="container mx-auto px-4 pb-8">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-6"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div>
              <h3 className="text-lg font-bold text-primary-foreground">Get in touch</h3>
              <p className="text-primary-foreground/70 text-sm mt-1">Contact us: +9715029137212</p>
              <p className="text-primary-foreground/70 text-sm">Email: elvieevents@gmail.com</p>
            </div>

            <div className="text-center md:text-right">
              <div className="flex items-center gap-3 justify-center md:justify-end mb-3">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: MessageCircle, href: "https://wa.me/9715029137212" },
                ].map(({ icon: Icon, href }, i) => (
                  <motion.a
                    key={i}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </motion.a>
                ))}
              </div>
              <p className="text-primary-foreground/50 text-xs">
                Copyright © 2020 All Right Reserved
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default ElvieFooter;
