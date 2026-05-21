import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Loader2, MapPin, ThumbsUp, Zap, Armchair, User } from "lucide-react";
import { VwHeader, VwFooter } from "@/components/VwLayoutComponents";
import ScrollToTop from "@/components/ScrollToTop";
import { getProperties } from "@/services/propertyService";

// Fallback images
import venue1 from "@/assets/venue-1.jpg";

/* ─── Capacity Range Helper ─── */
const getCapacityRange = (subVenues: any[]) => {
  if (!subVenues || subVenues.length === 0) {
    return { seated: "14 - 250", standing: "14 - 500" };
  }

  let minSeated = Infinity;
  let maxSeated = -Infinity;
  let minStanding = Infinity;
  let maxStanding = -Infinity;

  subVenues.forEach((sv: any) => {
    const layouts = sv.layouts || {};
    const seatedKeys = ['banquet', 'classroom', 'boardroom', 'cabaret', 'uShape'];
    seatedKeys.forEach(k => {
      const val = parseInt(layouts[k]);
      if (val > 0) {
        if (val < minSeated) minSeated = val;
        if (val > maxSeated) maxSeated = val;
      }
    });

    const standingKeys = ['reception', 'theater', 'cocktail'];
    standingKeys.forEach(k => {
      const val = parseInt(layouts[k]);
      if (val > 0) {
        if (val < minStanding) minStanding = val;
        if (val > maxStanding) maxStanding = val;
      }
    });
  });

  const seatedStr = (minSeated !== Infinity && maxSeated !== -Infinity)
    ? (minSeated === maxSeated ? `${minSeated}` : `${minSeated} - ${maxSeated}`)
    : "14 - 250";

  const standingStr = (minStanding !== Infinity && maxStanding !== -Infinity)
    ? (minStanding === maxStanding ? `${minStanding}` : `${minStanding} - ${maxStanding}`)
    : "14 - 500";

  return { seated: seatedStr, standing: standingStr };
};

export default function SavedVenues() {
  const [savedVenues, setSavedVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedVenues = async () => {
      try {
        setLoading(true);
        const response = await getProperties();

        // Find all saved venue IDs from localStorage
        const savedIds = Object.keys(localStorage)
          .filter(key => key.startsWith("venue-fav-") && localStorage.getItem(key) === "true")
          .map(key => key.replace("venue-fav-", ""));

        if (response.success && savedIds.length > 0) {
          const allProps = response.data;

          // Map backend properties
          const mappedVenues = allProps.map((prop: any) => {
            const maxCapacity = prop.venues?.reduce((max: number, v: any) =>
              Math.max(max, parseInt(v.layouts?.reception || v.layouts?.theater || "0")), 0) || 100;

            const minPrice = prop.venues?.reduce((min: number, v: any) => {
              const price = parseInt(v.pricing?.startingPrice || "0");
              return price > 0 ? (min === 0 ? price : Math.min(min, price)) : min;
            }, 0) || 5000;

            return {
              id: prop._id,
              name: prop.propertyName,
              city: prop.address?.city || "Unknown",
              country: prop.address?.country || "UAE",
              state: prop.address?.state || "",
              street: prop.address?.street || "",
              type: prop.propertyType || "Venue",
              capacity: maxCapacity,
              priceFrom: minPrice,
              rating: 4.5 + Math.random() * 0.5,
              image: prop.heroImage || venue1,
              venues: prop.venues || [],
            };
          });

          const filtered = mappedVenues.filter((v: any) => savedIds.includes(v.id));
          setSavedVenues(filtered);
        }
      } catch (error) {
        console.error("Error fetching saved venues:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedVenues();
  }, []);

  const removeFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      localStorage.setItem(`venue-fav-${id}`, "false");
      setSavedVenues(prev => prev.filter(v => v.id !== id));
    } catch { }
  };

  return (
    <div className="min-h-screen bg-vp-background text-vp-foreground font-plus-jakarta flex flex-col">
      <VwHeader />
      <ScrollToTop />

      <main className="flex-1 vw-container py-12 md:py-20">
        <div className="mb-10">
          <h1 className="font-outfit font-black text-3xl md:text-5xl text-vp-foreground tracking-tight">
            Saved <span style={{ color: "hsl(var(--vp-gold))" }}>Venues</span>
          </h1>
          <p className="mt-3 text-vp-muted max-w-2xl text-lg">
            Your personalized collection of shortlisted venues.
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-12 w-12 animate-spin text-[hsl(var(--vp-gold))]" />
            <p className="mt-4 text-vp-muted font-medium">Loading your favorites...</p>
          </div>
        ) : savedVenues.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedVenues.map((venue) => {
              const { seated, standing } = getCapacityRange(venue.venues);
              return (
                <div
                  key={venue.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <Link to={`/venue/${venue.id}`} className="block">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={venue.image}
                        alt={venue.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={(e) => removeFavorite(venue.id, e)}
                        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm text-red-500 z-10 hover:bg-gray-100 transition-colors"
                        aria-label="Remove from favorites"
                      >
                        <Heart className="h-5 w-5 fill-current" />
                      </button>

                      {/* TOP BADGES */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-2 z-10">
                        <span 
                          className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wide shadow-sm"
                          style={{ backgroundColor: "rgb(243, 232, 255)", color: "rgb(124, 58, 237)" }}
                        >
                          Direct Contact Available
                        </span>
                        <span 
                          className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wide shadow-sm"
                          style={{ backgroundColor: "rgb(254, 242, 242)", color: "rgb(239, 68, 68)" }}
                        >
                          Top Venues
                        </span>
                      </div>

                      {/* Bottom left lightning */}
                      <div className="absolute bottom-3 left-3 flex h-8 w-8 items-center justify-center rounded-lg bg-black/40 backdrop-blur-sm z-10">
                        <Zap className="h-4 w-4 text-white fill-current" />
                      </div>

                      {/* Bottom right dots */}
                      <div className="absolute bottom-3 right-3 flex gap-1 z-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-white/50"></span>
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-5 text-left">
                      <h3 className="mb-2 flex items-center flex-wrap font-outfit font-black text-xl text-gray-900 leading-snug tracking-tight">
                        {venue.name}
                        <span 
                          className="inline-flex items-center justify-center bg-[#FBBF24] rounded-full w-5 h-5 ml-2 text-[10px]"
                          style={{ minWidth: '20px', minHeight: '20px' }}
                        >
                          👑
                        </span>
                      </h3>

                      <div className="mb-4 flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-gray-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-gray-600">
                          {venue.type}
                        </span>
                        <span className="text-xs font-bold text-gray-500">
                          {venue.country} - {venue.city} {venue.state ? `- ${venue.state}` : (venue.street ? `- ${venue.street}` : "- Al Barsha")}
                        </span>
                      </div>

                      <div className="mb-2 flex items-center gap-6 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Armchair className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-bold text-gray-600">{seated}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-bold text-gray-600">{standing}</span>
                        </div>
                      </div>
                    </div>
                  </Link>

                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 p-5 bg-white">
                    <Link 
                      to={`/venue/${venue.id}`} 
                      className="text-sm font-black text-gray-900 underline underline-offset-4 decoration-gray-400 hover:text-[hsl(var(--vp-gold))] transition-colors"
                    >
                      {venue.venues?.length || 5} venues
                    </Link>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-black text-gray-900 hover:bg-gray-50 transition-colors shadow-sm"
                    >
                      + Quick Inquiry
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-vp-border bg-vp-surface/50 p-12 text-center">
            <Heart className="mx-auto h-12 w-12 text-vp-muted mb-4" />
            <h3 className="text-xl font-bold text-vp-foreground">No saved venues yet</h3>
            <p className="mt-2 text-vp-muted max-w-md mx-auto mb-6">
              When you see a venue you like, click the heart icon to save it here for later reference.
            </p>
            <Link
              to="/venue-partners"
              className="inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-bold text-vp-gold-foreground transition-opacity hover:opacity-90"
              style={{ background: "hsl(var(--vp-gold))" }}
            >
              Explore Venues
            </Link>
          </div>
        )}
      </main>

      <VwFooter />
    </div>
  );
}
