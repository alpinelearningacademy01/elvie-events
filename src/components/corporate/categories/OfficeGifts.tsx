import { motion } from "framer-motion";
import OfficeGifts1 from "@/assets/OfficeGifts1.jpeg";
import OfficeGifts2 from "@/assets/OfficeGifts2.jpeg";
import OfficeGifts3 from "@/assets/OfficeGifts3.jpeg";
import OfficeGifts4 from "@/assets/OfficeGifts4.jpeg";
import OfficeGifts5 from "@/assets/OfficeGifts5.jpeg";
import OfficeGifts6 from "@/assets/OfficeGifts6.png";
import OfficeGifts7 from "@/assets/OfficeGifts7.png";
import OfficeGifts8 from "@/assets/OfficeGifts8.png";
import OfficeGifts9 from "@/assets/OfficeGifts9.png";
import OfficeGifts10 from "@/assets/OfficeGifts10.png";

export const gifts = [
  { img: OfficeGifts1, title: "Executive Notebook & Pen Set", price: "AED 149", tag: "Premium", category: "Office Stationery Gifts" },
  { img: OfficeGifts2, title: "Smart Leather Desk Organizer", price: "AED 199", tag: "Popular", category: "Office Stationery Gifts" },
  { img: OfficeGifts3, title: "Branded Metal Rollerball Pen", price: "AED 89", tag: "Bestseller", category: "Office Stationery Gifts" },
  { img: OfficeGifts4, title: "Luxury Fountain Pen Set", price: "AED 299", tag: "Luxury", category: "Office Stationery Gifts" },
  { img: OfficeGifts5, title: "Custom Engraved Bamboo Pen", price: "AED 59", tag: "Eco", category: "Office Stationery Gifts" },
  { img: OfficeGifts6, title: "Premium A5 Leather Journal", price: "AED 129", tag: "Classic", category: "Office Stationery Gifts" },
  { img: OfficeGifts7, title: "Corporate Desk Clock & Pen Stand", price: "AED 179", tag: "Elegant", category: "Office Stationery Gifts" },
  { img: OfficeGifts8, title: "Executive Portfolio Manager", price: "AED 249", tag: "VIP", category: "Office Stationery Gifts" },
  { img: OfficeGifts9, title: "Wireless Charging Mouse Pad", price: "AED 139", tag: "Tech", category: "Office Stationery Gifts" },
  { img: OfficeGifts10, title: "Eco-Friendly Cork Notebook Set", price: "AED 99", tag: "New", category: "Office Stationery Gifts" },
];

interface OfficeGiftsProps {
  onProductClick: (product: any) => void;
}

const OfficeGifts: React.FC<OfficeGiftsProps> = ({ onProductClick }) => {
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

export default OfficeGifts;
