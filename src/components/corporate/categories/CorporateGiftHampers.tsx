import { motion } from "framer-motion";
import giftHampers1 from "@/assets/gift-hampers1.jpeg";
import giftHampers2 from "@/assets/gift-hampers2.jpeg";
import giftHampers3 from "@/assets/gift-hampers3.jpeg";
import giftHampers4 from "@/assets/gift-hampers4.jpeg";
import giftHampers5 from "@/assets/gift-hampers5.jpeg";
import giftHampers6 from "@/assets/gift-hampers6.jpeg";
import giftHampers7 from "@/assets/gift-hampers7.jpeg";
import giftHampers8 from "@/assets/gift-hampers8.jpeg";
import giftHampers9 from "@/assets/gift-hampers9.jpeg";
import giftHampers10 from "@/assets/gift-hampers10.jpeg";
import giftHamper from "@/assets/gift-hamper.jpg";

export const gifts = [
  { img: giftHampers1, title: "Executive Gourmet Celebration Hamper", price: "AED 549", tag: "Premium", category: "Corporate Gift Hampers" },
  { img: giftHampers2, title: "Artisan Coffee & Treats Box", price: "AED 380", tag: "Popular", category: "Corporate Gift Hampers" },
  { img: giftHampers3, title: "Luxury Wellness & Spa Set", price: "AED 420", tag: "Bestseller", category: "Corporate Gift Hampers" },
  { img: giftHampers4, title: "Premium Dark Chocolate Selection", price: "AED 290", tag: "Gift", category: "Corporate Gift Hampers" },
  { img: giftHampers5, title: "Office Energy Boost Kit", price: "AED 310", tag: "New", category: "Corporate Gift Hampers" },
  { img: giftHampers6, title: "Signature Tea Party Hamper", price: "AED 450", tag: "Elegant", category: "Corporate Gift Hampers" },
  { img: giftHampers7, title: "Gourmet Savory Retreat", price: "AED 390", tag: "Gourmet", category: "Corporate Gift Hampers" },
  { img: giftHampers8, title: "Elite Executive Hamper V2", price: "AED 680", tag: "Elite", category: "Corporate Gift Hampers" },
  { img: giftHampers9, title: "Employee Appreciation Basket", price: "AED 210", tag: "Value", category: "Corporate Gift Hampers" },
  { img: giftHampers10, title: "Seasonal Celebration Hamper", price: "AED 449", tag: "Bestseller", category: "Corporate Gift Hampers" },
  { img: giftHamper, title: "Deluxe Celebration Hamper", price: "AED 449", tag: "Bestseller", category: "Corporate Gift Hampers" },
];

interface CorporateGiftHampersProps {
  onProductClick: (product: any) => void;
}

const CorporateGiftHampers: React.FC<CorporateGiftHampersProps> = ({ onProductClick }) => {
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

export default CorporateGiftHampers;
