import { motion } from "framer-motion";
import cupcakes1 from "@/assets/cupcakes_1.png";
import cupcakes2 from "@/assets/cupcakes_2.png";
import cupcakes3 from "@/assets/cupcakes_3.png";
import cupcakes4 from "@/assets/cupcakes_4.png";
// import cupcakes5 from "@/assets/cupcakes_5.png";
// import cupcakes6 from "@/assets/cupcakes_6.png";
// import cupcakes7 from "@/assets/cupcakes_7.png";
// import cupcakes8 from "@/assets/cupcakes_8.png";
// import cupcakes9 from "@/assets/cupcakes_9.png";

export const gifts = [
  { img: cupcakes1, title: "Logo Printed Cupcakes", price: "AED 180", tag: "Branded", category: "Event Cupcake Treats" },
  { img: cupcakes2, title: "Premium Assorted Cupcakes", price: "AED 150", tag: "Bestseller", category: "Event Cupcake Treats" },
  { img: cupcakes3, title: "Executive Event Cupcakes", price: "AED 220", tag: "VIP", category: "Event Cupcake Treats" },
  { img: cupcakes4, title: "Celebration Cupcake Platter", price: "AED 250", tag: "Event", category: "Event Cupcake Treats" },
  // { img: cupcakes5, title: "Mini Diet Cupcakes", price: "AED 190", tag: "Healthy", category: "Event Cupcake Treats" },
  // { img: cupcakes6, title: "Elegant Gold Foil Cupcakes", price: "AED 320", tag: "Luxury", category: "Event Cupcake Treats" },
  // { img: cupcakes7, title: "Employee Birthday Cupcakes", price: "AED 140", tag: "Popular", category: "Event Cupcake Treats" },
  // { img: cupcakes8, title: "Festive Themed Cupcakes", price: "AED 210", tag: "Festive", category: "Event Cupcake Treats" },
  // { img: cupcakes9, title: "Custom Color Cupcakes", price: "AED 200", tag: "Custom", category: "Event Cupcake Treats" },
];

interface CorporateCupcakesProps {
  onProductClick: (product: any) => void;
}

const CorporateCupcakes: React.FC<CorporateCupcakesProps> = ({ onProductClick }) => {
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

export default CorporateCupcakes;
