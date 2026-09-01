import { motion } from "framer-motion";
import { Image, Play, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useRef, useState, useEffect } from "react";
import ElvieFooter from "@/components/ElvieFooter";
import ElvieNavbar from "@/components/ElvieNavbar";
import PageHeader from "@/components/PageHeader";
import ScrollToTop from "@/components/ScrollToTop";
import galleryHero from "@/assets/gallery-hero.webp";

const imageModules = import.meta.glob("@/assets/SBG_Event/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const videoModules = import.meta.glob("@/assets/SBG_Event/*.{mp4,webm,mov}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

type EventMedia = {
  src: string;
  title: string;
  type: "image" | "video";
};

const mediaTitle = (path: string) => {
  const fileName = path.split(/[\\/]/).pop() || "Event media";
  const cleanName = fileName.replace(/\.[^.]+$/, "").replace(/^SBG_?/i, "").replace(/[_-]+/g, " ");
  return cleanName.replace(/\b\w/g, (letter) => letter.toUpperCase());
};

const toMedia = (modules: Record<string, string>, type: EventMedia["type"]) =>
  Object.entries(modules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, src]) => ({ src, title: mediaTitle(path), type }));

const Events = () => {
  const gridRef = useRef(null);
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "image" | "video">("all");

  const images = useMemo(() => toMedia(imageModules, "image"), []);
  const videos = useMemo(() => toMedia(videoModules, "video"), []);
  const media = useMemo(() => [...images, ...videos], [images, videos]);
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

  // Keyboard navigation for lightbox
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

  return (
    <div className="min-h-screen bg-background">
      <ElvieNavbar />
      <PageHeader title="Events" backgroundImage={galleryHero} />

      <section className="bg-background py-16 md:py-20" ref={gridRef}>
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-elvie-blue-light">SBG Event</p>
              <h1 className="mt-3 font-display text-3xl font-light text-foreground md:text-5xl">Event Moments</h1>
            </div>
            <div className="flex w-full gap-2 rounded-xl border border-border bg-card p-1 md:w-auto">
              {[
                { label: "All", value: "all" },
                { label: "Images", value: "image" },
                { label: "Videos", value: "video" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setFilter(option.value as typeof filter)}
                  className={`flex-1 rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors md:flex-none ${
                    filter === option.value ? "bg-elvie-navy text-primary-foreground" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {visibleMedia.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleMedia.map((item, index) => (
                <motion.article
                  key={`${item.type}-${item.src}`}
                  className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-muted shadow-sm cursor-pointer"
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.5) }}
                >
                  {item.type === "image" ? (
                    <button type="button" className="h-full w-full" onClick={() => setActiveImage(index)}>
                      <img
                        src={item.src}
                        alt="SBG Event"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </button>
                  ) : (
                    <video src={item.src} className="h-full w-full object-cover" controls preload="metadata" />
                  )}
                  {/* Hover icon indicator without text title */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-elvie-navy/60 to-transparent p-4 text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-elvie-blue-light">
                      {item.type === "image" ? <Image className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
              No {filter === "video" ? "videos" : "media"} found in the SBG event folder yet.
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal matching VenuePartner styling */}
      {activeItem?.type === "image" && activeImage !== null && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setActiveImage(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setActiveImage(null)}
            className="absolute right-6 top-6 rounded-full bg-white/10 p-3 transition hover:bg-white/20 z-10"
            aria-label="Close image lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation controls */}
          {imageOnlyIndexes.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  moveLightbox(-1);
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 transition hover:bg-white/20 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  moveLightbox(1);
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 transition hover:bg-white/20 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </>
          )}

          {/* Centered Image */}
          <motion.img
            key={activeItem.src}
            src={activeItem.src}
            alt="SBG Event"
            className="max-h-[84vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Bottom Pill Counter Badge */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-black/80 backdrop-blur-md border border-white/10 px-6 py-2 text-sm font-semibold text-white tracking-wide shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {imageOnlyIndexes.indexOf(activeImage) + 1} / {imageOnlyIndexes.length} - SBG Event
          </div>
        </motion.div>
      )}

      <ElvieFooter />
      <ScrollToTop />
    </div>
  );
};

export default Events;
