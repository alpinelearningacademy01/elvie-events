import { Link, NavLink } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

type Variant = "dark" | "light";

const Logo = ({ variant }: { variant: Variant }) => (
  <Link to="/" className="flex items-center gap-2" aria-label="Venue Partner home">
    <div
      className={`flex h-9 w-9 items-center justify-center rounded-md font-display text-lg ${
        variant === "dark" ? "bg-white text-ink" : "bg-ink text-ink-foreground"
      }`}
      style={{ clipPath: "polygon(15% 0, 100% 0, 85% 100%, 0 100%)" }}
    >
      V
    </div>
    <span className={`font-display text-base leading-none tracking-tight ${variant === "dark" ? "text-white" : "text-ink"}`}>
      VENUE
      <br />
      PARTNER
    </span>
  </Link>
);

interface HeaderProps {
  variant?: Variant;
}

const Header = ({ variant = "dark" }: HeaderProps) => {
  const isDark = variant === "dark";
  const linkBase = isDark ? "text-white/90 hover:text-primary" : "text-ink/90 hover:text-ink";

  return (
    <header className={`sticky top-0 z-50 ${isDark ? "bg-ink" : "bg-background border-b border-border"}`}>
      <div className="container-x flex h-20 items-center gap-6">
        <Logo variant={variant} />

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/explore" className={({ isActive }) => `text-sm font-semibold ${linkBase} ${isActive ? "text-primary" : ""}`}>
            Explore venues
          </NavLink>
        </nav>

        <div className={`hidden flex-1 items-center gap-3 rounded-full px-5 py-2.5 lg:flex ${isDark ? "bg-white/10" : "bg-muted"}`}>
          <Search className={`h-4 w-4 ${isDark ? "text-white/70" : "text-muted-foreground"}`} />
          <input
            placeholder="Search venues, locations, event types..."
            className={`w-full bg-transparent text-sm outline-none placeholder:${isDark ? "text-white/60" : "text-muted-foreground"} ${
              isDark ? "text-white" : "text-ink"
            }`}
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Button asChild variant="default" size="sm" className="hidden sm:inline-flex">
            <Link to="/advisor">Ask a venue advisor</Link>
          </Button>
          <Button asChild variant={isDark ? "outlineLight" : "outlineInk"} size="sm">
            <Link to="/sign-in">Sign in / Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
