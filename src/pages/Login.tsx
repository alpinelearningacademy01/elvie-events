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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    
    if (result.success) {
      toast.success("Welcome back!");
      navigate("/dashboard");
    } else {
      toast.error(result.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-vp-background">
      <VwHeader />

      <main className="relative isolate overflow-hidden min-h-[calc(100vh-80px)] flex items-center justify-center py-20 px-4">
        {/* Background Overlay */}
        <div className="absolute inset-0 -z-10">
          <img 
            src={heroImage} 
            alt="Venue background" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0" style={{ background: "var(--vp-hero-overlay)" }} />
          
          {/* Subtle Glows */}
          <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-[100px]" style={{ background: "hsla(var(--vp-gold), 0.15)" }} />
          <div className="absolute bottom-20 -right-20 w-80 h-80 rounded-full blur-[100px]" style={{ background: "hsla(var(--vp-gold), 0.05)" }} />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-[440px] bg-vp-surface rounded-[32px] shadow-2xl overflow-hidden relative z-10 p-6 md:p-10 border border-vp-border -mt-20"
        >
          <div className="text-center mb-8">
             <div 
               className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-3"
               style={{ background: "hsla(var(--vp-gold), 0.1)", color: "hsl(var(--vp-gold))" }}
             >
                <Lock className="w-3 h-3" /> Secure Access
             </div>
            <h1 className="text-3xl md:text-4xl font-bold text-vp-foreground mb-2 capitalize">Welcome Back</h1>
            <p className="text-vp-muted text-sm font-medium">Log in to manage your venues and inquiries</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Address */}
            <div className="space-y-1.5">
               <label className="text-xs font-bold text-vp-foreground uppercase tracking-wider ml-1">Email Address</label>
               <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-vp-muted" />
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-11 pr-5 py-3 border rounded-2xl text-[15px] outline-none transition-all placeholder:text-vp-muted ${
                       errors.email ? "border-red-500 bg-red-50/10" : "border-vp-border bg-vp-background focus:border-vp-gold focus:ring-1 focus:ring-vp-gold/20 text-vp-foreground"
                    }`}
                  />
               </div>
               {errors.email && <p className="text-[11px] text-red-500 font-bold ml-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
               <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-vp-foreground uppercase tracking-wider">Password</label>
                  <button type="button" className="text-xs font-bold text-vp-muted hover:text-vp-gold transition-colors">Forgot?</button>
               </div>
               <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-vp-muted" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-11 pr-12 py-3 border rounded-2xl text-[15px] outline-none transition-all placeholder:text-vp-muted ${
                       errors.password ? "border-red-500 bg-red-50/10" : "border-vp-border bg-vp-background focus:border-vp-gold focus:ring-1 focus:ring-vp-gold/20 text-vp-foreground"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-vp-muted hover:text-vp-gold transition-colors"
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
              className="w-full py-4 rounded-2xl text-vp-gold-foreground font-bold text-lg vw-transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50 shadow-lg"
              style={{ backgroundColor: "hsl(var(--vp-gold))" }}
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
