import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ChevronDown, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { createElvieInquiry } from "@/services/inquiryService";

// Global trigger to open modal from anywhere
let openGlobalEnquiry: () => void = () => { };
export const triggerEnquiry = () => openGlobalEnquiry();

const countries = [
  { code: "+971", iso: "ae", name: "UAE", native: "(الإمارات العربية المتحدة)" },
  { code: "+966", iso: "sa", name: "Saudi Arabia", native: "(المملكة العربية السعودية)" },
  { code: "+974", iso: "qa", name: "Qatar", native: "(قطر)" },
  { code: "+965", iso: "kw", name: "Kuwait", native: "(الكويت)" },
  { code: "+968", iso: "om", name: "Oman", native: "(عمان)" },
  { code: "+973", iso: "bh", name: "Bahrain", native: "(البحرين)" },
  { code: "+91", iso: "in", name: "India", native: "(भारत)" },
  { code: "+92", iso: "pk", name: "Pakistan", native: "(پاکستان)" },
  { code: "+44", iso: "gb", name: "United Kingdom", native: "" },
  { code: "+1", iso: "us", name: "United States", native: "" },
  { code: "+962", iso: "jo", name: "Jordan", native: "(الأردن)" },
  { code: "+961", iso: "lb", name: "Lebanon", native: "(لبنان)" },
  { code: "+20", iso: "eg", name: "Egypt", native: "(مصر)" },
  { code: "+90", iso: "tr", name: "Turkey", native: "(Türkiye)" },
  { code: "+65", iso: "sg", name: "Singapore", native: "" },
];

const StickyEnquiry = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Hide on Venue Partner specific pages
  const isVenuePartnerPage =
    location.pathname.startsWith("/admin");

  useEffect(() => {
    openGlobalEnquiry = () => setIsOpen(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    countryCode: "+971",
    email: "",
    lookingFor: "",
    quantity: "",
    companyName: "",
    details: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await createElvieInquiry({
        formType: "Quick Enquiry",
        name: form.name,
        email: form.email,
        phone: `${form.countryCode} ${form.phone}`.trim(),
        companyName: form.companyName,
        giftType: form.lookingFor,
        quantity: form.quantity,
        message: form.details,
        sourcePage: "Quick enquiry modal",
      });

      if (response.success) {
        toast.success("Thank you! Your inquiry has been received.");
        setForm({
          name: "",
          phone: "",
          countryCode: "+971",
          email: "",
          lookingFor: "",
          quantity: "",
          companyName: "",
          details: ""
        });
        setIsOpen(false);
        setIsDropdownOpen(false);
      } else {
        toast.error(response.message || "Failed to send inquiry. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCountry = countries.find(c => c.code === form.countryCode) || countries[0];

  if (isVenuePartnerPage) return null;

  return (
    <>
      {/* Modal - Website Theme (Navy & Gold) */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent aria-describedby={undefined} className="w-[calc(100%-2rem)] overflow-hidden border-none bg-white p-0 shadow-2xl sm:max-w-[420px]">
          <div className="relative max-h-[calc(100dvh-2rem)] min-w-0 overflow-y-auto overscroll-contain p-4 sm:p-6">
            <DialogHeader className="mb-4">
              <DialogTitle className="border-b border-gray-100 pb-4 pr-9 text-[11px] font-black uppercase tracking-[0.15em] text-elvie-gold">
                Get in touch with us
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                {/* Name */}
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 text-sm outline-none focus:border-elvie-navy focus:ring-1 focus:ring-elvie-gold/20"
                  placeholder="Your Name"
                />

                {/* Phone with Custom Country Dropdown */}
                <div className="flex border border-gray-300 focus-within:border-elvie-navy transition-colors relative">
                  <div
                    ref={dropdownRef}
                    className="flex min-h-11 shrink-0 cursor-pointer items-center gap-2 border-r border-gray-300 bg-gray-50 px-2 transition-colors hover:bg-gray-100 sm:px-3"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="w-5 h-3.5 overflow-hidden shadow-sm flex-shrink-0">
                      <img
                        src={`https://flagcdn.com/w40/${selectedCountry.iso}.png`}
                        alt="Flag"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">{form.countryCode}</span>
                    <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />

                    {/* Dropdown Options */}
                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute inset-x-0 top-full z-[60] mt-1 max-h-[min(300px,40dvh)] overflow-y-auto rounded-sm border border-gray-200 bg-white py-1 shadow-xl"
                        >
                          {countries.map((c) => (
                            <div
                              key={c.code + c.name}
                              className={`flex items-center gap-3 px-4 py-2.5 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors ${form.countryCode === c.code ? 'bg-blue-600 text-white' : 'text-gray-700'
                                }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setForm({ ...form, countryCode: c.code });
                                setIsDropdownOpen(false);
                              }}
                            >
                              <div className="w-6 h-4 overflow-hidden border border-gray-100 flex-shrink-0">
                                <img
                                  src={`https://flagcdn.com/w40/${c.iso}.png`}
                                  alt={c.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex flex-1 items-center justify-between gap-2 overflow-hidden">
                                <span className="text-sm truncate font-medium">
                                  {c.name} {c.native}
                                </span>
                                <span className="text-sm opacity-70 flex-shrink-0">{c.code}</span>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="min-w-0 flex-1 px-3 py-2.5 text-base outline-none sm:text-sm"
                    placeholder="Enter Phone Number"
                  />
                </div>

                {/* Email */}
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 text-sm outline-none focus:border-elvie-navy focus:ring-1 focus:ring-elvie-gold/20"
                  placeholder="Email Id"
                />

                {/* Looking For */}
                <input
                  value={form.lookingFor}
                  onChange={(e) => setForm({ ...form, lookingFor: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 text-sm outline-none focus:border-elvie-navy focus:ring-1 focus:ring-elvie-gold/20"
                  placeholder="I am looking for"
                />

                <div className="grid gap-4 min-[400px]:grid-cols-2">
                  {/* Quantity */}
                  <input
                    type="number"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 text-sm outline-none focus:border-elvie-navy focus:ring-1 focus:ring-elvie-gold/20"
                    placeholder="Quantity"
                  />

                  {/* Company Name */}
                  <input
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 text-sm outline-none focus:border-elvie-navy focus:ring-1 focus:ring-elvie-gold/20"
                    placeholder="Company Name"
                  />
                </div>

                {/* Details Field */}
                <textarea
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 text-sm outline-none focus:border-elvie-navy focus:ring-1 focus:ring-elvie-gold/20 resize-none"
                  placeholder="Additional Details / Requirements"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-elvie-navy text-white font-bold text-sm tracking-widest uppercase hover:bg-elvie-navy-deep transition-all mt-4 disabled:opacity-70 shadow-lg border border-elvie-gold/20"
              >
                {isSubmitting ? "Processing..." : "Enquire Now"}
              </button>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StickyEnquiry;
