import { motion } from "framer-motion";
import SafetyItem1 from "@/assets/SafetyItem1.jpeg"
import SafetyItem2 from "@/assets/SafetyItem2.jpeg"
import SafetyItem3 from "@/assets/SafetyItem3.jpeg"
import SafetyItem4 from "@/assets/SafetyItem4.jpeg"
import SafetyItem5 from "@/assets/SafetyItem5.jpeg"
import SafetyItem6 from "@/assets/SafetyItem6.jpeg"
import SafetyItem7 from "@/assets/SafetyItem7.jpeg"
import SafetyItem8 from "@/assets/SafetyItem8.jpeg"
import SafetyItem9 from "@/assets/SafetyItem9.jpeg"
import SafetyItem10 from "@/assets/SafetyItem10.jpeg"

export const gifts = [
  { img: SafetyItem1, title: "Premium Safety Vest Gift Set", price: "AED 129", tag: "Essential", category: "Safety & Outdoor Essentials" },
  { img: SafetyItem2, title: "Branded First Aid Kit", price: "AED 99", tag: "Popular", category: "Safety & Outdoor Essentials" },
  { img: SafetyItem3, title: "Corporate Outdoor Adventure Kit", price: "AED 249", tag: "Bestseller", category: "Safety & Outdoor Essentials" },
  { img: SafetyItem4, title: "Reflective Safety Cap Set", price: "AED 79", tag: "Classic", category: "Safety & Outdoor Essentials" },
  { img: SafetyItem5, title: "Emergency Roadside Kit", price: "AED 189", tag: "Safety", category: "Safety & Outdoor Essentials" },
  { img: SafetyItem6, title: "Branded Hard Hat Collection", price: "AED 149", tag: "Custom", category: "Safety & Outdoor Essentials" },
  { img: SafetyItem7, title: "Executive Outdoor Survival Kit", price: "AED 299", tag: "Premium", category: "Safety & Outdoor Essentials" },
  { img: SafetyItem8, title: "Corporate PPE Gift Bundle", price: "AED 179", tag: "VIP", category: "Safety & Outdoor Essentials" },
  { img: SafetyItem9, title: "Branded Safety Torch Set", price: "AED 109", tag: "Trendy", category: "Safety & Outdoor Essentials" },
  { img: SafetyItem10, title: "Eco Outdoor Wellness Kit", price: "AED 219", tag: "Eco", category: "Safety & Outdoor Essentials" },
];

interface OutdoorSafetyGiftsProps {
  onProductClick: (product: any) => void;
}

const OutdoorSafetyGifts: React.FC<OutdoorSafetyGiftsProps> = ({ onProductClick }) => {
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

export default OutdoorSafetyGifts;
