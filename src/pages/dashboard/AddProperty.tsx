import { useState } from "react";
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
  Edit3,
  Star,
  ChevronLeft,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

const steps = [
  { id: "overview", label: "Overview", icon: Info },
  { id: "photos", label: "Photo/ Video/ Tour", icon: Camera },
  { id: "location", label: "Location & Accessibility", icon: MapPin },
  { id: "fnb", label: "Food & Beverage / Awards", icon: Coffee },
  { id: "production", label: "Production Detail", icon: Zap },
  { id: "venues", label: "Venue Detail (Capacities)", icon: Users },
  { id: "amenities", label: "Amenities and Facilities", icon: Wifi },
  { id: "guestrooms", label: "Guest rooms", icon: Bed },
  { id: "seasonality", label: "Seasonality / Host Rules", icon: Calendar },
  { id: "contact", label: "Contact information", icon: UserPlus },
];

const AddProperty = () => {
  const [currentStep, setCurrentStep] = useState(0);
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
    heroImage: null as File | null,
    heroImagePreview: "",
    eventType: "regular" as "regular" | "wedding",
    regularImages: [] as { file: File; preview: string }[],
    weddingImages: [] as { file: File; preview: string }[],
  });

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
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
      preview: URL.createObjectURL(file)
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
          <Select onValueChange={(v) => setFormData({ ...formData, propertyType: v })}>
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
          <Select onValueChange={(v) => setFormData({ ...formData, builtYear: v })}>
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
          <Select onValueChange={(v) => setFormData({ ...formData, renovatedYear: v })}>
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
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                formData.measurementSystem === system
                  ? "bg-[#d4e21a] text-black shadow-lg shadow-[#d4e21a]/20"
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
            placeholder="Enter file title" 
            className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12"
          />
          <div className="border-2 border-dashed border-white/[0.1] rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer group">
            <div className="w-12 h-12 rounded-full bg-white/[0.05] flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
              <Upload className="w-6 h-6" />
            </div>
            <p className="text-white font-medium">Browse and upload the file</p>
            <p className="text-xs text-slate-500">Max file size 10MB</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-8">
        <Button 
          className="bg-[#d4e21a] hover:bg-[#c0cc18] text-black font-bold h-14 px-12 rounded-xl text-lg shadow-xl shadow-[#d4e21a]/20"
          onClick={nextStep}
        >
          Save and Next
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
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Photo Description</Label>
              <Input 
                placeholder="Please Add Photo Description" 
                className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="space-y-4">
             <div className="flex bg-white/[0.05] p-1 rounded-xl border border-white/[0.1] w-fit">
              <button
                onClick={() => setFormData({ ...formData, eventType: "regular" })}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  formData.eventType === "regular"
                    ? "bg-blue-500 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Regular Events
              </button>
              <button
                onClick={() => setFormData({ ...formData, eventType: "wedding" })}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  formData.eventType === "wedding"
                    ? "bg-[#d4e21a] text-black shadow-lg"
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
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Video Description</Label>
              <Input 
                placeholder="Enter Video Description" 
                className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Video Link</Label>
              <Input 
                placeholder="Enter Video Link" 
                className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
              />
            </div>
            
            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/[0.05]"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#070c18] px-4 text-slate-500 font-bold">OR</span></div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Video Embedded</Label>
              <Textarea 
                placeholder="Paste Embedded Code" 
                className="bg-transparent border border-white/[0.1] rounded-xl focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600 min-h-[100px]"
              />
            </div>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/[0.05]"></span></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#070c18] px-4 text-slate-500 font-bold">OR</span></div>
            </div>

            <div className="border-2 border-dashed border-white/[0.1] rounded-2xl p-8 flex items-center justify-center gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer group">
              <Upload className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              <p className="text-white font-bold">Select and upload the video</p>
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
                <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Link</Label>
                <Input 
                  placeholder="Enter your link" 
                  className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
                />
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
          className="bg-[#d4e21a] hover:bg-[#c0cc18] text-black font-bold h-14 px-12 rounded-xl text-lg shadow-xl shadow-[#d4e21a]/20"
          onClick={nextStep}
        >
          Save and Next
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
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Street Address *</Label>
              <Input 
                placeholder="Enter Street Address" 
                className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">City *</Label>
              <Input 
                placeholder="Enter City" 
                className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">State / Province</Label>
              <Input 
                placeholder="Enter State" 
                className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Zip / Postal Code</Label>
              <Input 
                placeholder="Enter Zip Code" 
                className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Country *</Label>
            <Select>
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
          className="bg-[#d4e21a] hover:bg-[#c0cc18] text-black font-bold h-14 px-12 rounded-xl text-lg shadow-xl shadow-[#d4e21a]/20"
          onClick={nextStep}
        >
          Save and Next
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
              <div key={option} className="flex items-start space-x-3 group cursor-pointer">
                <div className="mt-1 w-5 h-5 rounded border border-white/20 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                  {/* Mock Checkbox */}
                  {option.includes("In-house Catering & Restaurant") && <Check className="w-3 h-3 text-blue-500" />}
                </div>
                <span className="text-sm text-slate-400 group-hover:text-white transition-colors">{option}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Cuisine type</Label>
              <Select>
                <SelectTrigger className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus:ring-0 text-white">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent className="bg-[#070c18] border-white/[0.1] text-white">
                  <SelectItem value="arabic">Arabic</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                  <SelectItem value="indian">Indian</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Food preference</Label>
              <Select>
                <SelectTrigger className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus:ring-0 text-white">
                  <SelectValue placeholder="Multi-select" />
                </SelectTrigger>
                <SelectContent className="bg-[#070c18] border-white/[0.1] text-white">
                  <SelectItem value="veg">Vegetarian</SelectItem>
                  <SelectItem value="nonveg">Non-Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
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
              defaultValue={`Esports Bar & Grill Zone
Providing a unique setting for smaller events or casual gatherings, featuring a variety of global gaming events on big screens. Ambiente casual sports can be tailored to gamers. The space is great for small wedding party event pre-wedding event breakfast event etc.`}
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
              placeholder="Enter Menu Title" 
              className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600"
            />
          </div>

          <div className="border-2 border-dashed border-white/[0.1] rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer group">
             <Upload className="w-8 h-8 text-slate-500 group-hover:text-white transition-colors" />
             <p className="text-white font-bold">Select or upload the Menu</p>
          </div>

          <div className="flex justify-end">
            <Button className="bg-white/[0.05] text-slate-400 hover:text-white px-8 py-2 rounded-lg font-bold border border-white/[0.1]">
              Add and Save
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Menu1 - Coffee Bre...",
              "Menu2 - Coffee Bre...",
              "Menu3 - Coffee Bre...",
              "Canapes Menu...",
              "Lunch Buffet Menu...",
              "Set Menu...",
              "Dinner Buffet Menu..."
            ].map((menu, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/[0.05] rounded-xl group hover:bg-white/[0.06] transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center text-slate-400 group-hover:text-white">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-sm text-slate-300 font-medium">Uploaded file: {menu}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-rose-500">
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
            >
              <div className="w-16 h-16 rounded-full bg-white/[0.05] flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                <Upload className="w-8 h-8" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-lg">Drag and drop images here</p>
                <p className="text-xs text-slate-500 mt-1">Supported Formats: JPG, JPEG, PNG, WEBP. Max 10MB per photo. Recommended size: 2040x1320</p>
                <Button variant="link" className="text-blue-500 text-xs font-bold mt-2">Browse file</Button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(15)].map((_, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-white/[0.1] group">
                  <img 
                    src={`https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=200&h=200&auto=format&fit=crop`} 
                    alt="Food" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                     <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center shadow-lg">
                        <ImageIcon className="w-3 h-3 text-white" />
                     </div>
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="destructive" size="icon" className="rounded-full w-8 h-8">
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
            icon: Zap, 
            intro: "Specify the AV equipment and services available at your property and surroundings.",
            items: ["High-speed internet / Wi-Fi", "Standard sound system", "PA system with speakers and microphones", "Ambient lighting", "LCD projector and screen", "TV screens / Monitors", "Video conferencing equipment", "Flipcharts", "High-tech audio/visual control room", "Stage-specific lighting equipment"] 
          },
          { 
            title: "Lighting", 
            icon: Zap, 
            intro: "Specify the lighting equipment and services available at your property and surroundings.",
            items: ["Spotlights and accent", "Custom lighting design for unique event setups and themes", "Ambient lighting solutions", "Atmospheric lighting (e.g. up lighting, string lights, color washes)", "Theatrical lighting equipment"] 
          },
          { 
            title: "Staging", 
            icon: Zap, 
            intro: "Specify the staging features and services available at your property and surroundings.",
            items: ["Mobile or modular stages", "Fixed stage or platform", "Backstage area", "Green room", "Stairs/Ramps"] 
          },
          { 
            title: "Furniture", 
            icon: Coffee, 
            intro: "Specify the furniture available at your property and surroundings.",
            items: ["Bar tables / Cocktail tables / High tables", "Chairs (e.g. banquet chairs, folding chairs, folding tables)", "Tables (e.g. dining tables, buffet tables, dessert tables)", "Decorative furniture (e.g. lounges)", "Outdoor furniture"] 
          },
          { 
            title: "Decor", 
            icon: ImageIcon, 
            intro: "Specify the decor options available at your property and surroundings.",
            items: ["Flowers (e.g. fresh flowers, centerpieces, floral arrangements)", "Decorative lighting (e.g. candles, lanterns, led light strings)", "Thematic decor and props", "Signage and branding materials", "Photobooth", "Menu cards and place settings", "Wedding party favors"] 
          },
          { 
            title: "Logistics and Load-In/Load-Out", 
            icon: Upload, 
            intro: "Specify the logistics and load-in/load-out services available at your property and surroundings.",
            items: ["Dedicated loading bay", "Cargo lift", "Ramps", "Freight elevator", "Easy entry", "Storage space", "Trash removal"] 
          },
          { 
            title: "Duration and Flexibility", 
            icon: Calendar, 
            intro: "Specify the event duration and flexibility available at your property and surroundings.",
            items: ["Half Day", "Full Day", "Evenings"] 
          },
          { 
            title: "Safety and Security", 
            icon: Check, 
            intro: "Specify the safety and security services available at your property and surroundings.",
            items: ["Fire extinguishers", "Security Guard"] 
          }
        ].map((section, idx) => (
          <div key={idx} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden group">
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
                <Check className="w-4 h-4 text-[#d4e21a]" /> {section.intro}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item) => (
                  <div key={item} className="flex items-start space-x-3 group/item cursor-pointer">
                    <div className="mt-1 w-5 h-5 rounded border border-white/20 flex items-center justify-center group-hover/item:border-blue-500 transition-colors">
                      {/* Checkbox */}
                    </div>
                    <span className="text-sm text-slate-400 group-hover/item:text-white transition-colors">{item}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4">
                <Label className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                  Are there any other specific requirements related to {section.title.toLowerCase()} that you would like to mention here?
                </Label>
                <div className="relative">
                  <Textarea 
                    placeholder="Enter your requirements..." 
                    className="bg-transparent border border-white/[0.1] rounded-xl focus-visible:ring-0 focus-visible:border-blue-500 text-white placeholder:text-slate-600 min-h-[100px]"
                  />
                  <div className="mt-2 text-[10px] text-slate-500 leading-relaxed bg-white/[0.01] p-3 rounded-lg border border-white/[0.05]">
                    <p>Hint: If you have any other specific requirements related to {section.title.toLowerCase()} that are not mentioned above, please let us know. Our team will do our best to accommodate your needs and help you create the perfect event experience for your clients.</p>
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
          className="bg-[#d4e21a] hover:bg-[#c0cc18] text-black font-bold h-14 px-12 rounded-xl text-lg shadow-xl shadow-[#d4e21a]/20"
          onClick={nextStep}
        >
          Save and Next
        </Button>
      </div>
    </div>
  );

  const renderVenues = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Venue Detail (Capacities)</h2>
        <p className="text-slate-400">You can specify the Detail of your venue from here</p>
      </div>

      <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 space-y-8">
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
              />
              <p className="text-[10px] text-rose-500">Venue title is required (at least 2 characters)</p>
           </div>
           <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Venue Type *</Label>
              <Select>
                <SelectTrigger className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus:ring-0 text-white">
                  <SelectValue placeholder="Select Venue Type" />
                </SelectTrigger>
                <SelectContent className="bg-[#070c18] border-white/[0.1] text-white">
                  <SelectItem value="meeting">Meeting Room</SelectItem>
                  <SelectItem value="ballroom">Ballroom</SelectItem>
                  <SelectItem value="terrace">Terrace</SelectItem>
                </SelectContent>
              </Select>
           </div>
           <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Event Types *</Label>
              <Select>
                <SelectTrigger className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus:ring-0 text-white">
                  <SelectValue placeholder="Select Event Types" />
                </SelectTrigger>
                <SelectContent className="bg-[#070c18] border-white/[0.1] text-white">
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                </SelectContent>
              </Select>
           </div>
           <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Venue View</Label>
              <Select>
                <SelectTrigger className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus:ring-0 text-white">
                  <SelectValue placeholder="Select Venue View" />
                </SelectTrigger>
                <SelectContent className="bg-[#070c18] border-white/[0.1] text-white">
                  <SelectItem value="city">City View</SelectItem>
                  <SelectItem value="sea">Sea View</SelectItem>
                </SelectContent>
              </Select>
           </div>
           <div className="space-y-2">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Venue Style</Label>
              <Select>
                <SelectTrigger className="bg-transparent border-0 border-b border-white/[0.1] rounded-none px-0 focus:ring-0 text-white">
                  <SelectValue placeholder="Select Venue Style" />
                </SelectTrigger>
                <SelectContent className="bg-[#070c18] border-white/[0.1] text-white">
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                </SelectContent>
              </Select>
           </div>
           <div className="space-y-4">
              <Label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Environment *</Label>
              <div className="flex gap-6 pt-2">
                 {["Indoor", "Outdoor", "Both"].map(env => (
                   <div key={env} className="flex items-center gap-2 group cursor-pointer">
                      <div className="w-4 h-4 rounded-full border border-white/20 group-hover:border-[#d4e21a] flex items-center justify-center">
                         {env === "Indoor" && <div className="w-2 h-2 rounded-full bg-[#d4e21a]" />}
                      </div>
                      <span className="text-sm text-slate-400 group-hover:text-white">{env}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button className="bg-[#d4e21a] hover:bg-[#c0cc18] text-black font-bold px-10 py-2 rounded-lg">
            Save
          </Button>
        </div>

        <div className="space-y-4 pt-8">
           {[
             { title: "Layouts and capacities", hint: "Please provide details on each venue's layouts and capacities. Your choice to enter size is based on meters." },
             { title: "Pricing", note: "Pricing is visible to our advisors only not shown to the public." },
             { title: "Photo", required: true },
             { title: "Video" },
             { title: "Virtual Tour" },
             { title: "Floor Plans and Additional Material" }
           ].map((item, i) => (
             <div key={i} className="bg-white/[0.01] border border-white/[0.05] rounded-xl overflow-hidden">
                <button className="w-full p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors group text-left">
                   <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-slate-300 group-hover:text-white">
                        {item.title} {item.required && <span className="text-rose-500">*</span>}
                      </span>
                      {item.hint && <p className="text-[10px] text-slate-500">{item.hint}</p>}
                   </div>
                   <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
                {item.note && (
                   <div className="px-4 pb-4">
                      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex items-center gap-2">
                         <Info className="w-3 h-3 text-amber-500" />
                         <p className="text-[10px] text-amber-200">{item.note}</p>
                      </div>
                   </div>
                )}
             </div>
           ))}
        </div>

        <Button className="w-full bg-white/[0.05] text-slate-400 hover:text-white font-bold h-12 rounded-xl border border-white/[0.1] mt-8">
           + Add to Venue List
        </Button>
      </div>

      <div className="space-y-6 pt-8">
        <h3 className="text-2xl font-bold text-white">Venue list</h3>
        <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.05] border-b border-white/[0.05]">
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Title</th>
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Venue Type</th>
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Environment</th>
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</th>
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Event Types</th>
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Style</th>
                <th className="p-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {[
                { title: "VIP Meeting Room - Pixoul Gaming", type: "Meeting Room", env: "Indoor", price: true, events: 12, style: 1 },
                { title: "Social Gaming Meeting Room", type: "Meeting Room", env: "Indoor", price: true, events: 4, style: 1 },
                { title: "Pixoul Meeting Room 2", type: "Meeting Room", env: "Indoor", price: true, events: 5, style: 2 },
                { title: "Pixoul Meeting Room 1", type: "Meeting Room", env: "Indoor", price: true, events: 8, style: 3 },
              ].map((v, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-lg overflow-hidden bg-white/[0.05] border border-white/[0.1]">
                          <img src={`https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop`} alt="venue" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                       </div>
                       <span className="text-xs font-bold text-white max-w-[150px]">{v.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-[10px] text-slate-400">{v.type}</td>
                  <td className="p-4 text-[10px] text-slate-400">{v.env}</td>
                  <td className="p-4">
                     {v.price ? <Check className="w-3 h-3 text-green-500" /> : <Plus className="w-3 h-3 text-rose-500 rotate-45" />}
                  </td>
                  <td className="p-4 text-[10px] text-white font-bold text-center">{v.events}</td>
                  <td className="p-4 text-[10px] text-white font-bold text-center">{v.style}</td>
                  <td className="p-4 text-right">
                     <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-white/[0.05] text-slate-400 hover:text-white rounded-md">
                           <Edit3 className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 bg-white/[0.05] text-rose-500/50 hover:text-rose-500 rounded-md">
                           <Trash2 className="w-3 h-3" />
                        </Button>
                     </div>
                  </td>
                </tr>
              ))}
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
          className="bg-[#d4e21a] hover:bg-[#c0cc18] text-black font-bold h-14 px-12 rounded-xl text-lg shadow-xl shadow-[#d4e21a]/20"
          onClick={nextStep}
        >
          Save and Next
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
              <span className="text-sm font-bold text-slate-300">Most popular facilities 0 / 8</span>
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
             ].map((amenity) => (
               <div key={amenity} className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-5 h-5 rounded border border-white/10 flex items-center justify-center group-hover:bg-white/[0.05] transition-all">
                     <Star className="w-3 h-3 text-slate-600 group-hover:text-[#d4e21a]" />
                  </div>
                  <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center transition-colors">
                     {/* Checkbox Placeholder */}
                  </div>
                  <span className="text-xs text-slate-400 group-hover:text-white transition-colors">{amenity}</span>
               </div>
             ))}
           </div>
        </div>

        <div className="space-y-4">
           <p className="text-xs text-slate-500 font-bold">
             <span className="text-blue-500">/</span> Are there any other important amenities or facilities in the property, that we should know?
           </p>
           <Textarea 
             placeholder="Enter everything about venue facilities" 
             className="bg-white/[0.02] border border-white/[0.05] rounded-2xl min-h-[150px] focus:ring-0 focus:border-blue-500 text-white placeholder:text-slate-600 text-sm"
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
          className="bg-[#d4e21a] hover:bg-[#c0cc18] text-black font-bold h-14 px-24 rounded-xl text-lg shadow-xl shadow-[#d4e21a]/20"
          onClick={nextStep}
        >
          Save and Next
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
                   { label: "High season", color: "bg-rose-500", ranges: ["Jan 1 - Feb 28", "Oct 1 - Oct 31", "Nov 1 - Nov 30", "Dec 1 - Dec 31", "Mar 1 - Mar 31", "Apr 1 - Apr 30"] },
                   { label: "Shoulder season", color: "bg-orange-400", ranges: ["May 1 - May 31"] },
                   { label: "Low season", color: "bg-lime-400", ranges: ["Jun 1 - Jun 30", "Jul 1 - Jul 31", "Aug 1 - Aug 31"] }
                 ].map((season) => (
                   <div key={season.label} className="space-y-4">
                      <div className="flex items-center gap-3">
                         <div className={`w-4 h-4 rounded ${season.color}`} />
                         <span className="text-sm font-bold text-white">{season.label}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                         {season.ranges.map(range => (
                           <div key={range} className="flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] border border-white/[0.1] rounded-lg group hover:border-blue-500/50 transition-all">
                              <span className="text-xs text-slate-300 font-medium">{range}</span>
                              <Edit3 className="w-3 h-3 text-slate-600 group-hover:text-blue-400" />
                           </div>
                         ))}
                      </div>
                   </div>
                 ))}
              </div>

              <div className="w-full lg:w-80">
                 <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-6">
                       <h4 className="text-sm font-bold text-white">April 2026</h4>
                       <div className="flex gap-2">
                          <ChevronLeft className="w-4 h-4 text-slate-500" />
                          <ChevronRight className="w-4 h-4 text-slate-500" />
                       </div>
                    </div>
                    <div className="grid grid-cols-7 gap-y-4 text-center">
                       {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                         <span key={d} className="text-[10px] text-slate-500 font-bold uppercase">{d}</span>
                       ))}
                       {Array.from({ length: 30 }).map((_, i) => (
                         <span key={i} className={`text-xs p-2 rounded-lg ${i + 1 === 18 ? "bg-[#d4e21a] text-black font-bold" : "text-slate-400"}`}>
                           {i + 1}
                         </span>
                       ))}
                    </div>
                 </div>
              </div>
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
                    />
                 </div>
              </div>

              <div className="space-y-4">
                 <p className="text-xs text-slate-500 italic">
                   <span className="text-blue-500">/</span> Should your client provide alcoholic beverages list / drinks to your venue?
                 </p>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Beverage</Label>
                    <Select>
                      <SelectTrigger className="bg-white/[0.02] border border-white/[0.1] rounded-xl h-12 text-slate-400">
                        <SelectValue placeholder="Select range" />
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
          className="bg-[#d4e21a] hover:bg-[#c0cc18] text-black font-bold h-14 px-24 rounded-xl text-lg shadow-xl shadow-[#d4e21a]/20"
          onClick={nextStep}
        >
          Save and Next
        </Button>
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
        {[
          { title: "General Contact", role: "Main Property Phone / Email" },
          { title: "Sales & Events", role: "For booking inquiries" },
          { title: "Management", role: "Property Manager / Owner" }
        ].map((contact, i) => (
          <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 space-y-6">
            <div className="flex justify-between items-start">
               <div>
                  <h3 className="text-xl font-bold text-white">{contact.title}</h3>
                  <p className="text-xs text-slate-500">{contact.role}</p>
               </div>
               <Button variant="ghost" size="icon" className="text-slate-500 hover:text-white">
                  <Edit3 className="w-4 h-4" />
               </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <Label className="text-slate-400 text-xs">Full Name</Label>
                  <Input placeholder="Enter name" className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12" />
               </div>
               <div className="space-y-2">
                  <Label className="text-slate-400 text-xs">Designation</Label>
                  <Input placeholder="e.g. Sales Director" className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12" />
               </div>
               <div className="space-y-2">
                  <Label className="text-slate-400 text-xs">Email Address</Label>
                  <Input placeholder="email@example.com" className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12" />
               </div>
               <div className="space-y-2">
                  <Label className="text-slate-400 text-xs">Phone Number</Label>
                  <Input placeholder="+1 (555) 000-0000" className="bg-white/[0.05] border-white/[0.1] text-white rounded-xl h-12" />
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
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold h-14 px-12 rounded-xl text-lg shadow-xl shadow-blue-500/20"
          onClick={() => {
            alert("Property created successfully! (Mock)");
            window.location.href = "/dashboard/venue-portfolio";
          }}
        >
          Complete and Publish
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
                      className="text-[#d4e21a] transition-all duration-1000"
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
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
                        isActive 
                          ? "bg-white/[0.05] text-white shadow-xl shadow-black/20" 
                          : isCompleted 
                            ? "text-blue-400 hover:text-white" 
                            : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                        isActive 
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
            <div className="bg-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.05] p-6 lg:p-12 mb-8">
              {currentStep === 0 && renderOverview()}
              {currentStep === 1 && renderPhotos()}
              {currentStep === 2 && renderLocation()}
              {currentStep === 3 && renderFnB()}
              {currentStep === 4 && renderProduction()}
              {currentStep === 5 && renderVenues()}
              {currentStep === 6 && renderAmenities()}
              {currentStep === 7 && renderGuestRooms()}
              {currentStep === 8 && renderSeasonality()}
              {currentStep === 9 && renderContact()}
            </div>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddProperty;
