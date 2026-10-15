import etihadThumbnail from "@/assets/etihad_arena_original_thumbnail.jpg";
import sbgPosterA from "@/assets/SBG_Event/SBG_jeff-08082026-1373.jpg";
import sbgPosterB from "@/assets/SBG_Event/SBG_jeff-08082026-2143.jpg";

export type EventVideoCategory = "All" | "Concert" | "Production";

export interface EventVideoItem {
  id: string;
  title: string;
  category: Exclude<EventVideoCategory, "All">;
  location: string;
  videoUrl: string;
  posterUrl: string;
  description: string;
}

const eventVideoBase = "https://elvie-events.s3.eu-north-1.amazonaws.com/elvie-events-videos";

export const eventVideos: EventVideoItem[] = [
  {
    id: "sb-girls-etihad-arena",
    title: 'SB Girls "Get Get Aww" Concert',
    category: "Concert",
    location: "Etihad Arena, Abu Dhabi",
    videoUrl: `${eventVideoBase}/1.mp4`,
    posterUrl: etihadThumbnail,
    description: "A landmark live production with scale, energy and audience-first staging.",
  },
  {
    id: "sbg-production-highlights",
    title: "Live Production Highlights",
    category: "Production",
    location: "Abu Dhabi",
    videoUrl: `${eventVideoBase}/2.mp4`,
    posterUrl: sbgPosterA,
    description: "A closer look at the lighting, movement and atmosphere behind the show.",
  },
  {
    id: "sbg-show-moments",
    title: "Show Moments",
    category: "Concert",
    location: "UAE",
    videoUrl: `${eventVideoBase}/3.mp4`,
    posterUrl: sbgPosterB,
    description: "Selected moments from the stage, audience and live event experience.",
  },
];

export const eventVideoCategories: EventVideoCategory[] = ["All", "Concert", "Production"];
