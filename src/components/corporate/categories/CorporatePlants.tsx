import { motion } from "framer-motion";
import giftPlants1 from "@/assets/gift-plants1.jpg";
import giftPlants2 from "@/assets/gift-plants2.png";
import giftPlants3 from "@/assets/gift-plants3.png";
import giftPlants4 from "@/assets/gift-plants4.png";
import giftPlants5 from "@/assets/gift-plants5.png";
import giftPlants6 from "@/assets/gift-plants6.png";
import giftPlants7 from "@/assets/gift-plants7.png";
import giftPlants8 from "@/assets/gift-plants8.png";
import giftPlants9 from "@/assets/gift-plants9.png";
import giftPlants10 from "@/assets/gift-plants10.png";

export const gifts = [
  { img: giftPlants1, title: "Bonsai Zen Tree", price: "AED 119", tag: "Plants", category: "Corporate Plants" },
  { img: giftPlants2, title: "Desktop Succulent Garden", price: "AED 145", tag: "Popular", category: "Corporate Plants" },
  { img: giftPlants3, title: "Premium Snake Plant", price: "AED 180", tag: "Bestseller", category: "Corporate Plants" },
  { img: giftPlants4, title: "Mini Money Tree", price: "AED 160", tag: "Prosperity", category: "Corporate Plants" },
  { img: giftPlants5, title: "Office Aloe Vera Set", price: "AED 135", tag: "Purifying", category: "Corporate Plants" },
  { img: giftPlants6, title: "Executive Peace Lily", price: "AED 220", tag: "Premium", category: "Corporate Plants" },
  { img: giftPlants7, title: "Branded Bamboo Plant", price: "AED 195", tag: "Custom", category: "Corporate Plants" },
  { img: giftPlants8, title: "Jade Plant Arrangement", price: "AED 175", tag: "Good Luck", category: "Corporate Plants" },
  { img: giftPlants9, title: "Modern Ficus Bonsai", price: "AED 310", tag: "Luxury", category: "Corporate Plants" },
  { img: giftPlants10, title: "Ceramic Pothos Bowl", price: "AED 150", tag: "New", category: "Corporate Plants" },
];

interface CorporatePlantsProps {
  onProductClick: (product: any) => void;
}

const CorporatePlants: React.FC<CorporatePlantsProps> = ({ onProductClick }) => {
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

export default CorporatePlants;
