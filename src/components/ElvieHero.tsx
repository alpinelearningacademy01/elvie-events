import heroBg from "@/assets/hero-bg.jpg";

const ElvieHero = () => {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <img
        src={heroBg}
        alt="Dubai skyline"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 elvie-overlay" />
      <div className="relative z-10 text-center animate-fade-in-up">
        <h1 className="text-6xl md:text-8xl font-bold tracking-[0.2em] text-primary-foreground font-montserrat">
          EL<span className="text-elvie-blue-light">V</span>IE
        </h1>
        <p className="text-lg md:text-xl tracking-[0.6em] text-primary-foreground/80 mt-2 uppercase">
          E V E N T S
        </p>
      </div>
    </section>
  );
};

export default ElvieHero;
