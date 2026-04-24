import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Eye, 
  EyeOff, 
  Sparkles,
  Lock,
  Mail
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { VwHeader, VwFooter } from "@/components/VwLayoutComponents";
import heroImage from "@/assets/hero-venue.jpg";
import ScrollToTop from "@/components/ScrollToTop";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("demo@elvie.com");
  const [password, setPassword] = useState("demo123");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!email) newErrors.email = "Please enter your email";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format";
    if (!password) newErrors.password = "Please enter password";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setTimeout(() => {
      const ok = login(email, password);
      setLoading(false);
      if (ok) {
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        toast.error("Invalid credentials. Try demo@elvie.com / demo123");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen font-montserrat bg-white">
      <VwHeader />

      <main className="relative isolate overflow-hidden min-h-[calc(100vh-80px)] flex items-center justify-center py-20 px-4">
        {/* Background Overlay with Landing Page Assets */}
        <div className="absolute inset-0 -z-10 bg-elvie-navy-deep">
          <img 
            src={heroImage} 
            alt="Venue background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 vw-gradient-hero" />
          
          {/* Landing Page Glow Effects */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 bg-elvie-gold/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-20 -right-20 w-80 h-80 bg-elvie-gold/10 rounded-full blur-[100px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[440px] bg-white rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.4)] overflow-hidden relative z-10 p-6 md:p-10 border border-blue-50/10 -mt-20"
        >
          <div className="text-center mb-8">
             <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-elvie-gold/10 text-elvie-gold text-[10px] font-bold uppercase tracking-widest mb-3">
                <Lock className="w-3 h-3" /> Secure Access
             </div>
            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-elvie-navy-deep mb-2 capitalize">Welcome Back</h1>
            <p className="text-gray-500 text-sm font-medium">Log in to manage your venues and inquiries</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Address */}
            <div className="space-y-1.5">
               <label className="text-xs font-bold text-elvie-navy-deep uppercase tracking-wider ml-1">Email Address</label>
               <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-11 pr-5 py-3 border rounded-2xl text-[15px] outline-none transition-all placeholder:text-gray-300 ${
                       errors.email ? "border-red-500 bg-red-50/30" : "border-gray-100 bg-gray-50 focus:bg-white focus:border-elvie-gold focus:ring-1 focus:ring-elvie-gold/20"
                    }`}
                  />
               </div>
               {errors.email && <p className="text-[11px] text-red-500 font-bold ml-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
               <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-elvie-navy-deep uppercase tracking-wider">Password</label>
                  <button type="button" className="text-xs font-bold text-elvie-navy-deep/60 hover:text-elvie-gold transition-colors">Forgot?</button>
               </div>
               <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-11 pr-12 py-3 border rounded-2xl text-[15px] outline-none transition-all placeholder:text-gray-300 ${
                       errors.password ? "border-red-500 bg-red-50/30" : "border-gray-100 bg-gray-50 focus:bg-white focus:border-elvie-gold focus:ring-1 focus:ring-elvie-gold/20"
                    }`}
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

            {/* Keep Logged In */}
            <div className="flex items-center gap-2 px-1">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 text-elvie-gold focus:ring-elvie-gold"
              />
              <label htmlFor="remember" className="text-xs text-gray-500 font-medium">
                Keep me logged in
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl text-elvie-navy-deep font-bold text-lg vw-transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50 shadow-lg"
              style={{ backgroundColor: "hsl(var(--elvie-gold))" }}
            >
              {loading ? "Signing in..." : "Access Dashboard"}
            </button>

            {/* Switch to Signup */}
            <div className="text-center pt-2">
               <p className="text-sm text-gray-500">
                  New to Venue Partner?{" "}
                  <Link to="/signup" className="text-elvie-navy-deep font-bold hover:text-elvie-gold transition-colors underline underline-offset-4 decoration-elvie-gold/30">
                     Create account
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

export default Login;
