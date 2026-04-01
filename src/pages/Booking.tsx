import { useState } from "react";
import { motion } from "framer-motion";
import ElvieNavbar from "@/components/ElvieNavbar";
import ElvieFooter from "@/components/ElvieFooter";
import ScrollToTop from "@/components/ScrollToTop";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

const Booking = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    designation: "",
    phone: "",
    email: "",
    contactMethod: [],
    message: "",
  });

  const handleCheckbox = (value: string) => {
    setForm((prev) => ({
      ...prev,
      contactMethod: prev.contactMethod.includes(value)
        ? prev.contactMethod.filter((v) => v !== value)
        : [...prev.contactMethod, value],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.contactMethod.length === 0) {
      toast.error("Please select at least one preferred method of contact.");
      return;
    }

    const { firstName, lastName, company, designation, phone, email, message, contactMethod } = form;
    const fullName = `${firstName} ${lastName}`;

    // Helper to reset form
    const resetForm = () => {
      setForm({
        firstName: "",
        lastName: "",
        company: "",
        designation: "",
        phone: "",
        email: "",
        contactMethod: [],
        message: "",
      });
    };

    // Handle Email Submission
    if (contactMethod.includes("Email")) {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      const templateParams = {
        first_name: firstName,
        last_name: lastName,
        company: company,
        designation: designation,
        phone: phone,
        email: email,
        contact_method: "Email",
        message: message,
        to_email: "navazsherasiya0@gmail.com",
      };

      toast.promise(
        emailjs.send(serviceId, templateId, templateParams, publicKey),
        {
          loading: "Sending enquiry to email...",
          success: () => {
            resetForm();
            return "Enquiry sent to Email successfully!";
          },
          error: "Failed to send enquiry via Email",
        }
      );
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

                {/* Preferred Contact */}
                <div>
                  <p className="text-sm mb-2">
                    Preferred method of contact
                  </p>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        onChange={() => setForm({ ...form, contactMethod: ["Email"] })}
                        checked={true}
                        readOnly
                      />
                      Email
                    </label>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div>
                <textarea
                  placeholder="Your enquiry details"
                  rows={12}
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className={`${inputClasses} h-full resize-none`}
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <motion.button
              type="submit"
              className="w-full py-4 rounded-lg font-bold text-white"
              style={{
                background:
                  "linear-gradient(135deg, hsl(222 62% 18%) 0%, hsl(222 80% 45%) 100%)",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              SUBMIT
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