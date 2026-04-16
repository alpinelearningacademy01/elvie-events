import { motion } from "framer-motion";
import CorporateChocolate1 from "@/assets/corporateChocolate1.jpeg";
import CorporateChocolate2 from "@/assets/corporateChocolate2.jpeg";
import CorporateChocolate3 from "@/assets/corporateChocolate3.jpeg";
import CorporateChocolate4 from "@/assets/corporateChocolate4.jpeg";
import CorporateChocolate5 from "@/assets/corporateChocolate5.jpeg";
import CorporateChocolate6 from "@/assets/corporateChocolate6.jpeg";
import CorporateChocolate7 from "@/assets/corporateChocolate7.jpeg";
import CorporateChocolate8 from "@/assets/corporateChocolate8.jpeg";
import CorporateChocolate9 from "@/assets/corporateChocolate9.jpeg";
import CorporateChocolate10 from "@/assets/corporateChocolate10.jpeg";

export const gifts = [
  { img: CorporateChocolate1, title: "Signature Truffle Collection", price: "AED 120", tag: "Premium", category: "Premium Chocolate Gifts" },
  { img: CorporateChocolate2, title: "Luxury Dark Pralines", price: "AED 145", tag: "Popular", category: "Premium Chocolate Gifts" },
  { img: CorporateChocolate3, title: "Assorted Belgian Delights", price: "AED 180", tag: "Bestseller", category: "Premium Chocolate Gifts" },
  { img: CorporateChocolate4, title: "Artisan Milk Chocolate Box", price: "AED 95", tag: "Classic", category: "Premium Chocolate Gifts" },
  { img: CorporateChocolate5, title: "Gourmet Ganache Selection", price: "AED 210", tag: "Luxury", category: "Premium Chocolate Gifts" },
  { img: CorporateChocolate6, title: "Branded Logo Chocolates", price: "AED 165", tag: "Custom", category: "Premium Chocolate Gifts" },
  { img: CorporateChocolate7, title: "Elite Cocoa Collection", price: "AED 240", tag: "VIP", category: "Premium Chocolate Gifts" },
  { img: CorporateChocolate8, title: "Gold Foil Surprise Box", price: "AED 135", tag: "Festive", category: "Premium Chocolate Gifts" },
  { img: CorporateChocolate9, title: "Master Chocolatier Set", price: "AED 320", tag: "Grand", category: "Premium Chocolate Gifts" },
  { img: CorporateChocolate10, title: "Sweet Appreciation Hamper", price: "AED 155", tag: "New", category: "Premium Chocolate Gifts" },
];

interface CorporateChocolatesProps {
  onProductClick: (product: any) => void;
}

const CorporateChocolates: React.FC<CorporateChocolatesProps> = ({ onProductClick }) => {
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

export default CorporateChocolates;
