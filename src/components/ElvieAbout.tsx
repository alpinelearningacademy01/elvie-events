import aboutImg from "@/assets/about-event.jpg";
import { MessageCircle } from "lucide-react";

const ElvieAbout = () => {
  return (
    <section id="about-us" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              Where Every Moment
              <br />
              <span className="text-elvie-navy">BECOMES A SHOWSTOPPER</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed text-sm">
              Elvie Events stands among the UAE's leading event management and production teams, known for delivering seamless, end-to-end experiences across corporate events, exhibitions, weddings, concerts, and fully project-managed activations.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-sm">
              Backed by a strong portfolio of successful events, we blend bold creative direction with cutting-edge technical production and meticulous operational execution.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-sm">
              Every detail is thoughtfully managed to transform ideas into unforgettable experiences that are delivered with precision, aligned with your brand, and executed exactly as envisioned.
            </p>
            <a
              href="https://wa.me/9715029137212"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 bg-elvie-navy text-primary-foreground px-8 py-3 rounded font-semibold text-sm tracking-wider hover:bg-elvie-blue transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              MESSAGE US ON WHATSAPP
            </a>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src={aboutImg}
              alt="Elvie Events luxury gala"
              className="w-full rounded-lg shadow-xl object-cover aspect-[4/5]"
            />
            <div className="absolute bottom-6 right-6 bg-elvie-navy/90 backdrop-blur px-4 py-2 rounded">
              <span className="text-xl font-bold text-primary-foreground tracking-[0.15em]">
                EL<span className="text-elvie-blue-light">V</span>IE
              </span>
              <span className="text-[8px] block tracking-[0.3em] text-primary-foreground/70 uppercase">
                Events
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElvieAbout;
