import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  ChevronDown,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { VwHeader, VwFooter } from "@/components/VwLayoutComponents";
import heroImage from "@/assets/hero-venue.jpg";
import ScrollToTop from "@/components/ScrollToTop";

const countries = [
  { code: "+971", iso: "ae", name: "UAE", placeholder: "5X XXX XXXX", length: 9 },
  { code: "+966", iso: "sa", name: "Saudi Arabia", placeholder: "5X XXX XXXX", length: 9 },
  { code: "+974", iso: "qa", name: "Qatar", placeholder: "XXXX XXXX", length: 8 },
  { code: "+965", iso: "kw", name: "Kuwait", placeholder: "XXXX XXXX", length: 8 },
  { code: "+968", iso: "om", name: "Oman", placeholder: "XXXX XXXX", length: 8 },
  { code: "+973", iso: "bh", name: "Bahrain", placeholder: "XXXX XXXX", length: 8 },
  { code: "+91", iso: "in", name: "India", placeholder: "XXXXX XXXXX", length: 10 },
  { code: "+44", iso: "gb", name: "United Kingdom", placeholder: "XXXXX XXXXXX", length: 11 },
  { code: "+1", iso: "us", name: "United States", placeholder: "XXX XXX XXXX", length: 10 },
];

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+971",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName) newErrors.fullName = "Please enter your full name";
    if (!form.email) newErrors.email = "Please enter your email";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email format";
    if (!form.phone) newErrors.phone = "Please enter your phone number";
    if (!form.password) newErrors.password = "Please enter password";
    else if (form.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!form.agreeToTerms) newErrors.agreeToTerms = "You must agree to the Terms & Conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    }, 1500);
  };

  const selectedCountry = countries.find(c => c.code === form.countryCode) || countries[0];

  return (
    <div className="min-h-screen font-montserrat bg-white">
      <VwHeader />

      <main className="relative isolate overflow-hidden min-h-[calc(100vh-80px)] flex items-center justify-center py-20 px-4">
        {/* Background from Landing Page */}
        <div className="absolute inset-0 -z-10 bg-elvie-navy-deep">
          <img
            src={heroImage}
            alt="Venue background"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 vw-gradient-hero" />

          {/* Dynamic Glow Blobs like in Landing Page */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-elvie-gold/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-elvie-gold/10 rounded-full blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[520px] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative z-10 p-6 md:p-10 border border-white/10 -mt-20 px-6 md:px-10"
        >
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-elvie-gold/10 text-elvie-gold text-[10px] font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3 h-3" /> Join the network
            </div>
            <h1 className="text-2xl md:text-3xl font-playfair font-bold text-elvie-navy-deep mb-2 capitalize">Create an account</h1>
            <p className="text-gray-500 text-xs font-medium">Connect with GCC's largest venue sourcing platform</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-elvie-navy-deep uppercase tracking-wider ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  className={`w-full px-4 py-2.5 border rounded-2xl text-[14px] outline-none transition-all placeholder:text-gray-300 ${errors.fullName ? "border-red-500 bg-red-50/30" : "border-gray-100 bg-gray-50 focus:bg-white focus:border-elvie-gold focus:ring-1 focus:ring-elvie-gold/20"
                    }`}
                />
                {errors.fullName && <p className="text-[11px] text-red-500 font-bold ml-1">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-elvie-navy-deep uppercase tracking-wider ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="john@company.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={`w-full px-4 py-2.5 border rounded-2xl text-[14px] outline-none transition-all placeholder:text-gray-300 ${errors.email ? "border-red-500 bg-red-50/30" : "border-gray-100 bg-gray-50 focus:bg-white focus:border-elvie-gold focus:ring-1 focus:ring-elvie-gold/20"
                    }`}
                />
                {errors.email && <p className="text-[11px] text-red-500 font-bold ml-1">{errors.email}</p>}
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-elvie-navy-deep uppercase tracking-wider ml-1">Phone Number</label>
                <div className={`flex border rounded-2xl transition-all ${errors.phone ? "border-red-500 bg-red-50/30" : "border-gray-100 bg-gray-50 focus-within:bg-white focus-within:border-elvie-gold focus-within:ring-1 focus-within:ring-elvie-gold/20"
                  }`}>
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsDropdownOpen(!isDropdownOpen);
                      }}
                      className="flex items-center gap-2 px-4 h-full border-r border-gray-100 hover:bg-gray-100/50 transition-colors rounded-l-2xl"
                    >
                      <img
                        src={`https://flagcdn.com/w20/${selectedCountry.iso}.png`}
                        className="w-5 h-3.5 object-cover rounded-[2px]"
                      />
                      <span className="text-[13px] font-bold text-elvie-navy-deep">{selectedCountry.code}</span>
                      <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute top-full left-0 mt-2 w-[260px] bg-white border border-gray-100 shadow-2xl rounded-2xl py-2 z-50 max-h-[300px] overflow-y-auto"
                        >
                          {countries.map((c) => (
                            <button
                              key={c.code + c.iso}
                              type="button"
                              onClick={() => {
                                setForm({ ...form, countryCode: c.code, phone: "" });
                                setIsDropdownOpen(false);
                              }}
                              className="w-full flex items-center justify-between px-4 py-3 hover:bg-elvie-gold/10 text-left transition-colors group"
                            >
                              <div className="flex items-center gap-3">
                                <img src={`https://flagcdn.com/w20/${c.iso}.png`} className="w-5 h-3.5" alt="" />
                                <span className="text-sm font-medium text-gray-700 group-hover:text-elvie-navy-deep">{c.name}</span>
                              </div>
                              <span className="text-xs font-bold text-gray-400">{c.code}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <input
                    type="tel"
                    placeholder={selectedCountry.placeholder}
                    value={form.phone}
                    maxLength={selectedCountry.length}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= selectedCountry.length) {
                        setForm({ ...form, phone: value });
                      }
                    }}
                    className="flex-1 px-4 py-2.5 text-[14px] outline-none bg-transparent placeholder:text-gray-300"
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-red-500 font-bold ml-1">{errors.phone}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-elvie-navy-deep uppercase tracking-wider ml-1">Password</label>
                <div className={`relative border rounded-2xl transition-all ${errors.password ? "border-red-500 bg-red-50/30" : "border-gray-100 bg-gray-50 focus-within:bg-white focus-within:border-elvie-gold focus-within:ring-1 focus-within:ring-elvie-gold/20"
                  }`}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full px-4 py-2.5 text-[14px] outline-none bg-transparent placeholder:text-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-elvie-navy-deep transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-[11px] text-red-500 font-bold ml-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-elvie-navy-deep uppercase tracking-wider ml-1">Confirm</label>
                <div className={`relative border rounded-2xl transition-all ${errors.confirmPassword ? "border-red-500 bg-red-50/30" : "border-gray-100 bg-gray-50 focus-within:bg-white focus-within:border-elvie-gold focus-within:ring-1 focus-within:ring-elvie-gold/20"
                  }`}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2.5 text-[14px] outline-none bg-transparent placeholder:text-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-elvie-navy-deep transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="text-[11px] text-red-500 font-bold ml-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3 py-2">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  checked={form.agreeToTerms}
                  onChange={(e) => setForm({ ...form, agreeToTerms: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-elvie-gold focus:ring-elvie-gold"
                />
              </div>
              <label htmlFor="terms" className="text-[13px] text-gray-500 font-medium">
                I agree to the <Link to="/terms-and-conditions" className="text-elvie-navy-deep font-bold hover:text-elvie-gold transition-colors">Terms & Conditions</Link> and <Link to="/privacy-policy" className="text-elvie-navy-deep font-bold hover:text-elvie-gold transition-colors">Privacy Policy</Link>
              </label>
            </div>
            {errors.agreeToTerms && <p className="text-[11px] text-red-500 font-bold -mt-4 ml-1">{errors.agreeToTerms}</p>}

            {/* Submit Button - Exact style from VenuePartners explore button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-2xl text-elvie-navy-deep font-bold text-lg vw-transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50 shadow-lg"
              style={{ backgroundColor: "hsl(var(--elvie-gold))" }}
            >
              {isSubmitting ? "Creating account..." : "Complete Sign Up"}
            </button>

            {/* Already have an account? */}
            <div className="text-center pt-4">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link to="/login" className="text-elvie-navy-deep font-bold hover:text-elvie-gold transition-colors underline underline-offset-4 decoration-elvie-gold/30">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </main>

      <VwFooter />
      <ScrollToTop />
    </div>
  );
};

export default SignUp;
