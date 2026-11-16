// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import heroBg from "@/assets/hero-bg.jpg";
// import heroVideo from "@/assets/COSMO VISION 2026.mp4";

// const ElvieHero = () => {
//   return (
//     <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
//       <motion.video
//         autoPlay
//         loop
//         muted
//         playsInline
//         poster={heroBg}
//         className="absolute inset-0 w-full h-full object-cover"
//         initial={{ scale: 1.15 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 8, ease: "easeOut" }}
//       >
//         <source src={heroVideo} type="video/mp4" />
//       </motion.video>
//       <div className="absolute inset-0 elvie-overlay" />

//       {/* Floating particles */}
//       {[...Array(5)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-1 h-1 rounded-full bg-elvie-blue-light/30"
//           style={{ left: `${20 + i * 15}%`, top: `${30 + i * 10}%` }}
//           animate={{
//             y: [0, -40, 0],
//             opacity: [0.2, 0.6, 0.2],
//           }}
//           transition={{
//             duration: 4 + i,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: i * 0.8,
//           }}
//         />
//       ))}

//       <div className="relative z-10 text-center">
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, ease: "easeOut" }}
//         >
//           <motion.h1
//             className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-[0.2em] text-primary-foreground font-montserrat"
//             initial={{ letterSpacing: "0.6em" }}
//             animate={{ letterSpacing: "0.2em" }}
//             transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
//           >
//             EL<span className="text-elvie-blue-light">V</span>IE
//           </motion.h1>
//         </motion.div>

//         <motion.p
//           className="text-lg md:text-xl tracking-[0.6em] text-primary-foreground/80 mt-2 uppercase"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//         >
//           E V E N T S
//         </motion.p>

//         <motion.div
//           className="mt-8 flex items-center justify-center gap-4"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 1 }}
//         >
//           <a
//             href="#about-us"
//             className="px-8 py-3 bg-elvie-blue-light/20 backdrop-blur-sm border border-elvie-blue-light/40 rounded text-primary-foreground font-semibold text-sm tracking-wider hover:bg-elvie-blue-light/40 transition-all duration-300"
//           >
//             EXPLORE
//           </a>
//           <Link
//             to="/booking"
//             className="px-8 py-3 bg-primary-foreground text-elvie-navy rounded font-semibold text-sm tracking-wider hover:bg-primary-foreground/90 transition-all duration-300"
//           >
//             BOOK NOW
//           </Link>
//         </motion.div>
//       </div>

//       {/* Scroll indicator */}
//       {/* <motion.div
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
//         animate={{ y: [0, 10, 0] }}
//         transition={{ duration: 2, repeat: Infinity }}
//       >
//         <span className="text-primary-foreground/50 text-xs tracking-widest uppercase">Scroll</span>
//         <div className="w-px h-8 bg-gradient-to-b from-primary-foreground/50 to-transparent" />
//       </motion.div> */}
//     </section>
//   );
// };

// export default ElvieHero;


import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import logoImg from "@/assets/Logo.webp";
import { showMomentsVideo } from "@/data/eventVideos";

const heroVideos = [
  { title: showMomentsVideo.title, src: showMomentsVideo.videoUrl, poster: showMomentsVideo.posterUrl },
  { title: "Elvie Events", src: "/hero-video.mp4", poster: heroBg },
];

const arrowClass = "absolute top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/30 bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/65 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:h-12 sm:w-12";

const ElvieHero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeVideo = heroVideos[activeIndex];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const playPromise = video.play();
    playPromise?.catch(() => undefined);
  }, [activeVideo.src]);

  const changeVideo = (direction: number) => {
    setActiveIndex(index => (index + direction + heroVideos.length) % heroVideos.length);
  };

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden py-20 [@media(max-height:500px)]:pb-6 [@media(max-height:500px)]:pt-24">

      {/* Background Video */}
      <motion.video
        key={activeVideo.src}
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={activeVideo.poster}
        // className="absolute inset-0 w-full h-full object-cover"
        className="absolute inset-0 w-full h-full object-cover object-top"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      >
        <source src={activeVideo.src} type="video/mp4" />
      </motion.video>

      <button type="button" className={`${arrowClass} left-3 md:left-8`} onClick={() => changeVideo(-1)} aria-label="Previous hero video">
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
      </button>
      <button type="button" className={`${arrowClass} right-3 md:right-8`} onClick={() => changeVideo(1)} aria-label="Next hero video">
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
      </button>
      <span className="sr-only" aria-live="polite">{activeVideo.title}</span>

      {/* <div className="absolute inset-0 elvie-overlay" /> */}

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-elvie-blue-light/30"
          style={{ left: `${20 + i * 15}%`, top: `${30 + i * 10}%` }}
          animate={{ y: [0, -40, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-4xl px-14 text-center sm:px-20 md:-mt-12 [@media(max-height:500px)]:mt-0">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.img
            src={logoImg}
            alt="Elvie Events Logo"
            className="mx-auto w-[260px] max-w-full object-contain md:w-[400px] lg:w-[520px] xl:w-[580px] [@media(max-height:500px)]:max-h-[38svh] [@media(max-height:500px)]:w-auto"
            // className="w-48 md:w-64 lg:w-80 xl:w-96 mx-auto object-contain"
            draggable={false}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-6 md:mt-8 [@media(max-height:500px)]:mt-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            href="#about-us"
            className="w-full sm:w-auto px-8 py-3 text-center bg-elvie-blue-light/20 backdrop-blur-md border border-elvie-blue-light/40 rounded-md text-primary-foreground font-semibold text-sm tracking-wider hover:bg-elvie-blue-light/40 transition-all duration-300"
          >
            EXPLORE
          </a>

          <Link
            to="/booking"
            className="w-full sm:w-auto px-8 py-3 text-center bg-primary-foreground text-elvie-navy rounded-md font-semibold text-sm tracking-wider hover:bg-primary-foreground/90 transition-all duration-300"
          >
            BOOK NOW
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default ElvieHero;
