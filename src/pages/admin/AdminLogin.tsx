import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, Shield, AlertCircle } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { VwHeader, VwFooter } from "@/components/VwLayoutComponents";
import heroImage from "@/assets/hero-venue.jpg";
import ScrollToTop from "@/components/ScrollToTop";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate("/admin/dashboard");
    } else {
      setError(result.message || "Invalid credentials");
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
                <Shield className="w-3 h-3" /> Secure Admin Access
             </div>
            <h1 className="text-3xl md:text-4xl font-bold text-vp-foreground mb-2 capitalize">Admin Portal</h1>
            <p className="text-vp-muted text-sm font-medium">Command Center · Elvie</p>
          </div>

          {error && (
            <div className="flex items-center gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-5">
              <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
              <p className="text-red-500 text-sm font-bold">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Address */}
            <div className="space-y-1.5">
               <label className="text-xs font-bold text-vp-foreground uppercase tracking-wider ml-1">Email Address</label>
               <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-vp-muted" />
                  <input
                    type="email"
                    placeholder="admin@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-5 py-3 border border-vp-border rounded-2xl text-[15px] outline-none transition-all placeholder:text-vp-muted bg-vp-background focus:border-vp-gold focus:ring-1 focus:ring-vp-gold/20 text-vp-foreground"
                  />
               </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
               <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-bold text-vp-foreground uppercase tracking-wider">Password</label>
               </div>
               <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-vp-muted" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-12 py-3 border border-vp-border rounded-2xl text-[15px] outline-none transition-all placeholder:text-vp-muted bg-vp-background focus:border-vp-gold focus:ring-1 focus:ring-vp-gold/20 text-vp-foreground"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-vp-muted hover:text-vp-gold transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
               </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl text-vp-gold-foreground font-bold text-lg vw-transition hover:opacity-90 active:scale-[0.98] disabled:opacity-50 shadow-lg mt-4 flex items-center justify-center gap-2"
              style={{ backgroundColor: "hsl(var(--vp-gold))" }}
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-vp-gold-foreground/40 border-t-vp-gold-foreground rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Sign In as Admin
                </>
              )}
            </button>

            <p className="text-center text-xs text-vp-muted mt-6">
              Access is restricted. Only accounts with admin privileges can sign in.
            </p>
          </form>
        </motion.div>
      </main>

      <VwFooter />
      <ScrollToTop />
    </div>
  );
};

export default AdminLogin;
