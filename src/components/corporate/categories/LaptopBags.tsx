import { motion } from "framer-motion";
import LaptopBags1 from "@/assets/LaptopBags1.png"
import LaptopBags2 from "@/assets/LaptopBags2.png"
import LaptopBags3 from "@/assets/LaptopBags3.png"
import LaptopBags4 from "@/assets/LaptopBags4.png"
import LaptopBags5 from "@/assets/LaptopBags5.png"
import LaptopBags6 from "@/assets/LaptopBags6.png"
import LaptopBags7 from "@/assets/LaptopBags7.png"
import LaptopBags8 from "@/assets/LaptopBags8.png"
import LaptopBags9 from "@/assets/LaptopBags9.png"

export const gifts = [
  { img: LaptopBags1, title: "Executive Laptop Bag I", price: "AED 249", tag: "Premium", category: "Laptop Bags for Corporate Gifting" },
  { img: LaptopBags2, title: "Slim Business Laptop Bag", price: "AED 199", tag: "Popular", category: "Laptop Bags for Corporate Gifting" },
  { img: LaptopBags3, title: "Branded Commuter Bag", price: "AED 279", tag: "Bestseller", category: "Laptop Bags for Corporate Gifting" },
  { img: LaptopBags4, title: "Anti-Theft Laptop Backpack", price: "AED 319", tag: "Secure", category: "Laptop Bags for Corporate Gifting" },
  { img: LaptopBags5, title: "Executive Leather Laptop Bag", price: "AED 399", tag: "Luxury", category: "Laptop Bags for Corporate Gifting" },
  { img: LaptopBags6, title: "Corporate Laptop Shoulder Bag", price: "AED 229", tag: "Classic", category: "Laptop Bags for Corporate Gifting" },
  { img: LaptopBags7, title: "Multi-Pocket Office Bag", price: "AED 259", tag: "Functional", category: "Laptop Bags for Corporate Gifting" },
  { img: LaptopBags8, title: "Waterproof Laptop Bag", price: "AED 289", tag: "Durable", category: "Laptop Bags for Corporate Gifting" },
  { img: LaptopBags9, title: "Eco-Friendly Laptop Bag", price: "AED 219", tag: "Eco", category: "Laptop Bags for Corporate Gifting" },
];

interface LaptopBagsProps {
  onProductClick: (product: any) => void;
}

const LaptopBags: React.FC<LaptopBagsProps> = ({ onProductClick }) => {
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

export default LaptopBags;
