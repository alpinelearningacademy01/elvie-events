import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import ElvieNavbar from "@/components/ElvieNavbar";
import ElvieFooter from "@/components/ElvieFooter";
import ScrollToTop from "@/components/ScrollToTop";
import PageHeader from "@/components/PageHeader";
import galleryHero from "@/assets/gallery-hero.webp";
import serviceEventMgmt from "@/assets/service-event-mgmt.jpg";
import serviceCorporate from "@/assets/service-corporate.jpg";
import serviceProduction from "@/assets/service-production.jpg";
import serviceLed from "@/assets/service-led.jpg";
import servicePhoto from "@/assets/service-photo.jpg";
import serviceMerch from "@/assets/service-merch.jpg";
import serviceDigital from "@/assets/service-digital.jpg";
import servicePermit from "@/assets/service-permit.jpg";
import aboutImg from "@/assets/about-event.jpg";

const galleryImages = [
  { src: serviceDigital, title: "Digital Strategy", category: "Corporate" },
  { src: serviceLed, title: "LED Production", category: "Production" },
  { src: servicePermit, title: "Permit Processing", category: "Operations" },
  { src: serviceProduction, title: "Sound Engineering", category: "Production" },
  { src: servicePhoto, title: "Event Coverage", category: "Photography" },
  { src: serviceCorporate, title: "Corporate Events", category: "Corporate" },
  { src: serviceEventMgmt, title: "Event Management", category: "Management" },
  { src: serviceMerch, title: "Branded Merchandise", category: "Marketing" },
  { src: aboutImg, title: "Gala Dinner", category: "Events" },
];

const Gallery = () => {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: "-40px" });
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <ElvieNavbar />
      <PageHeader title="Gallery" backgroundImage={galleryHero} />

      {/* Gallery Grid */}
      <section className="py-20 bg-background" ref={gridRef}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                className="relative group cursor-pointer overflow-hidden rounded-xl aspect-[4/3]"
                initial={{ opacity: 0, y: 40 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-elvie-navy/0 group-hover:bg-elvie-navy/60 transition-colors duration-500 flex items-end">
                  <motion.div
                    className="p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  >
                    <span className="text-elvie-blue-light text-xs font-semibold tracking-wider uppercase">
                      {img.category}
                    </span>
                    <h3 className="text-primary-foreground font-bold text-lg mt-1">{img.title}</h3>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground"
          >
            <X className="w-8 h-8" />
          </button>
          <motion.img
            src={galleryImages[lightbox].src}
            alt={galleryImages[lightbox].title}
            className="max-w-full max-h-[85vh] rounded-lg object-contain"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}

      <ElvieFooter />
      <ScrollToTop />
    </div>
  );
};

export default Gallery;
