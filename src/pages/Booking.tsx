import { useState } from "react";
import { motion } from "framer-motion";
import ElvieNavbar from "@/components/ElvieNavbar";
import ElvieFooter from "@/components/ElvieFooter";
import ScrollToTop from "@/components/ScrollToTop";
import { toast } from "sonner";
import api from "@/lib/api";

const Booking = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    designation: "",
    phone: "",
    email: "",
    eventDate: "",
    guestCount: "",
    eventType: "Corporate Event",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const bookingData = {
        customerFirstName: form.firstName,
        customerLastName: form.lastName,
        customerName: `${form.firstName} ${form.lastName}`.trim(),
        customerEmail: form.email,
        customerPhone: form.phone,
        customerCompany: form.company,
        customerDesignation: form.designation,
        venueId: import.meta.env.VITE_ELVIE_BOOKING_VENUE_ID || "65f000000000000000000000",
        venueName: "Elvie Events General Enquiry",
        eventDate: form.eventDate,
        guestCount: Number(form.guestCount),
        eventType: form.eventType,
        message: form.message,
      };

      const response = await api.post("/bookings", bookingData);

      if (response.data.success) {
        toast.success("Enquiry sent successfully! Our team will contact you soon.");
        setForm({
          firstName: "",
          lastName: "",
          company: "",
          designation: "",
          phone: "",
          email: "",
          eventDate: "",
          guestCount: "",
          eventType: "Corporate Event",
          message: "",
        });
      } else {
        toast.error(response.data.message || "Failed to send enquiry. Please try again.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses =
    "w-full border rounded-lg px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="min-h-screen bg-background">
      <ElvieNavbar />

      <div className="elvie-gradient-diagonal h-28" />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-3xl font-bold mb-10 text-center">
            Send us your enquiry
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Grid Layout */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* LEFT SIDE */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                  className={inputClasses}
                  required
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                  className={inputClasses}
                />

                <input
                  type="text"
                  placeholder="Company"
                  value={form.company}
                  onChange={(e) =>
                    setForm({ ...form, company: e.target.value })
                  }
                  className={inputClasses}
                />

                <input
                  type="text"
                  placeholder="Designation"
                  value={form.designation}
                  onChange={(e) =>
                    setForm({ ...form, designation: e.target.value })
                  }
                  className={inputClasses}
                />

                <input
                  type="tel"
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                  className={inputClasses}
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  className={inputClasses}
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider ml-1">Event Date</label>
                    <input
                      type="date"
                      value={form.eventDate}
                      onChange={(e) =>
                        setForm({ ...form, eventDate: e.target.value })
                      }
                      className={inputClasses}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider ml-1">Guest Count</label>
                    <input
                      type="number"
                      placeholder="e.g. 150"
                      value={form.guestCount}
                      onChange={(e) =>
                        setForm({ ...form, guestCount: e.target.value })
                      }
                      className={inputClasses}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider ml-1">Event Type</label>
                  <select
                    value={form.eventType}
                    onChange={(e) =>
                      setForm({ ...form, eventType: e.target.value })
                    }
                    className={inputClasses}
                  >
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Private Party">Private Party</option>
                    <option value="Conference">Conference</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex flex-col h-full">
                <textarea
                  placeholder="Your enquiry details (Any specific requirements or questions?)"
                  rows={12}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className={`${inputClasses} flex-1 resize-none min-h-[300px]`}
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-lg font-bold text-white shadow-xl transition-all disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, #153170 0%, #606abf 100%)",
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {isSubmitting ? "SENDING ENQUIRY..." : "SUBMIT ENQUIRY"}
            </motion.button>
          </form>
        </div>
      </section>

      <ElvieFooter />
      <ScrollToTop />
    </div>
  );
};

export default Booking;
