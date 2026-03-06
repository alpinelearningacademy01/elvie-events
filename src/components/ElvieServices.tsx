import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import serviceEventMgmt from "@/assets/service-event-mgmt.jpg";
import serviceCorporate from "@/assets/service-corporate.jpg";
import serviceProduction from "@/assets/service-production.jpg";
import serviceLed from "@/assets/service-led.jpg";
import servicePhoto from "@/assets/service-photo.jpg";
import serviceMerch from "@/assets/service-merch.jpg";
import serviceDigital from "@/assets/service-digital.jpg";
import servicePermit from "@/assets/service-permit.jpg";

const services = [
  { title: "Event & Project Management", description: "End to end planning, coordination, and execution that ensures every detail is aligned, every timeline is met, and every event runs seamlessly from start to finish.", image: serviceEventMgmt, imagePosition: "left" as const },
  { title: "Corporate & Live Events", description: "Complete concept to delivery support, transforming ideas into impactful experiences through thoughtful design, precise planning, and flawless execution.", image: serviceCorporate, imagePosition: "right" as const },
  { title: "Event Production", description: "Professional staging, structured show flow, and efficient onsite operations designed to deliver smooth, engaging, and well managed live events.", image: serviceProduction, imagePosition: "left" as const },
  { title: "LED Walls, Lighting & Sound", description: "High quality audiovisual solutions including LED displays, professional lighting, and sound systems supported by expert technical production.", image: serviceLed, imagePosition: "right" as const },
  { title: "Photography & Videography", description: "Comprehensive event coverage with high quality photos, cinematic videos, highlight edits, and tailored content ready for digital use.", image: servicePhoto, imagePosition: "left" as const },
  { title: "Giveaways & Merchandise", description: "End to end sourcing, custom branding, and fulfillment of corporate giveaways and event merchandise that enhance brand presence and recall.", image: serviceMerch, imagePosition: "right" as const },
  { title: "Digital Marketing", description: "Strategic campaign planning, content creation, and performance driven support to amplify event visibility and audience engagement.", image: serviceDigital, imagePosition: "left" as const },
  { title: "Permit Processing", description: "Complete handling of UAE event approvals and documentation, ensuring full compliance and a smooth, hassle free permit process.", image: servicePermit, imagePosition: "right" as const },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative overflow-hidden rounded-xl h-52 md:h-56 group cursor-default"
      initial={{ opacity: 0, x: service.imagePosition === "left" ? -80 : 80 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="absolute inset-0 elvie-gradient" />
      <img
        src={service.image}
        alt={service.title}
        className={`absolute top-0 ${service.imagePosition === "left" ? "left-0" : "right-0"} h-full w-1/3 object-cover opacity-70 group-hover:opacity-100 group-hover:w-[38%] transition-all duration-500`}
      />
      <div className={`relative z-10 flex flex-col justify-center h-full px-8 ${service.imagePosition === "left" ? "ml-[33%] md:ml-[30%]" : "mr-[33%] md:mr-[30%]"}`}>
        <h3 className="text-lg md:text-xl font-bold text-primary-foreground group-hover:text-elvie-blue-light transition-colors duration-300">
          {service.title}
        </h3>
        <motion.p
          className="mt-2 text-primary-foreground/80 text-xs md:text-sm leading-relaxed max-w-md"
        >
          {service.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

const ElvieServices = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="gallery" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-foreground tracking-wider uppercase text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Experiences We Create
        </motion.h2>
        <div className="space-y-6 max-w-4xl mx-auto">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ElvieServices;
