import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Link } from "react-router-dom";
import welcomeKit from "@/assets/Onboarding_Gifts1.png";
import gourmetHamper from "@/assets/gift-hampers1.jpeg";
import thermalFlask from "@/assets/Drinkware1.png";
import wirelessCharger from "@/assets/Technology3.jpeg";
import notebookSet from "@/assets/OfficeGifts1.jpeg";
import wellnessSet from "@/assets/gift-hampers3.jpeg";
import "./ElvieGiftingBanner.css";

const gifts = [
  { name: "Welcome Kit – Series A", image: welcomeKit },
  { name: "Executive Gourmet Celebration Hamper", image: gourmetHamper },
  { name: "Premium Thermal Hydration Flask", image: thermalFlask },
  { name: "Branded Wireless Charger", image: wirelessCharger },
  { name: "Executive Notebook & Pen Set", image: notebookSet },
  { name: "Luxury Wellness & Spa Set", image: wellnessSet },
];

const ElvieGiftingBanner = () => {
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <section aria-labelledby="home-gifting-title" className="bg-background px-4 py-8 sm:py-12 lg:py-16">
      <div className="elvie-gradient-dark mx-auto max-w-7xl overflow-hidden rounded-2xl text-white shadow-xl sm:rounded-3xl">
        <div className="flex flex-wrap items-end justify-between gap-5 px-5 pt-7 sm:px-10 sm:pt-10">
          <div>
            <div aria-hidden="true" className="mb-4 h-0.5 w-10 rounded-full bg-elvie-gold" />
            <h2 id="home-gifting-title" className="text-3xl font-bold text-white sm:text-4xl">
              Corporate Gifting
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
              Curated hampers, welcome kits, and branded gifts for your team and clients.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/corporate"
              className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-elvie-navy transition-colors hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              Explore gifting
              <ArrowRight aria-hidden="true" className="size-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-1" />
            </Link>
            {!reducedMotion && (
              <button
                type="button"
                onClick={() => setPaused(value => !value)}
                aria-label={paused ? "Resume gift banner" : "Pause gift banner"}
                className="grid size-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
              </button>
            )}
          </div>
        </div>

        <div
          className="gifting-marquee mx-5 mt-6 pb-7 sm:mx-10 sm:mt-8 sm:pb-10"
          data-paused={paused}
          role="region"
          aria-label="Featured gifts"
          tabIndex={reducedMotion ? 0 : undefined}
        >
          <div className="gifting-marquee-track flex w-max">
            {[false, true].map(duplicate => (
              <ul
                key={String(duplicate)}
                aria-hidden={duplicate || undefined}
                className={`flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4 ${duplicate ? "gifting-marquee-copy" : ""}`}
              >
                {gifts.map(({ name, image }) => (
                  <li key={name} className="flex w-36 shrink-0 flex-col overflow-hidden rounded-xl bg-white text-elvie-navy sm:w-44 lg:w-52">
                    <img
                      src={image}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="aspect-[5/4] w-full bg-white object-contain p-2"
                    />
                    <p className="flex-1 border-t border-slate-100 bg-slate-50 px-3 py-2.5 text-xs font-bold leading-snug sm:text-sm">
                      {name}
                    </p>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElvieGiftingBanner;
