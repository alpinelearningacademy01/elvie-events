import { motion } from "framer-motion";
import gifttFlowes1 from "@/assets/gift-flower1.png";
import gifttFlowes2 from "@/assets/gift-flower2.png";
import gifttFlowes3 from "@/assets/gift-flower3.png";
import gifttFlowes4 from "@/assets/gift-flower4.png";
import gifttFlowes5 from "@/assets/gift-flower5.png";
import gifttFlowes6 from "@/assets/gift-flower6.png";
import gifttFlowes7 from "@/assets/gift-flower7.png";
import gifttFlowes8 from "@/assets/gift-flower8.png";
import gifttFlowes9 from "@/assets/gift-flower9.png";
import gifttFlowes10 from "@/assets/gift-flower10.png";

export const gifts = [
  { img: gifttFlowes1, title: "Luxury Corporate Roses", price: "AED 350", tag: "Premium", category: "Corporate Flowers" },
  { img: gifttFlowes2, title: "Elegant Orchid Arrangement", price: "AED 420", tag: "Bestseller", category: "Corporate Flowers" },
  { img: gifttFlowes3, title: "Classic Mixed Bouquet", price: "AED 290", tag: "Popular", category: "Corporate Flowers" },
  { img: gifttFlowes4, title: "Desktop Flower Vase", price: "AED 210", tag: "New", category: "Corporate Flowers" },
  { img: gifttFlowes5, title: "Executive Hydrangeas", price: "AED 380", tag: "Luxury", category: "Corporate Flowers" },
  { img: gifttFlowes6, title: "Corporate Event Centerpiece", price: "AED 450", tag: "Event", category: "Corporate Flowers" },
  { img: gifttFlowes7, title: "Welcome Desk Arrangement", price: "AED 260", tag: "Classic", category: "Corporate Flowers" },
  { img: gifttFlowes8, title: "Festive Flower Basket", price: "AED 340", tag: "Festive", category: "Corporate Flowers" },
  { img: gifttFlowes9, title: "Premium Lily Collection", price: "AED 390", tag: "Premium", category: "Corporate Flowers" },
  { img: gifttFlowes10, title: "Bespoke Floral Stand", price: "AED 550", tag: "Grand", category: "Corporate Flowers" },
];

interface CorporateFlowersProps {
  onProductClick: (product: any) => void;
}

const CorporateFlowers: React.FC<CorporateFlowersProps> = ({ onProductClick }) => {
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

export default CorporateFlowers;
