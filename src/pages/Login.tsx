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
import api from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Forgot password state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState<1 | 2>(1);
  const [forgotEmail, setForgotEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) {
      toast.error("Please enter your email address");
      return;
    }
    setForgotLoading(true);
    try {
      const response = await api.post("/venue-partner/forgot-password", { email: forgotEmail });
      if (response.data.success) {
        toast.success(response.data.message || "Reset code sent to your email!");
        setForgotStep(2);
      } else {
        toast.error(response.data.message || "Failed to send reset code");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to request code. Please check your email and try again.");
    } finally {
      setForgotLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetCode) {
      toast.error("Please enter the 6-digit verification code");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setForgotLoading(true);
    try {
      const response = await api.post("/venue-partner/reset-password", {
        email: forgotEmail,
        code: resetCode,
        password: newPassword
      });
      if (response.data.success) {
        toast.success(response.data.message || "Password reset successful!");
        setShowForgotModal(false);
        setForgotStep(1);
        setForgotEmail("");
        setResetCode("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        toast.error(response.data.message || "Failed to reset password");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to reset password. Please check the code and try again.");
    } finally {
      setForgotLoading(false);
    }
  };

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
                  <button type="button" onClick={() => setShowForgotModal(true)} className="text-xs font-bold text-vp-muted hover:text-vp-gold transition-colors">Forgot?</button>
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
                  <Link to="/signup" className="font-bold transition-colors underline underline-offset-4" style={{ color: "hsl(var(--vp-gold))" }}>
                     Create account
                  </Link>
               </p>
            </div>
          </form>
        </motion.div>
      </main>

      {/* Forgot Password Modal */}
      <Dialog open={showForgotModal} onOpenChange={(open) => {
        if (!open) {
          setShowForgotModal(false);
          setForgotStep(1);
          setResetCode("");
          setNewPassword("");
          setConfirmNewPassword("");
        }
      }}>
        <DialogContent className="max-w-md bg-[#070c18] border border-slate-800 text-white rounded-[32px] p-6 md:p-8">
          <DialogHeader className="text-left">
            <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[hsl(var(--vp-gold))]" />
              Reset Password
            </DialogTitle>
            <DialogDescription className="text-slate-400 text-sm font-medium mt-1.5">
              {forgotStep === 1 
                ? "Enter your registered email address to receive a 6-digit verification code."
                : "Enter the code received in your email and create a strong new password."}
            </DialogDescription>
          </DialogHeader>

          {forgotStep === 1 ? (
            <form onSubmit={handleRequestCode} className="space-y-5 mt-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    placeholder="you@company.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-5 py-3 border border-slate-850 rounded-2xl text-[15px] outline-none transition-all placeholder:text-slate-600 bg-slate-950 focus:border-[hsl(var(--vp-gold))] focus:ring-1 focus:ring-[hsl(var(--vp-gold))]/20 text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={forgotLoading}
                className="w-full bg-[hsl(var(--vp-gold))] text-vp-gold-foreground py-3.5 rounded-2xl font-bold transition-all hover:bg-[hsl(var(--vp-gold))]/90 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-[15px] mt-2 shadow-lg shadow-[hsl(var(--vp-gold))]/10"
              >
                {forgotLoading ? (
                  <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Send Reset Code"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4 mt-4">
              {/* Reset Code */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Verification Code (6-digits)</label>
                <input
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  maxLength={6}
                  required
                  className="w-full px-5 py-3 border border-slate-850 rounded-2xl text-[15px] outline-none transition-all placeholder:text-slate-600 bg-slate-950 focus:border-[hsl(var(--vp-gold))] focus:ring-1 focus:ring-[hsl(var(--vp-gold))]/20 text-white font-mono tracking-[4px] text-center"
                />
              </div>

              {/* New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-5 py-3 border border-slate-850 rounded-2xl text-[15px] outline-none transition-all placeholder:text-slate-600 bg-slate-950 focus:border-[hsl(var(--vp-gold))] focus:ring-1 focus:ring-[hsl(var(--vp-gold))]/20 text-white"
                  />
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Confirm New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-5 py-3 border border-slate-850 rounded-2xl text-[15px] outline-none transition-all placeholder:text-slate-600 bg-slate-950 focus:border-[hsl(var(--vp-gold))] focus:ring-1 focus:ring-[hsl(var(--vp-gold))]/20 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setForgotStep(1)}
                  className="flex-1 py-3.5 border border-slate-800 hover:bg-slate-900 rounded-2xl font-bold transition-all text-[15px]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={forgotLoading}
                  className="flex-[2] bg-[hsl(var(--vp-gold))] text-vp-gold-foreground py-3.5 rounded-2xl font-bold transition-all hover:bg-[hsl(var(--vp-gold))]/90 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-[15px] shadow-lg shadow-[hsl(var(--vp-gold))]/10"
                >
                  {forgotLoading ? (
                    <span className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <VwFooter />
      <ScrollToTop />
    </div>
  );
};

export default Login;
