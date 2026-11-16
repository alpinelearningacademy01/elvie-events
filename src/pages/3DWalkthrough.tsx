import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight, Maximize2, Volume2 } from "lucide-react";
import { useState, useRef } from "react";
import ElvieFooter from "@/components/ElvieFooter";
import ElvieNavbar from "@/components/ElvieNavbar";
import PageHeader from "@/components/PageHeader";
import ScrollToTop from "@/components/ScrollToTop";
import galleryHero from "@/assets/gallery-hero.webp";

const videoModules = import.meta.glob("@/assets/3d_walkthrough/*.{mp4,webm,mov}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

type WalkthroughVideo = {
  src: string;
  title: string;
};

const videoTitle = (path: string) => {
  const fileName = path.split(/[/\\]/).pop() || "Walkthrough";
  return fileName.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " ").trim();
};

// Remote S3-hosted 3D walkthrough videos
const remoteVideos: WalkthroughVideo[] = [
  {
    src: "https://elvie-events.s3.eu-north-1.amazonaws.com/elvie-events-videos/3d_walkthrough/Govardhan+_+Walkthrough.mp4",
    title: "Govardhan Walkthrough",
  },
  {
    src: "https://elvie-events.s3.eu-north-1.amazonaws.com/elvie-events-videos/3d_walkthrough/SALKAR+Hotel+_+Walkthrough.mp4",
    title: "SALKAR Hotel Walkthrough",
  },
  {
    src: "https://elvie-events.s3.eu-north-1.amazonaws.com/elvie-events-videos/3d_walkthrough/Sun+Flora.mp4",
    title: "Sun Flora",
  },
];

const videos: WalkthroughVideo[] = [
  ...Object.entries(videoModules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, src]) => ({ src, title: videoTitle(path) })),
  ...remoteVideos,
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
};

const ThreeDWalkthrough = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const openModal = (index: number) => setActiveIndex(index);
  const closeModal = () => setActiveIndex(null);

  const moveTo = (direction: 1 | -1) => {
    if (activeIndex === null) return;
    const next = (activeIndex + direction + videos.length) % videos.length;
    setActiveIndex(next);
  };

  const activeVideo = activeIndex !== null ? videos[activeIndex] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <ElvieNavbar />
      <PageHeader title="3D Walkthrough" backgroundImage={galleryHero} />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-elvie-blue-light/40 to-transparent" />
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-elvie-blue-light px-3">
                Immersive Experiences
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-elvie-blue-light/40 to-transparent" />
            </div>
            <h1 className="font-display text-3xl font-light leading-tight text-foreground md:text-5xl lg:text-6xl text-center">
              3D{" "}
              <span className="bg-gradient-to-r from-elvie-blue-light to-purple-400 bg-clip-text text-transparent">
                Walkthrough
              </span>{" "}
              Tours
            </h1>
            <p className="mt-4 text-center text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
              Explore our stunning event spaces and venues through immersive 3D walkthrough videos.
              Click any video to experience a full-screen tour.
            </p>
          </motion.div>

          {/* Video Grid */}
          {videos.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {videos.map((video, index) => (
                <motion.article
                  key={video.src}
                  variants={cardVariants}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card shadow-lg shadow-black/5 transition-all duration-300 hover:border-elvie-blue-light/40 hover:shadow-2xl hover:shadow-elvie-blue-light/10"
                  whileHover={{ y: -6 }}
                >
                  {/* Video Thumbnail / Player */}
                  <div className="relative aspect-video bg-muted overflow-hidden">
                    <video
                      ref={(el) => { videoRefs.current[index] = el; }}
                      src={video.src}
                      className="h-full w-full object-cover"
                      preload="metadata"
                      muted
                      playsInline
                    />
                    {/* Dark overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-90" />

                    {/* Play button overlay */}
                    <button
                      type="button"
                      onClick={() => openModal(index)}
                      className="absolute inset-0 flex items-center justify-center"
                      aria-label={`Play ${video.title}`}
                    >
                      <motion.div
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/30 shadow-2xl transition-all duration-300 group-hover:bg-elvie-blue-light/80 group-hover:scale-110"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="h-7 w-7 text-white fill-white ml-1" />
                      </motion.div>
                    </button>

                    {/* Fullscreen icon */}
                    <button
                      type="button"
                      onClick={() => openModal(index)}
                      className="absolute right-3 top-3 rounded-lg bg-black/40 backdrop-blur-sm p-2 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 hover:bg-black/60"
                      aria-label="Open fullscreen"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>

                    {/* Video badge */}
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-sm px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                      <Volume2 className="h-3 w-3" />
                      3D Tour
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5">
                    <h2 className="font-display text-base font-semibold text-foreground group-hover:text-elvie-blue-light transition-colors duration-300">
                      {video.title}
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Immersive 3D Walkthrough
                    </p>
                    <button
                      type="button"
                      onClick={() => openModal(index)}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-elvie-navy to-elvie-blue-light px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:opacity-90 hover:shadow-elvie-blue-light/30 hover:shadow-lg"
                    >
                      <Play className="h-4 w-4 fill-white" />
                      Watch Full Tour
                    </button>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-3xl border border-border/50 bg-card/50 p-16 text-center backdrop-blur-sm"
            >
              <Play className="mx-auto h-14 w-14 text-muted-foreground/40" />
              <p className="mt-5 text-xl font-light text-muted-foreground">
                3D walkthrough videos coming soon.
              </p>
              <p className="mt-2 text-sm text-muted-foreground/60">
                Check back soon for immersive tour experiences!
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {activeVideo && activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-2 bg-black/98 px-3 pb-16 pt-20 backdrop-blur-xl sm:px-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Top bar */}
            <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between gap-3 bg-gradient-to-b from-black/80 to-transparent p-3 sm:px-6 sm:py-4">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-elvie-blue-light">
                  3D Walkthrough
                </p>
                <h3 className="mt-0.5 text-base font-semibold text-white">
                  {activeVideo.title}
                </h3>
              </div>
              <motion.button
                type="button"
                onClick={closeModal}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
                aria-label="Close"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="h-6 w-6" />
              </motion.button>
            </div>

            {/* Navigation prev */}
            {videos.length > 1 && (
              <>
                <motion.button
                  type="button"
                  onClick={() => moveTo(-1)}
                  className="absolute bottom-2 left-3 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:bottom-auto sm:left-4 sm:top-1/2 sm:-translate-y-1/2"
                  aria-label="Previous video"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-7 w-7" />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => moveTo(1)}
                  className="absolute bottom-2 right-3 z-20 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:bottom-auto sm:right-4 sm:top-1/2 sm:-translate-y-1/2"
                  aria-label="Next video"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-7 w-7" />
                </motion.button>
              </>
            )}

            {/* Video player */}
            <motion.div
              key={activeIndex}
              className="min-h-0 w-full max-w-6xl"
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
              <video
                key={activeVideo.src}
                src={activeVideo.src}
                className="mx-auto max-h-[calc(100dvh-9rem)] w-full rounded-2xl object-contain shadow-2xl"
                controls
                autoPlay
                playsInline
              />
            </motion.div>

            {/* Bottom counter */}
            <motion.div
              className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-3 whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-4 py-2 text-sm shadow-2xl backdrop-blur-xl sm:bottom-6 sm:px-7 sm:py-2.5"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-sm font-semibold text-white tracking-wide">
                {activeIndex + 1} / {videos.length}
              </span>
              <div className="h-4 w-px bg-white/20" />
              <span className="text-sm font-medium text-white/70">3D Walkthrough</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ElvieFooter />
      <ScrollToTop />
    </div>
  );
};

export default ThreeDWalkthrough;
