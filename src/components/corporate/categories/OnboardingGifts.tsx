import { motion } from "framer-motion";
import Onboarding1 from "@/assets/Onboarding_Gifts1.png";
import Onboarding2 from "@/assets/Onboarding_Gifts2.png";
import Onboarding3 from "@/assets/Onboarding_Gifts3.png";
import Onboarding4 from "@/assets/Onboarding_Gifts4.png";
import Onboarding5 from "@/assets/Onboarding_Gifts5.png";
import Onboarding6 from "@/assets/Onboarding_Gifts6.png";
import Onboarding7 from "@/assets/Onboarding_Gifts7.jpg";
import Onboarding8 from "@/assets/Onboarding_Gifts8.png";
import Onboarding9 from "@/assets/Onboarding_Gifts9.png";
import Onboarding10 from "@/assets/Onboarding_Gifts10.png";

export const gifts = [
  { img: Onboarding1, title: "Welcome Kit - Series A", price: "AED 299", tag: "New", category: "Onboarding Gifts" },
  { img: Onboarding2, title: "Premium Onboarding Hamper", price: "AED 419", tag: "Premium", category: "Onboarding Gifts" },
  { img: Onboarding3, title: "Executive Starter Kit", price: "AED 549", tag: "Bestseller", category: "Onboarding Gifts" },
  { img: Onboarding4, title: "Tech Welcome Pack", price: "AED 379", tag: "Tech", category: "Onboarding Gifts" },
  { img: Onboarding5, title: "Eco-Friendly Welcome Box", price: "AED 349", tag: "Eco", category: "Onboarding Gifts" },
  { img: Onboarding6, title: "Welcome Kit - Series B", price: "AED 299", tag: "New", category: "Onboarding Gifts" },
  { img: Onboarding7, title: "Luxury Onboarding Hamper", price: "AED 419", tag: "Premium", category: "Onboarding Gifts" },
  { img: Onboarding8, title: "Corporate Welcome Gift Set", price: "AED 419", tag: "Premium", category: "Onboarding Gifts" },
  { img: Onboarding9, title: "Employee Welcome Kit V2", price: "AED 419", tag: "Premium", category: "Onboarding Gifts" },
  { img: Onboarding10, title: "Elite Onboarding Package", price: "AED 419", tag: "Premium", category: "Onboarding Gifts" },
];

interface OnboardingGiftsProps {
  onProductClick: (product: any) => void;
}

const OnboardingGifts: React.FC<OnboardingGiftsProps> = ({ onProductClick }) => {
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

export default OnboardingGifts;
