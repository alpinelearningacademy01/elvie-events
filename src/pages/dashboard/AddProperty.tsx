import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import {
  Check,
  ChevronRight,
  Info,
  Camera,
  MapPin,
  Coffee,
  Zap,
  Users,
  Wifi,
  Bed,
  Calendar,
  UserPlus,
  Upload,
  Plus,
  Trash2,
  FileText,
  Edit2,
  Edit3,
  Star,
  ChevronLeft,
  Image as ImageIcon,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { addProperty, updateProperty, getPropertyById } from "@/services/propertyService";

const steps = [
  { id: "overview", label: "Overview", icon: Info },
  { id: "photos", label: "Photo/ Video/ Tour", icon: Camera },
  { id: "location", label: "Location & Accessibility", icon: MapPin },
  { id: "fnb", label: "Food & Beverage / Awards", icon: Coffee },
  { id: "production", label: "Production Detail", icon: Zap },
  { id: "venues", label: "Venue Detail (Capacities)", icon: Users },
  { id: "amenities", label: "Amenities and Facilities", icon: Wifi },
  // { id: "guestrooms", label: "Guest rooms", icon: Bed },
  { id: "seasonality", label: "Seasonality / Host Rules", icon: Calendar },
  { id: "contact", label: "Contact information", icon: UserPlus },
];

const AddProperty = () => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("id");
  const [currentStep, setCurrentStep] = useState(0);
  const [dataLoading, setDataLoading] = useState(false);
  const [formData, setFormData] = useState({
    propertyType: "",
    propertyName: "",
    includeAccommodation: false,
    chainName: "",
    brand: "",
    builtYear: "",
    renovatedYear: "",
    measurementSystem: "Metric (m)",
    socialLinks: [""],
    overview: "",
    floorPlans: [] as any[],
    floorPlanTitle: "",
    heroImage: null as File | null,
    heroImagePreview: "",
    eventType: "regular" as "regular" | "wedding",
    regularImages: [] as { file: File; preview: string }[],
    weddingImages: [] as { file: File; preview: string }[],
    // Location
    addressTitle: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    mapLink: "",
    propertyId: "", // To store the ID after first save
    currentPhotoTitle: "", // Temp state for step 2
    currentPhotoDescription: "", // Temp state for step 2
    videoTitle: "",
    videoDescription: "",
    videoUrl: "",
    videoFile: null as File | null,
    videoPreview: "",
    virtualTourTitle: "",
    virtualTourDescription: "",
    virtualTourUrl: "",
    virtualTourFile: null as File | null,
    virtualTourPreview: "",
    // F&B
    fnbOptions: [] as string[],
    cuisineType: "",
    foodPreference: "",
    fnbRequirements: "",
    menus: [] as any[], // Files or URLs
    foodPhotos: [] as any[], // Files or URLs
    // Production
    production: {
      audioVisual: [] as string[],
      lighting: [] as string[],
      staging: [] as string[],
      furniture: [] as string[],
      decor: [] as string[],
      logistics: [] as string[],
      duration: [] as string[],
      safety: [] as string[],
      extraRequirements: {} as Record<string, string>
    },
    venues: [] as any[],
    amenities: [] as string[],
    popularAmenities: [] as string[],
    extraAmenities: "",
    seasonality: {
      highSeason: [] as string[],
      shoulderSeason: [] as string[],
      lowSeason: [] as string[]
    },
    hostRules: {
      venueDescription: "",
      checkInOutTimes: "",
      beveragePolicy: "",
      cancellationPolicy: "",
      healthSafetyGuidelines: "",
      additionalInfo: ""
    },
    contactInfo: [
      { title: "General Contact", name: "", designation: "", phone: "", email: "" },
      { title: "Sales & Events", name: "", designation: "", phone: "", email: "" },
      { title: "Management", name: "", designation: "", phone: "", email: "" }
    ]
  });
  const [editingVenueIndex, setEditingVenueIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  // ─── Load existing property for editing ────────────────────────────────
  const [currentVenue, setCurrentVenue] = useState({
    title: "",
    type: "",
    eventTypes: [] as string[],
    view: "",
    style: "",
    environment: "Indoor",
    layouts: [] as { type: string; capacity: number }[],
    pricing: {
      dayRate: 0,
      eveningRate: 0,
      minimumSpend: 0
    },
    images: [] as any[],
    video: "",
    virtualTour: "",
    floorPlans: [] as any[]
  });

  useEffect(() => {
    if (!editId) return;
    const load = async () => {
      try {
        setDataLoading(true);
        const result = await getPropertyById(editId);
        if (!result.success) return;
        const p = result.data;

        // Rebuild images array → split by eventType
        const regularImages = (p.images || []).filter((img: any) => typeof img === 'string' || img.eventType !== 'wedding').map((img: any) => typeof img === 'string' ? {
          file: img, preview: img, title: "", description: ""
        } : {
          file: img.url || img.file || "", preview: img.url || img.preview || "", title: img.title || "", description: img.description || ""
        });
        const weddingImages = (p.images || []).filter((img: any) => typeof img !== 'string' && img.eventType === 'wedding').map((img: any) => ({
          file: img.url || img.file || "", preview: img.url || img.preview || "", title: img.title || "", description: img.description || ""
        }));

        const loadedVenues = (p.venues || []).map((v: any) => ({
          ...v,
          title: v.title || "",
          type: v.type || "",
          eventTypes: v.eventTypes || [],
          view: v.view || "",
          style: v.style || "",
          environment: v.environment || "Indoor",
          layouts: v.layouts || [],
          pricing: {
            dayRate: v.pricing?.dayRate || 0,
            eveningRate: v.pricing?.eveningRate || 0,
            minimumSpend: v.pricing?.minimumSpend || 0
          },
          images: (v.images || []).map((img: any) => typeof img === 'string' ? { file: img, preview: img } : { file: img.url || img, preview: img.url || img }),
          video: typeof v.video === 'string' ? v.video : (v.video?.url || ""),
          virtualTour: typeof v.virtualTour === 'string' ? v.virtualTour : (v.virtualTour?.url || ""),
          floorPlans: (v.floorPlans || []).map((fp: any) => typeof fp === 'string' ? { file: fp, preview: fp } : { file: fp.url || fp, preview: fp.url || fp }),
        }));

        if (loadedVenues.length > 0) {
          setCurrentVenue(loadedVenues[0]);
        }

        setFormData(prev => ({
          ...prev,
          propertyId: p._id || "",
          propertyType: p.propertyType || "",
          propertyName: p.propertyName || "",
          includeAccommodation: p.includeAccommodation || false,
          chainName: p.chainName || "",
          brand: p.brand || "",
          builtYear: p.builtYear || "",
          renovatedYear: p.renovatedYear || "",
          measurementSystem: p.measurementSystem || "Metric (m)",
          socialLinks: p.socialLinks?.length ? p.socialLinks : [""],
          overview: p.overview || "",
          heroImage: typeof p.heroImage === 'string' ? p.heroImage : (p.heroImage?.url || p.heroImage?.file || ""),
          heroImagePreview: typeof p.heroImage === 'string' ? p.heroImage : (p.heroImage?.url || p.heroImage?.preview || ""),
          regularImages,
          weddingImages,
          eventType: typeof p.images?.[0] === 'string' ? "regular" : (p.images?.[0]?.eventType || "regular"),
          currentPhotoTitle: typeof p.images?.[0] === 'string' ? "" : (p.images?.[0]?.title || ""),
          currentPhotoDescription: typeof p.images?.[0] === 'string' ? "" : (p.images?.[0]?.description || ""),
          floorPlans: (p.floorPlans || []).map((f: any) => typeof f === 'string' ? { file: f, preview: f, title: "" } : {
            file: f.url || f.file || "",
            preview: f.url || f.preview || "",
            title: f.title || f.Title || f.name || ""
          }),
          floorPlanTitle: (p.floorPlans?.[0] && typeof p.floorPlans[0] !== 'string') ? (p.floorPlans[0].title || p.floorPlans[0].Title || p.floorPlans[0].name || "") : "",
          videoTitle: p.video?.title || "",
          videoDescription: p.video?.description || "",
          videoUrl: typeof p.video === 'string' ? p.video : (p.video?.url || ""),
          virtualTourTitle: p.virtualTour?.title || "",
          virtualTourUrl: typeof p.virtualTour === 'string' ? p.virtualTour : (p.virtualTour?.url || ""),
          addressTitle: p.address?.title || "",
          streetAddress: p.address?.street || "",
          city: p.address?.city || "",
          state: p.address?.state || "",
          zipCode: p.address?.zipCode || "",
          country: p.address?.country || "",
          mapLink: p.location?.mapLink || "",
          fnbOptions: p.fnb?.options || [],
          cuisineType: p.fnb?.cuisineType || "",
          foodPreference: p.fnb?.foodPreference || "",
          fnbRequirements: p.fnb?.requirements || "",
          menus: (p.fnb?.menus || []).map((m: any) => typeof m === 'string' ? { file: m, preview: m, title: "" } : { file: m.url || m.file || "", preview: m.url || m.preview || "", title: m.title || "" }),
          foodPhotos: (p.fnb?.foodPhotos || []).map((url: any) => typeof url === 'string' ? { file: url, preview: url } : { file: url.url || url.file || "", preview: url.url || url.preview || "" }),
          production: {
            audioVisual: p.production?.audioVisual || prev.production.audioVisual,
            lighting: p.production?.lighting || prev.production.lighting,
            staging: p.production?.staging || prev.production.staging,
            furniture: p.production?.furniture || prev.production.furniture,
            decor: p.production?.decor || prev.production.decor,
            logistics: p.production?.logistics || prev.production.logistics,
            duration: p.production?.duration || prev.production.duration,
            safety: p.production?.safety || prev.production.safety,
            extraRequirements: p.production?.extraRequirements || prev.production.extraRequirements
          },
          venues: loadedVenues,
          amenities: p.amenities || [],
          popularAmenities: p.popularAmenities || [],
          extraAmenities: p.extraAmenities || "",
          seasonality: p.seasonality || prev.seasonality,
          hostRules: p.hostRules || prev.hostRules,
          contactInfo: p.contactInfo?.length ? p.contactInfo : prev.contactInfo,
        }));
      } catch (err) {
        console.error("Load property error:", err);
        toast({ title: "Error", description: "Could not load property data.", variant: "destructive" });
      } finally {
        setDataLoading(false);
      }
    };
    load();
  }, [editId]);

  const [seasonalityModal, setSeasonalityModal] = useState({
    isOpen: false,
    selectedDates: [] as number[], // Array of day numbers for simplicity in this demo
    selectedType: "highSeason" as "highSeason" | "shoulderSeason" | "lowSeason"
  });

  const [layoutForm, setLayoutForm] = useState({ type: "", capacity: "" });
  const [loading, setLoading] = useState(false);

  const saveData = async () => {
    try {
      setLoading(true);
      let result;
      const payload = { ...formData };
      if (currentVenue.title && currentVenue.type) {
        const existingIdx = payload.venues.findIndex((v: any) => (v._id && v._id === (currentVenue as any)._id) || (v.title === currentVenue.title && v.type === currentVenue.type));
        if (existingIdx >= 0) {
          payload.venues[existingIdx] = currentVenue;
        } else if (editingVenueIndex !== null) {
          payload.venues[editingVenueIndex] = currentVenue;
        } else {
          payload.venues = [...payload.venues, currentVenue];
        }
      }

      if (formData.propertyId) {
        result = await updateProperty(formData.propertyId, payload);
      } else {
        result = await addProperty(payload);
      }

      if (result.success) {
        const newPropertyId = result.data._id;
        setFormData(prev => ({ ...prev, propertyId: newPropertyId }));
        return true;
      }
      return false;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save data",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const nextStep = async () => {
    const success = await saveData();
    if (success && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    const success = await saveData();
    if (success) {
      toast({
        title: "Success",
        description: "Property published successfully!",
      });
      navigate("/dashboard/venue-portfolio");
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleHeroImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        heroImage: file,
        heroImagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleEventImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      title: formData.currentPhotoTitle,
      description: formData.currentPhotoDescription
    }));

    if (formData.eventType === "regular") {
      setFormData({
        ...formData,
        regularImages: [...formData.regularImages, ...newImages]
      });
    } else {
      setFormData({
        ...formData,
        weddingImages: [...formData.weddingImages, ...newImages]
      });
    }
  };

  const handleFloorPlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const title = formData.floorPlanTitle || "";

    const newPlans = files.map(file => ({
      file,
      title: title || file.name
    }));

    setFormData({
      ...formData,
      floorPlans: [...formData.floorPlans, ...newPlans],
      floorPlanTitle: ""
    });

    // Also clear the file input so the same file can be selected again if needed
    e.target.value = '';
  };

  const handleMenuUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const titleInput = document.getElementById('menu-title') as HTMLInputElement;
    const title = titleInput?.value || "";

    const newMenus = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      title: title
    }));

    setFormData({ ...formData, menus: [...formData.menus, ...newMenus] });
    if (titleInput) titleInput.value = "";
  };

  const handleFoodPhotosUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setFormData({ ...formData, foodPhotos: [...formData.foodPhotos, ...newPhotos] });
  };

  const removeMenu = (index: number) => {
    const newMenus = [...formData.menus];
    newMenus.splice(index, 1);
    setFormData({ ...formData, menus: newMenus });
  };

  const removeFoodPhoto = (index: number) => {
    const newPhotos = [...formData.foodPhotos];
    newPhotos.splice(index, 1);
    setFormData({ ...formData, foodPhotos: newPhotos });
  };

  const removeFloorPlan = (index: number) => {
    const newPlans = [...formData.floorPlans];
    newPlans.splice(index, 1);
    setFormData({ ...formData, floorPlans: newPlans });
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        videoFile: file,
        videoPreview: URL.createObjectURL(file)
      });
    }
  };

  const handleVirtualTourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        virtualTourFile: file,
        virtualTourPreview: URL.createObjectURL(file)
      });
    }
  };

  const removeEventImage = (index: number) => {
    if (formData.eventType === "regular") {
      const newImages = [...formData.regularImages];
      newImages.splice(index, 1);
      setFormData({ ...formData, regularImages: newImages });
    } else {
      const newImages = [...formData.weddingImages];
      newImages.splice(index, 1);
      setFormData({ ...formData, weddingImages: newImages });
    }
  };

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Overview</h2>
        <p className="text-slate-400">Enter your property's initial information so that you can continue the process by saving it</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-slate-300">Property Type *</Label>
          <Select
            value={formData.propertyType}
            onValueChange={(v) => setFormData({ ...formData, propertyType: v })}
          >
            <SelectTrigger className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12">
              <SelectValue placeholder="Select Property Type" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f172a] border-white/[0.1] text-white">
              <SelectItem value="hotel">Hotel</SelectItem>
              <SelectItem value="resort">Resort</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="banquet">Banquet Hall</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Property Name *</Label>
          <Input
            placeholder="Enter Property Name"
            className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12 focus:ring-blue-500/50"
            value={formData.propertyName}
            onChange={(e) => setFormData({ ...formData, propertyName: e.target.value })}
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/[0.05] rounded-2xl">
        <div className="space-y-1">
          <p className="text-white font-medium">Accommodation</p>
          <p className="text-sm text-slate-400">This property does not include accommodation</p>
        </div>
        <Switch
          checked={formData.includeAccommodation}
          onCheckedChange={(v) => setFormData({ ...formData, includeAccommodation: v })}
          className="data-[state=checked]:bg-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-slate-300">Chain Name</Label>
          <Input
            placeholder="Enter Chain Name"
            className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12"
            value={formData.chainName}
            onChange={(e) => setFormData({ ...formData, chainName: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Brand</Label>
          <Input
            placeholder="Enter Brand Name"
            className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12"
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label className="text-slate-300">Built</Label>
          <Select
            value={formData.builtYear}
            onValueChange={(v) => setFormData({ ...formData, builtYear: v })}
          >
            <SelectTrigger className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12">
              <SelectValue placeholder="Select Built Year" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f172a] border-white/[0.1] text-white">
              {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Renovated</Label>
          <Select
            value={formData.renovatedYear}
            onValueChange={(v) => setFormData({ ...formData, renovatedYear: v })}
          >
            <SelectTrigger className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12">
              <SelectValue placeholder="Select Renovated Year" />
            </SelectTrigger>
            <SelectContent className="bg-[#0f172a] border-white/[0.1] text-white">
              {Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-slate-300">Which measurement system do you prefer:</Label>
        <div className="flex gap-2">
          {["Imperial (ft)", "Metric (m)"].map((system) => (
            <button
              key={system}
              onClick={() => setFormData({ ...formData, measurementSystem: system })}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${formData.measurementSystem === system
                ? "bg-vp-gold text-vp-gold-foreground shadow-lg shadow-vp-gold/20"
                : "bg-white/[0.05] border border-white/[0.1] text-slate-400 hover:text-white"
                }`}
            >
              {system}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Label className="text-slate-300">Social Links</Label>
        {formData.socialLinks.map((link, idx) => (
          <div key={idx} className="flex gap-2">
            <Input
              placeholder="Enter Social Media Link"
              className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12"
              value={link}
              onChange={(e) => {
                const newLinks = [...formData.socialLinks];
                newLinks[idx] = e.target.value;
                setFormData({ ...formData, socialLinks: newLinks });
              }}
            />
            {idx === formData.socialLinks.length - 1 ? (
              <Button
                variant="outline"
                className="h-12 w-12 rounded-xl bg-white/[0.05] border-white/[0.1] hover:bg-white/[0.1]"
                onClick={() => setFormData({ ...formData, socialLinks: [...formData.socialLinks, ""] })}
              >
                <Plus className="w-5 h-5" />
              </Button>
            ) : (
              <Button
                variant="outline"
                className="h-12 w-12 rounded-xl bg-white/[0.05] border-rose-500/50 text-rose-500 hover:bg-rose-500/10"
                onClick={() => {
                  const newLinks = [...formData.socialLinks];
                  newLinks.splice(idx, 1);
                  setFormData({ ...formData, socialLinks: newLinks });
                }}
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label className="text-slate-300">Please provide a brief overview of your venue</Label>
        <Textarea
          placeholder="Feel Free to Add More Information you Think Might be Necessary."
          className="bg-white/[0.05] border-white/[0.1] text-white rounded-2xl min-h-[200px] focus:ring-blue-500/50"
          value={formData.overview}
          onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
        />
      </div>

      <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 space-y-6">
        <h3 className="text-lg font-bold text-white">Floor Plans and Additional Material</h3>
        <div className="space-y-4">
          <Label className="text-slate-400 text-sm">File Title</Label>
          <Input
            id="floor-plan-title"
            placeholder="Enter file title"
            value={formData.floorPlanTitle}
            onChange={(e) => {
              const val = e.target.value;
              const newPlans = [...formData.floorPlans];
              if (newPlans.length > 0) {
                newPlans[0] = { ...newPlans[0], title: val };
              }
              setFormData({ ...formData, floorPlanTitle: val, floorPlans: newPlans });
            }}
            className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12"
          />
          <div
            className="border-2 border-dashed border-white/[0.1] rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer group"
            onClick={() => document.getElementById('floor-plan-upload')?.click()}
          >
            <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-white font-medium">Browse and upload the file</p>
            <p className="text-xs text-slate-500">Max file size 10MB</p>
            <input
              id="floor-plan-upload"
              type="file"
              className="hidden"
              multiple
              onChange={handleFloorPlanChange}
            />
          </div>
        </div>

        {formData.floorPlans.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formData.floorPlans.map((plan, i) => (
              <div key={i} className="flex items-start justify-between p-4 bg-white/[0.03] border border-white/[0.05] rounded-xl group hover:bg-white/[0.06] transition-all">
                <div className="flex items-start gap-3 flex-1 min-w-0 mr-4">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center text-slate-400 group-hover:text-white shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Input
                      value={plan.title || ''}
                      onChange={(e) => {
                        const newPlans = [...formData.floorPlans];
                        newPlans[i] = { ...newPlans[i], title: e.target.value };
                        setFormData({ ...formData, floorPlans: newPlans });
                      }}
                      placeholder="File Title"
                      className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600 h-7 text-sm font-medium w-full pb-1"
                    />
                    <p className="text-xs text-slate-500 mt-1.5 truncate">
                      {typeof plan.file === 'string' ? plan.file.split('/').pop() : plan.file?.name}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-500 hover:text-rose-500 shrink-0 mt-1"
                  onClick={() => removeFloorPlan(i)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end pt-8">
        <Button
          className="bg-vp-gold hover:bg-vp-gold/90 text-vp-gold-foreground font-bold h-14 px-12 rounded-xl text-lg shadow-xl shadow-vp-gold/20 flex items-center justify-center gap-2"
          onClick={nextStep}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            "Save and Next"
          )}
        </Button>
      </div>
    </div>
  );

  const renderPhotos = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Photos, Video and Virtual Tour</h2>
        <p className="text-slate-400">You can specify Photos, videos and virtual tour from here</p>
      </div>

      {/* Hero Image Section */}
      <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 space-y-6">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-blue-400" />
          <h3 className="text-xl font-bold text-white">Hero Image *</h3>
        </div>
        <p className="text-sm text-slate-400">This is the primary image that will represent your property in search results.</p>

        <div
          className="relative group cursor-pointer"
          onClick={() => document.getElementById('hero-upload')?.click()}
        >
          {formData.heroImagePreview ? (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/[0.1]">
              <img src={formData.heroImagePreview} alt="Hero Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white font-bold flex items-center gap-2">
                  <Camera className="w-5 h-5" /> Change Hero Image
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full aspect-video rounded-2xl border-2 border-dashed border-white/[0.1] flex flex-col items-center justify-center gap-4 hover:bg-white/[0.02] transition-colors">
              <div className="w-16 h-16 rounded-full bg-white/[0.05] flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                <ImageIcon className="w-8 h-8" />
              </div>
              <p className="text-white font-bold">Upload Hero Image</p>
              <p className="text-xs text-slate-500">The recommended size: 2040x1320</p>
            </div>
          )}
          <input
            id="hero-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleHeroImageChange}
          />
        </div>
      </div>

      {/* Photos Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-white">Photo *</h3>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-200">
            Minimum 5 photos required. Recommended order : (1) Most important venue (2) Facade (3) Terrace / garden.
          </p>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Photo Title</Label>
              <Input
                placeholder="Please Add Photo Title"
                className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
                value={formData.currentPhotoTitle}
                onChange={(e) => {
                  const val = e.target.value;
                  const newFormData = { ...formData, currentPhotoTitle: val };
                  if (formData.eventType === "regular" && newFormData.regularImages.length > 0) {
                    newFormData.regularImages = [...newFormData.regularImages];
                    newFormData.regularImages[0] = { ...newFormData.regularImages[0], title: val };
                  } else if (formData.eventType === "wedding" && newFormData.weddingImages.length > 0) {
                    newFormData.weddingImages = [...newFormData.weddingImages];
                    newFormData.weddingImages[0] = { ...newFormData.weddingImages[0], title: val };
                  }
                  setFormData(newFormData);
                }}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Photo Description</Label>
              <Input
                placeholder="Please Add Photo Description"
                className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
                value={formData.currentPhotoDescription}
                onChange={(e) => {
                  const val = e.target.value;
                  const newFormData = { ...formData, currentPhotoDescription: val };
                  if (formData.eventType === "regular" && newFormData.regularImages.length > 0) {
                    newFormData.regularImages = [...newFormData.regularImages];
                    newFormData.regularImages[0] = { ...newFormData.regularImages[0], description: val };
                  } else if (formData.eventType === "wedding" && newFormData.weddingImages.length > 0) {
                    newFormData.weddingImages = [...newFormData.weddingImages];
                    newFormData.weddingImages[0] = { ...newFormData.weddingImages[0], description: val };
                  }
                  setFormData(newFormData);
                }}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex bg-white/[0.05] p-1 rounded-xl border border-white/[0.1] w-fit">
              <button
                onClick={() => setFormData({
                  ...formData,
                  eventType: "regular",
                  currentPhotoTitle: formData.regularImages[0]?.title || "",
                  currentPhotoDescription: formData.regularImages[0]?.description || ""
                })}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${formData.eventType === "regular"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
                  }`}
              >
                Regular Events
              </button>
              <button
                onClick={() => setFormData({
                  ...formData,
                  eventType: "wedding",
                  currentPhotoTitle: formData.weddingImages[0]?.title || "",
                  currentPhotoDescription: formData.weddingImages[0]?.description || ""
                })}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${formData.eventType === "wedding"
                  ? "bg-vp-gold text-vp-gold-foreground shadow-lg"
                  : "text-slate-400 hover:text-white"
                  }`}
              >
                Weddings
              </button>
            </div>

            <div
              className="border-2 border-dashed border-white/[0.1] rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer group relative"
              onClick={() => document.getElementById('event-upload')?.click()}
            >
              <div className="w-16 h-16 rounded-full bg-white/[0.05] flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                <Upload className="w-8 h-8" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-lg">Drag and drop images here</p>
                <p className="text-xs text-slate-500 mt-1">Supported Formats: JPG, JPEG, PNG, WEBP. Max 10MB per photo. The recommended size: 2040x1320</p>
              </div>
              <input
                id="event-upload"
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleEventImagesChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {(formData.eventType === "regular" ? formData.regularImages : formData.weddingImages).map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-white/[0.1] group">
                <img src={img.preview} alt="Event Preview" className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2 flex gap-1">
                  <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center shadow-lg">
                    <ImageIcon className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="rounded-full w-8 h-8"
                    onClick={() => removeEventImage(idx)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button className="bg-black text-white hover:bg-zinc-900 px-8 py-2 rounded-lg font-bold border border-white/[0.1]">
              Add and Save
            </Button>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white">Video</h3>
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Video Title</Label>
              <Input
                placeholder="Enter Video Title"
                className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
                value={formData.videoTitle}
                onChange={(e) => setFormData({ ...formData, videoTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Video Description</Label>
              <Input
                placeholder="Enter Video Description"
                className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
                value={formData.videoDescription}
                onChange={(e) => setFormData({ ...formData, videoDescription: e.target.value })}
              />
            </div>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/[0.05]"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#070c18] px-4 text-slate-500 font-bold">OR</span></div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Video Link (YouTube/Vimeo)</Label>
              <Input
                placeholder="Paste Video Link"
                className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
                value={formData.videoUrl}
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
              />
            </div>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/[0.05]"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#070c18] px-4 text-slate-500 font-bold">OR</span></div>
            </div>

            <div
              className="border-2 border-dashed border-white/[0.1] rounded-2xl p-8 flex items-center justify-center gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer group"
              onClick={() => document.getElementById('video-upload')?.click()}
            >
              {formData.videoPreview ? (
                <div className="flex items-center gap-2">
                  <Video className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-white">Video selected</span>
                </div>
              ) : (
                <>
                  <Upload className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                  <p className="text-white font-bold">Select and upload the video</p>
                </>
              )}
              <input id="video-upload" type="file" className="hidden" accept="video/*" onChange={handleVideoChange} />
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="bg-white/[0.05] text-slate-400 hover:text-white px-8 py-2 rounded-lg font-bold border border-white/[0.1]">
              Add and Save
            </Button>
          </div>
        </div>
      </div>

      {/* Virtual Tour Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white">Virtual Tour</h3>
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8">
          <div className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Link / Title</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Tour Title"
                  className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
                  value={formData.virtualTourTitle}
                  onChange={(e) => setFormData({ ...formData, virtualTourTitle: e.target.value })}
                />
                <Input
                  placeholder="Enter Tour Link"
                  className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
                  value={formData.virtualTourUrl}
                  onChange={(e) => setFormData({ ...formData, virtualTourUrl: e.target.value })}
                />
              </div>
            </div>
            <div
              className="bg-white/[0.05] text-slate-400 hover:text-white px-4 py-2 rounded-lg font-bold border border-white/[0.1] cursor-pointer"
              onClick={() => document.getElementById('tour-upload')?.click()}
            >
              {formData.virtualTourPreview ? "Uploaded" : "Upload File"}
              <input id="tour-upload" type="file" className="hidden" onChange={handleVirtualTourChange} />
            </div>
            <Button className="bg-white/[0.05] text-slate-400 hover:text-white px-8 py-2 rounded-lg font-bold border border-white/[0.1]">
              Add and Save
            </Button>
          </div>
          <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-500 bg-white/[0.02] w-fit px-3 py-1.5 rounded-full border border-white/[0.05]">
            <Info className="w-3 h-3" />
            <span>Link: https://my.matterport.com/...</span>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Button
          variant="outline"
          className="border-white/[0.1] bg-white/[0.02] text-white hover:bg-white/[0.05] h-14 px-12 rounded-xl text-lg"
          onClick={prevStep}
        >
          Previous
        </Button>
        <Button
          className="bg-vp-gold hover:bg-vp-gold/90 text-vp-gold-foreground font-bold h-14 px-12 rounded-xl text-lg shadow-xl shadow-vp-gold/20 flex items-center justify-center gap-2"
          onClick={nextStep}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            "Save and Next"
          )}
        </Button>
      </div>
    </div>
  );

  const renderLocation = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Address / Location</h2>
        <p className="text-slate-400">Tell us where your property is located and how accessible it is</p>
      </div>

      {/* Address Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-white">Address</h3>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Address Title</Label>
              <Input
                placeholder="Enter Address Title"
                className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
                value={formData.addressTitle}
                onChange={(e) => setFormData({ ...formData, addressTitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Street Address *</Label>
              <Input
                placeholder="Enter Street Address"
                className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
                value={formData.streetAddress}
                onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">City *</Label>
              <Input
                placeholder="Enter City"
                className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">State / Province</Label>
              <Input
                placeholder="Enter State"
                className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Zip / Postal Code</Label>
              <Input
                placeholder="Enter Zip Code"
                className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Country *</Label>
            <Select
              value={formData.country}
              onValueChange={(v) => setFormData({ ...formData, country: v })}
            >
              <SelectTrigger className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus:ring-0 text-white">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent className="bg-[#070c18] border-white/[0.1] text-white">
                <SelectItem value="uae">United Arab Emirates</SelectItem>
                <SelectItem value="saudi">Saudi Arabia</SelectItem>
                <SelectItem value="qatar">Qatar</SelectItem>
                <SelectItem value="oman">Oman</SelectItem>
                <SelectItem value="india">India</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end">
            <Button className="bg-black text-white hover:bg-zinc-900 px-8 py-2 rounded-lg font-bold border border-white/[0.1]">
              Add and Save
            </Button>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white">Map Location</h3>
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 space-y-6">
          <div className="space-y-2">
            <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Google Maps Link / Coordinates</Label>
            <Input
              placeholder="Paste Google Maps Link or Latitude, Longitude"
              className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
              value={formData.mapLink}
              onChange={(e) => setFormData({ ...formData, mapLink: e.target.value })}
            />
          </div>

          <div className="w-full h-80 bg-white/[0.05] border border-white/[0.1] rounded-2xl flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/54.3666,24.4667,12/800x400?access_token=pk.eyJ1IjoiZGVtbyIsImEiOiJjbWFsdnZ4YmcwMDRzMmtzNHR4eHR4eHR4In0=')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity" />
            <div className="relative z-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center mx-auto shadow-xl shadow-blue-500/50 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-1">
                <p className="text-white font-bold text-lg">Pin your exact location</p>
                <p className="text-xs text-slate-400">Click on the map to set the property coordinates</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="bg-white/[0.05] text-slate-400 hover:text-white px-8 py-2 rounded-lg font-bold border border-white/[0.1]">
              Add and Save
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Button
          variant="outline"
          className="border-white/[0.1] bg-white/[0.02] text-white hover:bg-white/[0.05] h-14 px-12 rounded-xl text-lg"
          onClick={prevStep}
        >
          Previous
        </Button>
        <Button
          className="bg-vp-gold hover:bg-vp-gold/90 text-vp-gold-foreground font-bold h-14 px-12 rounded-xl text-lg shadow-xl shadow-vp-gold/20 flex items-center justify-center gap-2"
          onClick={nextStep}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            "Save and Next"
          )}
        </Button>
      </div>
    </div>
  );

  const renderFnB = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Food & Beverage</h2>
        <p className="text-slate-400">You can specify food and beverage from here</p>
      </div>

      {/* Food and Beverage Main Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white">Food and Beverage</h3>
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "In-house Catering Only",
              "External Catering Allowed",
              "In-house Beverage Service",
              "In-house Catering & Restaurant - Outlet",
              "In-house Beverage Service Available",
              "Alcohol License Available",
              "Buy-out Venue",
              "Venue Fee Available"
            ].map((option) => (
              <div
                key={option}
                className="flex items-start space-x-3 group cursor-pointer"
                onClick={() => {
                  const options = formData.fnbOptions.includes(option)
                    ? formData.fnbOptions.filter(o => o !== option)
                    : [...formData.fnbOptions, option];
                  setFormData({ ...formData, fnbOptions: options });
                }}
              >
                <div className={`mt-1 w-5 h-5 rounded border transition-colors flex items-center justify-center ${formData.fnbOptions.includes(option)
                  ? "bg-blue-500 border-blue-500"
                  : "border-white/20 group-hover:border-blue-500"
                  }`}>
                  {formData.fnbOptions.includes(option) && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className={`text-sm transition-colors ${formData.fnbOptions.includes(option) ? "text-white font-medium" : "text-slate-400 group-hover:text-white"
                  }`}>{option}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Cuisine type</Label>
              <Select
                value={formData.cuisineType}
                onValueChange={(v) => setFormData({ ...formData, cuisineType: v })}
              >
                <SelectTrigger className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus:ring-0 text-white">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent className="bg-[#070c18] border-white/[0.1] text-white">
                  <SelectItem value="arabic">Arabic</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                  <SelectItem value="indian">Indian</SelectItem>
                  <SelectItem value="continental">Continental</SelectItem>
                  <SelectItem value="mediterranean">Mediterranean</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Food preference</Label>
              <Select
                value={formData.foodPreference}
                onValueChange={(v) => setFormData({ ...formData, foodPreference: v })}
              >
                <SelectTrigger className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus:ring-0 text-white">
                  <SelectValue placeholder="Select Preference" />
                </SelectTrigger>
                <SelectContent className="bg-[#070c18] border-white/[0.1] text-white">
                  <SelectItem value="veg">Vegetarian</SelectItem>
                  <SelectItem value="nonveg">Non-Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="halal">Halal</SelectItem>
                  <SelectItem value="kosher">Kosher</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">
              Are there any other requirements related to the food or beverage menu that you would like to mention here?
            </Label>
            <Textarea
              placeholder="Enter your requirements..."
              className="bg-transparent border border-white/[0.1] rounded-xl focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600 min-h-[150px]"
              value={formData.fnbRequirements}
              onChange={(e) => setFormData({ ...formData, fnbRequirements: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Restaurant Menu Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white">Restaurant Menu</h3>
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 space-y-6">
          <div className="space-y-2">
            <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Menu Title</Label>
            <Input
              id="menu-title"
              placeholder="Enter Menu Title"
              className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
            />
          </div>

          <div
            className="border-2 border-dashed border-white/[0.1] rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer group"
            onClick={() => document.getElementById('menu-upload')?.click()}
          >
            <Upload className="w-8 h-8 text-slate-500 group-hover:text-white transition-colors" />
            <p className="text-white font-bold">Select or upload the Menu</p>
            <input id="menu-upload" type="file" className="hidden" multiple onChange={handleMenuUpload} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formData.menus.map((menu, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/[0.05] rounded-xl group hover:bg-white/[0.06] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center text-slate-400 group-hover:text-white">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-slate-300 font-medium">{menu.title || (menu.file?.name)}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-slate-500 hover:text-rose-500"
                  onClick={() => removeMenu(i)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Foods Photo Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white">Foods Photo</h3>
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 space-y-8">
          <div
            className="border-2 border-dashed border-white/[0.1] rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer group"
            onClick={() => document.getElementById('food-upload')?.click()}
          >
            <div className="w-16 h-16 rounded-full bg-white/[0.05] flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
              <Upload className="w-8 h-8" />
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-lg">Drag and drop images here</p>
              <p className="text-xs text-slate-500 mt-1">Supported Formats: JPG, JPEG, PNG, WEBP. Max 10MB per photo.</p>
            </div>
            <input id="food-upload" type="file" className="hidden" multiple accept="image/*" onChange={handleFoodPhotosUpload} />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {formData.foodPhotos.map((photo, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-white/[0.1] group">
                <img
                  src={photo.preview || photo.url}
                  alt="Food"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="icon"
                    className="rounded-full w-8 h-8"
                    onClick={() => removeFoodPhoto(i)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Button
          variant="outline"
          className="border-white/[0.1] bg-white/[0.02] text-white hover:bg-white/[0.05] h-14 px-12 rounded-xl text-lg"
          onClick={prevStep}
        >
          Previous
        </Button>
        <Button
          className="bg-vp-gold hover:bg-vp-gold/90 text-vp-gold-foreground font-bold h-14 px-12 rounded-xl text-lg shadow-xl shadow-vp-gold/20 flex items-center justify-center gap-2"
          onClick={nextStep}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            "Save and Next"
          )}
        </Button>
      </div>
    </div>
  );

  const renderProduction = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Production Detail</h2>
        <p className="text-slate-400">Clear and efficient staging help you show clients how their events can flourish in the different spaces of your property and surroundings.</p>
      </div>

      <div className="space-y-6">
        {[
          {
            title: "Audio Visual",
            key: "audioVisual",
            icon: Zap,
            intro: "Specify the AV equipment and services available at your property and surroundings.",
            items: ["High-speed internet / Wi-Fi", "Standard sound system", "PA system with speakers and microphones", "Ambient lighting", "LCD projector and screen", "TV screens / Monitors", "Video conferencing equipment", "Flipcharts", "High-tech audio/visual control room", "Stage-specific lighting equipment"]
          },
          {
            title: "Lighting",
            key: "lighting",
            icon: Zap,
            intro: "Specify the lighting equipment and services available at your property and surroundings.",
            items: ["Spotlights and accent", "Custom lighting design for unique event setups and themes", "Ambient lighting solutions", "Atmospheric lighting (e.g. up lighting, string lights, color washes)", "Theatrical lighting equipment"]
          },
          {
            title: "Staging",
            key: "staging",
            icon: Zap,
            intro: "Specify the staging features and services available at your property and surroundings.",
            items: ["Mobile or modular stages", "Fixed stage or platform", "Backstage area", "Green room", "Stairs/Ramps"]
          },
          {
            title: "Furniture",
            key: "furniture",
            icon: Coffee,
            intro: "Specify the furniture available at your property and surroundings.",
            items: ["Bar tables / Cocktail tables / High tables", "Chairs (e.g. banquet chairs, folding chairs, folding tables)", "Tables (e.g. dining tables, buffet tables, dessert tables)", "Decorative furniture (e.g. lounges)", "Outdoor furniture"]
          },
          {
            title: "Decor",
            key: "decor",
            icon: ImageIcon,
            intro: "Specify the decor options available at your property and surroundings.",
            items: ["Flowers (e.g. fresh flowers, centerpieces, floral arrangements)", "Decorative lighting (e.g. candles, lanterns, led light strings)", "Thematic decor and props", "Signage and branding materials", "Photobooth", "Menu cards and place settings", "Wedding party favors"]
          },
          {
            title: "Logistics and Load-In/Load-Out",
            key: "logistics",
            icon: Upload,
            intro: "Specify the logistics and load-in/load-out services available at your property and surroundings.",
            items: ["Dedicated loading bay", "Cargo lift", "Ramps", "Freight elevator", "Easy entry", "Storage space", "Trash removal"]
          },
          {
            title: "Duration and Flexibility",
            key: "duration",
            icon: Calendar,
            intro: "Specify the event duration and flexibility available at your property and surroundings.",
            items: ["Half Day", "Full Day", "Evenings"]
          },
          {
            title: "Safety and Security",
            key: "safety",
            icon: Check,
            intro: "Specify the safety and security services available at your property and surroundings.",
            items: ["Fire extinguishers", "Security Guard"]
          }
        ].map((section) => (
          <div key={section.key} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden group">
            <div className="p-6 flex items-center justify-between border-b border-white/[0.05] bg-white/[0.01]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] flex items-center justify-center text-blue-400">
                  <section.icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">{section.title}</h3>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
            </div>

            <div className="p-8 space-y-6">
              <p className="text-sm text-slate-400 flex items-center gap-2">
                <Check className="w-4 h-4 text-vp-gold" /> {section.intro}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item) => {
                  const productionList = (formData.production?.[section.key as keyof typeof formData.production] as string[]) || [];
                  const isSelected = productionList.includes(item);
                  return (
                    <div
                      key={item}
                      className="flex items-start space-x-3 group/item cursor-pointer"
                      onClick={() => {
                        const currentItems = [...productionList];
                        const newItems = isSelected
                          ? currentItems.filter(i => i !== item)
                          : [...currentItems, item];

                        setFormData({
                          ...formData,
                          production: {
                            ...formData.production,
                            [section.key]: newItems
                          }
                        });
                      }}
                    >
                      <div className={`mt-1 w-5 h-5 rounded border transition-colors flex items-center justify-center ${isSelected ? "bg-blue-500 border-blue-500" : "border-white/20 group-hover/item:border-blue-500"
                        }`}>
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className={`text-sm transition-colors ${isSelected ? "text-white font-medium" : "text-slate-400 group-hover/item:text-white"
                        }`}>{item}</span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-4 pt-4">
                <Label className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                  Are there any other specific requirements related to {section.title.toLowerCase()} that you would like to mention here?
                </Label>
                <div className="relative">
                  <Textarea
                    placeholder="Enter your requirements..."
                    className="bg-transparent border border-white/[0.1] rounded-xl focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600 min-h-[100px]"
                    value={formData.production?.extraRequirements?.[section.key] || ""}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        production: {
                          ...formData.production,
                          extraRequirements: {
                            ...(formData.production?.extraRequirements || {}),
                            [section.key]: e.target.value
                          }
                        }
                      });
                    }}
                  />
                  <div className="mt-2 text-[10px] text-slate-500 leading-relaxed bg-white/[0.01] p-3 rounded-lg border border-white/[0.05]">
                    <p>Hint: If you have any other specific requirements related to {section.title.toLowerCase()} that are not mentioned above, please let us know.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-8">
        <Button
          variant="outline"
          className="border-white/[0.1] bg-white/[0.02] text-white hover:bg-white/[0.05] h-14 px-12 rounded-xl text-lg"
          onClick={prevStep}
        >
          Previous
        </Button>
        <Button
          className="bg-vp-gold hover:bg-vp-gold/90 text-vp-gold-foreground font-bold h-14 px-12 rounded-xl text-lg shadow-xl shadow-vp-gold/20 flex items-center justify-center gap-2"
          onClick={nextStep}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            "Save and Next"
          )}
        </Button>
      </div>
    </div>
  );

  const addVenueToList = () => {
    if (!currentVenue.title || !currentVenue.type) {
      toast({
        title: "Error",
        description: "Venue title and type are required",
        variant: "destructive",
      });
      return;
    }

    if (editingVenueIndex !== null) {
      // Update existing venue
      const updatedVenues = [...formData.venues];
      updatedVenues[editingVenueIndex] = currentVenue;
      setFormData({
        ...formData,
        venues: updatedVenues
      });
      setEditingVenueIndex(null);
      toast({ title: "Success", description: "Venue updated successfully" });
    } else {
      // Add new venue
      setFormData({
        ...formData,
        venues: [...formData.venues, currentVenue]
      });
      toast({ title: "Success", description: "Venue added to list" });
    }

    // Reset current venue
    setCurrentVenue({
      title: "",
      type: "",
      eventTypes: [] as string[],
      view: "",
      style: "",
      environment: "Indoor",
      layouts: [] as { type: string; capacity: number }[],
      pricing: {
        dayRate: 0,
        eveningRate: 0,
        minimumSpend: 0
      },
      images: [] as any[],
      video: "",
      virtualTour: "",
      floorPlans: [] as any[]
    });
  };

  const cancelVenueEdit = () => {
    setEditingVenueIndex(null);
    setCurrentVenue({
      title: "",
      type: "",
      eventTypes: [] as string[],
      view: "",
      style: "",
      environment: "Indoor",
      layouts: [] as { type: string; capacity: number }[],
      pricing: {
        dayRate: 0,
        eveningRate: 0,
        minimumSpend: 0
      },
      images: [] as any[],
      video: "",
      virtualTour: "",
      floorPlans: [] as any[]
    });
  };

  const renderVenues = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Venue Detail (Capacities)</h2>
        <p className="text-slate-400">You can specify the Detail of your venue from here</p>
      </div>

      <div id="venue-details-form" className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 space-y-8">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <p className="text-sm text-blue-200">
            You have to complete two fields below and after saving them, enable other items. When you complete every form, you should use the save button.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="space-y-2">
            <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Venue Title *</Label>
            <Input
              placeholder="Enter Venue Title"
              className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
              value={currentVenue.title}
              onChange={(e) => setCurrentVenue({ ...currentVenue, title: e.target.value })}
            />
            {!currentVenue.title && <p className="text-[10px] text-rose-500">Venue title is required</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Venue Type *</Label>
            <Select
              value={currentVenue.type}
              onValueChange={(v) => setCurrentVenue({ ...currentVenue, type: v })}
            >
              <SelectTrigger className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus:ring-0 text-white">
                <SelectValue placeholder="Select Venue Type" />
              </SelectTrigger>
              <SelectContent className="bg-[#070c18] border-white/[0.1] text-white">
                <SelectItem value="meeting">Meeting Room</SelectItem>
                <SelectItem value="ballroom">Ballroom</SelectItem>
                <SelectItem value="terrace">Terrace</SelectItem>
                <SelectItem value="garden">Garden</SelectItem>
                <SelectItem value="rooftop">Rooftop</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Event Types</Label>
            <Select onValueChange={(v) => {
              if (!currentVenue.eventTypes.includes(v)) {
                setCurrentVenue({ ...currentVenue, eventTypes: [...currentVenue.eventTypes, v] });
              }
            }}>
              <SelectTrigger className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus:ring-0 text-white">
                <SelectValue placeholder="Select Event Types" />
              </SelectTrigger>
              <SelectContent className="bg-[#070c18] border-white/[0.1] text-white">
                <SelectItem value="wedding">Wedding</SelectItem>
                <SelectItem value="corporate">Corporate</SelectItem>
                <SelectItem value="party">Social Party</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-2 mt-2">
              {currentVenue.eventTypes.map(et => (
                <span key={et} className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full border border-blue-500/30 flex items-center gap-1">
                  {et}
                  <button onClick={() => setCurrentVenue({ ...currentVenue, eventTypes: currentVenue.eventTypes.filter(x => x !== et) })}>×</button>
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Venue View</Label>
            <Select
              value={currentVenue.view}
              onValueChange={(v) => setCurrentVenue({ ...currentVenue, view: v })}
            >
              <SelectTrigger className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus:ring-0 text-white">
                <SelectValue placeholder="Select Venue View" />
              </SelectTrigger>
              <SelectContent className="bg-[#070c18] border-white/[0.1] text-white">
                <SelectItem value="city">City View</SelectItem>
                <SelectItem value="sea">Sea View</SelectItem>
                <SelectItem value="mountain">Mountain View</SelectItem>
                <SelectItem value="garden">Garden View</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Venue Style</Label>
            <Select
              value={currentVenue.style}
              onValueChange={(v) => setCurrentVenue({ ...currentVenue, style: v })}
            >
              <SelectTrigger className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus:ring-0 text-white">
                <SelectValue placeholder="Select Venue Style" />
              </SelectTrigger>
              <SelectContent className="bg-[#070c18] border-white/[0.1] text-white">
                <SelectItem value="modern">Modern</SelectItem>
                <SelectItem value="classic">Classic</SelectItem>
                <SelectItem value="rustic">Rustic</SelectItem>
                <SelectItem value="industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Environment *</Label>
            <div className="flex gap-6 pt-2">
              {["Indoor", "Outdoor", "Both"].map(env => (
                <div
                  key={env}
                  className="flex items-center gap-2 group cursor-pointer"
                  onClick={() => setCurrentVenue({ ...currentVenue, environment: env })}
                >
                  <div className={`w-4 h-4 rounded-full border transition-colors flex items-center justify-center ${currentVenue.environment === env ? "border-vp-gold" : "border-white/20 group-hover:border-vp-gold"
                    }`}>
                    {currentVenue.environment === env && <div className="w-2 h-2 rounded-full bg-vp-gold" />}
                  </div>
                  <span className={`text-sm transition-colors ${currentVenue.environment === env ? "text-white" : "text-slate-400 group-hover:text-white"
                    }`}>{env}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-8 border-t border-white/[0.05]">
          {/* Layouts Section */}
          <div className="bg-white/[0.01] border border-white/[0.05] rounded-xl overflow-hidden p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-white">Layouts and capacities</span>
                <p className="text-[10px] text-slate-500">Add different setup types and their capacities</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Select value={layoutForm.type} onValueChange={(v) => setLayoutForm({ ...layoutForm, type: v })}>
                <SelectTrigger className="bg-transparent border border-white/[0.1] rounded-lg text-white">
                  <SelectValue placeholder="Setup Type" />
                </SelectTrigger>
                <SelectContent className="bg-[#070c18] border-white/[0.1] text-white">
                  <SelectItem value="banquet">Banquet</SelectItem>
                  <SelectItem value="theater">Theater</SelectItem>
                  <SelectItem value="classroom">Classroom</SelectItem>
                  <SelectItem value="u-shape">U-Shape</SelectItem>
                  <SelectItem value="cocktail">Cocktail</SelectItem>
                  <SelectItem value="boardroom">Boardroom</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="Capacity"
                className="bg-transparent border border-white/[0.1] rounded-lg text-white"
                value={layoutForm.capacity}
                onChange={(e) => setLayoutForm({ ...layoutForm, capacity: e.target.value })}
              />
              <Button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold"
                onClick={() => {
                  const type = layoutForm.type;
                  const capacity = parseInt(layoutForm.capacity);

                  if (type && capacity) {
                    setCurrentVenue({
                      ...currentVenue,
                      layouts: [...currentVenue.layouts, { type: type.toLowerCase(), capacity }]
                    });
                    setLayoutForm({ type: "", capacity: "" });
                  }
                }}
              >
                Add Layout
              </Button>
            </div>

            <div className="flex flex-wrap gap-3">
              {currentVenue.layouts.map((l, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.1] rounded-lg px-3 py-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-slate-500 font-bold">{l.type}</span>
                    <span className="text-xs text-white font-bold">{l.capacity} PAX</span>
                  </div>
                  <button
                    className="text-slate-500 hover:text-rose-500"
                    onClick={() => setCurrentVenue({ ...currentVenue, layouts: currentVenue.layouts.filter((_, idx) => idx !== i) })}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Section */}
          <div className="bg-white/[0.01] border border-white/[0.05] rounded-xl overflow-hidden p-6 space-y-6">
            <span className="text-sm font-bold text-white">Pricing</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-bold">Day Rate</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 text-white"
                  value={currentVenue.pricing.dayRate}
                  onChange={(e) => setCurrentVenue({ ...currentVenue, pricing: { ...currentVenue.pricing, dayRate: parseFloat(e.target.value) } })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-bold">Evening Rate</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 text-white"
                  value={currentVenue.pricing.eveningRate}
                  onChange={(e) => setCurrentVenue({ ...currentVenue, pricing: { ...currentVenue.pricing, eveningRate: parseFloat(e.target.value) } })}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] text-slate-500 uppercase font-bold">Minimum Spend</Label>
                <Input
                  type="number"
                  placeholder="0.00"
                  className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 text-white"
                  value={currentVenue.pricing.minimumSpend}
                  onChange={(e) => setCurrentVenue({ ...currentVenue, pricing: { ...currentVenue.pricing, minimumSpend: parseFloat(e.target.value) } })}
                />
              </div>
            </div>
          </div>

          {/* Photo Section */}
          <div className="bg-white/[0.01] border border-white/[0.05] rounded-xl overflow-hidden p-6 space-y-6">
            <span className="text-sm font-bold text-white">Photo <span className="text-rose-500">*</span></span>
            <div
              className="border-2 border-dashed border-white/[0.1] rounded-2xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
              onClick={() => document.getElementById('venue-photos')?.click()}
            >
              <Upload className="w-8 h-8 text-slate-500 mx-auto mb-4" />
              <p className="text-sm text-slate-400">Upload venue photos</p>
              <input
                id="venue-photos"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    const newPhotos = Array.from(e.target.files).map(file => ({
                      file,
                      preview: URL.createObjectURL(file)
                    }));
                    setCurrentVenue({ ...currentVenue, images: [...currentVenue.images, ...newPhotos] });
                  }
                }}
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {currentVenue.images.map((img, i) => (
                <div key={i} className="relative aspect-video rounded-lg overflow-hidden group">
                  <img src={img.preview || img} alt="venue" className="w-full h-full object-cover" />
                  <button
                    className="absolute top-2 right-2 p-1 bg-rose-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => {
                      const newImages = [...currentVenue.images];
                      newImages.splice(i, 1);
                      setCurrentVenue({ ...currentVenue, images: newImages });
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Video Section */}
          <div className="bg-white/[0.01] border border-white/[0.05] rounded-xl overflow-hidden p-6 space-y-6">
            <span className="text-sm font-bold text-white">Video</span>
            <div className="space-y-4">
              <Input
                placeholder="Paste Video URL (YouTube, Vimeo)"
                className="bg-transparent border border-white/[0.1] rounded-lg text-white"
                value={currentVenue.video}
                onChange={(e) => setCurrentVenue({ ...currentVenue, video: e.target.value })}
              />
              <div className="text-center text-slate-600 text-xs">— OR —</div>
              <Button
                variant="outline"
                className="w-full border-white/[0.1] text-white hover:bg-white/[0.05]"
                onClick={() => document.getElementById('venue-video')?.click()}
              >
                Upload Video File
              </Button>
              <input id="venue-video" type="file" className="hidden" />
            </div>
          </div>

          {/* Virtual Tour Section */}
          <div className="bg-white/[0.01] border border-white/[0.05] rounded-xl overflow-hidden p-6 space-y-6">
            <span className="text-sm font-bold text-white">Virtual Tour</span>
            <Input
              placeholder="Paste Virtual Tour Link (Matterport, etc.)"
              className="bg-transparent border border-white/[0.1] rounded-lg text-white"
              value={currentVenue.virtualTour}
              onChange={(e) => setCurrentVenue({ ...currentVenue, virtualTour: e.target.value })}
            />
          </div>

          {/* Floor Plans Section */}
          <div className="bg-white/[0.01] border border-white/[0.05] rounded-xl overflow-hidden p-6 space-y-6">
            <span className="text-sm font-bold text-white">Floor Plans and Additional Material</span>
            <div
              className="border-2 border-dashed border-white/[0.1] rounded-2xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
              onClick={() => document.getElementById('venue-floor-plans')?.click()}
            >
              <Upload className="w-8 h-8 text-slate-500 mx-auto mb-4" />
              <p className="text-sm text-slate-400">Upload floor plans or materials</p>
              <input
                id="venue-floor-plans"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    const newFiles = Array.from(e.target.files).map(file => ({
                      file,
                      preview: URL.createObjectURL(file)
                    }));
                    setCurrentVenue({ ...currentVenue, floorPlans: [...currentVenue.floorPlans, ...newFiles] });
                  }
                }}
              />
            </div>
            <div className="space-y-2">
              {currentVenue.floorPlans.map((fp, i) => (
                <div key={i} className="flex items-center justify-between bg-white/[0.05] p-3 rounded-lg">
                  <span className="text-xs text-slate-300 truncate max-w-[200px]">
                    {fp.file?.name || (typeof fp.file === 'string' ? fp.file.split('/').pop() : 'Floor Plan')}
                  </span>
                  <button
                    className="text-rose-500 hover:text-rose-600"
                    onClick={() => {
                      const newFPs = [...currentVenue.floorPlans];
                      newFPs.splice(i, 1);
                      setCurrentVenue({ ...currentVenue, floorPlans: newFPs });
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <Button
            className={`flex-1 font-bold h-12 rounded-xl ${editingVenueIndex !== null ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-vp-gold text-vp-gold-foreground hover:bg-vp-gold/90"}`}
            onClick={addVenueToList}
          >
            {editingVenueIndex !== null ? "Update Venue" : "+ Add to Venue List"}
          </Button>
          {editingVenueIndex !== null && (
            <Button
              variant="outline"
              className="px-8 border-white/[0.1] text-white hover:bg-white/[0.05] h-12 rounded-xl"
              onClick={cancelVenueEdit}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-6 pt-8">
        <h3 className="text-2xl font-bold text-white">Venue list</h3>
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.05] border-b border-white/[0.05]">
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Title</th>
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</th>
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Environment</th>
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {formData.venues.map((venue, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <span className="text-xs font-bold text-white">{venue.title}</span>
                  </td>
                  <td className="p-4 text-[10px] text-slate-400 capitalize">{venue.type}</td>
                  <td className="p-4 text-[10px] text-slate-400">{venue.environment}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 bg-white/[0.05] text-blue-500/50 hover:text-blue-500 rounded-md"
                        onClick={() => {
                          setCurrentVenue(venue);
                          setEditingVenueIndex(idx);
                          // Scroll to top of venues section
                          const venueSection = document.getElementById('venue-details-form');
                          if (venueSection) {
                            venueSection.scrollIntoView({ behavior: 'smooth' });
                          } else {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                      >
                        <Edit2 className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 bg-white/[0.05] text-rose-500/50 hover:text-rose-500 rounded-md"
                        onClick={() => {
                          const newVenues = [...formData.venues];
                          newVenues.splice(idx, 1);
                          setFormData({ ...formData, venues: newVenues });
                          if (editingVenueIndex === idx) {
                            cancelVenueEdit();
                          } else if (editingVenueIndex !== null && editingVenueIndex > idx) {
                            setEditingVenueIndex(editingVenueIndex - 1);
                          }
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {formData.venues.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500 italic text-xs">No venues added yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Button
          variant="outline"
          className="border-white/[0.1] bg-white/[0.02] text-white hover:bg-white/[0.05] h-14 px-12 rounded-xl text-lg"
          onClick={prevStep}
        >
          Previous
        </Button>
        <Button
          className="bg-vp-gold hover:bg-vp-gold/90 text-vp-gold-foreground font-bold h-14 px-12 rounded-xl text-lg shadow-xl shadow-vp-gold/20 flex items-center justify-center gap-2"
          onClick={nextStep}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            "Save and Next"
          )}
        </Button>
      </div>
    </div>
  );

  const renderAmenities = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Amenities and Facilities</h2>
      </div>

      <div className="space-y-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center group-hover:border-blue-500 transition-colors">
              <Star className="w-3 h-3 text-slate-500" />
            </div>
            <span className="text-sm font-bold text-slate-300">Most popular facilities {formData.popularAmenities.length} / 8</span>
          </div>
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-5 h-5 rounded border border-blue-500 bg-blue-500 flex items-center justify-center">
              <Check className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-300">Normal facilities</span>
          </div>
        </div>

        <div className="p-8 bg-white/[0.02] border border-white/[0.05] rounded-3xl space-y-8">
          <p className="text-xs text-slate-500 italic">
            <span className="text-blue-500">/</span> Based on the below menu please specify your venues additional features and amenities available for use
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
            {[
              "24 Hour Security", "Accessible Parking", "Air Conditioning",
              "Airport Shuttle", "All Inclusive", "ATM/Cash Machine On Site",
              "Barber and Beauty Salon", "Beach Access", "Billiards",
              "Bowling", "Business Center", "Car Rental",
              "CCTV in Common Areas", "CCTV Outside Property", "Children's Playground",
              "Concierge", "Conference Phone", "Currency Exchange",
              "Designated Smoking Area", "DJ Booth", "Electric Vehicle Charging Station",
              "Extended Stay", "Facilities for Physically Challenged Guests", "Family Rooms",
              "Fishing", "Fitness Center", "Flipchart",
              "Games Room", "Garden", "Golf Course",
              "Horse Riding", "Hot tub or Jacuzzi", "Indoor Pool",
              "Internet Access", "Key Access", "Lectern",
              "LED Wall", "Lighting Equipment", "Live Sport Events",
              "Livestream Capabilities", "Meeting Spaces", "Night Club or DJ",
              "Non-Smoking Rooms", "Non-Smoking throughout", "Onsite Gift Shop",
              "On site Parking", "Outdoor Pool", "Piano",
              "Portable Heaters", "Portable Walls", "Private beach area",
              "Public Parking", "Safety Deposit Box", "Skiing facilities",
              "Snack Bar or Mini Bar", "Snorkeling", "Soundproof Rooms",
              "Spa and Wellness Center", "Staging Area", "Steam Room",
              "Sun Terrace", "Table Linens", "Table Tennis",
              "Taxi Access", "Tennis Court", "Terrace",
              "Toilet with Grab Rails", "Tour Desk", "Valet Parking",
              "Video Conferencing", "VIP Services", "Wake-up Service",
              "Water Park", "Water Sports Facilities", "Wheelchair Accessibility",
              "Whiteboard", "Yoga Classes"
            ].map((amenity) => {
              const isPopular = formData.popularAmenities.includes(amenity);
              const isNormal = formData.amenities.includes(amenity);

              const togglePopular = (e: React.MouseEvent) => {
                e.stopPropagation();
                if (isPopular) {
                  setFormData({ ...formData, popularAmenities: formData.popularAmenities.filter(a => a !== amenity) });
                } else {
                  if (formData.popularAmenities.length >= 8) {
                    toast({
                      title: "Limit Reached",
                      description: "You can only select up to 8 popular facilities.",
                      variant: "destructive"
                    });
                    return;
                  }
                  // Remove from normal if exists
                  const newNormal = formData.amenities.filter(a => a !== amenity);
                  setFormData({
                    ...formData,
                    popularAmenities: [...formData.popularAmenities, amenity],
                    amenities: newNormal
                  });
                }
              };

              const toggleNormal = (e: React.MouseEvent) => {
                e.stopPropagation();
                if (isNormal) {
                  setFormData({ ...formData, amenities: formData.amenities.filter(a => a !== amenity) });
                } else {
                  // Remove from popular if exists
                  const newPopular = formData.popularAmenities.filter(a => a !== amenity);
                  setFormData({
                    ...formData,
                    amenities: [...formData.amenities, amenity],
                    popularAmenities: newPopular
                  });
                }
              };

              return (
                <div
                  key={amenity}
                  className="flex items-center gap-3 group"
                >
                  <div
                    onClick={togglePopular}
                    className={`w-5 h-5 rounded border cursor-pointer ${isPopular ? 'border-vp-gold bg-vp-gold/10' : 'border-white/10'} flex items-center justify-center hover:bg-white/[0.05] transition-all`}
                    title="Mark as Most Popular"
                  >
                    <Star className={`w-3 h-3 ${isPopular ? 'text-vp-gold' : 'text-slate-600 group-hover:text-vp-gold'}`} />
                  </div>
                  <div
                    onClick={toggleNormal}
                    className={`w-5 h-5 rounded border cursor-pointer ${isNormal ? 'border-blue-500 bg-blue-500' : 'border-white/20'} flex items-center justify-center transition-colors`}
                    title="Mark as Normal Facility"
                  >
                    {isNormal && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <span className={`text-xs ${(isPopular || isNormal) ? 'text-white font-bold' : 'text-slate-400'} group-hover:text-white transition-colors`}>
                    {amenity}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs text-slate-500 font-bold">
            <span className="text-blue-500">/</span> Are there any other important amenities or facilities in the property, that we should know?
          </p>
          <Textarea
            placeholder="Enter everything about venue facilities"
            className="bg-white/[0.02] border border-white/[0.05] rounded-2xl min-h-[150px] focus:ring-0 focus:border-blue-500 text-white placeholder:text-slate-600 text-sm"
            value={formData.extraAmenities}
            onChange={(e) => setFormData({ ...formData, extraAmenities: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Button
          variant="ghost"
          className="text-slate-500 hover:text-white flex items-center gap-2"
          onClick={prevStep}
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </Button>
        <Button
          className="bg-vp-gold hover:bg-vp-gold/90 text-vp-gold-foreground font-bold h-14 px-24 rounded-xl text-lg shadow-xl shadow-vp-gold/20 flex items-center justify-center gap-2"
          onClick={nextStep}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Saving...
            </>
          ) : (
            "Save and Next"
          )}
        </Button>
      </div>
    </div>
  );

  const renderGuestRooms = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Guest rooms</h2>
        <p className="text-slate-400">Enter the details of the guest rooms available at your property</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Total Number of Rooms</Label>
            <Input placeholder="e.g. 250" className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12" />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Standard Check-in Time</Label>
            <Input type="time" className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12" />
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 space-y-6">
          <h3 className="text-xl font-bold text-white">Room Types & Inventory</h3>
          <div className="space-y-4">
            {[
              { type: "Standard Room", count: 120 },
              { type: "Deluxe Room", count: 80 },
              { type: "Executive Suite", count: 30 },
              { type: "Presidential Suite", count: 20 },
            ].map((room, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white/[0.01] border border-white/[0.05] rounded-xl">
                <div className="flex-1">
                  <span className="text-sm font-bold text-white">{room.type}</span>
                </div>
                <div className="w-32">
                  <Input defaultValue={room.count} className="bg-white/[0.05] border-white/[0.1] text-white text-center h-10" />
                </div>
                <Button variant="ghost" size="icon" className="text-rose-500">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full border-dashed border-white/[0.1] text-slate-400 hover:text-white rounded-xl h-12">
              <Plus className="w-4 h-4 mr-2" /> Add Room Type
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Button
          variant="outline"
          className="border-white/[0.1] bg-white/[0.02] text-white hover:bg-white/[0.05] h-14 px-12 rounded-xl text-lg"
          onClick={prevStep}
        >
          Previous
        </Button>
        <Button
          className="bg-[#d4e21a] hover:bg-[#c0cc18] text-black font-bold h-14 px-12 rounded-xl text-lg shadow-xl shadow-[#d4e21a]/20"
          onClick={nextStep}
        >
          Save and Next
        </Button>
      </div>
    </div>
  );

  const renderSeasonality = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Seasonality / Host rules</h2>
      </div>

      <div className="space-y-12">
        {/* Seasonality Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white">Seasonality</h3>
          <p className="text-sm text-blue-500 italic">Is there a particular season or time of year when it is most popular or has special events?</p>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-1 space-y-8">
              {[
                { label: "High season", key: "highSeason", color: "bg-rose-500" },
                { label: "Shoulder season", key: "shoulderSeason", color: "bg-orange-400" },
                { label: "Low season", key: "lowSeason", color: "bg-lime-400" }
              ].map((season) => (
                <div key={season.label} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${season.color}`} />
                    <span className="text-sm font-bold text-white">{season.label}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(formData.seasonality[season.key as keyof typeof formData.seasonality] as string[]).map((range, idx) => (
                      <div key={idx} className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] border border-white/[0.1] rounded-lg group hover:border-blue-500/50 transition-all">
                        <span className="text-xs text-slate-300 font-medium">{range}</span>
                        <button
                          onClick={() => {
                            const newRanges = [...(formData.seasonality[season.key as keyof typeof formData.seasonality] as string[])];
                            newRanges.splice(idx, 1);
                            setFormData({
                              ...formData,
                              seasonality: { ...formData.seasonality, [season.key]: newRanges }
                            });
                          }}
                          className="text-slate-600 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => setSeasonalityModal({ ...seasonalityModal, isOpen: true })}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg text-blue-400 hover:bg-blue-500/20 transition-all text-xs font-bold"
                    >
                      <Plus className="w-3 h-3" /> Add Range
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full lg:w-80 relative">
              <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-sm font-bold text-white">May 2026</h4>
                  <div className="flex gap-2">
                    <ChevronLeft className="w-4 h-4 text-slate-500" />
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-y-4 text-center">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                    <span key={d} className="text-[10px] text-slate-500 font-bold uppercase">{d}</span>
                  ))}
                  {Array.from({ length: 30 }).map((_, i) => {
                    const day = i + 1;
                    const isSelected = seasonalityModal.selectedDates.includes(day);
                    const min = seasonalityModal.selectedDates.length > 0 ? Math.min(...seasonalityModal.selectedDates) : null;
                    const max = seasonalityModal.selectedDates.length > 1 ? Math.max(...seasonalityModal.selectedDates) : null;
                    const isInRange = min !== null && max !== null && day >= min && day <= max;

                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          const currentDates = seasonalityModal.selectedDates;
                          if (currentDates.length === 0 || currentDates.length === 2) {
                            setSeasonalityModal({ ...seasonalityModal, selectedDates: [day], isOpen: false });
                          } else {
                            const newDates = [currentDates[0], day].sort((a, b) => a - b);
                            setSeasonalityModal({
                              ...seasonalityModal,
                              selectedDates: newDates,
                              isOpen: true
                            });
                          }
                        }}
                        className={`text-xs p-2 rounded-lg transition-all relative ${isSelected ? "bg-blue-500 text-white font-bold z-10" :
                          isInRange ? "bg-blue-500/20 text-white" :
                            day === 18 ? "bg-vp-gold text-vp-gold-foreground font-bold" : "text-slate-400 hover:bg-white/10"
                          }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Updated Seasonality Modal with Time Selection */}
              {seasonalityModal.isOpen && (
                <div className="absolute top-10 -right-20 z-50 w-80 bg-[#070c18] border border-white/10 rounded-2xl p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h4 className="text-sm font-bold text-white mb-1">Which Seasonality</h4>
                      <p className="text-[10px] text-blue-400 font-medium">
                        Range: May {seasonalityModal.selectedDates[0]} - May {seasonalityModal.selectedDates[1]}
                      </p>
                    </div>

                    {/* Time Selection Fields */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label className="text-[10px] text-slate-500 uppercase tracking-wider">Start Time</Label>
                        <Input
                          type="time"
                          className="bg-white/[0.05] border-white/10 text-white h-9 text-xs"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] text-slate-500 uppercase tracking-wider">End Time</Label>
                        <Input
                          type="time"
                          className="bg-white/[0.05] border-white/10 text-white h-9 text-xs"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center gap-2">
                      {[
                        { id: "highSeason", label: "High", color: "bg-rose-500" },
                        { id: "shoulderSeason", label: "Shoulder", color: "bg-orange-400" },
                        { id: "lowSeason", label: "Low", color: "bg-lime-400" }
                      ].map(s => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setSeasonalityModal({ ...seasonalityModal, selectedType: s.id as any })}
                          className={`flex flex-col items-center gap-2 group flex-1`}
                        >
                          <div className={`w-full aspect-square rounded-xl ${s.color} ${seasonalityModal.selectedType === s.id ? 'ring-2 ring-white ring-offset-2 ring-offset-[#070c18] scale-105' : 'opacity-40 group-hover:opacity-80'} transition-all`} />
                          <span className={`text-[9px] font-bold ${seasonalityModal.selectedType === s.id ? 'text-white' : 'text-slate-600'}`}>{s.label}</span>
                        </button>
                      ))}
                    </div>

                    <Button
                      className="w-full bg-vp-gold text-vp-gold-foreground hover:bg-vp-gold/90 font-bold h-12 rounded-xl text-xs uppercase tracking-widest shadow-lg shadow-vp-gold/20"
                      onClick={() => {
                        const rangeStr = `May ${seasonalityModal.selectedDates[0]} - May ${seasonalityModal.selectedDates[1]}`;
                        const currentRanges = formData.seasonality[seasonalityModal.selectedType];
                        setFormData({
                          ...formData,
                          seasonality: {
                            ...formData.seasonality,
                            [seasonalityModal.selectedType]: [...currentRanges, rangeStr]
                          }
                        });
                        setSeasonalityModal({ ...seasonalityModal, isOpen: false, selectedDates: [] });
                      }}
                    >
                      Approved
                    </Button>
                    <button
                      type="button"
                      className="w-full text-[10px] text-slate-500 hover:text-white transition-colors"
                      onClick={() => setSeasonalityModal({ ...seasonalityModal, isOpen: false, selectedDates: [] })}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* General Rules Section */}
          <div className="space-y-10 pt-10 border-t border-white/[0.05]">
            <h3 className="text-2xl font-bold text-white">General rules</h3>

            <div className="space-y-8">
              <div className="space-y-4">
                <Label className="text-sm font-bold text-white">Venue description / rules</Label>
                <Textarea
                  placeholder="We are pleased to assist you with your upcoming event, conference, exhibition, gala, or brand showcase..."
                  className="bg-white/[0.02] border-0 border-b border-white/[0.1] rounded-none px-0 min-h-[100px] focus-visible:ring-0 focus-visible:border-blue-500 text-slate-400 text-xs leading-relaxed"
                  value={formData.hostRules.venueDescription}
                  onChange={(e) => setFormData({ ...formData, hostRules: { ...formData.hostRules, venueDescription: e.target.value } })}
                />
              </div>

              <div className="space-y-4">
                <p className="text-xs text-slate-500 italic">
                  <span className="text-blue-500">/</span> What is the standard check-in / check-out time?
                </p>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Check-in / check-out times</Label>
                  <Textarea
                    placeholder="Standard check-in is at 3:00 PM and check-out is at 12:00 PM..."
                    className="bg-white/[0.02] border-0 border-b border-white/[0.1] rounded-none px-0 min-h-[80px] focus-visible:ring-0 focus-visible:border-blue-500 text-slate-400 text-xs"
                    value={formData.hostRules.checkInOutTimes}
                    onChange={(e) => setFormData({ ...formData, hostRules: { ...formData.hostRules, checkInOutTimes: e.target.value } })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-slate-500 italic">
                  <span className="text-blue-500">/</span> Should your client provide alcoholic beverages list / drinks to your venue?
                </p>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Beverage</Label>
                  <Select
                    value={formData.hostRules.beveragePolicy}
                    onValueChange={(v) => setFormData({ ...formData, hostRules: { ...formData.hostRules, beveragePolicy: v } })}
                  >
                    <SelectTrigger className="bg-white/[0.02] border border-white/[0.1] rounded-xl h-12 text-slate-400">
                      <SelectValue placeholder="Select option" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#070c18] border-white/[0.1] text-white">
                      <SelectItem value="yes">Yes, required</SelectItem>
                      <SelectItem value="no">No, optional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-slate-500 italic">
                  <span className="text-blue-500">/</span> Does your venue have a cancellation policy and FAQ, would you like to provide more details?
                </p>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Cancellation policy</Label>
                  <Textarea
                    placeholder="Cancellations made 48 hours prior to arrival will be free of charge..."
                    className="bg-white/[0.02] border-0 border-b border-white/[0.1] rounded-none px-0 min-h-[100px] focus-visible:ring-0 focus-visible:border-blue-500 text-slate-400 text-xs"
                    value={formData.hostRules.cancellationPolicy}
                    onChange={(e) => setFormData({ ...formData, hostRules: { ...formData.hostRules, cancellationPolicy: e.target.value } })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-slate-500 italic">
                  <span className="text-blue-500">/</span> Does your venue have a security and health / safety guidelines?
                </p>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Health and safety guidelines</Label>
                  <Textarea
                    placeholder="Our venue follows all local health and safety regulations..."
                    className="bg-white/[0.02] border-0 border-b border-white/[0.1] rounded-none px-0 min-h-[100px] focus-visible:ring-0 focus-visible:border-blue-500 text-slate-400 text-xs"
                    value={formData.hostRules.healthSafetyGuidelines}
                    onChange={(e) => setFormData({ ...formData, hostRules: { ...formData.hostRules, healthSafetyGuidelines: e.target.value } })}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-slate-500 italic">
                  <span className="text-blue-500">/</span> Are you collecting any important additional payment?
                </p>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Additional info</Label>
                  <Textarea
                    placeholder="Any additional fees like tourism dirham or service charges..."
                    className="bg-white/[0.02] border-0 border-b border-white/[0.1] rounded-none px-0 min-h-[100px] focus-visible:ring-0 focus-visible:border-blue-500 text-slate-400 text-xs"
                    value={formData.hostRules.additionalInfo}
                    onChange={(e) => setFormData({ ...formData, hostRules: { ...formData.hostRules, additionalInfo: e.target.value } })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-8">
          <Button
            variant="ghost"
            className="text-slate-500 hover:text-white flex items-center gap-2"
            onClick={prevStep}
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          <Button
            className="bg-vp-gold hover:bg-vp-gold/90 text-vp-gold-foreground font-bold h-14 px-24 rounded-xl text-lg shadow-xl shadow-vp-gold/20 flex items-center justify-center gap-2"
            onClick={nextStep}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              "Save and Next"
            )}
          </Button>
        </div>
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Contact Information</h2>
        <p className="text-slate-400">Specify the contacts for bookings and management</p>
      </div>

      <div className="space-y-8">
        {formData.contactInfo.map((contact, i) => (
          <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white">{contact.title}</h3>
                <p className="text-xs text-slate-500">
                  {contact.title === "General Contact" ? "Main Property Phone / Email" :
                    contact.title === "Sales & Events" ? "For booking inquiries" :
                      "Property Manager / Owner"}
                </p>
              </div>
              <div className="text-blue-500">
                <Edit3 className="w-4 h-4" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-400 text-xs">Full Name</Label>
                <Input
                  placeholder="Enter name"
                  className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12"
                  value={contact.name}
                  onChange={(e) => {
                    const newContactInfo = [...formData.contactInfo];
                    newContactInfo[i] = { ...newContactInfo[i], name: e.target.value };
                    setFormData({ ...formData, contactInfo: newContactInfo });
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400 text-xs">Designation</Label>
                <Input
                  placeholder="e.g. Sales Director"
                  className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12"
                  value={contact.designation}
                  onChange={(e) => {
                    const newContactInfo = [...formData.contactInfo];
                    newContactInfo[i] = { ...newContactInfo[i], designation: e.target.value };
                    setFormData({ ...formData, contactInfo: newContactInfo });
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400 text-xs">Email Address</Label>
                <Input
                  placeholder="email@example.com"
                  className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12"
                  value={contact.email}
                  onChange={(e) => {
                    const newContactInfo = [...formData.contactInfo];
                    newContactInfo[i] = { ...newContactInfo[i], email: e.target.value };
                    setFormData({ ...formData, contactInfo: newContactInfo });
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-400 text-xs">Phone Number</Label>
                <Input
                  placeholder="+1 (555) 000-0000"
                  className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12"
                  value={contact.phone}
                  onChange={(e) => {
                    const newContactInfo = [...formData.contactInfo];
                    newContactInfo[i] = { ...newContactInfo[i], phone: e.target.value };
                    setFormData({ ...formData, contactInfo: newContactInfo });
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-8">
        <Button
          variant="outline"
          className="border-white/[0.1] bg-white/[0.02] text-white hover:bg-white/[0.05] h-14 px-12 rounded-xl text-lg"
          onClick={prevStep}
        >
          Previous
        </Button>
        <Button
          className="bg-vp-gold hover:bg-vp-gold/90 text-vp-gold-foreground font-bold h-14 px-12 rounded-xl text-lg shadow-xl shadow-vp-gold/20 flex items-center justify-center gap-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Publishing...
            </>
          ) : (
            "Complete and Publish"
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Steps */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.05] p-8 sticky top-24">
              <div className="mb-10 text-center">
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-white/[0.05]"
                      strokeWidth="6"
                      stroke="currentColor"
                      fill="transparent"
                      r="42"
                      cx="48"
                      cy="48"
                    />
                    <circle
                      className="text-vp-gold transition-all duration-1000"
                      strokeWidth="6"
                      strokeDasharray={264}
                      strokeDashoffset={264 - (264 * (currentStep / (steps.length - 1)))}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="42"
                      cx="48"
                      cy="48"
                    />
                  </svg>
                  <span className="absolute text-2xl font-black text-white">
                    {Math.round((currentStep / (steps.length - 1)) * 100)}%
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Profile Completion</p>
              </div>

              <div className="space-y-1">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isActive = idx === currentStep;
                  const isCompleted = idx < currentStep;

                  return (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(idx)}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${isActive
                        ? "bg-white/[0.05] text-white shadow-xl shadow-black/20"
                        : isCompleted
                          ? "text-blue-400 hover:text-white"
                          : "text-slate-500 hover:text-slate-300"
                        }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${isActive
                        ? "bg-blue-500 text-white"
                        : isCompleted
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-white/[0.05] text-slate-500 group-hover:bg-white/[0.1]"
                        }`}>
                        {isCompleted ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                      </div>
                      <span className="text-sm font-bold truncate">{step.label}</span>
                      {isActive && <ChevronRight className="ml-auto w-4 h-4 animate-pulse" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.05] p-6 lg:p-12 mb-8 relative">
              {dataLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[500px] gap-4">
                  <Loader2 className="w-14 h-14 text-blue-500 animate-spin" />
                  <p className="text-slate-400 font-semibold animate-pulse">Loading property data...</p>
                </div>
              ) : (
                <>
                  {currentStep === 0 && renderOverview()}
                  {currentStep === 1 && renderPhotos()}
                  {currentStep === 2 && renderLocation()}
                  {currentStep === 3 && renderFnB()}
                  {currentStep === 4 && renderProduction()}
                  {currentStep === 5 && renderVenues()}
                  {currentStep === 6 && renderAmenities()}
                  {/* {currentStep === 7 && renderGuestRooms()} */}
                  {currentStep === 7 && renderSeasonality()}
                  {currentStep === 8 && renderContact()}
                </>
              )}
            </div>
          </div>


        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddProperty;
