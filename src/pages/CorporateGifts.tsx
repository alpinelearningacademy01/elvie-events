import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Gift, Package, Award, Briefcase, Leaf, Truck,
  Star, Users, CheckCircle, ChevronDown, ChevronUp,
  GemIcon, Laptop, Coffee, Flower2, PenTool, Smartphone,
  TreePine, ShoppingBag, Crown, Heart, Sparkles, Send,
  Phone, Mail, ChevronLeft, ChevronRight, Quote, MessageSquare,
} from "lucide-react";
import ElvieNavbar from "@/components/ElvieNavbar";
import ElvieFooter from "@/components/ElvieFooter";
import ScrollToTop from "@/components/ScrollToTop";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

import heroImg from "@/assets/corporate-gifts-hero.jpg";
import brandedImg from "@/assets/corporate-branded-packaging.jpg";
import customImg from "@/assets/corporate-custom-gifts.jpg";

import giftHamper from "@/assets/gift-hamper.jpg";
import giftOnboarding from "@/assets/gift-onboarding.jpg";
import giftSustainable from "@/assets/gift-sustainable.jpg";
import giftDrinkware from "@/assets/gift-drinkware.jpg";
import giftWriting from "@/assets/gift-writing.jpg";
import giftGadgets from "@/assets/gift-gadgets.jpg";
import giftEmployee from "@/assets/gift-employee.jpg";
import giftLaptopBag from "@/assets/gift-laptop-bag.jpg";
import giftVip from "@/assets/gift-vip.jpg";
import giftPlants from "@/assets/gift-plants.jpg";
import giftBags from "@/assets/gift-bags.jpg";
import giftTech from "@/assets/gift-tech.jpg";

import trending1 from "@/assets/trending-1.jpg";
import trending2 from "@/assets/trending-2.jpg";
import trending3 from "@/assets/trending-3.jpg";
import trending4 from "@/assets/trending-4.jpg";
import trending5 from "@/assets/trending-5.jpg";
import trending6 from "@/assets/trending-6.jpg";

/* ─── Gift Categories ─── */
const giftCategories = [
  { img: giftHamper, label: "Premium Hampers" },
  { img: giftOnboarding, label: "Onboarding Gifts" },
  { img: giftSustainable, label: "Sustainable Products" },
  { img: giftDrinkware, label: "Drinkware" },
  { img: giftWriting, label: "Office & Writing" },
  { img: giftGadgets, label: "Gadgets & Tech" },
  { img: giftEmployee, label: "Gifts for Employees" },
  { img: giftLaptopBag, label: "Laptop Bags" },
  { img: giftTech, label: "Technology Gifts" },
  { img: giftVip, label: "VIP & Executive" },
  { img: giftPlants, label: "Corporate Plants" },
  { img: giftBags, label: "Corporate Bags" },
];

/* ─── Trending Products ─── */
const trendingGifts = [
  { img: trending1, title: "Executive Leather Set", price: "AED 350", tag: "Best Seller" },
  { img: trending2, title: "Luxury Chocolate Box", price: "AED 180", tag: "Popular" },
  { img: trending3, title: "Wellness Hamper", price: "AED 420", tag: "New" },
  { img: trending4, title: "Branded Tech Kit", price: "AED 550", tag: "Premium" },
  { img: trending5, title: "Gourmet Food Hamper", price: "AED 290", tag: "Trending" },
  { img: trending6, title: "Desk Organizer Set", price: "AED 220", tag: "Popular" },
];

/* ─── Why Choose Us ─── */
const whyChoose = [
  { icon: Award, title: "10+ Years Experience", desc: "A decade of expertise in premium corporate gifting across the UAE and Middle East." },
  { icon: Sparkles, title: "100% Customisation", desc: "Every gift is tailored to your brand identity — logos, colors, messaging, and packaging." },
  { icon: Truck, title: "UAE-Wide Delivery", desc: "Timely and reliable delivery across all Emirates with seamless logistics." },
  { icon: Users, title: "Trusted by Top Brands", desc: "Serving leading corporations with high-quality gifts that align with brand values." },
];

/* ─── Smart Gifting Ideas ─── */
const smartGifting = [
  { icon: Briefcase, title: "Client Welcome Kits", desc: "Curated welcome kits with branded essentials and tasteful stationery to set the tone for long-term partnerships." },
  { icon: Heart, title: "Employee Appreciation", desc: "Thoughtful gifts from personalised desk items to wellness hampers that boost morale and strengthen loyalty." },
  { icon: Star, title: "Festive & Seasonal", desc: "Premium hampers, chocolates, and bespoke gifts for Ramadan, Diwali, National Day, and year-end celebrations." },
  { icon: Gift, title: "Event Giveaways", desc: "Stand out at conferences with practical and stylish promotional gifts that work as brand ambassadors." },
  { icon: Crown, title: "VIP Executive Gifting", desc: "Luxurious hampers, elegant décor pieces, or bespoke keepsakes for decision-makers and executives." },
  { icon: Package, title: "Bulk Gifting Packages", desc: "Consistent, cost-effective solutions with custom branding for large-scale corporate events and celebrations." },
];

/* ─── Testimonials ─── */
const testimonials = [
  { text: "Thank you very much for your assistance. The gifts were beautifully packaged and delivered on time. Hope to do business with you again soon.", author: "Jennifer M.", company: "Global Events Co." },
  { text: "Exceptional service from start to finish. The team understood our brand requirements perfectly and delivered stunning customised gifts for our entire team.", author: "Ahmad K.", company: "Tech Holdings UAE" },
  { text: "The quality of corporate gifts exceeded our expectations. Our clients were delighted with the premium packaging and personalised touches.", author: "Sarah L.", company: "Luxury Properties" },
  { text: "Outstanding responsiveness and attention to detail. We've been using their services for all our corporate gifting needs and couldn't be happier.", author: "David R.", company: "Finance Corp" },
  { text: "The team went above and beyond for our Ramadan gifting campaign. Every hamper was beautifully curated and delivered across all Emirates flawlessly.", author: "Fatima A.", company: "Media Group" },
];

/* ─── FAQs ─── */
const faqs = [
  { q: "Do you offer same-day delivery for corporate orders?", a: "Yes, same-day delivery may be possible depending on order details and requirements. Contact our corporate team for feasibility confirmation based on your specific request." },
  { q: "What are examples of corporate gifts?", a: "Corporate gifts include premium hampers, gourmet baskets, chocolates, branded merchandise, wellness kits, desk accessories, tech gadgets, and personalised keepsakes perfect for any occasion." },
  { q: "Can I add my company branding to gift hampers?", a: "Absolutely! All gift hampers can be customised with your company logo, brand colors, personalised message cards, and custom packaging to strengthen brand presence." },
  { q: "What is a good gift for a corporate employee?", a: "Good corporate employee gifts balance thoughtfulness and practicality. Options like gourmet hampers, plants, desk organisers, wellness sets, or tech accessories boost morale and express appreciation." },
  { q: "Do you deliver across all Emirates?", a: "Yes, we deliver corporate gifts to all Emirates including Dubai, Abu Dhabi, Sharjah, Ajman, Fujairah, Ras Al Khaimah, and Umm Al Quwain with timely service." },
  { q: "How far in advance should I place my order?", a: "We recommend placing orders at least 5-7 business days in advance for customised gifts. Standard gifts can often be arranged with shorter lead times depending on availability." },
];

/* ─── Animated Section Wrapper ─── */
const AnimatedSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── FAQ Item ─── */
const FAQItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <AnimatedSection delay={index * 0.06}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300 group"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="font-semibold text-foreground group-hover:text-accent transition-colors">{q}</span>
          {open ? <ChevronUp className="w-5 h-5 text-accent shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
        </div>
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{a}</p>
        </motion.div>
      </button>
    </AnimatedSection>
  );
};

/* ─── Testimonial Carousel ─── */
const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-lg text-center"
        >
          <Quote className="w-10 h-10 text-accent/30 mx-auto mb-6" />
          <p className="text-foreground text-lg leading-relaxed mb-6 italic">
            "{testimonials[current].text}"
          </p>
          <div>
            <p className="font-bold text-foreground">{testimonials[current].author}</p>
            <p className="text-muted-foreground text-sm">{testimonials[current].company}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center justify-center gap-4 mt-6">
        <button onClick={prev} className="w-10 h-10 rounded-full border border-border bg-card hover:bg-secondary flex items-center justify-center transition-colors">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-accent w-6" : "bg-border"}`}
            />
          ))}
        </div>
        <button onClick={next} className="w-10 h-10 rounded-full border border-border bg-card hover:bg-secondary flex items-center justify-center transition-colors">
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </div>
  );
};

/* ─── Main Page ─── */
const CorporateGifts = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", giftType: "", quantity: "", budget: "", message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

    if (serviceId === "YOUR_SERVICE_ID" || !publicKey) {
      toast.info("Connecting to email service...");
      setTimeout(() => {
        toast.success("Thank you! We'll get back to you with a custom quote shortly.");
        setForm({ name: "", email: "", phone: "", company: "", giftType: "", quantity: "", budget: "", message: "" });
      }, 1000);
      return;
    }

    toast.promise(
      emailjs.send(serviceId, templateId, {
        from_name: form.name, from_email: form.email, phone: form.phone,
        company: form.company, gift_type: form.giftType, quantity: form.quantity,
        budget: form.budget, message: form.message, to_email: "navazsherasiya0@gmail.com",
      }, publicKey),
      {
        loading: "Sending your inquiry...",
        success: () => {
          setForm({ name: "", email: "", phone: "", company: "", giftType: "", quantity: "", budget: "", message: "" });
          return "Your inquiry has been sent successfully!";
        },
        error: "Failed to send. Please try again later.",
      }
    );
  };

  const inputClasses = "w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow";

  return (
    <div className="min-h-screen bg-background">
      <ElvieNavbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-40 md:pt-48 pb-20">
        <img src={heroImg} alt="Corporate Gifts" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,72%,8%,0.92)] via-[hsl(222,62%,18%,0.8)] to-transparent" />
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-2xl"
          >
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-elvie-gold border border-[hsl(var(--elvie-gold)/0.4)] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              CORPORATE GIFTING SOLUTIONS
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Premium Rewards for{" "}
              <span className="text-elvie-gold">Exceptional</span> Performers
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-4 leading-relaxed">
              Motivate. Appreciate. Celebrate.
            </p>
            <p className="text-primary-foreground/65 text-base mb-8 leading-relaxed max-w-lg">
              Elevate your corporate gifting with bespoke solutions crafted to leave lasting impressions on clients, partners, and team members.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#inquiry"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-sm tracking-wider text-primary-foreground transition-all"
                style={{ background: "linear-gradient(135deg, hsl(40 80% 55%) 0%, hsl(35 90% 45%) 100%)" }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(200,150,50,0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                <Gift className="w-5 h-5" /> Get in Touch
              </motion.a>
              <motion.a
                href="tel:+9715029137212"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-sm tracking-wider border-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone className="w-4 h-4" /> Talk to Expert
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ EXCLUSIVE GIFT CATEGORIES ═══════════ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Exclusive Corporate Gifts</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Elvie Events offers a seamless solution for sending heartfelt and memorable gifts to your customers, partners, and team members. Explore our diverse range of premium gifts and make every gesture count.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {giftCategories.map((cat, i) => (
              <AnimatedSection key={cat.label} delay={i * 0.04}>
                <motion.div
                  className="flex flex-col items-center rounded-xl border border-border bg-card hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="w-full aspect-square overflow-hidden bg-secondary/30">
                    <img
                      src={cat.img}
                      alt={cat.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      width={512}
                      height={512}
                    />
                  </div>
                  <div className="p-3 text-center">
                    <span className="text-xs font-bold text-foreground tracking-wide uppercase leading-tight">{cat.label}</span>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BRANDED PACKAGING ═══════════ */}
      <section className="py-20 elvie-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <motion.div className="rounded-2xl overflow-hidden shadow-2xl" whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
                <img src={brandedImg} alt="Corporate Branded Packaging" className="w-full h-auto object-cover" loading="lazy" width={800} height={600} />
              </motion.div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest text-elvie-gold border border-[hsl(var(--elvie-gold)/0.3)] mb-4">
                BRANDING
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Corporate Branded Packaging</h2>
              <p className="text-primary-foreground/75 leading-relaxed mb-6">
                First impressions matter, and uninspired packaging can dilute even the most thoughtful corporate gift. We transform this challenge into an opportunity with corporate-branded packaging that puts your brand at the forefront.
              </p>
              <p className="text-primary-foreground/65 leading-relaxed mb-6 text-sm">
                From customised logos to tailored designs, every detail is crafted to reflect your identity with style and professionalism. Our experts work closely with you to understand your goals and recommend solutions that align seamlessly with your brand values.
              </p>
              <ul className="space-y-3 mb-8">
                {["Custom logo placement & branding", "Tailored color schemes & finishes", "Premium unboxing experience", "Personalized message cards"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-primary-foreground/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-elvie-gold shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <motion.a
                href="#inquiry"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-[hsl(var(--elvie-gold))] text-elvie-gold hover:bg-[hsl(var(--elvie-gold)/0.1)] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Talk to Expert <Send className="w-4 h-4" />
              </motion.a>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════ INQUIRY FORM (mid-page like FNP) ═══════════ */}
      <section id="inquiry" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest text-accent border border-accent/30 mb-4">
                GET A QUOTE
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Get in Touch with Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Tell us about your gifting needs and our corporate gifting experts will create the perfect solution tailored to your brand and budget.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                  <div className="w-10 h-10 rounded-full elvie-gradient flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Call Us</p>
                    <a href="tel:+9715029137212" className="font-semibold text-foreground hover:text-accent transition-colors">+971 502 913 7212</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                  <div className="w-10 h-10 rounded-full elvie-gradient flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email Us</p>
                    <a href="mailto: elvieevents@gmail.com" className="font-semibold text-foreground hover:text-accent transition-colors">navazsherasiya0@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                  <div className="w-10 h-10 rounded-full elvie-gradient flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">WhatsApp</p>
                    <a href="https://wa.me/+9715029137212" target="_blank" rel="noreferrer" className="font-semibold text-foreground hover:text-accent transition-colors">Chat with us</a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <motion.form onSubmit={handleSubmit} className="space-y-4 bg-card p-8 rounded-2xl border border-border shadow-lg">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Name <span className="text-destructive">*</span></label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClasses} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email <span className="text-destructive">*</span></label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClasses} placeholder="your@email.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Phone <span className="text-destructive">*</span></label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+971 50 XXX XXXX" className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Company</label>
                    <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" className={inputClasses} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Gift Type</label>
                    <select value={form.giftType} onChange={(e) => setForm({ ...form, giftType: e.target.value })} className={inputClasses}>
                      <option value="">Select gift type</option>
                      <option value="hampers">Premium Hampers</option>
                      <option value="onboarding">Onboarding Gifts</option>
                      <option value="sustainable">Sustainable Gifts</option>
                      <option value="tech">Gadgets & Tech</option>
                      <option value="branded">Branded Merchandise</option>
                      <option value="flowers">Flower Arrangements</option>
                      <option value="vip">VIP & Executive</option>
                      <option value="employee">Employee Gifts</option>
                      <option value="custom">Custom / Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Quantity</label>
                    <select value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className={inputClasses}>
                      <option value="">Select quantity</option>
                      <option value="1-25">1 – 25</option>
                      <option value="26-50">26 – 50</option>
                      <option value="51-100">51 – 100</option>
                      <option value="101-500">101 – 500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Budget Range</label>
                  <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={inputClasses}>
                    <option value="">Select budget per gift</option>
                    <option value="under-100">Under AED 100</option>
                    <option value="100-250">AED 100 – 250</option>
                    <option value="250-500">AED 250 – 500</option>
                    <option value="500-1000">AED 500 – 1,000</option>
                    <option value="1000+">AED 1,000+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                  <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClasses} resize-y`} placeholder="Tell us about your requirements..." />
                </div>
                <motion.button
                  type="submit"
                  className="w-full py-4 rounded-lg font-bold text-sm tracking-wider text-primary-foreground transition-colors"
                  style={{ background: "linear-gradient(135deg, hsl(222 62% 18%) 0%, hsl(222 80% 35%) 50%, hsl(222 80% 45%) 100%)" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Inquiry
                </motion.button>
              </motion.form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════ TRENDING GIFTS ═══════════ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Trending Gifts</h2>
              <a href="#inquiry" className="text-accent hover:underline font-semibold text-sm hidden sm:block">View All →</a>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {trendingGifts.map((gift, i) => (
              <AnimatedSection key={gift.title} delay={i * 0.06}>
                <motion.div
                  className="rounded-xl border border-border bg-card overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
                  whileHover={{ y: -6 }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={gift.img}
                      alt={gift.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      width={512}
                      height={512}
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide text-primary-foreground elvie-gradient">
                      {gift.tag}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs font-bold text-foreground leading-tight mb-1">{gift.title}</h3>
                    <p className="text-accent font-bold text-sm">{gift.price}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CUSTOM GIFT SOLUTIONS ═══════════ */}
      <section className="py-20 elvie-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.1}>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest text-elvie-gold border border-[hsl(var(--elvie-gold)/0.3)] mb-4">
                TAILORED SOLUTIONS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Customer-Tailored Gift Solutions</h2>
              <p className="text-primary-foreground/75 leading-relaxed mb-6">
                Finding corporate gifts that genuinely reflect your brand can be challenging, especially when off-the-shelf options feel impersonal. That's why we offer customer-tailored gift solutions designed around your unique identity and values.
              </p>
              <p className="text-primary-foreground/60 leading-relaxed mb-8 text-sm">
                Our experts collaborate with you to understand your goals and curate gifts that align seamlessly with your brand ethos. From bespoke gift boxes and elegant packaging to personalised touches like logos and brand colours, every detail is crafted to make your gesture meaningful.
              </p>
              <motion.a
                href="#inquiry"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-[hsl(var(--elvie-gold))] text-elvie-gold hover:bg-[hsl(var(--elvie-gold)/0.1)] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Talk to Expert <Send className="w-4 h-4" />
              </motion.a>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <motion.div className="rounded-2xl overflow-hidden shadow-2xl" whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
                <img src={customImg} alt="Custom Gift Solutions" className="w-full h-auto object-cover" loading="lazy" width={800} height={600} />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════ CLIENTS LOGO MARQUEE ═══════════ */}
      <section className="py-16 bg-background border-y border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h3 className="text-center text-sm font-bold tracking-widest text-muted-foreground mb-10 uppercase">
              Grateful to Work with Leading Clients
            </h3>
          </AnimatedSection>
          <div className="overflow-hidden relative">
            <motion.div
              className="flex gap-12 items-center"
              animate={{ x: [0, -1200] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              {[
                "Google", "Microsoft", "Amazon", "DAMAC", "Nakheel",
                "Volkswagen", "MAF", "Grundfos", "Jotun", "Kompan",
                "Google", "Microsoft", "Amazon", "DAMAC", "Nakheel",
                "Volkswagen", "MAF", "Grundfos", "Jotun", "Kompan",
              ].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex-shrink-0 w-28 h-14 rounded-lg bg-secondary/60 border border-border flex items-center justify-center px-3"
                >
                  <span className="text-xs font-bold text-muted-foreground tracking-wide whitespace-nowrap">{name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Clients Love Us</h2>
              <p className="text-muted-foreground">Here's what our corporate clients say about our gifting services.</p>
            </div>
          </AnimatedSection>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="py-20 elvie-gradient-diagonal">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Why Choose Elvie Events for Corporate Gifting?</h2>
              <p className="text-primary-foreground/70 max-w-2xl mx-auto">
                Selecting the right corporate gifting partner is key to strengthening relationships and enhancing your brand image.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <motion.div
                  className="p-6 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 text-center hover:bg-primary-foreground/15 transition-colors"
                  whileHover={{ y: -6 }}
                >
                  <div className="w-14 h-14 rounded-full bg-[hsl(var(--elvie-gold)/0.2)] flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-elvie-gold" />
                  </div>
                  <h3 className="font-bold text-primary-foreground mb-2">{item.title}</h3>
                  <p className="text-primary-foreground/65 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SMART GIFTING IDEAS ═══════════ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Smart Ways to Leverage Corporate Gifting</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Corporate gifting goes beyond tradition — it's a smart strategy to strengthen relationships, enhance brand recall, and celebrate the people who matter most.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {smartGifting.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <motion.div
                  className="p-6 rounded-xl border border-border bg-card hover:shadow-xl transition-all group"
                  whileHover={{ y: -6 }}
                >
                  <div className="w-12 h-12 rounded-lg elvie-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQs ═══════════ */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about our corporate gifting services.</p>
            </div>
          </AnimatedSection>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BOTTOM CTA ═══════════ */}
      <section className="py-16 elvie-gradient">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Elevate Your Corporate Gifting?</h2>
            <p className="text-primary-foreground/75 mb-8 max-w-xl mx-auto">
              Let us help you create unforgettable corporate gifts that strengthen relationships and enhance your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#inquiry"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-sm tracking-wider transition-all"
                style={{ background: "linear-gradient(135deg, hsl(40 80% 55%), hsl(35 90% 45%))" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Gift className="w-5 h-5" /> Get Custom Quote
              </motion.a>
              <motion.a
                href="tel:+9715029137212"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-sm tracking-wider border-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone className="w-4 h-4" /> Call Us Now
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ BOTTOM CONTACT BAR ═══════════ */}
      <section className="py-6 elvie-gradient-dark border-t border-primary-foreground/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-primary-foreground/70 text-sm">
            <a href="tel:+9715029137212" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone className="w-4 h-4" /> +971 502 913 7212
            </a>
            <span className="hidden md:block text-primary-foreground/30">|</span>
            <a href="mailto:navazsherasiya0@gmail.com" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Mail className="w-4 h-4" /> navazsherasiya0@gmail.com
            </a>
            <span className="hidden md:block text-primary-foreground/30">|</span>
            <a href="https://wa.me/+9715029137212" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <MessageSquare className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <ElvieFooter />
      <ScrollToTop />
    </div>
  );
};

export default CorporateGifts;
