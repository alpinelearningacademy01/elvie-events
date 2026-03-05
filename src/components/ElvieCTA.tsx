import { Phone } from "lucide-react";

const ElvieCTA = () => {
  return (
    <section className="py-20 elvie-gradient-dark text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground tracking-wider uppercase">
          Plan Your Next Event With Elvie
        </h2>
        <p className="mt-4 text-primary-foreground/70 max-w-lg mx-auto">
          The possibilities are endless with our unparalleled event services
        </p>

        {/* YouTube embed */}
        <div className="mt-10 max-w-2xl mx-auto aspect-video rounded-lg overflow-hidden shadow-2xl">
          <iframe
            src="https://www.youtube.com/embed/5xQXDTD0SeU"
            title="Elvie Events Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>

        <a
          href="tel:+9715029137212"
          className="mt-10 inline-flex items-center gap-2 bg-primary-foreground text-elvie-navy px-10 py-4 rounded font-bold text-sm tracking-wider hover:bg-primary-foreground/90 transition-colors"
        >
          <Phone className="w-5 h-5" />
          CALL NOW!
        </a>
      </div>
    </section>
  );
};

export default ElvieCTA;
