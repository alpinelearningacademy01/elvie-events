import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import logoImg from "@/assets/Logo.webp";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("demo@elvie.com");
  const [password, setPassword] = useState("demo123");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const ok = login(email, password);
      setLoading(false);
      if (ok) {
        toast({ title: "Welcome back!", description: "Login successful." });
        navigate("/dashboard");
      } else {
        toast({
          title: "Invalid credentials",
          description: "Try demo@elvie.com / demo123",
          variant: "destructive",
        });
      }
    }, 600);
  };

  return (
    <div className="min-h-screen elvie-gradient-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* decorative blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-elvie-blue-light/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-elvie-gold/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        <div className="bg-card/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-border p-8">
          <Link to="/" className="flex justify-center mb-6">
            <img src={logoImg} alt="Elvie Events" className="h-16 w-auto" />
          </Link>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-1">Welcome Back</h1>
            <p className="text-sm text-muted-foreground">Sign in to your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-elvie-blue text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-elvie-blue text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full elvie-gradient-dark text-primary-foreground py-3 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-60 border border-elvie-blue-light/30"
            >
              {loading ? (
                "Signing in..."
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Sign In
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 p-3 bg-elvie-gold/10 border border-elvie-gold/30 rounded-lg flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-elvie-gold mt-0.5 flex-shrink-0" />
            <div className="text-xs text-foreground/80">
              <p className="font-semibold mb-1">Demo credentials</p>
              <p className="font-mono text-[11px]">demo@elvie.com / demo123</p>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            <Link to="/" className="hover:text-foreground">← Back to homepage</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
