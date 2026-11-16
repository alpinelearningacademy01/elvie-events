// import { motion, useInView } from "framer-motion";
// import { useRef, useState } from "react";
// import { X } from "lucide-react";
// import ElvieNavbar from "@/components/ElvieNavbar";
// import ElvieFooter from "@/components/ElvieFooter";
// import ScrollToTop from "@/components/ScrollToTop";
// import PageHeader from "@/components/PageHeader";
// import galleryHero from "@/assets/gallery-hero.webp";
// import serviceEventMgmt from "@/assets/service-event-mgmt.png";
// import serviceCorporate from "@/assets/service-corporate.png";
// import serviceProduction from "@/assets/service-production.png";
// import serviceLed from "@/assets/service-led.png";
// import servicePhoto from "@/assets/service-photo.png";
// import serviceMerch from "@/assets/service-merch.png";
// import serviceDigital from "@/assets/service-digital.png";
// import servicePermit from "@/assets/service-permit.jpg";
// import aboutImg from "@/assets/about-event.jpg";

// const galleryImages = [
//   { src: serviceDigital, title: "Digital Strategy", category: "Corporate" },
//   { src: serviceLed, title: "LED Production", category: "Production" },
//   { src: servicePermit, title: "Permit Processing", category: "Operations" },
//   { src: serviceProduction, title: "Sound Engineering", category: "Production" },
//   { src: servicePhoto, title: "Event Coverage", category: "Photography" },
//   { src: serviceCorporate, title: "Corporate Events", category: "Corporate" },
//   { src: serviceEventMgmt, title: "Event Management", category: "Management" },
//   { src: serviceMerch, title: "Branded Merchandise", category: "Marketing" },
//   { src: aboutImg, title: "Gala Dinner", category: "Events" },
// ];

// const Gallery = () => {
//   const gridRef = useRef(null);
//   const gridInView = useInView(gridRef, { once: true, margin: "-40px" });
//   const [lightbox, setLightbox] = useState<number | null>(null);

//   return (
//     <div className="min-h-screen bg-background">
//       <ElvieNavbar />
//       <PageHeader title="Gallery" backgroundImage={galleryHero} />

//       {/* Gallery Grid */}
//       <section className="py-20 bg-background" ref={gridRef}>
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {galleryImages.map((img, i) => (
//               // <motion.div
//               //   key={i}
//               //   className="relative group cursor-pointer overflow-hidden rounded-xl aspect-[4/3]"
//               //   initial={{ opacity: 0, y: 40 }}
//               //   animate={gridInView ? { opacity: 1, y: 0 } : {}}
//               //   transition={{ duration: 0.5, delay: i * 0.08 }}
//               //   whileHover={{ scale: 1.02 }}
//               //   onClick={() => setLightbox(i)}
//               // >
//               <motion.div
//                 key={i}
//                 className="relative group overflow-hidden rounded-xl aspect-[4/3]"
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={gridInView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ duration: 0.5, delay: i * 0.08 }}
//                 whileHover={{ scale: 1.02 }}
//               >
//                 <img
//                   src={img.src}
//                   alt={img.title}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                 />
//                 <div className="absolute inset-0 bg-elvie-navy/0 group-hover:bg-elvie-navy/60 transition-colors duration-500 flex items-end">
//                   <motion.div
//                     className="p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
//                   >
//                     <span className="text-elvie-blue-light text-xs font-semibold tracking-wider uppercase">
//                       {img.category}
//                     </span>
//                     <h3 className="text-primary-foreground font-bold text-lg mt-1">{img.title}</h3>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Lightbox */}
//       {lightbox !== null && (
//         <motion.div
//           className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           onClick={() => setLightbox(null)}
//         >
//           <button
//             onClick={() => setLightbox(null)}
//             className="absolute top-6 right-6 text-primary-foreground/80 hover:text-primary-foreground"
//           >
//             <X className="w-8 h-8" />
//           </button>
//           <motion.img
//             src={galleryImages[lightbox].src}
//             alt={galleryImages[lightbox].title}
//             className="max-w-full max-h-[85vh] rounded-lg object-contain"
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.3 }}
//           />
//         </motion.div>
//       )}

//       <ElvieFooter />
//       <ScrollToTop />
//     </div>
//   );
// };

// export default Gallery;


import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import ElvieNavbar from "@/components/ElvieNavbar";
import ElvieFooter from "@/components/ElvieFooter";
import ScrollToTop from "@/components/ScrollToTop";
import PageHeader from "@/components/PageHeader";
import galleryHero from "@/assets/gallery-hero.webp";
import serviceEventMgmt from "@/assets/service-event-mgmt.png";
import serviceCorporate from "@/assets/service-corporate.png";
import serviceProduction from "@/assets/service-production.png";
import serviceLed from "@/assets/service-led.png";
import servicePhoto from "@/assets/service-photo.png";
import serviceMerch from "@/assets/service-merch.png";
import serviceDigital from "@/assets/service-digital.png";
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
              <motion.button
                key={i}
                type="button"
                aria-label={`Open image: ${img.title}`}
                className="group relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-black/10 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-elvie-blue"
                initial={{ opacity: 0, y: 40 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                onClick={() => setLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-contain bg-gray-50 transition-transform duration-500"
                />

                {/* Overlay */}
                <div className="pointer-events-none absolute inset-0 flex items-end bg-elvie-navy/0 transition-colors duration-500 group-hover:bg-elvie-navy/60 group-focus-visible:bg-elvie-navy/60">
                  <div className="translate-y-full p-5 transition-transform duration-500 group-hover:translate-y-0 group-focus-visible:translate-y-0">
                    <span className="text-elvie-blue-light text-xs font-semibold tracking-wider uppercase">
                      {img.category}
                    </span>
                    <h3 className="text-primary-foreground font-bold text-lg mt-1">
                      {img.title}
                    </h3>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 px-4 pb-4 pt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            type="button"
            aria-label="Close image"
            className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-primary-foreground hover:bg-white/20 sm:right-6"
          >
            <X className="w-8 h-8" />
          </button>

          <motion.img
            src={galleryImages[lightbox].src}
            alt={galleryImages[lightbox].title}
            className="max-h-[calc(100dvh-5rem)] max-w-full rounded-lg object-contain"
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
