import { motion } from "framer-motion";
import Technology1 from "@/assets/Technology1.jpeg";
import Technology2 from "@/assets/Technology2.jpeg";
import Technology3 from "@/assets/Technology3.jpeg";
import Technology4 from "@/assets/Technology4.jpeg";
import Technology5 from "@/assets/Technology5.jpeg";
import Technology6 from "@/assets/Technology6.jpeg";
import Technology7 from "@/assets/Technology7.jpeg";
import Technology8 from "@/assets/Technology8.jpeg";
import Technology9 from "@/assets/Technology9.jpeg";
import Technology10 from "@/assets/Technology10.jpeg";

export const gifts = [
  { img: Technology1, title: "Wireless Earbuds Gift Set", price: "AED 299", tag: "Premium", category: "Corporate Technology Gifts" },
  { img: Technology2, title: "Smart Bluetooth Speaker", price: "AED 249", tag: "Popular", category: "Corporate Technology Gifts" },
  { img: Technology3, title: "Branded Wireless Charger", price: "AED 179", tag: "Bestseller", category: "Corporate Technology Gifts" },
  { img: Technology4, title: "Executive Power Bank", price: "AED 199", tag: "Essential", category: "Corporate Technology Gifts" },
  { img: Technology5, title: "USB-C Hub Gift Box", price: "AED 229", tag: "Tech", category: "Corporate Technology Gifts" },
  { img: Technology6, title: "Smart Watch Corporate Edition", price: "AED 549", tag: "Luxury", category: "Corporate Technology Gifts" },
  { img: Technology7, title: "Branded Laptop Stand Kit", price: "AED 189", tag: "Elegant", category: "Corporate Technology Gifts" },
  { img: Technology8, title: "Noise Cancelling Headphones", price: "AED 649", tag: "VIP", category: "Corporate Technology Gifts" },
  { img: Technology9, title: "Corporate LED Desk Lamp", price: "AED 159", tag: "Classic", category: "Corporate Technology Gifts" },
  { img: Technology10, title: "Smart Notebook & Stylus Set", price: "AED 219", tag: "New", category: "Corporate Technology Gifts" },
];

interface CorporateTechGiftsProps {
  onProductClick: (product: any) => void;
}

const CorporateTechGifts: React.FC<CorporateTechGiftsProps> = ({ onProductClick }) => {
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

export default CorporateTechGifts;
