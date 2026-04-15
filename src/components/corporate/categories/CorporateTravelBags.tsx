import { motion } from "framer-motion";
import CorporateBags1 from "@/assets/CorporateBags1.jpeg"
import CorporateBags2 from "@/assets/CorporateBags2.jpeg"
import CorporateBags3 from "@/assets/CorporateBags3.jpeg"
import CorporateBags4 from "@/assets/CorporateBags4.jpeg"
import CorporateBags5 from "@/assets/CorporateBags5.jpeg"
import CorporateBags6 from "@/assets/CorporateBags6.jpeg"
import CorporateBags7 from "@/assets/CorporateBags7.jpeg"
import CorporateBags8 from "@/assets/CorporateBags8.jpeg"
import CorporateBags9 from "@/assets/CorporateBags9.jpeg"
import CorporateBags10 from "@/assets/CorporateBags10.jpeg"

export const gifts = [
  { img: CorporateBags1, title: "Executive Leather Duffel Bag", price: "AED 349", tag: "Premium", category: "Corporate Bags & Travel Gifts" },
  { img: CorporateBags2, title: "Branded Business Trolley", price: "AED 499", tag: "Bestseller", category: "Corporate Bags & Travel Gifts" },
  { img: CorporateBags3, title: "Corporate Travel Backpack", price: "AED 279", tag: "Popular", category: "Corporate Bags & Travel Gifts" },
  { img: CorporateBags4, title: "Luxury Weekend Holdall", price: "AED 429", tag: "Luxury", category: "Corporate Bags & Travel Gifts" },
  { img: CorporateBags5, title: "Branded Passport Wallet Set", price: "AED 149", tag: "Classic", category: "Corporate Bags & Travel Gifts" },
  { img: CorporateBags6, title: "Corporate Messenger Bag", price: "AED 229", tag: "Elegant", category: "Corporate Bags & Travel Gifts" },
  { img: CorporateBags7, title: "Custom Printed Tote Bag", price: "AED 89", tag: "Trendy", category: "Corporate Bags & Travel Gifts" },
  { img: CorporateBags8, title: "Executive Cabin Luggage", price: "AED 599", tag: "VIP", category: "Corporate Bags & Travel Gifts" },
  { img: CorporateBags9, title: "Eco Travel Kit Bag", price: "AED 199", tag: "Eco", category: "Corporate Bags & Travel Gifts" },
  { img: CorporateBags10, title: "Slim Tech Carry Bag", price: "AED 259", tag: "New", category: "Corporate Bags & Travel Gifts" },
];

interface CorporateTravelBagsProps {
  onProductClick: (product: any) => void;
}

const CorporateTravelBags: React.FC<CorporateTravelBagsProps> = ({ onProductClick }) => {
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

export default CorporateTravelBags;
