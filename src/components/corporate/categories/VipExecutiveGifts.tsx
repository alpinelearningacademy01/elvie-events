import { motion } from "framer-motion";
import giftVip from "@/assets/gift-vip.png";

export const gifts = [
  { img: giftVip, title: "Crystal Award Plaque", price: "AED 849", tag: "VIP", category: "VIP & Executive" },
  { img: giftVip, title: "Executive Gold Watch", price: "AED 1200", tag: "Luxury", category: "VIP & Executive" },
  { img: giftVip, title: "Premium Leather Desk Set", price: "AED 950", tag: "Executive", category: "VIP & Executive" },
];

interface VipExecutiveGiftsProps {
  onProductClick: (product: any) => void;
}

const VipExecutiveGifts: React.FC<VipExecutiveGiftsProps> = ({ onProductClick }) => {
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

export default VipExecutiveGifts;
