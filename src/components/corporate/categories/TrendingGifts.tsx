import { motion } from "framer-motion";
import trending1 from "@/assets/trending-1-new.png";
import trending2 from "@/assets/trending-2.png";
import trending3 from "@/assets/trending-3.jpg";
import trending4 from "@/assets/trending-4.png";
import trending5 from "@/assets/trending-5.png";
import trending6 from "@/assets/trending-6.png";

export const gifts = [
  { img: trending1, title: "Executive Leather Set", price: "AED 350", tag: "Best Seller", category: "Office & Writing Gifts for Corporate" },
  { img: trending2, title: "Luxury Chocolate Box", price: "AED 180", tag: "Popular", category: "Chocolates for Corporate Gifting" },
  { img: trending3, title: "Wellness Hamper", price: "AED 420", tag: "New", category: "Corporate Gift Hampers" },
  { img: trending4, title: "Branded Tech Kit", price: "AED 550", tag: "Premium", category: "Corporate Technology Gifts" },
  { img: trending5, title: "Gourmet Food Hamper", price: "AED 290", tag: "Trending", category: "Corporate Gift Hampers" },
  { img: trending6, title: "Desk Organizer Set", price: "AED 220", tag: "Popular", category: "Office & Writing Gifts for Corporate" },
];

interface TrendingGiftsProps {
  onProductClick: (product: any) => void;
}

const TrendingGifts: React.FC<TrendingGiftsProps> = ({ onProductClick }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
      {gifts.map((gift, i) => (
        <motion.div
            key={`${gift.title}-${i}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="group relative bg-card rounded-2xl border border-border overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500"
            onClick={() => onProductClick(gift)}
            whileHover={{ y: -8 }}
        >
            <div className="relative aspect-[4/5] overflow-hidden">
                <img src={gift.img} alt={gift.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <button className="w-full py-2 bg-white text-black text-xs font-bold rounded-full tracking-widest uppercase hover:bg-elvie-gold hover:text-white transition-colors">
                        Quick View
                    </button>
                </div>
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-white bg-accent shadow-lg">
                    {gift.tag}
                </span>
            </div>
            <div className="p-5 text-center bg-card">
                <p className="text-[10px] uppercase tracking-widest text-accent font-bold mb-1 opacity-70">{gift.category}</p>
                <h3 className="text-sm font-bold text-foreground mb-2 line-clamp-1">{gift.title}</h3>
                <p className="text-accent font-bold text-sm">{gift.price}</p>
            </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TrendingGifts;
