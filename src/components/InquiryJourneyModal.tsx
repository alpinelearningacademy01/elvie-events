import React, { useState } from 'react';
import { X, Users, Mail, Phone, MessageCircle, Calendar as CalendarIcon, Info, Star, Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Link } from 'react-router-dom';
import { format } from "date-fns";
import { createInquiry } from '@/services/inquiryService';
import { toast } from '@/hooks/use-toast';

export const InquiryJourneyModal = ({ isOpen, onClose, property, initialDate }: { isOpen: boolean, onClose: () => void, property: any, initialDate?: Date }) => {
  const [step, setStep] = useState(1);
  const [selectedVenueIndices, setSelectedVenueIndices] = useState<number[]>([]);
  const [date, setDate] = useState<Date | undefined>(initialDate);
  const [dateFlexible, setDateFlexible] = useState(false);
  const [attendees, setAttendees] = useState("");
  const [eventType, setEventType] = useState("");
  const [budgetCurrency, setBudgetCurrency] = useState("AED");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");
  
  const [infoType, setInfoType] = useState("Company");
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [commMethods, setCommMethods] = useState<string[]>(["Call"]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !property) return null;

  const subVenues = property.venues || [];
  
  // Skip venue selection if no sub-venues
  const hasSubVenues = subVenues.length > 0;
  
  const goToNextStep = () => {
    if (step === 1 && !hasSubVenues) {
       setStep(3); // Skip straight to form or thanks, actually step 1 is form if no subvenues
    } else {
       setStep(prev => prev + 1);
    }
  };

  const handleVenueToggle = (index: number) => {
    setSelectedVenueIndices(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  const handleCommMethodToggle = (method: string) => {
    setCommMethods(prev => 
      prev.includes(method) 
        ? prev.filter(m => m !== method) 
        : [...prev, method]
    );
  };

  const handleSubmit = async () => {
    if (selectedVenueIndices.length === 0 || !date || !attendees || !eventType || !fullName || !email || !phone) {
        toast({
            title: "Missing Fields",
            description: "Please fill in all required fields marked with *",
            variant: "destructive"
        });
        return;
    }

    try {
        setIsSubmitting(true);
        const selectedVenuesData = selectedVenueIndices.map(idx => ({
            id: subVenues[idx]._id || subVenues[idx].id || `venue-${idx}`,
            title: subVenues[idx].venueTitle || subVenues[idx].title
        }));

        const payload = {
            property: property._id || property.id,
            venue: selectedVenuesData[0]?.id, // For backward compatibility
            selectedVenues: selectedVenuesData,
            eventDate: date,
            dateFlexible,
            attendees: parseInt(attendees),
            eventType,
            budget: parseFloat(budget),
            budgetCurrency,
            notes,
            infoType,
            companyName: infoType === 'Company' ? companyName : '',
            fullName,
            email,
            phone,
            commMethods
        };

        const result = await createInquiry(payload);
        if (result.success) {
            setStep(3);
        } else {
            toast({
                title: "Error",
                description: result.message || "Something went wrong",
                variant: "destructive"
            });
        }
    } catch (error) {
        console.error("Submission error:", error);
        toast({
            title: "Error",
            description: "Failed to send inquiry. Please try again.",
            variant: "destructive"
        });
    } finally {
        setIsSubmitting(false);
    }
  };

  const currentStepView = () => {
    // Collect unique event types from all sub-venues
    const dynamicEventTypes = Array.from(new Set(
      subVenues.flatMap((v: any) => v.eventTypes || [])
    )).filter(Boolean);

    const eventOptions = dynamicEventTypes.length > 0 
      ? dynamicEventTypes 
      : ["Corporate", "Wedding", "Party", "Conference", "Meeting", "Exhibition", "Gala Dinner", "Product Launch"];

    // Step 1: Subvenue Selection (Only if subvenues exist)
    if (step === 1 && hasSubVenues) {
      return (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-8">
            <h2 className="text-2xl font-bold mb-1">Select your preferred venues</h2>
            <p className="text-gray-600 mb-8">at {property.propertyName}: <span className="text-red-500 text-xs font-bold ml-2">* Mandatory to select at least 1 venue</span></p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {subVenues.map((v: any, i: number) => {
                const isSelected = selectedVenueIndices.includes(i);
                const displayTitle = v.venueTitle || v.title || `Venue ${i + 1}`;
                
                return (
                  <div key={i} className={`border rounded-xl overflow-hidden bg-white transition-all cursor-pointer ${isSelected ? 'border-[hsl(var(--vp-gold))] ring-1 ring-[hsl(var(--vp-gold))]' : 'border-gray-200'}`} onClick={() => handleVenueToggle(i)}>
                    <div className="flex h-32 md:h-40">
                      <div className="w-2/5 relative">
                        <img src={v.images?.[0]?.url || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80"} className="w-full h-full object-cover" alt={displayTitle} />
                        <div 
                          className={`absolute top-2 left-2 h-8 w-8 rounded-full flex items-center justify-center shadow-md transition-colors ${isSelected ? 'bg-[hsl(var(--vp-gold))] text-vp-gold-foreground' : 'bg-white text-black'}`}
                        >
                          {isSelected ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                        </div>
                      </div>
                      <div className="w-3/5 p-4 flex flex-col justify-center">
                        <div className="text-[10px] uppercase font-bold text-gray-400 mb-1">{v.venueType || "Event Space"}</div>
                        <h4 className="font-bold text-base mb-2 line-clamp-1">{displayTitle}</h4>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-gray-400"/> {v.layouts?.[0]?.capacity || "N/A"} pax</div>
                            <div className="flex items-center gap-1.5"><CalendarIcon className="h-3.5 w-3.5 text-gray-400"/> {v.venueType === 'Indoor' ? 'Indoor' : 'Outdoor'}</div>
                          </div>
                          <div className="text-[10px] text-gray-400 font-medium">Area: {v.area || "N/A"} m²</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-2">
            {/* Steps indicator */}
            <div className="flex-1 flex gap-1 items-center">
              <div className="h-1.5 w-1/3 bg-[hsl(var(--vp-gold))]"></div>
              <div className="h-1.5 w-1/3 bg-gray-200"></div>
              <div className="h-1.5 w-1/3 bg-gray-200"></div>
            </div>
            <Button 
              onClick={() => setStep(2)} 
              disabled={selectedVenueIndices.length === 0}
              className={`bg-vp-surface text-vp-foreground hover:bg-vp-surface/90 px-8 py-6 rounded-none font-bold ${selectedVenueIndices.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Next
            </Button>
          </div>
        </div>
      );
    }
    
    // Step 2 (or 1 if no subvenues): Event Form
    if (step === 2 || (!hasSubVenues && step === 1)) {
      return (
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-8">
            <h2 className="text-2xl font-bold mb-8">Tell Us About Your Event</h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Event type <span className="text-red-500">*</span></label>
                <select 
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--vp-gold))]"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  <option value="">Event type</option>
                  {eventOptions.map((opt: any) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Event date <span className="text-red-500">*</span></label>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="flex items-center justify-between w-full border border-gray-300 rounded-lg p-3 text-sm cursor-pointer hover:bg-gray-50">
                      <span>{date ? format(date, "MMM dd, yyyy") : "Select date"}</span>
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="mb-6 flex items-center gap-2">
              <input type="checkbox" id="flexibleDate" checked={dateFlexible} onChange={(e) => setDateFlexible(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-[hsl(var(--vp-gold))] focus:ring-[hsl(var(--vp-gold))]" />
              <label htmlFor="flexibleDate" className="text-sm text-gray-600">Flexible with Date and Time</label>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Approx. attendees <span className="text-red-500">*</span></label>
                <div className="relative">
                  <input type="number" placeholder="00" value={attendees} onChange={(e) => setAttendees(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--vp-gold))]" />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-500">PAX</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Estimate venue budget <span className="text-red-500">*</span></label>
                <div className="flex">
                  <select value={budgetCurrency} onChange={(e) => setBudgetCurrency(e.target.value)} className="border border-gray-300 rounded-l-lg p-3 text-sm font-bold bg-gray-50 focus:outline-none">
                    <option value="AED">AED</option>
                    <option value="USD">USD</option>
                  </select>
                  <input type="number" placeholder="Your budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full border-y border-r border-gray-300 rounded-r-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--vp-gold))]" />
                </div>
              </div>
            </div>

            <div className="mb-10">
              <label className="block text-sm font-bold text-gray-700 mb-2">Event notes / special requests <span className="text-red-500">*</span></label>
              <textarea 
                rows={4} 
                placeholder="Please specify your event agenda..." 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--vp-gold))] resize-none"
              ></textarea>
            </div>

            <h3 className="text-xl font-bold mb-4">Company/Individual Information</h3>
            <div className="flex border border-gray-300 rounded-lg mb-6 overflow-hidden">
              <div 
                className={`flex-1 py-3 text-center cursor-pointer font-medium text-sm transition-colors ${infoType === 'Company' ? 'bg-[#1a1a1a] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setInfoType('Company')}
              >
                <span className="mr-2 inline-block w-3 h-3 rounded-full border border-current bg-transparent relative top-0.5 before:absolute before:inset-[2px] before:rounded-full before:bg-current opacity-90"></span>
                Company
              </div>
              <div 
                className={`flex-1 py-3 text-center cursor-pointer font-medium text-sm transition-colors ${infoType === 'Individual' ? 'bg-[#1a1a1a] text-white' : 'bg-white text-gray-600 hover:bg-gray-50 border-l border-gray-200'}`}
                onClick={() => setInfoType('Individual')}
              >
                <span className={`mr-2 inline-block w-3 h-3 rounded-full border border-current bg-transparent relative top-0.5 ${infoType === 'Individual' ? 'before:absolute before:inset-[2px] before:rounded-full before:bg-current' : ''} opacity-90`}></span>
                Individual
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {infoType === 'Company' && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Company name <span className="text-red-500">*</span></label>
                  <input type="text" placeholder="Enter your company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--vp-gold))]" />
                </div>
              )}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full name <span className="text-red-500">*</span></label>
                <input type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--vp-gold))]" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Email address <span className="text-red-500">*</span></label>
                <input type="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--vp-gold))]" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Your phone number <span className="text-red-500">*</span></label>
                <div className="flex border border-red-400 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 border-r border-gray-300 px-3 py-3 flex items-center gap-1">
                    <span className="text-lg">🇦🇪</span>
                    <span className="text-xs">▼</span>
                  </div>
                  <input type="tel" placeholder="050 123 4567" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 text-sm focus:outline-none focus:ring-1 focus:ring-[hsl(var(--vp-gold))]" />
                </div>
                <p className="text-xs text-red-500 mt-1">Please enter your phone number</p>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Preferred Communication Method</h3>
            <div className="flex gap-4 mb-6">
              {['Call', 'Email', 'Whatsapp'].map((method) => {
                const isSelected = commMethods.includes(method);
                return (
                  <div 
                    key={method}
                    onClick={() => handleCommMethodToggle(method)}
                    className={`px-6 py-2 rounded-lg cursor-pointer text-sm font-bold flex items-center gap-2 transition-colors ${isSelected ? 'bg-vp-surface text-vp-foreground' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <span className={`inline-block w-3 h-3 rounded-full border border-current bg-transparent relative ${isSelected ? 'before:absolute before:inset-[2px] before:rounded-full before:bg-current' : ''}`}></span>
                    {method}
                  </div>
                );
              })}
            </div>

          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
            <button onClick={() => hasSubVenues ? setStep(1) : onClose()} className="text-sm font-bold underline decoration-2 underline-offset-4">Back</button>
            
            <div className="flex-1 flex gap-1 items-center justify-center mx-8">
              <div className={`h-1.5 w-1/3 bg-[hsl(var(--vp-gold))]`}></div>
              <div className={`h-1.5 w-1/3 bg-[hsl(var(--vp-gold))]`}></div>
              <div className="h-1.5 w-1/3 bg-gray-200"></div>
            </div>

            <div className="flex items-center gap-4">
              <p className="text-xs text-gray-500 text-right max-w-[200px]">VENUE PARTNERS will share your event brief and contact info with venue(s) for direct response.</p>
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="bg-vp-surface text-vp-foreground hover:bg-vp-surface/90 px-8 py-6 rounded-none font-bold"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      );
    }
    
    // Step 3: Thank you
    if (step === 3) {
      return (
        <div className="flex flex-col h-full items-center justify-center p-8 text-center">
          <div className="w-24 h-24 bg-[hsl(var(--vp-gold))]/20 rounded-full flex items-center justify-center mb-6">
            <Check className="h-12 w-12 text-[hsl(var(--vp-gold))]" />
          </div>
          <h2 className="text-3xl font-bold mb-4 uppercase tracking-tighter">Thank You!</h2>
          <p className="text-gray-600 mb-8 max-w-md font-medium">Your inquiry has been successfully sent. The venue team will receive your details and get back to you shortly.</p>
          <Button onClick={onClose} className="bg-[hsl(var(--vp-gold))] text-vp-gold-foreground font-black hover:scale-105 transition-transform px-10 py-7 text-lg rounded-none uppercase">
            Back to venue
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full h-full max-w-7xl max-h-[90vh] bg-white rounded-2xl overflow-hidden flex shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full transition-colors">
          <X className="h-5 w-5" />
        </button>

        {/* Left Sidebar (Dark) */}
        <div className="w-1/3 bg-black text-white p-8 hidden lg:flex flex-col">
          <div className="mb-12">
            {/* Logo placeholder */}
            <Link to="/venue-partners" className="flex items-center gap-2.5 shrink-0 mb-12">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-md font-outfit font-black text-lg text-vp-gold-foreground"
                style={{ background: "hsl(var(--vp-gold))", clipPath: "polygon(15% 0, 100% 0, 85% 100%, 0 100%)" }}
              >
                V
              </div>
              <span className="font-outfit font-bold text-sm leading-none tracking-tight text-white">
                VENUE<br />PARTNERS
              </span>
            </Link>
          </div>

          <h3 className="text-gray-400 font-bold mb-8 flex items-center gap-2">
            <span className="w-4 h-[2px] bg-white inline-block"></span> Your Inquiry Journey
          </h3>

          <div className="bg-[#111] rounded-xl overflow-hidden border border-gray-800">
            <div className="flex p-4 gap-4">
              <img src={property.heroImage || property.images?.[0]?.url || "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80"} alt={property.propertyName} className="w-24 h-16 object-cover rounded-lg" />
              <div>
                <div className="text-[10px] text-gray-400 uppercase flex items-center gap-1">
                  {property.address?.country}, {property.address?.city} | Special Venues <Star className="h-3 w-3 fill-current text-white" />
                </div>
                <h4 className="font-bold text-sm mt-1">{property.propertyName}</h4>
              </div>
            </div>
            
            <div className="p-4 bg-vp-surface-alt/50 m-4 rounded-lg border border-[hsl(var(--vp-gold))]/20 flex gap-3 text-sm text-[hsl(var(--vp-gold))]">
              <Info className="h-5 w-5 shrink-0" />
              <p className="font-medium">Direct to Venue — Inquiry and details shared with venue for a direct reply.</p>
            </div>
          </div>
        </div>

        {/* Right Content Area (Light) */}
        <div className="flex-1 bg-white relative">
          {currentStepView()}
        </div>

      </div>
    </div>
  );
};
