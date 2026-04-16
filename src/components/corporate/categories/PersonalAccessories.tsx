import { motion } from "framer-motion";
import Accessories1 from "@/assets/Accessories1.png"
import Accessories2 from "@/assets/Accessories2.png"
import Accessories3 from "@/assets/Accessories3.png"
import Accessories4 from "@/assets/Accessories4.png"
import Accessories5 from "@/assets/Accessories5.png"
import Accessories6 from "@/assets/Accessories6.png"
import Accessories7 from "@/assets/Accessories7.png"
import Accessories8 from "@/assets/Accessories8.png"
import Accessories9 from "@/assets/Accessories9.jpg"

export const gifts = [
  { img: Accessories1, title: "Premium Leather Wallet", price: "AED 149", tag: "Premium", category: "Lifestyle Accessories" },
  { img: Accessories2, title: "Executive Card Holder", price: "AED 99", tag: "Popular", category: "Lifestyle Accessories" },
  { img: Accessories3, title: "Branded Keychain Set", price: "AED 79", tag: "Bestseller", category: "Lifestyle Accessories" },
  { img: Accessories4, title: "Corporate Pen Set", price: "AED 120", tag: "Classic", category: "Lifestyle Accessories" },
  { img: Accessories5, title: "Luxury Watch Box Set", price: "AED 350", tag: "Luxury", category: "Lifestyle Accessories" },
  { img: Accessories6, title: "Branded Sunglasses Case", price: "AED 89", tag: "Trendy", category: "Lifestyle Accessories" },
  { img: Accessories7, title: "Elite Cufflink Set", price: "AED 199", tag: "Elegant", category: "Lifestyle Accessories" },
  { img: Accessories8, title: "Premium Belt Gift Box", price: "AED 249", tag: "VIP", category: "Lifestyle Accessories" },
  { img: Accessories9, title: "Signature Scarf Collection", price: "AED 175", tag: "New", category: "Lifestyle Accessories" },
];

interface PersonalAccessoriesProps {
  onProductClick: (product: any) => void;
}

const PersonalAccessories: React.FC<PersonalAccessoriesProps> = ({ onProductClick }) => {
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

export default PersonalAccessories;
