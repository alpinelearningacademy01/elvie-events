import { motion } from "framer-motion";
import Drinkware1 from "@/assets/Drinkware1.png"
import Drinkware2 from "@/assets/Drinkware2.png"
import Drinkware3 from "@/assets/Drinkware3.png"
import Drinkware4 from "@/assets/Drinkware4.png"
import Drinkware5 from "@/assets/Drinkware5.png"
import Drinkware6 from "@/assets/Drinkware6.png"
import Drinkware7 from "@/assets/Drinkware7.png"
import Drinkware8 from "@/assets/Drinkware8.png"
import Drinkware9 from "@/assets/Drinkware9.png"
import Drinkware10 from "@/assets/Drinkware10.png"

export const gifts = [
  { img: Drinkware1, title: "Premium Thermal Hydration Flask", price: "AED 129", tag: "Premium", category: "Corporate Drinkware" },
  { img: Drinkware2, title: "Branded Smart Vacuum Cup", price: "AED 149", tag: "Popular", category: "Corporate Drinkware" },
  { img: Drinkware3, title: "Eco-Friendly Bamboo Mug", price: "AED 79", tag: "Bestseller", category: "Corporate Drinkware" },
  { img: Drinkware4, title: "Luxury Matte Black Tumbler", price: "AED 199", tag: "Luxury", category: "Corporate Drinkware" },
  { img: Drinkware5, title: "Custom Glass Infuser Bottle", price: "AED 89", tag: "Eco", category: "Corporate Drinkware" },
  { img: Drinkware6, title: "Classic Steel Travel Mug", price: "AED 95", tag: "Classic", category: "Corporate Drinkware" },
  { img: Drinkware7, title: "Corporate Insulated Coffee Cup", price: "AED 115", tag: "Elegant", category: "Corporate Drinkware" },
  { img: Drinkware8, title: "Executive Crystal Glass Set", price: "AED 249", tag: "VIP", category: "Corporate Drinkware" },
  { img: Drinkware9, title: "Smart Temperature Display Bottle", price: "AED 139", tag: "Tech", category: "Corporate Drinkware" },
  { img: Drinkware10, title: "Compact Collapsible Silicon Cup", price: "AED 69", tag: "New", category: "Corporate Drinkware" },
];

interface DrinkwareGiftsProps {
  onProductClick: (product: any) => void;
}

const DrinkwareGifts: React.FC<DrinkwareGiftsProps> = ({ onProductClick }) => {
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

export default DrinkwareGifts;
