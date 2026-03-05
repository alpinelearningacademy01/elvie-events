import serviceEventMgmt from "@/assets/service-event-mgmt.jpg";
import serviceCorporate from "@/assets/service-corporate.jpg";
import serviceProduction from "@/assets/service-production.jpg";
import serviceLed from "@/assets/service-led.jpg";
import servicePhoto from "@/assets/service-photo.jpg";
import serviceMerch from "@/assets/service-merch.jpg";
import serviceDigital from "@/assets/service-digital.jpg";
import servicePermit from "@/assets/service-permit.jpg";

const services = [
  {
    title: "Event & Project Management",
    description: "End to end planning, coordination, and execution that ensures every detail is aligned, every timeline is met, and every event runs seamlessly from start to finish.",
    image: serviceEventMgmt,
    imagePosition: "left" as const,
  },
  {
    title: "Corporate & Live Events",
    description: "Complete concept to delivery support, transforming ideas into impactful experiences through thoughtful design, precise planning, and flawless execution.",
    image: serviceCorporate,
    imagePosition: "right" as const,
  },
  {
    title: "Event Production",
    description: "Professional staging, structured show flow, and efficient onsite operations designed to deliver smooth, engaging, and well managed live events.",
    image: serviceProduction,
    imagePosition: "left" as const,
  },
  {
    title: "LED Walls, Lighting & Sound",
    description: "High quality audiovisual solutions including LED displays, professional lighting, and sound systems supported by expert technical production.",
    image: serviceLed,
    imagePosition: "right" as const,
  },
  {
    title: "Photography & Videography",
    description: "Comprehensive event coverage with high quality photos, cinematic videos, highlight edits, and tailored content ready for digital use.",
    image: servicePhoto,
    imagePosition: "left" as const,
  },
  {
    title: "Giveaways & Merchandise",
    description: "End to end sourcing, custom branding, and fulfillment of corporate giveaways and event merchandise that enhance brand presence and recall.",
    image: serviceMerch,
    imagePosition: "right" as const,
  },
  {
    title: "Digital Marketing",
    description: "Strategic campaign planning, content creation, and performance driven support to amplify event visibility and audience engagement.",
    image: serviceDigital,
    imagePosition: "left" as const,
  },
  {
    title: "Permit Processing",
    description: "Complete handling of UAE event approvals and documentation, ensuring full compliance and a smooth, hassle free permit process.",
    image: servicePermit,
    imagePosition: "right" as const,
  },
];

const ElvieServices = () => {
  return (
    <section id="gallery" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-wider uppercase text-center mb-12">
          Experiences We Create
        </h2>

        <div className="space-y-6 max-w-4xl mx-auto">
          {services.map((service) => (
            <div
              key={service.title}
              className="relative overflow-hidden rounded-lg h-48 md:h-52 group"
            >
              {/* Gradient background */}
              <div className="absolute inset-0 elvie-gradient" />
              
              {/* Image */}
              <img
                src={service.image}
                alt={service.title}
                className={`absolute top-0 ${
                  service.imagePosition === "left" ? "left-0" : "right-0"
                } h-full w-1/3 object-cover opacity-80 group-hover:opacity-100 transition-opacity`}
              />

              {/* Content */}
              <div className={`relative z-10 flex flex-col justify-center h-full px-8 ${
                service.imagePosition === "left" ? "ml-[33%] md:ml-[30%]" : "mr-[33%] md:mr-[30%]"
              }`}>
                <h3 className="text-lg md:text-xl font-bold text-primary-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-primary-foreground/80 text-xs md:text-sm leading-relaxed max-w-md">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ElvieServices;
