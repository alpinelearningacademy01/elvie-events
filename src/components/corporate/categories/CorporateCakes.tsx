import { motion } from "framer-motion";
import CorporateCakes1 from "@/assets/CorporateCakes1.jpeg"
import CorporateCakes2 from "@/assets/CorporateCakes2.jpeg"
import CorporateCakes3 from "@/assets/CorporateCakes3.jpeg"
import CorporateCakes4 from "@/assets/CorporateCakes4.jpeg"
import CorporateCakes5 from "@/assets/CorporateCakes5.jpeg"
import CorporateCakes6 from "@/assets/CorporateCakes6.jpeg"
import CorporateCakes8 from "@/assets/CorporateCakes8.jpeg"
import CorporateCakes9 from "@/assets/CorporateCakes9.jpeg"
import CorporateCakes10 from "@/assets/CorporateCakes10.jpeg"

export const gifts = [
  { img: CorporateCakes1, title: "Luxury Branded Corporate Cake", price: "AED 299", tag: "Premium", category: "Celebration Cakes for Offices" },
  { img: CorporateCakes2, title: "Logo Printed Celebration Cake", price: "AED 249", tag: "Branded", category: "Celebration Cakes for Offices" },
  { img: CorporateCakes3, title: "Executive Tier Cake", price: "AED 399", tag: "Elegant", category: "Celebration Cakes for Offices" },
  { img: CorporateCakes4, title: "Corporate Anniversary Cake", price: "AED 349", tag: "Bestseller", category: "Celebration Cakes for Offices" },
  { img: CorporateCakes5, title: "Gold Foil Business Cake", price: "AED 450", tag: "Luxury", category: "Celebration Cakes for Offices" },
  { img: CorporateCakes6, title: "Customised Office Party Cake", price: "AED 279", tag: "Custom", category: "Celebration Cakes for Offices" },
  { img: CorporateCakes8, title: "Mini Corporate Cupcake Tower", price: "AED 380", tag: "Event", category: "Celebration Cakes for Offices" },
  { img: CorporateCakes9, title: "Bespoke Milestone Cake", price: "AED 499", tag: "VIP", category: "Celebration Cakes for Offices" },
  { img: CorporateCakes10, title: "Classic Branded Sponge Cake", price: "AED 219", tag: "New", category: "Celebration Cakes for Offices" },
];

interface CorporateCakesProps {
  onProductClick: (product: any) => void;
}

const CorporateCakes: React.FC<CorporateCakesProps> = ({ onProductClick }) => {
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

export default CorporateCakes;
