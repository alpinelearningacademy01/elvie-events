import { Link } from "react-router-dom";
import { Mail, Phone, Instagram, Linkedin } from "lucide-react";

const Footer = () => (
  <footer className="bg-ink text-ink-foreground">
    <div className="container-x py-16">
      <div className="grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-display text-3xl text-balance md:text-4xl">
            Find your <span className="text-primary">perfect venue</span>.
          </h3>
          <p className="mt-4 max-w-md text-sm text-white/70">
            VenueWise connects organizers with the GCC's largest curated network of venues — fast, transparent, and free to use.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">Platform</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/explore" className="hover:text-primary">Explore venues</Link></li>
            <li><Link to="/advisor" className="hover:text-primary">Ask a venue advisor</Link></li>
            <li><Link to="/sign-up" className="hover:text-primary">Create an account</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> support@venuewise.com</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +971 52 137 7986</li>
          </ul>
          <div className="mt-6 flex gap-3">
            <a href="#" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:bg-primary hover:text-ink hover:border-primary">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="grid h-9 w-9 place-items-center rounded-full border border-white/15 hover:bg-primary hover:text-ink hover:border-primary">
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} VenueWise. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
