import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  MapPin,
  Users,
  Calendar as CalendarIcon,
  Clock,
  Star,
  Check,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  Zap,
  Info,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Video,
  FileText,
  Heart,
  Share2,
  MoreHorizontal,
  ChevronLeft,
  Loader2,
  Calendar,
  Utensils,
  Layout,
  Wifi,
  Coffee,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { InquiryJourneyModal } from "@/components/InquiryJourneyModal";
import { VwHeader, VwFooter } from "@/components/VwLayoutComponents";
import ScrollToTop from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { getProperties, getPropertyById } from "@/services/propertyService";

const VenueDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedVenueForLayout, setSelectedVenueForLayout] = useState<any>(null);
  const [isFavorite, setIsFavorite] = useState(() => {
    if (!id) return false;
    try {
      const saved = localStorage.getItem(`venue-fav-${id}`);
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const toggleFavorite = () => {
    if (!id) return;
    const newState = !isFavorite;
    setIsFavorite(newState);
    try {
      localStorage.setItem(`venue-fav-${id}`, JSON.stringify(newState));
    } catch {}
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        if (!id) return;

        // Use getPropertyById directly for better efficiency
        const response = await getPropertyById(id);

        if (response.success && response.data) {
          setProperty(response.data);
        } else {
          // If the specialized call fails, try filtering all (fallback)
          const allProps = await getProperties();
          const list = allProps.success ? allProps.data : (Array.isArray(allProps) ? allProps : []);
          const found = list.find((p: any) => p._id === id || p.id === id);
          setProperty(found);
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070c18]">
        <Loader2 className="h-12 w-12 animate-spin text-[hsl(var(--vp-gold))]" />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#070c18] text-white">
        <h2 className="text-2xl font-bold">Venue not found</h2>
        <Link to="/venue-partners" className="mt-4 text-blue-400 hover:underline">
          Back to all venues
        </Link>
      </div>
    );
  }

  // Helper to extract photos
  const allPhotos = [
    ...(property.heroImage ? [property.heroImage] : []),
    ...(property.images || []).map((img: any) => img.url),
    ...(property.venues || []).flatMap((v: any) => (v.images || []).map((i: any) => i.url)),
  ].filter(Boolean).slice(0, 5);

  const subVenues = property.venues || [];

  return (
    <div className="min-h-screen bg-white">
      <VwHeader />
      <ScrollToTop />

      <main className="pt-20">
        {/* ═══ GALLERY SECTION ═══ */}
        <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
          <div className="grid h-[300px] grid-cols-4 grid-rows-2 gap-2 md:h-[500px]">
            <div className="col-span-2 row-span-2 overflow-hidden rounded-l-xl">
              <img src={allPhotos[0] || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80"} className="h-full w-full object-cover" alt="Venue main" />
            </div>
            <div className="overflow-hidden">
              <img src={allPhotos[1] || "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80"} className="h-full w-full object-cover" alt="Venue 2" />
            </div>
            <div className="overflow-hidden rounded-tr-xl">
              <img src={allPhotos[2] || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80"} className="h-full w-full object-cover" alt="Venue 3" />
            </div>
            <div className="overflow-hidden">
              <img src={allPhotos[3] || "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80"} className="h-full w-full object-cover" alt="Venue 4" />
            </div>
            <div className="relative overflow-hidden rounded-br-xl">
              <img src={allPhotos[4] || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80"} className="h-full w-full object-cover" alt="Venue 5" />
              <button className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-white/90 px-4 py-2 text-sm font-bold shadow-lg backdrop-blur hover:bg-white">
                <Layout className="h-4 w-4" /> Show all photos
              </button>
            </div>
          </div>
        </section>

        {/* ═══ HEADER INFO ═══ */}
        <section className="mx-auto max-w-7xl px-4 py-4 md:px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded bg-[#003b95] px-2 py-0.5 text-xs font-bold text-white uppercase tracking-tighter">New to Venue Partners</span>
                <div className="flex items-center text-yellow-400">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="h-3 w-3 fill-current" />)}
                </div>
              </div>
              <h1 className="mt-2 text-3xl font-black text-[#1a1a1a] md:text-5xl tracking-tight">{property.propertyName}</h1>
              <div className="mt-2 flex items-center gap-2 text-sm text-[#0071c2]">
                <MapPin className="h-4 w-4" />
                <span className="underline font-medium">{property.address?.street}, {property.address?.city}, {property.address?.country}</span>
                <span className="text-gray-400">—</span>
                <span className="font-bold text-[#0071c2]">Excellent location</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={toggleFavorite}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all font-bold ${
                  isFavorite ? "text-red-500 bg-red-50" : "text-[#0071c2] hover:bg-blue-50"
                }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} /> {isFavorite ? "Saved" : "Save"}
              </button>
              <button className="flex items-center gap-2 text-[#0071c2] hover:bg-blue-50 px-3 py-2 rounded-lg transition-all font-bold">
                <Share2 className="h-5 w-5" /> Share
              </button>
              <Button className="bg-[#0071c2] font-black text-white hover:bg-[#005999] px-8 py-6 text-lg">Reserve your spot</Button>
            </div>
          </div>
        </section>

        {/* ═══ STICKY NAVIGATION TABS ═══ */}
        <div className="sticky top-[80px] z-40 border-b border-gray-200 bg-white/80 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex items-center gap-8 overflow-x-auto py-4 no-scrollbar">
              {['Overview', 'Venues', 'F&B', 'Location', 'Production', 'Facilities', 'Seasonality'].map((tab) => (
                <a key={tab} href={`#${tab.toLowerCase()}`} className="text-sm font-bold text-gray-500 hover:text-[#0071c2] whitespace-nowrap transition-colors">
                  {tab}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ═══ CONTENT GRID ═══ */}
        <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-16">

              {/* Overview Section */}
              <div id="overview" className="space-y-4">
                <h3 className="text-2xl font-black text-[#1a1a1a]">Overview</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {property.description || "Experience excellence at this premier venue. Perfect for corporate events, weddings, and grand celebrations, offering state-of-the-art facilities and world-class service."}
                </p>
              </div>

              {/* Explore Sub-venues */}
              <div id="venues">
                <h3 className="text-2xl font-black text-[#1a1a1a]">Explore {property.propertyName} venues</h3>
                <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs font-bold uppercase text-gray-500">
                      <tr>
                        <th className="px-6 py-4">Venue</th>
                        <th className="px-6 py-4">Max Capacity</th>
                        <th className="px-6 py-4">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {subVenues.map((v: any, i: number) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-4">
                              <img src={v.images?.[0] || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80"} className="h-16 w-24 rounded-lg object-cover" alt={v.title} />
                              <div>
                                <div className="font-bold text-[#0071c2] hover:underline cursor-pointer">{v.title}</div>
                                <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                  <Users className="h-3.5 w-3.5 text-gray-400"/> {v.layouts?.[0]?.capacity || "Variable"} guests
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{v.layouts?.[0]?.capacity || "N/A"}</div>
                            <div className="text-xs text-gray-500 mt-1">{v.type}</div>
                          </td>
                          <td className="px-6 py-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-[#0071c2] text-[#0071c2] hover:bg-[#0071c2] hover:text-white transition-all font-bold"
                              onClick={() => setSelectedVenueForLayout(v)}
                            >
                              View layouts
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Food & Beverage */}
              <div id="fnb" className="rounded-2xl bg-gray-50 p-8 scroll-mt-24">
                <div className="flex items-center gap-3 mb-6">
                  <Utensils className="h-6 w-6 text-[#003b95]" />
                  <h3 className="text-2xl font-bold">Food & Beverage</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.fnb?.options?.map((opt: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 rounded-lg bg-white border border-gray-100 p-3 shadow-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">{opt}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-gray-900">Cuisine types</h4>
                    <p className="mt-1 text-sm text-gray-600">{property.fnb?.cuisineType || "International, Arabic"}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Food preference</h4>
                    <p className="mt-1 text-sm text-gray-600">{property.fnb?.foodPreference || "Halal, Vegetarian, Vegan"}</p>
                  </div>
                </div>
              </div>

              {/* Location & Getting Here */}
              <div id="location" className="scroll-mt-24">
                <h3 className="text-2xl font-bold mb-6">Location</h3>
                <div className="h-80 w-full overflow-hidden rounded-2xl border border-gray-200">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location?.mapLink || `${property.address?.street}, ${property.address?.city}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  ></iframe>
                </div>
                <div className="mt-8 grid md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold flex items-center gap-2"><MapPin className="h-4 w-4" /> Address</h4>
                    <p className="text-sm text-gray-600">{property.address?.street}, {property.address?.city}, {property.address?.state}, {property.address?.zipCode}, {property.address?.country}</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold flex items-center gap-2"><Clock className="h-4 w-4" /> Proximity</h4>
                    <p className="text-sm text-gray-600">30 mins to {property.address?.city} International Airport</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold flex items-center gap-2"><Wifi className="h-4 w-4" /> Facilities</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-blue-50 text-[#0071c2] text-[10px] px-2 py-1 rounded-full font-bold">VALET PARKING</span>
                      <span className="bg-blue-50 text-[#0071c2] text-[10px] px-2 py-1 rounded-full font-bold">WIFI</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Production Details */}
              <div id="production" className="space-y-8 scroll-mt-24">
                <h3 className="text-2xl font-bold">Production details</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold flex items-center gap-2 text-orange-500"><Zap className="h-4 w-4" /> Audio Visual</h4>
                    <ul className="space-y-2">
                      {property.production?.audioVisual?.length > 0 ? property.production.audioVisual.slice(0, 5).map((it: string, i: number) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center gap-2"><Check className="h-3 w-3" /> {it}</li>
                      )) : <li className="text-sm text-gray-400 italic">No AV details available</li>}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold flex items-center gap-2 text-blue-500"><Zap className="h-4 w-4" /> Lighting</h4>
                    <ul className="space-y-2">
                      {property.production?.lighting?.length > 0 ? property.production.lighting.slice(0, 5).map((it: string, i: number) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center gap-2"><Check className="h-3 w-3" /> {it}</li>
                      )) : <li className="text-sm text-gray-400 italic">No lighting details available</li>}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold flex items-center gap-2 text-purple-500"><Layout className="h-4 w-4" /> Staging</h4>
                    <ul className="space-y-2">
                      {property.production?.staging?.length > 0 ? property.production.staging.slice(0, 5).map((it: string, i: number) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center gap-2"><Check className="h-3 w-3" /> {it}</li>
                      )) : <li className="text-sm text-gray-400 italic">No staging details available</li>}
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold flex items-center gap-2 text-green-500"><Coffee className="h-4 w-4" /> Furniture</h4>
                    <ul className="space-y-2">
                      {property.production?.furniture?.length > 0 ? property.production.furniture.slice(0, 5).map((it: string, i: number) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center gap-2"><Check className="h-3 w-3" /> {it}</li>
                      )) : <li className="text-sm text-gray-400 italic">No furniture details available</li>}
                    </ul>
                  </div>
                </div>

                {(property.production?.decor?.length > 0 || property.production?.logistics?.length > 0 || property.production?.safety?.length > 0) && (
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-gray-100">
                    <div className="space-y-4">
                      <h4 className="font-bold flex items-center gap-2 text-pink-500"><Sparkles className="h-4 w-4" /> Decor</h4>
                      <ul className="space-y-2">
                        {property.production.decor?.slice(0, 5).map((it: string, i: number) => (
                          <li key={i} className="text-sm text-gray-600 flex items-center gap-2"><Check className="h-3 w-3" /> {it}</li>
                        )) || <li className="text-sm text-gray-400 italic">No decor details</li>}
                      </ul>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-bold flex items-center gap-2 text-gray-500"><ShieldCheck className="h-4 w-4" /> Logistics & Safety</h4>
                      <ul className="space-y-2">
                        {[...(property.production.logistics || []), ...(property.production.safety || [])].slice(0, 5).map((it: string, i: number) => (
                          <li key={i} className="text-sm text-gray-600 flex items-center gap-2"><Check className="h-3 w-3" /> {it}</li>
                        )) || <li className="text-sm text-gray-400 italic">No logistics info</li>}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-[2.5rem] bg-[#1a1a1a] p-8 text-white shadow-2xl border border-white/5">
                  <h3 className="text-3xl font-black mb-8 tracking-tight">Send an inquiry</h3>

                  <div className="mb-8 bg-[#262626] rounded-[2rem] p-4 md:p-6">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="p-0 w-full"
                      classNames={{
                        months: "w-full",
                        month: "w-full space-y-6",
                        caption: "flex justify-center pt-1 relative items-center mb-8",
                        caption_label: "text-lg font-bold text-white",
                        nav: "flex items-center",
                        nav_button: "h-9 w-9 bg-transparent border border-gray-700 hover:bg-gray-800 text-white rounded-xl flex items-center justify-center p-0 opacity-100 transition-all",
                        nav_button_previous: "absolute left-0",
                        nav_button_next: "absolute right-0",
                        table: "w-full border-collapse",
                        head_row: "flex w-full mb-4",
                        head_cell: "text-gray-500 font-bold text-[9px] w-full uppercase tracking-[0.2em] text-center",
                        row: "flex w-full mt-2",
                        cell: "h-9 w-full text-center text-sm p-0 relative flex items-center justify-center",
                        day: "h-9 w-9 p-0 font-bold text-white hover:bg-gray-800 rounded-lg transition-all flex items-center justify-center text-xs",
                        day_selected: "bg-[#1e3a8a] text-white hover:bg-[#1e3a8a] focus:bg-[#1e3a8a] rounded-lg border-2 border-blue-500 shadow-[0_0_15px_rgba(30,58,138,0.5)]",
                        day_today: "text-blue-400 font-black",
                        day_outside: "text-gray-700 opacity-30",
                        day_disabled: "text-gray-800 opacity-20",
                      }}
                    />
                  </div>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 rounded-md border border-gray-600 bg-transparent p-4">
                      <CalendarIcon className="h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Event Date"
                        value={date ? date.toLocaleDateString() : ''}
                        readOnly
                        className="bg-transparent text-white outline-none w-full placeholder-gray-500"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowInquiryModal(true)}
                    className="w-full bg-[hsl(var(--vp-gold))] py-6 text-lg font-bold text-vp-gold-foreground hover:bg-[hsl(var(--vp-gold))]/90"
                  >
                    Send an inquiry
                  </Button>

                  <div className="my-8 flex items-center justify-center gap-4 text-gray-500">
                    <hr className="w-full border-gray-700" />
                    <span className="text-sm font-medium tracking-widest uppercase">OR</span>
                    <hr className="w-full border-gray-700" />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="border-[hsl(var(--vp-gold))] text-[hsl(var(--vp-gold))] hover:bg-[hsl(var(--vp-gold))] hover:text-vp-gold-foreground bg-transparent flex flex-col items-center justify-center gap-1 h-16 rounded-none">
                      <Mail className="h-4 w-4" />
                      <span className="text-xs">Email</span>
                    </Button>
                    <Button variant="outline" className="border-[hsl(var(--vp-gold))] text-[hsl(var(--vp-gold))] hover:bg-[hsl(var(--vp-gold))] hover:text-vp-gold-foreground bg-transparent flex flex-col items-center justify-center gap-1 h-16 rounded-none">
                      <Phone className="h-4 w-4" />
                      <span className="text-xs">Call</span>
                    </Button>
                    <Button variant="outline" className="border-[hsl(var(--vp-gold))] text-[hsl(var(--vp-gold))] hover:bg-[hsl(var(--vp-gold))] hover:text-vp-gold-foreground bg-transparent flex flex-col items-center justify-center gap-1 h-16 rounded-none">
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-xs">WhatsApp</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ OTHERS ALSO VIEWED ═══ */}
        <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 border-t border-gray-100">
          <h3 className="text-2xl font-black text-[#1a1a1a] mb-8">Venues you may also like</h3>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {property.similarVenues?.slice(0, 4).map((v: any, i: number) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <img src={v.image || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80"} className="h-full w-full object-cover transition-transform group-hover:scale-105" alt={v.name} />
                </div>
                <h4 className="mt-3 font-bold text-[#1a1a1a] group-hover:text-[#0071c2] transition-colors">{v.name || "Luxury Event Space"}</h4>
                <p className="text-sm text-gray-500">{v.city || "Dubai"}, {v.country || "UAE"}</p>
              </div>
            )) || (
                [1, 2, 3, 4].map(i => (
                  <div key={i} className="group cursor-pointer">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                      <img src={`https://images.unsplash.com/photo-${1519167758481 + i}-83f550bb49b3?auto=format&fit=crop&q=80`} className="h-full w-full object-cover transition-transform group-hover:scale-105" alt="Similar venue" />
                    </div>
                    <h4 className="mt-3 font-bold text-[#1a1a1a] group-hover:text-[#0071c2] transition-colors">Premium Venue {i}</h4>
                    <p className="text-sm text-gray-500">Dubai, UAE</p>
                  </div>
                ))
              )}
          </div>
        </section>

        {/* ═══ FOOTER CTA ═══ */}
        <section className="mx-auto max-w-7xl px-4 py-20 md:px-6 border-t border-gray-100">
          <div className="rounded-3xl bg-[#003b95] p-12 text-center text-white">
            <h2 className="text-3xl font-bold md:text-5xl">Book your next event at {property.propertyName}</h2>
            <p className="mt-4 text-blue-200 text-lg">Contact the venue directly or request a proposal from our advisors.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              <Button className="bg-[hsl(var(--vp-gold))] text-vp-gold-foreground px-12 py-8 text-xl font-black hover:bg-[hsl(var(--vp-gold))]/90 hover:scale-105 transition-all rounded-none uppercase tracking-tighter">
                Contact Venue
              </Button>
              <Button variant="outline" className="border-2 border-[hsl(var(--vp-gold))] text-[hsl(var(--vp-gold))] px-12 py-8 text-xl font-black hover:bg-[hsl(var(--vp-gold))] hover:text-vp-gold-foreground transition-all rounded-none uppercase tracking-tighter bg-transparent">
                Request a Brief
              </Button>
            </div>
          </div>
        </section>
      </main>

      <VwFooter />

      <InquiryJourneyModal
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
        property={property}
        initialDate={date}
      />

      <Dialog open={!!selectedVenueForLayout} onOpenChange={(open) => !open && setSelectedVenueForLayout(null)}>
        <DialogContent className="max-w-3xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-[#1a1a1a]">
              {selectedVenueForLayout?.title} — Layouts
            </DialogTitle>
            <DialogDescription>
              Available seating configurations and capacities for this venue.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {selectedVenueForLayout?.layouts?.map((layout: any, idx: number) => (
              <div key={idx} className="rounded-xl border border-gray-100 bg-gray-50 p-6 transition-all hover:shadow-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-white p-2 shadow-sm">
                      <Layout className="h-5 w-5 text-[#0071c2]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900 uppercase tracking-wider">{layout.type || "Layout"}</div>
                      <div className="text-2xl font-black text-[#0071c2]">{layout.capacity || "N/A"} <span className="text-sm font-medium text-gray-500 uppercase">Pax</span></div>
                    </div>
                  </div>
                </div>
                {layout.description && (
                  <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                    {layout.description}
                  </p>
                )}
              </div>
            )) || (
                <div className="col-span-full py-12 text-center text-gray-400 italic">
                  No detailed layout information available for this venue.
                </div>
              )}
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={() => {
                setSelectedVenueForLayout(null);
                setShowInquiryModal(true);
              }}
              className="bg-[#0071c2] text-white font-bold px-8"
            >
              Inquire for this venue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VenueDetail;
