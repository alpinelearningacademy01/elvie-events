import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Monitor, Camera, FileCheck, Package, Briefcase } from "lucide-react";
import ElvieNavbar from "@/components/ElvieNavbar";
import ElvieFooter from "@/components/ElvieFooter";
import ScrollToTop from "@/components/ScrollToTop";
import aboutTeam from "@/assets/about-team.webp";

const features = [
  { icon: Briefcase, title: "End-to-End Delivery", desc: "Planning, production, and execution under one team." },
  { icon: Package, title: "Brand Support", desc: "Premium corporate giveaways and event marketing assets." },
  { icon: Monitor, title: "Technical Power", desc: "Elite LED walls, lighting, sound, and venue coordination." },
  { icon: FileCheck, title: "Compliance Handled", desc: "Total UAE permit processing and document management." },
  { icon: Camera, title: "Content-Ready", desc: "Professional photography, video, and digital coverage." },
  { icon: Shield, title: "Strategic Sourcing", desc: "Rapid procurement of bespoke decor and local talent." },
];

const AboutUs = () => {
  const featRef = useRef(null);
  const featInView = useInView(featRef, { once: true, margin: "-80px" });
  const provenRef = useRef(null);
  const provenInView = useInView(provenRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen bg-background">
      <ElvieNavbar />

      {/* Gradient Header Area */}
      <div className="elvie-gradient-diagonal h-28" />

      {/* Team + Features */}
      <section className="py-20 bg-background" ref={featRef}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Team Image */}
            <motion.div
              className="relative group"
              initial={{ opacity: 0, x: -60 }}
              animate={featInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute -inset-3 rounded-xl bg-elvie-blue/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <img
                src={aboutTeam}
                alt="Elvie Events Team"
                className="relative w-full rounded-xl shadow-2xl object-cover aspect-[4/3]"
              />
            </motion.div>

            {/* 6 Feature Cards */}
            <div className="grid grid-cols-2 gap-6">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="group p-5 rounded-xl border border-border bg-card hover:border-elvie-blue-light/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={featInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-lg bg-elvie-navy flex items-center justify-center mb-3"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                  >
                    <f.icon className="w-5 h-5 text-elvie-blue-light" />
                  </motion.div>
                  <h3 className="font-bold text-foreground text-sm mb-1">{f.title}</h3>
                  <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Proven Performance Banner */}
      <section ref={provenRef} className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, hsl(222 72% 10%) 0%, hsl(222 80% 30%) 50%, hsl(240 50% 40%) 100%)",
          }}
        />
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-64 h-64 rounded-full border border-primary-foreground/10"
              style={{ left: `${i * 20}%`, top: `${(i % 3) * 30}%` }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-primary-foreground tracking-wider uppercase"
            initial={{ opacity: 0, y: 30 }}
            animate={provenInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            Proven Performance.{" "}
            <span className="text-elvie-blue-light">Flawless Delivery.</span>
          </motion.h2>
          <motion.p
            className="mt-6 text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={provenInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            From concept to execution, we bring together creative vision, technical excellence, and operational
            precision to deliver events that leave lasting impressions.
          </motion.p>
          <motion.a
            href="/booking"
            className="mt-8 inline-block px-10 py-4 bg-primary-foreground text-elvie-navy rounded font-bold text-sm tracking-wider hover:bg-primary-foreground/90 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={provenInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            BOOK YOUR EVENT
          </motion.a>
        </div>
      </section>

      <ElvieFooter />
      <ScrollToTop />
    </div>
  );
};

export default AboutUs;
