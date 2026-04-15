import { motion } from "framer-motion";
import CorporateGift1 from "@/assets/CorporateGift1.jpeg";
import CorporateGift2 from "@/assets/CorporateGift2.jpeg";
import CorporateGift3 from "@/assets/CorporateGift3.jpeg";
import CorporateGift4 from "@/assets/CorporateGift4.jpeg";
import CorporateGift5 from "@/assets/CorporateGift5.jpeg";
import CorporateGift6 from "@/assets/CorporateGift6.jpeg";
import CorporateGift7 from "@/assets/CorporateGift7.jpeg";
import CorporateGift8 from "@/assets/CorporateGift8.jpeg";
import CorporateGift9 from "@/assets/CorporateGift9.jpeg";
import CorporateGift10 from "@/assets/CorporateGift10.jpeg";

export const gifts = [
  { img: CorporateGift1, title: "Premium Corporate Gift Set", price: "AED 349", tag: "VIP", category: "Corporate Gifts" },
  { img: CorporateGift2, title: "Executive Office Essentials", price: "AED 280", tag: "Bestseller", category: "Corporate Gifts" },
  { img: CorporateGift3, title: "Modern Workplace Kit", price: "AED 320", tag: "Popular", category: "Corporate Gifts" },
  { img: CorporateGift4, title: "Luxe Career Milestone Gift", price: "AED 550", tag: "Premium", category: "Corporate Gifts" },
  { img: CorporateGift5, title: "Signature Branded Hamper", price: "AED 190", tag: "Custom", category: "Corporate Gifts" },
  { img: CorporateGift6, title: "Executive Harmony Collection", price: "AED 410", tag: "Elegant", category: "Corporate Gifts" },
  { img: CorporateGift7, title: "Corporate Distinction Box", price: "AED 370", tag: "Distinguished", category: "Corporate Gifts" },
  { img: CorporateGift8, title: "Strategic Partner Gift Set", price: "AED 620", tag: "Grand", category: "Corporate Gifts" },
  { img: CorporateGift9, title: "Unity Performance Award", price: "AED 240", tag: "Special", category: "Corporate Gifts" },
  { img: CorporateGift10, title: "Visionary Leader Ensemble", price: "AED 890", tag: "Elite", category: "Corporate Gifts" },
];

interface GeneralCorporateGiftsProps {
  onProductClick: (product: any) => void;
}

const GeneralCorporateGifts: React.FC<GeneralCorporateGiftsProps> = ({ onProductClick }) => {
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

export default GeneralCorporateGifts;
