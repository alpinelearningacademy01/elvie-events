import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { EventVideoItem } from "@/data/eventVideos";

interface EventVideoModalProps {
  video: EventVideoItem | null;
  onClose: () => void;
}

const EventVideoModal = ({ video, onClose }: EventVideoModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!video) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    setHasError(false);
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    const activeVideo = videoRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      activeVideo?.pause();
      previousFocusRef.current?.focus?.();
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-elvie-navy/95 p-3 backdrop-blur-sm sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-video-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className="max-h-[calc(100dvh-1.5rem)] w-full max-w-[min(72rem,calc((100dvh-7rem)*16/9))] overflow-y-auto rounded-lg border border-primary-foreground/15 bg-elvie-navy-deep shadow-2xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between gap-4 border-b border-primary-foreground/10 px-4 py-3 md:px-6">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-elvie-blue-light">{video.category}</p>
                <h2 id="event-video-title" className="break-words text-lg text-primary-foreground md:text-2xl">
                  {video.title}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary-foreground/20 text-primary-foreground transition hover:border-elvie-blue-light hover:text-elvie-blue-light focus:outline-none focus:ring-2 focus:ring-elvie-blue-light"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="aspect-video bg-elvie-navy">
              {hasError ? (
                <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                  <p className="text-lg font-semibold text-primary-foreground">Video unavailable</p>
                  <p className="mt-2 max-w-md text-sm text-primary-foreground/70">
                    The event video could not be loaded right now. Please try again shortly.
                  </p>
                </div>
              ) : (
                <video
                  ref={videoRef}
                  src={video.videoUrl}
                  poster={video.posterUrl}
                  className="h-full w-full object-contain"
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  onError={() => setHasError(true)}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventVideoModal;
