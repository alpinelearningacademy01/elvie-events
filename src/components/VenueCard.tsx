import { Link } from "react-router-dom";
import { Star, Users, MapPin } from "lucide-react";
import type { Venue } from "@/data/venues";

const VenueCard = ({ venue }: { venue: Venue }) => (
  <Link
    to={`/venue/${venue.slug}`}
    className="group relative block overflow-hidden rounded-2xl bg-card shadow-card transition-base hover:-translate-y-1 hover:shadow-soft"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={venue.image}
        alt={venue.name}
        loading="lazy"
        className="h-full w-full object-cover transition-base group-hover:scale-105"
      />
      <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-semibold text-ink">
        <Star className="h-3 w-3 fill-primary text-primary" /> {venue.rating}
      </div>
      <div className="absolute right-3 top-3 rounded-full bg-ink/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
        {venue.type.split("/")[0]}
      </div>
    </div>
    <div className="p-5">
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <MapPin className="h-3 w-3" /> {venue.city}, {venue.country}
      </div>
      <h3 className="mt-1 font-display text-lg leading-tight text-ink">{venue.name}</h3>
      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="h-3 w-3" /> Up to {venue.capacity}
        </span>
        <span className="text-sm font-bold text-ink">
          AED {venue.priceFrom.toLocaleString()}
          <span className="text-xs font-medium text-muted-foreground"> /event</span>
        </span>
      </div>
    </div>
  </Link>
);

export default VenueCard;
