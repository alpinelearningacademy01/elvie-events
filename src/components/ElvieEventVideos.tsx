import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Play, ArrowRight } from "lucide-react";
import EventVideoModal from "@/components/EventVideoModal";
import { eventVideoCategories, eventVideos, type EventVideoCategory, type EventVideoItem } from "@/data/eventVideos";

const ElvieEventVideos = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<EventVideoCategory>("All");
  const [activeVideo, setActiveVideo] = useState<EventVideoItem | null>(null);

  const filteredVideos = useMemo(() => {
    if (activeCategory === "All") return eventVideos;
    return eventVideos.filter((video) => video.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="event-videos" className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-elvie-blue-light">Event Videos</p>
            <h2 className="mt-3 text-3xl text-foreground md:text-5xl">Experience Our Events in Motion</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base">
              Watch selected event films, production moments and venue walkthroughs from Elvie Events.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {eventVideoCategories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-md border px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-elvie-blue-light ${
                  activeCategory === category
                    ? "border-elvie-navy bg-elvie-navy text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-elvie-blue-light hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {filteredVideos.map((video, index) => (
            <motion.button
              key={video.id}
              type="button"
              onClick={() => setActiveVideo(video)}
              className={`group relative overflow-hidden rounded-lg border border-border bg-card text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-elvie-blue-light ${
                index === 0 ? "sm:col-span-2 xl:row-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.06, 0.24) }}
            >
              <div className={index === 0 ? "aspect-[16/10] min-h-56 xl:aspect-[4/3]" : "aspect-[4/3] min-h-52"}>
                <img
                  src={video.posterUrl}
                  alt={video.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-elvie-navy/85 via-elvie-navy/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground sm:p-5">
                <div className="mb-2 inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/15 backdrop-blur-sm transition group-hover:bg-elvie-blue-light sm:mb-4">
                  <Play className="ml-0.5 h-5 w-5 fill-current" />
                </div>
                <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/75">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {video.location}
                </p>
                <h3 className="text-xl text-primary-foreground md:text-2xl">{video.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-primary-foreground/75">{video.description}</p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Explore Events CTA */}
      <div className="mt-12 flex justify-center">
        <motion.button
          type="button"
          onClick={() => navigate("/events")}
          className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-elvie-navy to-elvie-blue-light px-8 py-4 text-sm font-bold uppercase tracking-widest text-white shadow-lg shadow-elvie-blue-light/25 transition-all duration-300 hover:shadow-xl hover:shadow-elvie-blue-light/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-elvie-blue-light focus:ring-offset-2"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>Explore All Events</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </motion.button>
      </div>

      <EventVideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </section>
  );
};

export default ElvieEventVideos;
