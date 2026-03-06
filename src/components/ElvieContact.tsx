import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import newsletterBg from "@/assets/newsletter-bg.jpg";

const ElvieContact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="booking" className="py-24 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Newsletter */}
          <motion.div
            className="relative rounded-xl overflow-hidden h-full min-h-[380px] group"
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <img
              src={newsletterBg}
              alt="Event background"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 elvie-overlay" />
            <div className="relative z-10 p-8 flex flex-col justify-center h-full">
              <h3 className="text-2xl font-bold text-primary-foreground">Newsletter</h3>
              <p className="mt-4 text-primary-foreground/80 text-sm leading-relaxed">
                Sign up for the Elvie Events Newsletter to get event inspiration, production tips, exclusive offers, and first access to availability updates for corporate events, exhibitions, concerts, and weddings in the UAE.
              </p>
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-primary-foreground">What you'll receive:</h4>
                <ul className="mt-2 space-y-1 text-primary-foreground/80 text-xs">
                  <li>• Event trends + planning tips</li>
                  <li>• AV/LED, lights & sound updates</li>
                  <li>• Exclusive promos on production packages</li>
                  <li>• New services, recent projects, and availability alerts</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-elvie-blue transition-shadow"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-elvie-blue transition-shadow"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="081234 56789"
                className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-elvie-blue transition-shadow"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Message</label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-border rounded-lg px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-elvie-blue resize-y transition-shadow"
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-elvie-navy text-primary-foreground py-3.5 rounded-lg font-bold text-sm tracking-wider hover:bg-elvie-blue transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ElvieContact;
