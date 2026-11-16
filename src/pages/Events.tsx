// import { motion } from "framer-motion";
// import { Image, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
// import { useMemo, useRef, useState, useEffect } from "react";
// import ElvieFooter from "@/components/ElvieFooter";
// import ElvieNavbar from "@/components/ElvieNavbar";
// import PageHeader from "@/components/PageHeader";
// import ScrollToTop from "@/components/ScrollToTop";
// import galleryHero from "@/assets/gallery-hero.webp";

// const imageModules = import.meta.glob("@/assets/SBG_Event/*.{jpg,jpeg,png,webp}", {
//   eager: true,
//   import: "default",
// }) as Record<string, string>;

// const videoModules = import.meta.glob("@/assets/SBG_Event/*.{mp4,webm,mov}", {
//   eager: true,
//   import: "default",
// }) as Record<string, string>;

// type EventMedia = {
//   src: string;
//   title: string;
//   type: "image" | "video";
// };

// const mediaTitle = (path: string) => {
//   const fileName = path.split(/[\\/]/).pop() || "Event media";
//   const cleanName = fileName.replace(/\.[^.]+$/, "").replace(/^SBG_?/i, "").replace(/[_-]+/g, " ");
//   return cleanName.replace(/\b\w/g, (letter) => letter.toUpperCase());
// };

// const toMedia = (modules: Record<string, string>, type: EventMedia["type"]) =>
//   Object.entries(modules)
//     .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
//     .map(([path, src]) => ({ src, title: mediaTitle(path), type }));

// const Events = () => {
//   const gridRef = useRef(null);
//   const [activeImage, setActiveImage] = useState<number | null>(null);
//   const [filter, setFilter] = useState<"all" | "image" | "video">("all");

//   const images = useMemo(() => toMedia(imageModules, "image"), []);
//   const videos = useMemo(() => toMedia(videoModules, "video"), []);
//   const media = useMemo(() => [...images, ...videos], [images, videos]);
//   const visibleMedia = filter === "all" ? media : media.filter((item) => item.type === filter);

//   const imageOnlyIndexes = useMemo(
//     () => visibleMedia.map((item, index) => (item.type === "image" ? index : -1)).filter((index) => index >= 0),
//     [visibleMedia],
//   );

//   const activeItem = activeImage === null ? null : visibleMedia[activeImage];

//   const moveLightbox = (direction: 1 | -1) => {
//     if (activeImage === null || !imageOnlyIndexes.length) return;
//     const currentPosition = imageOnlyIndexes.indexOf(activeImage);
//     const nextPosition = (currentPosition + direction + imageOnlyIndexes.length) % imageOnlyIndexes.length;
//     setActiveImage(imageOnlyIndexes[nextPosition]);
//   };

//   // Keyboard navigation for lightbox
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (activeImage === null) return;
//       if (e.key === "Escape") setActiveImage(null);
//       if (e.key === "ArrowLeft") moveLightbox(-1);
//       if (e.key === "ArrowRight") moveLightbox(1);
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [activeImage, imageOnlyIndexes]);

//   return (
//     <div className="min-h-screen bg-background">
//       <ElvieNavbar />
//       <PageHeader title="Events" backgroundImage={galleryHero} />

//       <section className="bg-background py-16 md:py-20" ref={gridRef}>
//         <div className="container mx-auto px-4">
//           <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
//             <div>
//               <p className="text-sm font-semibold uppercase tracking-[0.24em] text-elvie-blue-light">SBG Event</p>
//               <h1 className="mt-3 max-w-4xl font-display text-3xl font-light leading-tight text-foreground md:text-5xl">
//                 SB Girls "Get Get Aww" Concert at Etihad Arena, Abu Dhabi
//               </h1>
//             </div>
//             <div className="flex w-full gap-2 rounded-xl border border-border bg-card p-1 md:w-auto">
//               {[
//                 { label: "All", value: "all" },
//                 { label: "Images", value: "image" },
//                 { label: "Videos", value: "video" },
//               ].map((option) => (
//                 <button
//                   key={option.value}
//                   type="button"
//                   onClick={() => setFilter(option.value as typeof filter)}
//                   className={`flex-1 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors md:flex-none ${filter === option.value ? "bg-elvie-navy text-primary-foreground" : "text-muted-foreground hover:bg-muted"
//                     }`}
//                 >
//                   {option.label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="mb-10 max-w-5xl rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
//             <p className="text-sm font-black uppercase tracking-[0.2em] text-elvie-blue-light">History was made</p>
//             <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
//               <p>
//                 What a night to remember. The <strong className="text-foreground">SB Girls "Get Get Aww" Concert</strong> at{" "}
//                 <strong className="text-foreground">Etihad Arena, Abu Dhabi</strong> marked a monumental milestone as the first Filipino concert of its kind to take center stage at this iconic venue.
//               </p>
//               <p>
//                 It was an unforgettable evening filled with incredible energy, world-class entertainment, and a venue packed with passionate supporters who came together to celebrate Filipino talent.
//               </p>
//               <p>
//                 As we share these special moments captured throughout the night, we extend our heartfelt gratitude to every fan, partner, sponsor, volunteer, crew member, and supporter who made this historic event possible. Your unwavering support turned a dream into a remarkable reality.
//               </p>
//               <p>
//                 This is more than just a concert. It is a proud chapter in the history of Filipino entertainment in the UAE, and only the beginning of many more milestones to come.
//               </p>
//             </div>
//           </div>

//           {visibleMedia.length > 0 ? (
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//               {visibleMedia.map((item, index) => (
//                 <motion.article
//                   key={`${item.type}-${item.src}`}
//                   className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted shadow-sm cursor-pointer"
//                   initial={{ opacity: 0, y: 32 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.5) }}
//                 >
//                   {item.type === "image" ? (
//                     <button type="button" className="h-full w-full" onClick={() => setActiveImage(index)}>
//                       <img
//                         src={item.src}
//                         alt="SBG Event"
//                         className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
//                         loading="lazy"
//                       />
//                     </button>
//                   ) : (
//                     <video src={item.src} className="h-full w-full object-cover" controls preload="metadata" />
//                   )}
//                   {/* Hover icon indicator without text title */}
//                   <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-elvie-navy/60 to-transparent p-4 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                     <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-elvie-blue-light">
//                       {item.type === "image" ? <Image className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
//                     </div>
//                   </div>
//                 </motion.article>
//               ))}
//             </div>
//           ) : (
//             <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
//               No {filter === "video" ? "videos" : "media"} found in the SBG event folder yet.
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Lightbox Modal matching VenuePartner styling */}
//       {activeItem?.type === "image" && activeImage !== null && (
//         <motion.div
//           className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 text-white"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           onClick={() => setActiveImage(null)}
//         >
//           {/* Close button */}
//           <button
//             type="button"
//             onClick={() => setActiveImage(null)}
//             className="absolute right-6 top-6 rounded-full bg-white/10 p-3 transition hover:bg-white/20 z-10"
//             aria-label="Close image lightbox"
//           >
//             <X className="h-6 w-6" />
//           </button>

//           {/* Navigation controls */}
//           {imageOnlyIndexes.length > 1 && (
//             <>
//               <button
//                 type="button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   moveLightbox(-1);
//                 }}
//                 className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 transition hover:bg-white/20 z-10"
//                 aria-label="Previous image"
//               >
//                 <ChevronLeft className="h-7 w-7" />
//               </button>
//               <button
//                 type="button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   moveLightbox(1);
//                 }}
//                 className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 transition hover:bg-white/20 z-10"
//                 aria-label="Next image"
//               >
//                 <ChevronRight className="h-7 w-7" />
//               </button>
//             </>
//           )}

//           {/* Centered Image */}
//           <motion.img
//             key={activeItem.src}
//             src={activeItem.src}
//             alt="SBG Event"
//             className="max-h-[84vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
//             initial={{ scale: 0.96, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.2 }}
//             onClick={(e) => e.stopPropagation()}
//           />

//           {/* Bottom Pill Counter Badge */}
//           <div
//             className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/80 backdrop-blur-md border border-white/10 px-6 py-2 text-sm font-semibold text-white tracking-wide shadow-lg"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {imageOnlyIndexes.indexOf(activeImage) + 1} / {imageOnlyIndexes.length} - SBG Event
//           </div>
//         </motion.div>
//       )}

//       <ElvieFooter />
//       <ScrollToTop />
//     </div>
//   );
// };

// export default Events;




import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Image, Play, X, ChevronLeft, ChevronRight, Calendar, MapPin, Users, Sparkles, Music, Heart } from "lucide-react";
import { useMemo, useRef, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ElvieFooter from "@/components/ElvieFooter";
import ElvieNavbar from "@/components/ElvieNavbar";
import PageHeader from "@/components/PageHeader";
import ScrollToTop from "@/components/ScrollToTop";
import galleryHero from "@/assets/gallery-hero.webp";
import etihadThumbnail from "@/assets/etihad_arena_original_thumbnail.jpg";
import { pressConferenceEvent } from "@/data/eventVideos";

const imageModules = import.meta.glob("@/assets/SBG_Event/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const videoModules = import.meta.glob("@/assets/SBG_Event/*.{mp4,webm,mov}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const pressConferenceImageModules = import.meta.glob("@/assets/SBG_Press_Conference/*.jpeg", {
  eager: true,
  import: "default",
}) as Record<string, string>;

type EventMedia = {
  src: string;
  title: string;
  type: "image" | "video";
  thumbnail?: string;
};

// Remote S3-hosted SB Girls event videos
const remoteVideos: EventMedia[] = [
  {
    src: "https://elvie-events.s3.eu-north-1.amazonaws.com/elvie-events-videos/1.mp4",
    title: "SB Girls Event Video 1",
    type: "video",
    thumbnail: etihadThumbnail,
  },
  {
    src: "https://elvie-events.s3.eu-north-1.amazonaws.com/elvie-events-videos/2.mp4",
    title: "SB Girls Event Video 2",
    type: "video",
    thumbnail: etihadThumbnail,
  },
  {
    src: "https://elvie-events.s3.eu-north-1.amazonaws.com/elvie-events-videos/3.mp4",
    title: "SB Girls Event Video 3",
    type: "video",
    thumbnail: etihadThumbnail,
  },
];

const mediaTitle = (path: string) => {
  const fileName = path.split(/[\\/]/).pop() || "Event media";
  const cleanName = fileName.replace(/\.[^.]+$/, "").replace(/^SBG_?/i, "").replace(/[_-]+/g, " ");
  return cleanName.replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const toMedia = (modules: Record<string, string>, type: EventMedia["type"]) =>
  Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, src]) => ({ src, title: mediaTitle(path), type }));

const concertMedia: EventMedia[] = [...toMedia(imageModules, "image"), ...toMedia(videoModules, "video"), ...remoteVideos];
const pressConferenceImages = toMedia(pressConferenceImageModules, "image");
const pressConferenceMedia: EventMedia[] = [
  {
    src: pressConferenceEvent.videoUrl,
    title: pressConferenceEvent.title,
    type: "video",
    thumbnail: pressConferenceImages[0]?.src,
  },
  ...pressConferenceImages,
];

// Animation variants with strict Framer Motion types
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

const EventGallery = ({ isPressConference }: { isPressConference: boolean }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");
  const [isLoading, setIsLoading] = useState(true);

  const media = isPressConference ? pressConferenceMedia : concertMedia;
  const visibleMedia = filter === "all" ? media : media.filter((item) => item.type === filter);

  const imageOnlyIndexes = useMemo(
    () => visibleMedia.map((item, index) => (item.type === "image" ? index : -1)).filter((index) => index >= 0),
    [visibleMedia],
  );

  const activeItem = activeImage === null ? null : visibleMedia[activeImage];

  const moveLightbox = (direction: 1 | -1) => {
    if (activeImage === null || !imageOnlyIndexes.length) return;
    const currentPosition = imageOnlyIndexes.indexOf(activeImage);
    const nextPosition = (currentPosition + direction + imageOnlyIndexes.length) % imageOnlyIndexes.length;
    setActiveImage(imageOnlyIndexes[nextPosition]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImage === null) return;
      if (e.key === "Escape") setActiveImage(null);
      if (e.key === "ArrowLeft") moveLightbox(-1);
      if (e.key === "ArrowRight") moveLightbox(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImage, imageOnlyIndexes]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { icon: Calendar, label: "Date", value: "2026" },
    { icon: MapPin, label: "Venue", value: "Etihad Arena, Abu Dhabi" },
    { icon: Users, label: "Attendance", value: "5,000+" },
    { icon: Music, label: "Performers", value: "SB Girls" },
  ];

  return (
    <>
      <section className="relative bg-background py-16 md:py-24" ref={gridRef}>
        <div className="container mx-auto px-4">
          <nav aria-label="Event galleries" className="mb-8 flex flex-wrap gap-2">
            {[
              { to: "/events", title: "SB Girls Concert", active: !isPressConference },
              { to: `/events?event=${pressConferenceEvent.id}`, title: pressConferenceEvent.title, active: isPressConference },
            ].map(({ to, title, active }) => (
              <Link
                key={to}
                to={to}
                aria-current={active ? "page" : undefined}
                className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors ${active
                  ? "border-elvie-blue-light/40 bg-elvie-blue-light/10 text-foreground"
                  : "border-border/50 bg-card/50 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
              >
                {title}
              </Link>
            ))}
          </nav>
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
              {isPressConference ? (
                <h1 className="max-w-4xl font-display text-3xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
                  {pressConferenceEvent.title}
                </h1>
              ) : <div>
                <div className="flex items-center gap-3">
                  <Sparkles className="h-5 w-5 text-elvie-blue-light" />
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-elvie-blue-light">
                    SB Girls "Get Get Aww" Concert at Etihad Arena, Abu Dhabi
                  </p>
                </div>
                <h1 className="mt-4 max-w-4xl font-display text-3xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl">
                  SB Girls{" "}
                  <span className="bg-gradient-to-r from-elvie-blue-light to-purple-400 bg-clip-text text-transparent">
                    "Get Get Aww"
                  </span>{" "}
                  Concert
                </h1>
                <p className="mt-3 text-lg text-muted-foreground md:text-xl">
                  Etihad Arena, Abu Dhabi • A Historic Night of Filipino Talent
                </p>
              </div>}

              {/* Filter Buttons */}
              <div className="grid w-full max-w-sm shrink-0 grid-cols-3 gap-1 rounded-2xl border border-border/50 bg-card/50 p-1.5 backdrop-blur-sm sm:gap-2 xl:w-auto">
                {[
                  { label: "All Media", value: "all", icon: null },
                  { label: "Images", value: "image", icon: Image },
                  { label: "Videos", value: "video", icon: Play },
                ].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFilter(option.value as typeof filter)}
                    aria-pressed={filter === option.value}
                    className={`flex min-h-11 items-center justify-center gap-1.5 rounded-xl px-1.5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 sm:px-5 ${filter === option.value
                      ? "bg-gradient-to-r from-elvie-navy to-elvie-blue-light text-primary-foreground shadow-lg shadow-elvie-blue-light/20"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      }`}
                  >
                    {option.icon && <option.icon className="h-3.5 w-3.5" />}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {!isPressConference && <>
          {/* Stats Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group rounded-2xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-elvie-blue-light/30 hover:shadow-lg hover:shadow-elvie-blue-light/5"
              >
                <stat.icon className="mb-2 h-5 w-5 text-elvie-blue-light transition-transform duration-300 group-hover:scale-110" />
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
                <p className="mt-1 font-display text-sm font-semibold text-foreground">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Description Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mb-12 overflow-hidden rounded-3xl border border-border/50 bg-gradient-to-br from-card via-card/80 to-muted/30 p-8 shadow-xl shadow-black/5 backdrop-blur-sm md:p-10"
          >
            {/* Decorative elements */}
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-elvie-blue-light/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-purple-500/5 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-elvie-blue-light" />
                <p className="text-sm font-black uppercase tracking-[0.2em] text-elvie-blue-light">
                  History was made
                </p>
              </div>
              <div className="mt-6 space-y-4 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
                <p className="text-foreground/90">
                  What a night to remember. The{" "}
                  <strong className="text-foreground">SB Girls "Get Get Aww" Concert</strong> at{" "}
                  <strong className="text-foreground">Etihad Arena, Abu Dhabi</strong> marked a monumental milestone as the first Filipino concert of its kind to take center stage at this iconic venue.
                </p>
                <p>
                  It was an unforgettable evening filled with incredible energy, world-class entertainment, and a venue packed with passionate supporters who came together to celebrate Filipino talent.
                </p>
                <p>
                  As we share these special moments captured throughout the night, we extend our heartfelt gratitude to every fan, partner, sponsor, volunteer, crew member, and supporter who made this historic event possible. Your unwavering support turned a dream into a remarkable reality.
                </p>
                <p className="font-medium text-foreground/80">
                  This is more than just a concert. It is a proud chapter in the history of Filipino entertainment in the UAE, and only the beginning of many more milestones to come.
                </p>
              </div>
            </div>
          </motion.div>

          </>}

          {/* Media Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] animate-pulse rounded-2xl bg-muted/60"
                />
              ))}
            </div>
          ) : visibleMedia.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {visibleMedia.map((item, index) => (
                <motion.article
                  key={`${item.type}-${item.src}`}
                  variants={itemVariants}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted shadow-lg shadow-black/5 transition-all duration-300 hover:shadow-2xl hover:shadow-black/10"
                  whileHover={{ y: -4 }}
                >
                  {item.type === "image" ? (
                    <button
                      type="button"
                      className="relative h-full w-full overflow-hidden"
                      onClick={() => setActiveImage(index)}
                    >
                      <img
                        src={item.src}
                        alt={isPressConference ? item.title : "SBG Event"}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      {/* Hover icon indicator without text title */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                          <Image className="h-8 w-8 text-white" />
                        </div>
                      </div>
                    </button>
                  ) : (
                    <div className="relative h-full w-full">
                      <video
                        src={item.src}
                        aria-label={item.title}
                        className="h-full w-full object-cover"
                        controls
                        preload="metadata"
                        poster={item.thumbnail ?? etihadThumbnail}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
                    </div>
                  )}
                  {/* Media type badge */}
                  <div className="absolute left-3 top-3 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
                    {item.type === "image" ? (
                      <Image className="inline h-3 w-3 mr-1.5" />
                    ) : (
                      <Play className="inline h-3 w-3 mr-1.5" />
                    )}
                    {item.type}
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border border-border/50 bg-card/50 p-12 text-center backdrop-blur-sm"
            >
              <Image className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-lg text-muted-foreground">
                No {filter === "video" ? "videos" : "media"} found in the SBG event folder yet.
              </p>
              <p className="mt-1 text-sm text-muted-foreground/60">
                Check back soon for more content!
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Enhanced Lightbox Modal */}
      <AnimatePresence>
        {activeItem?.type === "image" && activeImage !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
          >
            {/* Close button */}
            <motion.button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute right-6 top-6 rounded-full bg-white/10 p-3 transition hover:bg-white/20 z-20"
              aria-label="Close image lightbox"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.button>

            {/* Navigation controls */}
            {imageOnlyIndexes.length > 1 && (
              <>
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    moveLightbox(-1);
                  }}
                  className="absolute left-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/45 transition hover:bg-white/20 sm:left-6 sm:h-12 sm:w-12"
                  aria-label="Previous image"
                  whileHover={{ scale: 1.1, x: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-7 w-7 text-white" />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    moveLightbox(1);
                  }}
                  className="absolute right-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/45 transition hover:bg-white/20 sm:right-6 sm:h-12 sm:w-12"
                  aria-label="Next image"
                  whileHover={{ scale: 1.1, x: 2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-7 w-7 text-white" />
                </motion.button>
              </>
            )}

            {/* Centered Image */}
            <motion.img
              key={activeItem.src}
              src={activeItem.src}
              alt={isPressConference ? activeItem.title : "SBG Event"}
              className="max-h-[calc(100dvh-8rem)] max-w-full rounded-xl object-contain shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Bottom Info Bar - Counter Badge without file name */}
            <motion.div
              className="absolute inset-x-4 bottom-4 mx-auto flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/70 px-4 py-2 text-center shadow-2xl backdrop-blur-xl sm:bottom-8 sm:gap-4 sm:px-8 sm:py-3"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="shrink-0 whitespace-nowrap text-xs font-semibold tracking-wide text-white sm:text-sm">
                {imageOnlyIndexes.indexOf(activeImage) + 1} / {imageOnlyIndexes.length}
              </span>
              <div className="h-4 w-px shrink-0 bg-white/20" />
              <span className="text-xs font-medium text-white/80 sm:text-sm">
                {isPressConference ? pressConferenceEvent.title : "SB Girls Concert"}
              </span>
            </motion.div>

            {/* Keyboard hint */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-xs text-white/30 hidden md:block">
              Use ← → arrow keys to navigate • ESC to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
};

const Events = () => {
  const [searchParams] = useSearchParams();
  const isPressConference = searchParams.get("event") === pressConferenceEvent.id;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <ElvieNavbar />
      <PageHeader title="Events" backgroundImage={galleryHero} />
      <EventGallery key={isPressConference ? pressConferenceEvent.id : "concert"} isPressConference={isPressConference} />
      <ElvieFooter />
      <ScrollToTop />
    </div>
  );
};

export default Events;
