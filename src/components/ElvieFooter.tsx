import { motion } from "framer-motion";
import { Facebook, Instagram, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import logoImg from "../assets/Logo.webp";
import { createElvieInquiry } from "@/services/inquiryService";

const ElvieFooter = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const response = await createElvieInquiry({
      formType: "Newsletter Subscription",
      name: "Newsletter Subscriber",
      email,
      message: "New newsletter subscription",
      sourcePage: "Footer newsletter",
    });

    if (response.success) {
      toast.success("Thank you for subscribing!");
      setEmail("");
    } else {
      toast.error(response.message || "Failed to subscribe. Please try again later.");
    }
  };

  const companyLinks = [
    { name: "About Us", path: "/aboutus" },
    { name: "Events", path: "/corporate-gifts" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/booking" },
  ];

  const supportLinks = [
    { name: "FAQ", path: "/faq" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
  ];

  return (
    <footer className="relative text-white">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(222 72% 10%) 0%, hsl(222 62% 18%) 40%, hsl(240 50% 30%) 70%, hsl(260 50% 35%) 100%)",
        }}
      />

      <div className="relative z-10 container mx-auto px-6 py-16">

        {/* Top Section */}
        <div className="grid md:grid-cols-4 gap-10 mb-14">

          {/* Logo & Info */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex items-center">
              <img
                src={logoImg}
                alt="Elvie Events Logo"
                className="h-16 md:h-18 lg:h-20 w-auto object-contain"
                draggable={false}
              />
            </Link>

            <p className="text-sm text-white/70 leading-relaxed">
              Elvie Events L.L.C-FZ<br />
              Meydan Grandstand 6th Floor<br />
              Meydan Road Nad Al Sheba<br />
              Dubai, UAE
            </p>

            <div className="mt-4 text-sm text-white/70">
              <p>Email: elvieevents@gmail.com</p>
              <p>Contact: +971 52 132 7081</p>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-sm text-white/70">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4 text-white">
              Sign Up for Offers & News
            </h4>

            <form onSubmit={handleNewsletterSubmit} className="flex items-center bg-white/10 rounded-lg overflow-hidden">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-transparent px-4 py-3 text-sm outline-none flex-1"
              />
              <button type="submit" className="bg-blue-500 px-4 py-3 hover:bg-blue-600 transition">
                →
              </button>
            </form>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/share/18DRgYP4em/?mibextid=wwXIfr"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              >
                <Facebook size={18} />
              </a>

              <a
                href="https://www.instagram.com/elvieevents"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://wa.me/971521327081"
                target="_blank"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row justify-between text-sm text-white/60">
          <p>© 2026 Elvie Events. All Rights Reserved.</p>

          <div className="mt-3 md:mt-0 text-right">
            <p>VAT Registration Number: 100509225700003</p>
            <p>Trade License Number: 2100876</p>
            <p>CorporateTax Reg. Number: COR-98456123</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ElvieFooter;
