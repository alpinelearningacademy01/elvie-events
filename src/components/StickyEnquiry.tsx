import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { X } from "lucide-react";

// Global trigger to open modal from anywhere
let openGlobalEnquiry: () => void = () => {};
export const triggerEnquiry = () => openGlobalEnquiry();

const StickyEnquiry = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    openGlobalEnquiry = () => setIsOpen(true);
  }, []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    lookingFor: "",
    quantity: "",
    companyName: ""
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
        email: "",
        lookingFor: "",
        quantity: "",
        companyName: ""
      });
      setIsOpen(false);
    }, 1500);
  };

  return (
    <>
      {/* Sticky Button - Updated to Website Theme (Navy) */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed left-0 top-[40%] -translate-y-1/2 z-50 bg-elvie-navy text-white font-medium py-10 px-2 rounded-r-md shadow-lg border-y border-r border-elvie-gold/30 group transition-all"
        initial={{ x: -10 }}
        animate={{ x: 0 }}
        whileHover={{ x: 5 }}
      >
        <span 
          className="uppercase tracking-[0.2em] whitespace-nowrap block text-[11px] font-bold text-elvie-gold"
          style={{ 
            writingMode: 'vertical-rl', 
            transform: 'rotate(180deg)',
          }}
        >
          ENQUIRE NOW
        </span>
      </motion.button>

      {/* Modal - Website Theme (Navy & Gold) */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[420px] bg-white border-none rounded-none p-0 overflow-hidden shadow-2xl">
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

                {/* Phone simulated with UAE flag */}
                <div className="flex border border-gray-300 focus-within:border-elvie-navy transition-colors">
                  <div className="flex items-center gap-2 px-3 bg-gray-50 border-r border-gray-300 pointer-events-none">
                    <span className="text-lg">🇦🇪</span>
                    <span className="text-sm font-medium">+971</span>
                    <span className="text-[10px] text-gray-400">▼</span>
                  </div>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="flex-1 px-4 py-2.5 text-sm outline-none"
                    placeholder="5x xxx xxxx"
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
