import { Facebook, Instagram, MessageCircle } from "lucide-react";

const ElvieFooter = () => {
  return (
    <footer className="elvie-gradient-dark py-12">
      <div className="container mx-auto px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <div className="w-16 h-px bg-primary-foreground/30 mx-auto mb-3" />
            <span className="text-2xl font-bold tracking-[0.2em] text-primary-foreground">
              EL<span className="text-elvie-blue-light">V</span>IE
            </span>
            <p className="text-[10px] tracking-[0.5em] text-primary-foreground/60 uppercase mt-1">
              Events
            </p>
            <div className="w-16 h-px bg-primary-foreground/30 mx-auto mt-3" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Contact info */}
          <div>
            <h3 className="text-lg font-bold text-primary-foreground">Get in touch</h3>
            <p className="text-primary-foreground/70 text-sm mt-1">
              Contact us: +9715029137212
            </p>
            <p className="text-primary-foreground/70 text-sm">
              Email: elvieevents@gmail.com
            </p>
          </div>

          {/* Social + Copyright */}
          <div className="text-center md:text-right">
            <div className="flex items-center gap-3 justify-center md:justify-end mb-3">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="w-5 h-5 text-primary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="w-5 h-5 text-primary-foreground" />
              </a>
              <a href="https://wa.me/9715029137212" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </a>
            </div>
            <p className="text-primary-foreground/50 text-xs">
              Copyright © 2020 All Right Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ElvieFooter;
