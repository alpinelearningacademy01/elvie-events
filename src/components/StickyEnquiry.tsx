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
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
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
    }, 1500);
  };

  const selectedCountry = countries.find(c => c.code === form.countryCode) || countries[0];

  return (
    <>
      {/* Sticky Button - Updated to Website Theme (Navy) */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-[40%] -translate-y-1/2 z-50 bg-elvie-navy text-white font-medium py-10 px-2 rounded-l-md shadow-lg border-y border-l border-elvie-gold/30 group transition-all"
        initial={{ x: 10 }}
        animate={{ x: 0 }}
        whileHover={{ x: -5 }}
      >
        <span
          className="uppercase tracking-[0.2em] whitespace-nowrap block text-[11px] font-bold text-elvie-gold"
          style={{
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
        >
          Request a Quote
        </span>
      </motion.button>

      {/* Modal - Website Theme (Navy & Gold) */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[420px] bg-white border-none rounded-none p-0 shadow-2xl">
          <div className="p-6 relative">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-[11px] font-black text-elvie-gold uppercase tracking-[0.15em] border-b border-gray-100 pb-4">
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
                    className="flex items-center gap-2 px-3 bg-gray-50 border-r border-gray-300 h-10 min-w-[100px] cursor-pointer hover:bg-gray-100 transition-colors"
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
                          className="absolute top-full left-0 mt-1 w-[300px] bg-white border border-gray-200 shadow-xl z-[60] py-1 max-h-[300px] overflow-y-auto rounded-sm"
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
                    className="flex-1 px-4 py-2.5 text-sm outline-none"
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

                <div className="grid grid-cols-2 gap-4">
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
