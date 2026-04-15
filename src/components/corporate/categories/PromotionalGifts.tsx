import { motion } from "framer-motion";
import Promotional1 from "@/assets/Promotional1.png"
import Promotional2 from "@/assets/Promotional2.png"
import Promotional3 from "@/assets/Promotional3.png"
import Promotional4 from "@/assets/Promotional4.png"
import Promotional5 from "@/assets/Promotional5.png"
import Promotional6 from "@/assets/Promotional6.png"
import Promotional7 from "@/assets/Promotional7.png"
import Promotional8 from "@/assets/Promotional8.png"
import Promotional9 from "@/assets/Promotional9.png"

export const gifts = [
  { img: Promotional1, title: "Branded Tote Bag", price: "AED 59", tag: "Popular", category: "Corporate Promotional Gifts" },
  { img: Promotional2, title: "Custom Logo Mug Set", price: "AED 75", tag: "Bestseller", category: "Corporate Promotional Gifts" },
  { img: Promotional3, title: "Promotional Pen Pack", price: "AED 45", tag: "Value", category: "Corporate Promotional Gifts" },
  { img: Promotional4, title: "Corporate Notebook Set", price: "AED 89", tag: "Classic", category: "Corporate Promotional Gifts" },
  { img: Promotional5, title: "Branded USB Drive", price: "AED 65", tag: "Tech", category: "Corporate Promotional Gifts" },
  { img: Promotional6, title: "Custom Printed Cap", price: "AED 55", tag: "Trendy", category: "Corporate Promotional Gifts" },
  { img: Promotional7, title: "Eco Promotional Kit", price: "AED 110", tag: "Eco", category: "Corporate Promotional Gifts" },
  { img: Promotional8, title: "Event Giveaway Bundle", price: "AED 95", tag: "Event", category: "Corporate Promotional Gifts" },
  { img: Promotional9, title: "Premium Promo Gift Set", price: "AED 135", tag: "Premium", category: "Corporate Promotional Gifts" },
];

interface PromotionalGiftsProps {
  onProductClick: (product: any) => void;
}

const PromotionalGifts: React.FC<PromotionalGiftsProps> = ({ onProductClick }) => {
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

export default PromotionalGifts;
