import { motion } from "framer-motion";
import Apparel1 from "@/assets/Apparel1.png"
import Apparel2 from "@/assets/Apparel2.png"
import Apparel3 from "@/assets/Apparel3.png"
import Apparel4 from "@/assets/Apparel4.png"
import Apparel5 from "@/assets/Apparel5.png"
import Apparel6 from "@/assets/Apparel6.png"
import Apparel7 from "@/assets/Apparel7.png"
import Apparel8 from "@/assets/Apparel8.png"
import Apparel9 from "@/assets/Apparel9.png"
import Apparel10 from "@/assets/Apparel10.png"

export const gifts = [
  { img: Apparel1, title: "Branded Corporate Polo Shirt", price: "AED 89", tag: "Popular", category: "Apparel for Corporate Gifting" },
  { img: Apparel2, title: "Premium Embroidered Hoodie", price: "AED 149", tag: "Bestseller", category: "Apparel for Corporate Gifting" },
  { img: Apparel3, title: "Corporate Jacket with Logo", price: "AED 229", tag: "Premium", category: "Apparel for Corporate Gifting" },
  { img: Apparel4, title: "Branded T-Shirt Collection", price: "AED 69", tag: "Classic", category: "Apparel for Corporate Gifting" },
  { img: Apparel5, title: "Executive Vest with Branding", price: "AED 179", tag: "Elegant", category: "Apparel for Corporate Gifting" },
  { img: Apparel6, title: "Custom Print Sweatshirt", price: "AED 119", tag: "Custom", category: "Apparel for Corporate Gifting" },
  { img: Apparel7, title: "Corporate Cap & Hat Set", price: "AED 59", tag: "Trendy", category: "Apparel for Corporate Gifting" },
  { img: Apparel8, title: "Branded Sports Jersey", price: "AED 139", tag: "Active", category: "Apparel for Corporate Gifting" },
  { img: Apparel9, title: "Luxury Embroidered Shirt", price: "AED 199", tag: "Luxury", category: "Apparel for Corporate Gifting" },
  { img: Apparel10, title: "Full Uniform Corporate Set", price: "AED 349", tag: "VIP", category: "Apparel for Corporate Gifting" },
];

interface CorporateApparelProps {
  onProductClick: (product: any) => void;
}

const CorporateApparel: React.FC<CorporateApparelProps> = ({ onProductClick }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {gifts.map((gift, i) => (
        <motion.div
          key={`${gift.title}-${i}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden group hover:shadow-2xl transition-all duration-500"
        >
          <div
            className="relative aspect-square overflow-hidden cursor-pointer flex items-center justify-center bg-gray-50/20"
            onClick={() => onProductClick(gift)}
          >
            <img src={gift.img} alt={gift.title} className="w-full h-full object-contain mix-blend-multiply p-4 group-hover:scale-110 transition-transform duration-700" />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-primary-foreground bg-elvie-navy border border-elvie-gold/30 shadow-lg">
              {gift.tag}
            </span>
          </div>
          <div className="p-3 text-center">
            <h3
              className="text-[13px] font-bold text-foreground group-hover:text-elvie-navy transition-colors cursor-pointer line-clamp-1"
              onClick={() => onProductClick(gift)}
            >
              {gift.title}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CorporateApparel;
