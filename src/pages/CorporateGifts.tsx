import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Gift, Package, Award, Briefcase, Leaf, Truck,
  Star, Users, CheckCircle, ChevronDown, ChevronUp,
  GemIcon, Laptop, Coffee, Flower2, PenTool, Smartphone,
  TreePine, ShoppingBag, Crown, Heart, Sparkles, Send,
  Phone, Mail, ChevronLeft, ChevronRight, Quote, MessageSquare, X
} from "lucide-react";
import { useSearchParams, useParams, useNavigate, useLocation } from "react-router-dom";
import ElvieNavbar from "@/components/ElvieNavbar";
import ElvieFooter from "@/components/ElvieFooter";
import ScrollToTop from "@/components/ScrollToTop";
import { triggerEnquiry } from "@/components/StickyEnquiry";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";

import heroImg from "@/assets/corporate-gifts-hero-new.png";
import brandedImg from "@/assets/corporate-branded-packaging-new.png";
import customImg from "@/assets/corporate-custom-gifts-new.png";

import giftHamper from "@/assets/gift-hamper.jpg";
import giftOnboarding from "@/assets/gift-onboarding-new.png";
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
import giftSustainable from "@/assets/gift-sustainable-new.png";
import giftDrinkware from "@/assets/gift-drinkware.png";
import giftWriting from "@/assets/gift-writing.png";
import giftGadgets from "@/assets/gift-gadgets.png";
import giftEmployee from "@/assets/gift-employee.png";
import giftLaptopBag from "@/assets/gift-laptop-bag.png";
import giftVip from "@/assets/gift-vip.png";
import giftPlants1 from "@/assets/gift-plants1.jpg";
import giftPlants2 from "@/assets/gift-plants2.png";
import giftPlants3 from "@/assets/gift-plants3.png";
import giftPlants4 from "@/assets/gift-plants4.png";
import giftPlants5 from "@/assets/gift-plants5.png";
import giftPlants6 from "@/assets/gift-plants6.png";
import giftPlants7 from "@/assets/gift-plants7.png";
import giftPlants8 from "@/assets/gift-plants8.png";
import giftPlants9 from "@/assets/gift-plants9.png";
import giftPlants10 from "@/assets/gift-plants10.png";
import gifttFlowes1 from "@/assets/gift-flower1.png";
import gifttFlowes2 from "@/assets/gift-flower2.png";
import gifttFlowes3 from "@/assets/gift-flower3.png";
import gifttFlowes4 from "@/assets/gift-flower4.png";
import gifttFlowes5 from "@/assets/gift-flower5.png";
import gifttFlowes6 from "@/assets/gift-flower6.png";
import gifttFlowes7 from "@/assets/gift-flower7.png";
import gifttFlowes8 from "@/assets/gift-flower8.png";
import gifttFlowes9 from "@/assets/gift-flower9.png";
import gifttFlowes10 from "@/assets/gift-flower10.png";
import cupcakes1 from "@/assets/cupcakes_1.png";
import cupcakes2 from "@/assets/cupcakes_2.png";
import cupcakes3 from "@/assets/cupcakes_3.png";
import cupcakes4 from "@/assets/cupcakes_4.png";
import cupcakes5 from "@/assets/cupcakes_5.png";
import cupcakes6 from "@/assets/cupcakes_6.png";
import cupcakes7 from "@/assets/cupcakes_7.png";
import cupcakes8 from "@/assets/cupcakes_8.png";
import cupcakes9 from "@/assets/cupcakes_9.png";
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
import giftHampers1 from "@/assets/gift-hampers1.jpeg";
import giftHampers2 from "@/assets/gift-hampers2.jpeg";
import giftHampers3 from "@/assets/gift-hampers3.jpeg";
import giftHampers4 from "@/assets/gift-hampers4.jpeg";
import giftHampers5 from "@/assets/gift-hampers5.jpeg";
import giftHampers6 from "@/assets/gift-hampers6.jpeg";
import giftHampers7 from "@/assets/gift-hampers7.jpeg";
import giftHampers8 from "@/assets/gift-hampers8.jpeg";
import giftHampers9 from "@/assets/gift-hampers9.jpeg";
import giftHampers10 from "@/assets/gift-hampers10.jpeg";
import Apparel1 from "@/assets/Apparel1.png"
import Apparel2 from "@/assets/Apparel2.png"
import Apparel3 from "@/assets/Apparel3.png"
import Apparel4 from "@/assets/Apparel4.png"
import Apparel5 from "@/assets/Apparel5.png"
import Apparel6 from "@/assets/Apparel6.png"
import Apparel7 from "@/assets/Apparel7.png"
import Apparel8 from "@/assets/Apparel8.png"
import Apparel9 from "@/assets/Apparel9.png"
import Apparel10 from "@/assets/Apparel10.png"
import LaptopBags1 from "@/assets/LaptopBags1.png"
import LaptopBags2 from "@/assets/LaptopBags2.png"
import LaptopBags3 from "@/assets/LaptopBags3.png"
import LaptopBags4 from "@/assets/LaptopBags4.png"
import LaptopBags5 from "@/assets/LaptopBags5.png"
import LaptopBags6 from "@/assets/LaptopBags6.png"
import LaptopBags7 from "@/assets/LaptopBags7.png"
import LaptopBags8 from "@/assets/LaptopBags8.png"
import LaptopBags9 from "@/assets/LaptopBags9.png"
import Accessories1 from "@/assets/Accessories1.png"
import Accessories2 from "@/assets/Accessories2.png"
import Accessories3 from "@/assets/Accessories3.png"
import Accessories4 from "@/assets/Accessories4.png"
import Accessories5 from "@/assets/Accessories5.png"
import Accessories6 from "@/assets/Accessories6.png"
import Accessories7 from "@/assets/Accessories7.png"
import Accessories8 from "@/assets/Accessories8.png"
import Accessories9 from "@/assets/Accessories9.jpg"
import Promotional1 from "@/assets/Promotional1.png"
import Promotional2 from "@/assets/Promotional2.png"
import Promotional3 from "@/assets/Promotional3.png"
import Promotional4 from "@/assets/Promotional4.png"
import Promotional5 from "@/assets/Promotional5.png"
import Promotional6 from "@/assets/Promotional6.png"
import Promotional7 from "@/assets/Promotional7.png"
import Promotional8 from "@/assets/Promotional8.png"
import Promotional9 from "@/assets/Promotional9.png"
import CorporateCakes1 from "@/assets/CorporateCakes1.jpeg"
import CorporateCakes2 from "@/assets/CorporateCakes2.jpeg"
import CorporateCakes3 from "@/assets/CorporateCakes3.jpeg"
import CorporateCakes4 from "@/assets/CorporateCakes4.jpeg"
import CorporateCakes5 from "@/assets/CorporateCakes5.jpeg"
import CorporateCakes6 from "@/assets/CorporateCakes6.jpeg"
import CorporateCakes8 from "@/assets/CorporateCakes8.jpeg"
import CorporateCakes9 from "@/assets/CorporateCakes9.jpeg"
import CorporateCakes10 from "@/assets/CorporateCakes10.jpeg"
import Technology1 from "@/assets/Technology1.jpeg"
import Technology2 from "@/assets/Technology2.jpeg"
import Technology3 from "@/assets/Technology3.jpeg"
import Technology4 from "@/assets/Technology4.jpeg"
import Technology5 from "@/assets/Technology5.jpeg"
import Technology6 from "@/assets/Technology6.jpeg"
import Technology7 from "@/assets/Technology7.jpeg"
import Technology8 from "@/assets/Technology8.jpeg"
import Technology9 from "@/assets/Technology9.jpeg"
import Technology10 from "@/assets/Technology10.jpeg"
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
import SafetyItem1 from "@/assets/SafetyItem1.jpeg"
import SafetyItem2 from "@/assets/SafetyItem2.jpeg"
import SafetyItem3 from "@/assets/SafetyItem3.jpeg"
import SafetyItem4 from "@/assets/SafetyItem4.jpeg"
import SafetyItem5 from "@/assets/SafetyItem5.jpeg"
import SafetyItem6 from "@/assets/SafetyItem6.jpeg"
import SafetyItem7 from "@/assets/SafetyItem7.jpeg"
import SafetyItem8 from "@/assets/SafetyItem8.jpeg"
import SafetyItem9 from "@/assets/SafetyItem9.jpeg"
import SafetyItem10 from "@/assets/SafetyItem10.jpeg"
import giftBags from "@/assets/gift-bags.png";
import giftTech from "@/assets/gift-tech.png";
import trending1 from "@/assets/trending-1-new.png";
import trending2 from "@/assets/trending-2.png";
import trending3 from "@/assets/trending-3.jpg";
import trending4 from "@/assets/trending-4.png";
import trending5 from "@/assets/trending-5.png";
import trending6 from "@/assets/trending-6.png";

/* ─── Gift Categories ─── */
const giftCategories = [
  { img: giftHamper, label: "Corporate Gift Hampers", type: "Corporate Gift Hampers" },
  { img: Onboarding1, label: "Onboarding Gifts", type: "Onboarding Gifts" },
  { img: gifttFlowes1, label: "Corporate Flowers", type: "Corporate Flowers" },
  { img: cupcakes1, label: "Cupcakes for Corporate Events", type: "Cupcakes for Corporate Events" },
  { img: giftWriting, label: "Office & Writing Gifts for Corporate", type: "Office & Writing Gifts for Corporate" },
  { img: CorporateChocolate1, label: "Chocolates for Corporate Gifting", type: "Chocolates for Corporate Gifting" },
  { img: CorporateGift1, label: "Corporate Gifts", type: "Corporate Gifts" },
  { img: giftGadgets, label: "Corporate Technology Gifts", type: "Corporate Technology Gifts" },
  { img: giftEmployee, label: "Gifts for Employees", type: "Gifts for Employees" },
  { img: LaptopBags1, label: "Laptop Bags for Corporate Gifting", type: "Laptop Bags for Corporate Gifting" },
  { img: Apparel1, label: "Apparel for Corporate Gifting", type: "Apparel for Corporate Gifting" },
  { img: giftVip, label: "VIP & Executive", type: "VIP & Executive" },
  { img: giftPlants1, label: "Corporate Plants", type: "Corporate Plants" },
  { img: giftSustainable, label: "Sustainable Products", type: "Sustainable Products" },
  { img: giftDrinkware, label: "Drinkware for Corporate Gifting", type: "Drinkware for Corporate Gifting" },
  { img: CorporateBags1, label: "Corporate Bags & Travel Gifts", type: "Corporate Bags & Travel Gifts" },
  { img: Technology1, label: "Corporate Technology Gifts", type: "Corporate Technology Gifts" },
  { img: Accessories1, label: "Personal Accessories", type: "Personal Accessories" },
  { img: Promotional1, label: "Corporate Promotional Gifts", type: "Corporate Promotional Gifts" },
  { img: CorporateCakes1, label: "Corporate Cakes", type: "Corporate Cakes" },
  { img: SafetyItem1, label: "Outdoor & Safety Items", type: "Outdoor & Safety Items" },
];

/* ─── Trending Products ─── */
const trendingGifts = [
  { img: trending1, title: "Executive Leather Set", price: "AED 350", tag: "Best Seller", category: "Office & Writing Gifts for Corporate" },
  { img: trending2, title: "Luxury Chocolate Box", price: "AED 180", tag: "Popular", category: "Chocolates for Corporate Gifting" },
  { img: trending3, title: "Wellness Hamper", price: "AED 420", tag: "New", category: "Corporate Gift Hampers" },
  { img: trending4, title: "Branded Tech Kit", price: "AED 550", tag: "Premium", category: "Corporate Technology Gifts" },
  { img: trending5, title: "Gourmet Food Hamper", price: "AED 290", tag: "Trending", category: "Corporate Gift Hampers" },
  { img: trending6, title: "Desk Organizer Set", price: "AED 220", tag: "Popular", category: "Office & Writing Gifts for Corporate" },
];

/* ─── All Sample Gifting Items (for filter) ─── */
const allGifts = [
  ...trendingGifts,
  { img: giftHampers1, title: "Executive Gourmet Celebration Hamper", price: "AED 549", tag: "Premium", category: "Corporate Gift Hampers" },
  { img: giftHampers2, title: "Artisan Coffee & Treats Box", price: "AED 380", tag: "Popular", category: "Corporate Gift Hampers" },
  { img: giftHampers3, title: "Luxury Wellness & Spa Set", price: "AED 420", tag: "Bestseller", category: "Corporate Gift Hampers" },
  { img: giftHampers5, title: "Premium Dark Chocolate Selection", price: "AED 290", tag: "Gift", category: "Corporate Gift Hampers" },
  { img: giftHampers6, title: "Office Energy Boost Kit", price: "AED 310", tag: "New", category: "Corporate Gift Hampers" },
  { img: giftHampers7, title: "Signature Tea Party Hamper", price: "AED 450", tag: "Elegant", category: "Corporate Gift Hampers" },
  { img: giftHampers8, title: "Gourmet Savory Retreat", price: "AED 390", tag: "Gourmet", category: "Corporate Gift Hampers" },
  { img: giftHampers9, title: "Elite Executive Hamper V2", price: "AED 680", tag: "Elite", category: "Corporate Gift Hampers" },
  { img: giftHampers10, title: "Employee Appreciation Basket", price: "AED 210", tag: "Value", category: "Corporate Gift Hampers" },
  { img: giftHamper, title: "Deluxe Celebration Hamper", price: "AED 449", tag: "Bestseller", category: "Corporate Gift Hampers" },
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
  { img: giftPlants1, title: "Bonsai Zen Tree", price: "AED 119", tag: "Plants", category: "Corporate Plants" },
  { img: giftPlants2, title: "Desktop Succulent Garden", price: "AED 145", tag: "Popular", category: "Corporate Plants" },
  { img: giftPlants3, title: "Premium Snake Plant", price: "AED 180", tag: "Bestseller", category: "Corporate Plants" },
  { img: giftPlants4, title: "Mini Money Tree", price: "AED 160", tag: "Prosperity", category: "Corporate Plants" },
  { img: giftPlants5, title: "Office Aloe Vera Set", price: "AED 135", tag: "Purifying", category: "Corporate Plants" },
  { img: giftPlants6, title: "Executive Peace Lily", price: "AED 220", tag: "Premium", category: "Corporate Plants" },
  { img: giftPlants7, title: "Branded Bamboo Plant", price: "AED 195", tag: "Custom", category: "Corporate Plants" },
  { img: giftPlants8, title: "Jade Plant Arrangement", price: "AED 175", tag: "Good Luck", category: "Corporate Plants" },
  { img: giftPlants9, title: "Modern Ficus Bonsai", price: "AED 310", tag: "Luxury", category: "Corporate Plants" },
  { img: giftPlants10, title: "Ceramic Pothos Bowl", price: "AED 150", tag: "New", category: "Corporate Plants" },
  { img: gifttFlowes1, title: "Luxury Corporate Roses", price: "AED 350", tag: "Premium", category: "Corporate Flowers" },
  { img: gifttFlowes2, title: "Elegant Orchid Arrangement", price: "AED 420", tag: "Bestseller", category: "Corporate Flowers" },
  { img: gifttFlowes3, title: "Classic Mixed Bouquet", price: "AED 290", tag: "Popular", category: "Corporate Flowers" },
  { img: gifttFlowes4, title: "Desktop Flower Vase", price: "AED 210", tag: "New", category: "Corporate Flowers" },
  { img: gifttFlowes5, title: "Executive Hydrangeas", price: "AED 380", tag: "Luxury", category: "Corporate Flowers" },
  { img: gifttFlowes6, title: "Corporate Event Centerpiece", price: "AED 450", tag: "Event", category: "Corporate Flowers" },
  { img: gifttFlowes7, title: "Welcome Desk Arrangement", price: "AED 260", tag: "Classic", category: "Corporate Flowers" },
  { img: gifttFlowes8, title: "Festive Flower Basket", price: "AED 340", tag: "Festive", category: "Corporate Flowers" },
  { img: gifttFlowes9, title: "Premium Lily Collection", price: "AED 390", tag: "Premium", category: "Corporate Flowers" },
  { img: gifttFlowes10, title: "Bespoke Floral Stand", price: "AED 550", tag: "Grand", category: "Corporate Flowers" },
  { img: cupcakes1, title: "Logo Printed Cupcakes", price: "AED 180", tag: "Branded", category: "Cupcakes for Corporate Events" },
  { img: cupcakes2, title: "Premium Assorted Cupcakes", price: "AED 150", tag: "Bestseller", category: "Cupcakes for Corporate Events" },
  { img: cupcakes3, title: "Executive Event Cupcakes", price: "AED 220", tag: "VIP", category: "Cupcakes for Corporate Events" },
  { img: cupcakes4, title: "Celebration Cupcake Platter", price: "AED 250", tag: "Event", category: "Cupcakes for Corporate Events" },
  { img: cupcakes5, title: "Mini Diet Cupcakes", price: "AED 190", tag: "Healthy", category: "Cupcakes for Corporate Events" },
  { img: cupcakes6, title: "Elegant Gold Foil Cupcakes", price: "AED 320", tag: "Luxury", category: "Cupcakes for Corporate Events" },
  { img: cupcakes7, title: "Employee Birthday Cupcakes", price: "AED 140", tag: "Popular", category: "Cupcakes for Corporate Events" },
  { img: cupcakes8, title: "Festive Themed Cupcakes", price: "AED 210", tag: "Festive", category: "Cupcakes for Corporate Events" },
  { img: cupcakes9, title: "Custom Color Cupcakes", price: "AED 200", tag: "Custom", category: "Cupcakes for Corporate Events" },
  { img: giftDrinkware, title: "Thermal Hydration Bottle", price: "AED 89", tag: "Premium", category: "Drinkware for Corporate Gifting" },
  { img: giftWriting, title: "Signature Fountain Pen", price: "AED 209", tag: "Executive", category: "Office & Writing Gifts for Corporate" },
  { img: giftLaptopBag, title: "Anti-Theft Commuter Bag", price: "AED 319", tag: "Popular", category: "Laptop Bags for Corporate Gifting" },
  { img: trending2, title: "Belgian Truffles Box", price: "AED 149", tag: "Gift", category: "Chocolates for Corporate Gifting" },
  { img: trending4, title: "Wireless Charging Pad", price: "AED 179", tag: "Tech", category: "Corporate Technology Gifts" },
  { img: giftVip, title: "Crystal Award Plaque", price: "AED 849", tag: "VIP", category: "VIP & Executive" },
  { img: CorporateChocolate1, title: "Signature Truffle Collection", price: "AED 120", tag: "Premium", category: "Chocolates for Corporate Gifting" },
  { img: CorporateChocolate2, title: "Luxury Dark Pralines", price: "AED 145", tag: "Popular", category: "Chocolates for Corporate Gifting" },
  { img: CorporateChocolate3, title: "Assorted Belgian Delights", price: "AED 180", tag: "Bestseller", category: "Chocolates for Corporate Gifting" },
  { img: CorporateChocolate4, title: "Artisan Milk Chocolate Box", price: "AED 95", tag: "Classic", category: "Chocolates for Corporate Gifting" },
  { img: CorporateChocolate5, title: "Gourmet Ganache Selection", price: "AED 210", tag: "Luxury", category: "Chocolates for Corporate Gifting" },
  { img: CorporateChocolate6, title: "Branded Logo Chocolates", price: "AED 165", tag: "Custom", category: "Chocolates for Corporate Gifting" },
  { img: CorporateChocolate7, title: "Elite Cocoa Collection", price: "AED 240", tag: "VIP", category: "Chocolates for Corporate Gifting" },
  { img: CorporateChocolate8, title: "Gold Foil Surprise Box", price: "AED 135", tag: "Festive", category: "Chocolates for Corporate Gifting" },
  { img: CorporateChocolate9, title: "Master Chocolatier Set", price: "AED 320", tag: "Grand", category: "Chocolates for Corporate Gifting" },
  { img: CorporateChocolate10, title: "Sweet Appreciation Hamper", price: "AED 155", tag: "New", category: "Chocolates for Corporate Gifting" },
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
  // Laptop Bags
  { img: LaptopBags1, title: "Executive Laptop Bag I", price: "AED 249", tag: "Premium", category: "Laptop Bags for Corporate Gifting" },
  { img: LaptopBags2, title: "Slim Business Laptop Bag", price: "AED 199", tag: "Popular", category: "Laptop Bags for Corporate Gifting" },
  { img: LaptopBags3, title: "Branded Commuter Bag", price: "AED 279", tag: "Bestseller", category: "Laptop Bags for Corporate Gifting" },
  { img: LaptopBags4, title: "Anti-Theft Laptop Backpack", price: "AED 319", tag: "Secure", category: "Laptop Bags for Corporate Gifting" },
  { img: LaptopBags5, title: "Executive Leather Laptop Bag", price: "AED 399", tag: "Luxury", category: "Laptop Bags for Corporate Gifting" },
  { img: LaptopBags6, title: "Corporate Laptop Shoulder Bag", price: "AED 229", tag: "Classic", category: "Laptop Bags for Corporate Gifting" },
  { img: LaptopBags7, title: "Multi-Pocket Office Bag", price: "AED 259", tag: "Functional", category: "Laptop Bags for Corporate Gifting" },
  { img: LaptopBags8, title: "Waterproof Laptop Bag", price: "AED 289", tag: "Durable", category: "Laptop Bags for Corporate Gifting" },
  { img: LaptopBags9, title: "Eco-Friendly Laptop Bag", price: "AED 219", tag: "Eco", category: "Laptop Bags for Corporate Gifting" },
  // Apparel
  { img: Apparel1, title: "Branded Corporate Polo Shirt", price: "AED 89", tag: "Popular", category: "Apparel for Corporate Gifting" },
  { img: Apparel2, title: "Premium Embroidered Hoodie", price: "AED 149", tag: "Bestseller", category: "Apparel for Corporate Gifting" },
  { img: Apparel3, title: "Corporate Jacket with Logo", price: "AED 229", tag: "Premium", category: "Apparel for Corporate Gifting" },
  { img: Apparel4, title: "Branded T-Shirt Collection", price: "AED 69", tag: "Classic", category: "Apparel for Corporate Gifting" },
  { img: Apparel5, title: "Executive Vest with Branding", price: "AED 179", tag: "Elegant", category: "Apparel for Corporate Gifting" },
  { img: Apparel6, title: "Custom Print Sweatshirt", price: "AED 119", tag: "Custom", category: "Apparel for Corporate Gifting" },
  { img: Apparel7, title: "Corporate Cap & Hat Set", price: "AED 59", tag: "Trendy", category: "Apparel for Corporate Gifting" },
  { img: Apparel8, title: "Branded Sports Jersey", price: "AED 139", tag: "Active", category: "Apparel for Corporate Gifting" },
  { img: Apparel9, title: "Luxury Embroidered Shirt", price: "AED 199", tag: "Luxury", category: "Apparel for Corporate Gifting" },
  { img: Apparel10, title: "Full Uniform Corporate Set", price: "AED 349", tag: "VIP", category: "Apparel for Corporate Gifting" },
  // Personal Accessories
  { img: Accessories1, title: "Premium Leather Wallet", price: "AED 149", tag: "Premium", category: "Personal Accessories" },
  { img: Accessories2, title: "Executive Card Holder", price: "AED 99", tag: "Popular", category: "Personal Accessories" },
  { img: Accessories3, title: "Branded Keychain Set", price: "AED 79", tag: "Bestseller", category: "Personal Accessories" },
  { img: Accessories4, title: "Corporate Pen Set", price: "AED 120", tag: "Classic", category: "Personal Accessories" },
  { img: Accessories5, title: "Luxury Watch Box Set", price: "AED 350", tag: "Luxury", category: "Personal Accessories" },
  { img: Accessories6, title: "Branded Sunglasses Case", price: "AED 89", tag: "Trendy", category: "Personal Accessories" },
  { img: Accessories7, title: "Elite Cufflink Set", price: "AED 199", tag: "Elegant", category: "Personal Accessories" },
  { img: Accessories8, title: "Premium Belt Gift Box", price: "AED 249", tag: "VIP", category: "Personal Accessories" },
  { img: Accessories9, title: "Signature Scarf Collection", price: "AED 175", tag: "New", category: "Personal Accessories" },
  // Corporate Promotional Gifts
  { img: Promotional1, title: "Branded Tote Bag", price: "AED 59", tag: "Popular", category: "Corporate Promotional Gifts" },
  { img: Promotional2, title: "Custom Logo Mug Set", price: "AED 75", tag: "Bestseller", category: "Corporate Promotional Gifts" },
  { img: Promotional3, title: "Promotional Pen Pack", price: "AED 45", tag: "Value", category: "Corporate Promotional Gifts" },
  { img: Promotional4, title: "Corporate Notebook Set", price: "AED 89", tag: "Classic", category: "Corporate Promotional Gifts" },
  { img: Promotional5, title: "Branded USB Drive", price: "AED 65", tag: "Tech", category: "Corporate Promotional Gifts" },
  { img: Promotional6, title: "Custom Printed Cap", price: "AED 55", tag: "Trendy", category: "Corporate Promotional Gifts" },
  { img: Promotional7, title: "Eco Promotional Kit", price: "AED 110", tag: "Eco", category: "Corporate Promotional Gifts" },
  { img: Promotional8, title: "Event Giveaway Bundle", price: "AED 95", tag: "Event", category: "Corporate Promotional Gifts" },
  { img: Promotional9, title: "Premium Promo Gift Set", price: "AED 135", tag: "Premium", category: "Corporate Promotional Gifts" },
  // Corporate Cakes
  { img: CorporateCakes1, title: "Luxury Branded Corporate Cake", price: "AED 299", tag: "Premium", category: "Corporate Cakes" },
  { img: CorporateCakes2, title: "Logo Printed Celebration Cake", price: "AED 249", tag: "Branded", category: "Corporate Cakes" },
  { img: CorporateCakes3, title: "Executive Tier Cake", price: "AED 399", tag: "Elegant", category: "Corporate Cakes" },
  { img: CorporateCakes4, title: "Corporate Anniversary Cake", price: "AED 349", tag: "Bestseller", category: "Corporate Cakes" },
  { img: CorporateCakes5, title: "Gold Foil Business Cake", price: "AED 450", tag: "Luxury", category: "Corporate Cakes" },
  { img: CorporateCakes6, title: "Customised Office Party Cake", price: "AED 279", tag: "Custom", category: "Corporate Cakes" },
  { img: CorporateCakes8, title: "Mini Corporate Cupcake Tower", price: "AED 380", tag: "Event", category: "Corporate Cakes" },
  { img: CorporateCakes9, title: "Bespoke Milestone Cake", price: "AED 499", tag: "VIP", category: "Corporate Cakes" },
  { img: CorporateCakes10, title: "Classic Branded Sponge Cake", price: "AED 219", tag: "New", category: "Corporate Cakes" },
  // Corporate Technology Gifts
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
  // Corporate Bags & Travel Gifts
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
  // Outdoor & Safety Items
  { img: SafetyItem1, title: "Premium Safety Vest Gift Set", price: "AED 129", tag: "Essential", category: "Outdoor & Safety Items" },
  { img: SafetyItem2, title: "Branded First Aid Kit", price: "AED 99", tag: "Popular", category: "Outdoor & Safety Items" },
  { img: SafetyItem3, title: "Corporate Outdoor Adventure Kit", price: "AED 249", tag: "Bestseller", category: "Outdoor & Safety Items" },
  { img: SafetyItem4, title: "Reflective Safety Cap Set", price: "AED 79", tag: "Classic", category: "Outdoor & Safety Items" },
  { img: SafetyItem5, title: "Emergency Roadside Kit", price: "AED 189", tag: "Safety", category: "Outdoor & Safety Items" },
  { img: SafetyItem6, title: "Branded Hard Hat Collection", price: "AED 149", tag: "Custom", category: "Outdoor & Safety Items" },
  { img: SafetyItem7, title: "Executive Outdoor Survival Kit", price: "AED 299", tag: "Premium", category: "Outdoor & Safety Items" },
  { img: SafetyItem8, title: "Corporate PPE Gift Bundle", price: "AED 179", tag: "VIP", category: "Outdoor & Safety Items" },
  { img: SafetyItem9, title: "Branded Safety Torch Set", price: "AED 109", tag: "Trendy", category: "Outdoor & Safety Items" },
  { img: SafetyItem10, title: "Eco Outdoor Wellness Kit", price: "AED 219", tag: "Eco", category: "Outdoor & Safety Items" },
];

/* ─── Why Choose Us ─── */
const whyChoose = [
  { icon: Award, title: "10+ Years Experience", desc: "A decade of expertise in premium corporate gifting across the UAE and Middle East." },
  { icon: Sparkles, title: "100% Customisation", desc: "Every gift is tailored to your brand identity — logos, colors, messaging, and packaging." },
  { icon: Truck, title: "UAE-Wide Delivery", desc: "Timely and reliable delivery across all Emirates with seamless logistics." },
  { icon: Users, title: "Trusted by Top Brands", desc: "Serving leading corporations with high-quality gifts that align with brand values." },
];

/* ─── Smart Gifting Ideas ─── */
const smartGifting = [
  { icon: Briefcase, title: "Client Welcome Kits", desc: "Curated welcome kits with branded essentials and tasteful stationery to set the tone for long-term partnerships." },
  { icon: Heart, title: "Employee Appreciation", desc: "Thoughtful gifts from personalised desk items to wellness hampers that boost morale and strengthen loyalty." },
  { icon: Star, title: "Festive & Seasonal", desc: "Premium hampers, chocolates, and bespoke gifts for Ramadan, Diwali, National Day, and year-end celebrations." },
  { icon: Gift, title: "Event Giveaways", desc: "Stand out at conferences with practical and stylish promotional gifts that work as brand ambassadors." },
  { icon: Crown, title: "VIP Executive Gifting", desc: "Luxurious hampers, elegant décor pieces, or bespoke keepsakes for decision-makers and executives." },
  { icon: Package, title: "Bulk Gifting Packages", desc: "Consistent, cost-effective solutions with custom branding for large-scale corporate events and celebrations." },
];

/* ─── Testimonials ─── */
const testimonials = [
  { text: "Thank you very much for your assistance. The gifts were beautifully packaged and delivered on time. Hope to do business with you again soon.", author: "Jennifer M.", company: "Global Events Co." },
  { text: "Exceptional service from start to finish. The team understood our brand requirements perfectly and delivered stunning customised gifts for our entire team.", author: "Ahmad K.", company: "Tech Holdings UAE" },
  { text: "The quality of corporate gifts exceeded our expectations. Our clients were delighted with the premium packaging and personalised touches.", author: "Sarah L.", company: "Luxury Properties" },
  { text: "Outstanding responsiveness and attention to detail. We've been using their services for all our corporate gifting needs and couldn't be happier.", author: "David R.", company: "Finance Corp" },
  { text: "The team went above and beyond for our Ramadan gifting campaign. Every hamper was beautifully curated and delivered across all Emirates flawlessly.", author: "Fatima A.", company: "Media Group" },
];

/* ─── FAQs ─── */
const faqs = [
  { q: "Do you offer same-day delivery for corporate orders?", a: "Yes, same-day delivery may be possible depending on order details and requirements. Contact our corporate team for feasibility confirmation based on your specific request." },
  { q: "What are examples of corporate gifts?", a: "Corporate gifts include premium hampers, gourmet baskets, chocolates, branded merchandise, wellness kits, desk accessories, tech gadgets, and personalised keepsakes perfect for any occasion." },
  { q: "Can I add my company branding to gift hampers?", a: "Absolutely! All gift hampers can be customised with your company logo, brand colors, personalised message cards, and custom packaging to strengthen brand presence." },
  { q: "What is a good gift for a corporate employee?", a: "Good corporate employee gifts balance thoughtfulness and practicality. Options like gourmet hampers, plants, desk organisers, wellness sets, or tech accessories boost morale and express appreciation." },
  { q: "Do you deliver across all Emirates?", a: "Yes, we deliver corporate gifts to all Emirates including Dubai, Abu Dhabi, Sharjah, Ajman, Fujairah, Ras Al Khaimah, and Umm Al Quwain with timely service." },
  { q: "How far in advance should I place my order?", a: "We recommend placing orders at least 5-7 business days in advance for customised gifts. Standard gifts can often be arranged with shorter lead times depending on availability." },
];

const toSlug = (text: string) => text.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-').replace(/[^\w-]/g, '');

/* ─── Animated Section Wrapper ─── */
const AnimatedSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── FAQ Item ─── */
const FAQItem = ({ q, a, index }: { q: string; a: string; index: number }) => {
  const [open, setOpen] = useState(false);
  return (
    <AnimatedSection delay={index * 0.06}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-5 rounded-xl border border-border bg-card hover:shadow-lg transition-all duration-300 group"
      >
        <div className="flex items-center justify-between gap-4">
          <span className="font-semibold text-foreground group-hover:text-accent transition-colors">{q}</span>
          {open ? <ChevronUp className="w-5 h-5 text-accent shrink-0" /> : <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />}
        </div>
        <motion.div
          initial={false}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="text-muted-foreground text-sm mt-3 leading-relaxed">{a}</p>
        </motion.div>
      </button>
    </AnimatedSection>
  );
};

/* ─── Testimonial Carousel ─── */
const TestimonialCarousel = () => {
  const [current, setCurrent] = useState(0);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
          className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-lg text-center"
        >
          <Quote className="w-10 h-10 text-accent/30 mx-auto mb-6" />
          <p className="text-foreground text-lg leading-relaxed mb-6 italic">
            "{testimonials[current].text}"
          </p>
          <div>
            <p className="font-bold text-foreground">{testimonials[current].author}</p>
            <p className="text-muted-foreground text-sm">{testimonials[current].company}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center justify-center gap-4 mt-6">
        <button onClick={prev} className="w-10 h-10 rounded-full border border-border bg-card hover:bg-secondary flex items-center justify-center transition-colors">
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-accent w-6" : "bg-border"}`}
            />
          ))}
        </div>
        <button onClick={next} className="w-10 h-10 rounded-full border border-border bg-card hover:bg-secondary flex items-center justify-center transition-colors">
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>
    </div>
  );
};

/* ─── Main Page ─── */
const CorporateGifts = () => {
  const { category: categoryParam, productId: productParam } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeType, setActiveType] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Sync state with URL params
  useEffect(() => {
    if (productParam) {
      const product = allGifts.find(g => toSlug(g.title) === productParam);
      if (product) {
        setSelectedProduct(product);
        setActiveType(null);
      }
    } else if (categoryParam) {
      const cat = giftCategories.find(c => toSlug(c.label) === categoryParam || toSlug(c.type) === categoryParam);
      if (cat) {
        setActiveType(cat.type);
        setSelectedProduct(null);

        // Use a slight delay to allow layout to settle before scrolling
        setTimeout(() => {
          const section = document.getElementById('gifts-section');
          if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      } else {
        // Fallback for direct activeType match
        const typeMatch = giftCategories.find(c => c.type === categoryParam);
        if (typeMatch) {
          setActiveType(typeMatch.type);
          setTimeout(() => {
            document.getElementById('gifts-section')?.scrollIntoView({ behavior: 'smooth' });
          }, 300);
        }
        setSelectedProduct(null);
      }
    } else {
      setActiveType(null);
      setSelectedProduct(null);

      // If navigated back to main corporate page from a sub-category, keep the section in focus
      if (location.pathname.endsWith('/corporate') || location.pathname.endsWith('/corporate/')) {
        setTimeout(() => {
          document.getElementById('gifts-section')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    }
  }, [categoryParam, productParam]);

  const handleProductClick = (product: any) => {
    navigate(`/corporate/${categoryParam || 'gift'}/${toSlug(product.title)}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleCategoryClick = (type: string) => {
    navigate(`/corporate/${toSlug(type)}`);
    document.getElementById('gifts-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    giftType: "",
    quantity: "",
    budget: "",
    message: "",
    contactMethod: [] as string[],
  });

  const handleCheckbox = (value: string) => {
    setForm((prev) => ({
      ...prev,
      contactMethod: prev.contactMethod.includes(value)
        ? prev.contactMethod.filter((v) => v !== value)
        : [...prev.contactMethod, value],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.contactMethod.length === 0) {
      toast.error("Please select at least one preferred method of contact.");
      return;
    }

    const { name, email, phone, company, giftType, quantity, budget, message, contactMethod } = form;

    // Helper to reset form
    const resetForm = () => {
      setForm({
        name: "",
        email: "",
        phone: "",
        company: "",
        giftType: "",
        quantity: "",
        budget: "",
        message: "",
        contactMethod: [],
      });
    };

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = "template_jl4sw5m"; // Fixed template ID as requested
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Handle Email Submission
    if (contactMethod.includes("Email")) {
      const templateParams = {
        name,
        email,
        phone,
        company,
        gift_type: giftType,
        quantity,
        budget,
        message,
        contact_method: "Email",
        to_email: "navazsherasiya0@gmail.com",
      };

      toast.promise(
        emailjs.send(serviceId, templateId, templateParams, publicKey),
        {
          loading: "Sending inquiry to email...",
          success: () => {
            resetForm();
            return "Inquiry sent to Email successfully!";
          },
          error: "Failed to send inquiry via Email",
        }
      );
    }
  };

  const inputClasses = "w-full border border-border rounded-lg px-4 py-3 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-shadow";

  if (selectedProduct) {
    return (
      <div className="min-h-screen bg-background">
        <ElvieNavbar />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-4">
            {/* Breadcrumb based on image */}
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-6 select-none border-b border-border pb-4">
              <span className="cursor-pointer hover:text-elvie-navy transition-colors" onClick={() => navigate('/corporate')}>Home</span>
              <span className="text-slate-300">/</span>
              <span className="cursor-pointer hover:text-elvie-navy transition-colors" onClick={() => navigate('/corporate')}>Corporate Gifting</span>
              <span className="text-slate-300">/</span>
              <span className="text-elvie-navy font-black">{selectedProduct.title}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start mb-16">
              {/* Product Visual */}
              {/* <div className="bg-gray-50/50 rounded-3xl border border-border p-4 md:p-8 group overflow-hidden shadow-sm flex items-center justify-center"> */}
              <div className="group overflow-hidden flex items-center justify-center">
                <img
                  src={selectedProduct.img}
                  alt={selectedProduct.title}
                  className="w-full h-auto object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-700 max-h-[450px]"
                />
              </div>

              {/* Product Info */}
              <div className="space-y-5">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-elvie-navy leading-tight mb-2 tracking-tight">
                    {selectedProduct.title}
                  </h1>
                  <p className="text-2xl font-black text-elvie-navy/60 mb-5 leading-none">
                    {selectedProduct.price}
                  </p>

                  <button
                    onClick={() => triggerEnquiry()}
                    className="px-10 py-3.5 bg-elvie-navy text-white font-bold rounded-full text-xs uppercase tracking-widest hover:bg-elvie-navy-deep transition-all shadow-[0_10px_30px_rgba(var(--elvie-navy),0.3)] transform hover:-translate-y-1 active:translate-y-0"
                  >
                    Enquire Now
                  </button>
                </div>

                <div className="space-y-6 pt-5 border-t border-border">
                  <div>
                    <h3 className="text-base font-bold text-elvie-navy mb-2 flex items-center gap-3">
                      <div className="w-1.5 h-5 bg-elvie-gold rounded-full" />
                      Description
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
                      An ideal gift set to make your workflow smooth and easy! This premium branded collection is perfect for employee appreciation, client onboarding, or as a thoughtful gesture for long-term partners. Crafted with precision and presented in our signature premium packaging.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-elvie-navy mb-2 flex items-center gap-3">
                      <div className="w-1.5 h-5 bg-elvie-gold rounded-full" />
                      Product Details
                    </h3>
                    <ul className="text-muted-foreground text-sm space-y-3 list-none font-medium">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-elvie-gold rounded-full" />
                        Premium Branded Box Packaging
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-elvie-gold rounded-full" />
                        Custom Logo Personalisation Included
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-elvie-gold rounded-full" />
                        Signature Appreciation Insert Card
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-elvie-gold rounded-full" />
                        Available for Bulk & Individual Orders
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div className="border-t border-border pt-20 mb-10">
              <div className="flex items-end justify-between mb-12">
                <div>
                  <h2 className="text-2xl font-bold text-elvie-navy mb-2">You may also like</h2>
                  <div className="w-12 h-1 bg-elvie-gold rounded-full" />
                </div>
                <button
                  onClick={() => {
                    navigate('/corporate');
                    window.scrollTo({ top: 0, behavior: 'instant' });
                  }}
                  className="text-elvie-navy text-sm font-bold hover:underline"
                >
                  View All Collections →
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {allGifts.filter(g => g.title !== selectedProduct.title).slice(0, 4).map((gift, i) => (
                  <motion.div
                    key={i}
                    className="group cursor-pointer"
                    onClick={() => handleProductClick(gift)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 border border-border mb-4 group-hover:shadow-xl transition-all">
                      <img src={gift.img} alt={gift.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <h4 className="text-sm font-bold text-foreground group-hover:text-elvie-navy transition-colors truncate mb-1">
                      {gift.title}
                    </h4>
                    <p className="text-elvie-navy font-black text-xs">{gift.price}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="py-16 elvie-gradient-dark">
            <div className="container mx-auto px-4 text-center">
              <h3 className="text-sm font-bold tracking-widest text-elvie-gold mb-8 uppercase">Grateful to Work with Clients</h3>
              <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {["Google", "Microsoft", "Amazon", "DAMAC", "Nakheel"].map(client => (
                  <span key={client} className="text-primary-foreground font-black tracking-tighter text-2xl">{client}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <ElvieFooter />
        <ScrollToTop />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ElvieNavbar />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-40 md:pt-48 pb-20">
        <img src={heroImg} alt="Corporate Gifts" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222,72%,8%,0.92)] via-[hsl(222,62%,18%,0.8)] to-transparent" />
        <div className="relative z-10 container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-2xl"
          >
            <motion.span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest text-elvie-gold border border-[hsl(var(--elvie-gold)/0.4)] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              CORPORATE GIFTING SOLUTIONS
            </motion.span>
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
              Premium Rewards for{" "}
              <span className="text-elvie-gold">Exceptional</span> Performers
            </h1>
            <p className="text-primary-foreground/80 text-lg mb-4 leading-relaxed">
              Motivate. Appreciate. Celebrate.
            </p>
            <p className="text-primary-foreground/65 text-base mb-8 leading-relaxed max-w-lg">
              Elevate your corporate gifting with bespoke solutions crafted to leave lasting impressions on clients, partners, and team members.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#inquiry"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-sm tracking-wider text-primary-foreground transition-all"
                style={{ background: "linear-gradient(135deg, hsl(40 80% 55%) 0%, hsl(35 90% 45%) 100%)" }}
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(200,150,50,0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                <Gift className="w-5 h-5" /> Get in Touch
              </motion.a>
              <motion.a
                href="tel:+971521327081"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-sm tracking-wider border-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone className="w-4 h-4" /> Talk to Expert
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ EXCLUSIVE GIFT CATEGORIES ═══════════ */}
      <section className="py-12 bg-background scroll-mt-28" id="gifts-section">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className={`flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 ${!activeType && 'text-center'}`}>
              <div className={activeType ? "max-w-3xl" : "mx-auto max-w-3xl"}>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {activeType ? activeType : "Exclusive Corporate Gifts"}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {activeType
                    ? `Explore our curated selection of high-quality ${activeType} specially chosen for corporate gifting excellence.`
                    : "Elvie Events offers a seamless solution for sending heartfelt and memorable gifts to your customers, partners, and team members. Explore our diverse range of premium gifts and make every gesture count."
                  }
                </p>
              </div>
              {activeType && (
                <button
                  onClick={() => navigate('/corporate')}
                  className="flex items-center gap-2 text-elvie-navy font-bold hover:underline transition-all whitespace-nowrap"
                >
                  <X className="w-4 h-4" /> View All Gifts
                </button>
              )}
            </div>
          </AnimatedSection>

          {activeType ? (
            /* ─── Filtered Collection View ─── */
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {allGifts.filter(g => g.category === activeType || (g as any).type === activeType).length > 0 ? (
                allGifts.filter(g => g.category === activeType || (g as any).type === activeType).map((gift, i) => (
                  <motion.div
                    key={`${gift.title}-${i}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden group hover:shadow-2xl transition-all duration-500"
                  >
                    <div
                      className="relative aspect-square overflow-hidden cursor-pointer flex items-center justify-center bg-gray-50/20"
                      onClick={() => handleProductClick(gift)}
                    >
                      <img src={gift.img} alt={gift.title} className="w-full h-full object-contain mix-blend-multiply p-4 group-hover:scale-110 transition-transform duration-700" />
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-primary-foreground bg-elvie-navy border border-elvie-gold/30 shadow-lg">
                        {gift.tag}
                      </span>
                    </div>
                    <div className="p-3 text-center">
                      <h3
                        className="text-[13px] font-bold text-foreground group-hover:text-elvie-navy transition-colors cursor-pointer line-clamp-1"
                        onClick={() => handleProductClick(gift)}
                      >
                        {gift.title}
                      </h3>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-24 text-center border-2 border-dashed border-border rounded-3xl">
                  <Package className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-xl font-bold text-muted-foreground mb-4">More collections for {activeType} are coming soon!</p>
                  <button onClick={() => navigate('/corporate')} className="text-elvie-navy font-bold hover:underline">Browse current collection</button>
                </div>
              )}
            </div>
          ) : (
            /* ─── Default Home Overview ─── */
            <>
              <div className="relative overflow-hidden mb-12 select-none">
                <motion.div
                  className="flex flex-nowrap gap-5 items-center"
                  animate={{ x: [0, "-50%"] }}
                  transition={{ x: { repeat: Infinity, duration: 40, ease: "linear" } }}
                  whileHover={{ transition: { duration: 80 } }}
                  style={{ width: "fit-content" }}
                >
                  {[...trendingGifts, ...trendingGifts].map((gift, i) => (
                    <div key={`${gift.title}-${i}`} className="flex-shrink-0 w-48 md:w-56 lg:w-64">
                      <motion.div
                        className="rounded-xl border border-border bg-card overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
                        whileHover={{ y: -6 }}
                        onClick={() => handleProductClick(gift)}
                      >
                        <div className="relative aspect-square overflow-hidden">
                          <img src={gift.img} alt={gift.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" width={512} height={512} />
                          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide text-primary-foreground bg-elvie-navy/80">{gift.tag}</span>
                        </div>
                        <div className="p-3 text-center">
                          <h3 className="text-[11px] font-bold text-foreground leading-tight group-hover:text-elvie-navy transition-colors">{gift.title}</h3>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                {giftCategories.map((cat, i) => (
                  <AnimatedSection key={cat.label} delay={i * 0.04}>
                    <motion.div
                      onClick={() => handleCategoryClick(cat.label)}
                      className="flex flex-col items-center rounded-xl border border-border bg-card hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
                      whileHover={{ y: -8, scale: 1.02 }}
                    >
                      <div className="w-full aspect-square overflow-hidden bg-secondary/30">
                        <img src={cat.img} alt={cat.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" width={512} height={512} />
                      </div>
                      <div className="p-3 text-center">
                        <span className="text-xs font-bold text-foreground tracking-wide uppercase leading-tight group-hover:text-accent transition-colors">{cat.label}</span>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ═══════════ BRANDED PACKAGING ═══════════ */}
      <section className="py-20 elvie-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <motion.div className="rounded-2xl overflow-hidden shadow-2xl" whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
                <img src={brandedImg} alt="Corporate Branded Packaging" className="w-full h-auto object-cover" loading="lazy" width={800} height={600} />
              </motion.div>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest text-elvie-gold border border-[hsl(var(--elvie-gold)/0.3)] mb-4">
                BRANDING
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Corporate Branded Packaging</h2>
              <p className="text-primary-foreground/75 leading-relaxed mb-6">
                First impressions matter, and uninspired packaging can dilute even the most thoughtful corporate gift. We transform this challenge into an opportunity with corporate-branded packaging that puts your brand at the forefront.
              </p>
              <p className="text-primary-foreground/65 leading-relaxed mb-6 text-sm">
                From customised logos to tailored designs, every detail is crafted to reflect your identity with style and professionalism. Our experts work closely with you to understand your goals and recommend solutions that align seamlessly with your brand values.
              </p>
              <ul className="space-y-3 mb-8">
                {["Custom logo placement & branding", "Tailored color schemes & finishes", "Premium unboxing experience", "Personalized message cards"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-primary-foreground/80 text-sm">
                    <CheckCircle className="w-4 h-4 text-elvie-gold shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <motion.a
                href="#inquiry"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-[hsl(var(--elvie-gold))] text-elvie-gold hover:bg-[hsl(var(--elvie-gold)/0.1)] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Talk to Expert <Send className="w-4 h-4" />
              </motion.a>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════ INQUIRY FORM (mid-page like FNP) ═══════════ */}
      <section id="inquiry" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedSection>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest text-accent border border-accent/30 mb-4">
                GET A QUOTE
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Get in Touch with Us</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Tell us about your gifting needs and our corporate gifting experts will create the perfect solution tailored to your brand and budget.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                  <div className="w-10 h-10 rounded-full elvie-gradient flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-primary-foreground" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">Call Us</p>
                    <a href="tel:+971521327081" className="font-semibold text-foreground hover:text-accent transition-colors">+971 52 132 7081</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                  <div className="w-10 h-10 rounded-full elvie-gradient flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Email Us</p>
                    <a href="mailto: elvieevents@gmail.com" className="font-semibold text-foreground hover:text-accent transition-colors">elvieevents@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border">
                  <div className="w-10 h-10 rounded-full elvie-gradient flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">WhatsApp</p>
                    <a href="https://wa.me/+971521327081" target="_blank" rel="noreferrer" className="font-semibold text-foreground hover:text-accent transition-colors">Chat with us</a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <motion.form onSubmit={handleSubmit} className="space-y-4 bg-card p-8 rounded-2xl border border-border shadow-lg">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Name <span className="text-destructive">*</span></label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClasses} placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Email <span className="text-destructive">*</span></label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClasses} placeholder="your@email.com" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Phone <span className="text-destructive">*</span></label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+971 50 XXX XXXX" className={inputClasses} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Company</label>
                    <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" className={inputClasses} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Gift Type</label>
                    <select value={form.giftType} onChange={(e) => setForm({ ...form, giftType: e.target.value })} className={inputClasses}>
                      <option value="">Select gift type</option>
                      <option value="hampers">Premium Hampers</option>
                      <option value="onboarding">Onboarding Gifts</option>
                      <option value="sustainable">Sustainable Gifts</option>
                      <option value="tech">Gadgets & Tech</option>
                      <option value="branded">Branded Merchandise</option>
                      <option value="corporate-gifts">Corporate Gifts</option>
                      <option value="chocolates">Chocolates for Gifting</option>
                      <option value="flowers">Flower Arrangements</option>
                      <option value="vip">VIP & Executive</option>
                      <option value="employee">Employee Gifts</option>
                      <option value="laptop-bags">Laptop Bags</option>
                      <option value="apparel">Apparel &amp; Clothing</option>
                      <option value="custom">Custom / Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Quantity</label>
                    <select value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} className={inputClasses}>
                      <option value="">Select quantity</option>
                      <option value="1-25">1 – 25</option>
                      <option value="26-50">26 – 50</option>
                      <option value="51-100">51 – 100</option>
                      <option value="101-500">101 – 500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Budget Range</label>
                    <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} className={inputClasses}>
                      <option value="">Select budget per gift</option>
                      <option value="under-100">Under AED 100</option>
                      <option value="100-250">AED 100 – 250</option>
                      <option value="250-500">AED 250 – 500</option>
                      <option value="500-1000">AED 500 – 1,000</option>
                      <option value="1000+">AED 1,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Preferred Contact</label>
                    <div className="flex gap-4 h-[46px] items-center px-4 border border-border rounded-lg bg-background">
                      <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-accent">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                          onChange={() => setForm({ ...form, contactMethod: ["Email"] })}
                          checked={true}
                          readOnly
                        />
                        <span>Email</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                  <textarea rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${inputClasses} resize-y`} placeholder="Tell us about your requirements..." />
                </div>
                <motion.button
                  type="submit"
                  className="w-full py-4 rounded-lg font-bold text-sm tracking-wider text-primary-foreground transition-colors"
                  style={{ background: "linear-gradient(135deg, hsl(222 62% 18%) 0%, hsl(222 80% 35%) 50%, hsl(222 80% 45%) 100%)" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Inquiry
                </motion.button>
              </motion.form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════ TRENDING GIFTS ═══════════ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* <AnimatedSection>
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Trending Gifts</h2>
              <a href="#inquiry" className="text-accent hover:underline font-semibold text-sm hidden sm:block">View All →</a>
            </div>
          </AnimatedSection> */}
          {/* <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {trendingGifts.map((gift, i) => (
              <AnimatedSection key={gift.title} delay={i * 0.06}>
                <motion.div
                  className="rounded-xl border border-border bg-card overflow-hidden group cursor-pointer hover:shadow-xl transition-all"
                  whileHover={{ y: -6 }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={gift.img}
                      alt={gift.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      width={512}
                      height={512}
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide text-primary-foreground elvie-gradient">
                      {gift.tag}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="text-xs font-bold text-foreground leading-tight mb-1">{gift.title}</h3>
                    <p className="text-accent font-bold text-sm">{gift.price}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div> */}
        </div>
      </section>

      {/* ═══════════ CUSTOM GIFT SOLUTIONS ═══════════ */}
      <section className="py-20 elvie-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.1}>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-widest text-elvie-gold border border-[hsl(var(--elvie-gold)/0.3)] mb-4">
                TAILORED SOLUTIONS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">Customer-Tailored Gift Solutions</h2>
              <p className="text-primary-foreground/75 leading-relaxed mb-6">
                Finding corporate gifts that genuinely reflect your brand can be challenging, especially when off-the-shelf options feel impersonal. That's why we offer customer-tailored gift solutions designed around your unique identity and values.
              </p>
              <p className="text-primary-foreground/60 leading-relaxed mb-8 text-sm">
                Our experts collaborate with you to understand your goals and curate gifts that align seamlessly with your brand ethos. From bespoke gift boxes and elegant packaging to personalised touches like logos and brand colours, every detail is crafted to make your gesture meaningful.
              </p>
              <motion.a
                href="#inquiry"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm border border-[hsl(var(--elvie-gold))] text-elvie-gold hover:bg-[hsl(var(--elvie-gold)/0.1)] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                Talk to Expert <Send className="w-4 h-4" />
              </motion.a>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <motion.div className="rounded-2xl overflow-hidden shadow-2xl" whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
                <img src={customImg} alt="Custom Gift Solutions" className="w-full h-auto object-cover" loading="lazy" width={800} height={600} />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════ CLIENTS LOGO MARQUEE ═══════════ */}
      <section className="py-16 bg-background border-y border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h3 className="text-center text-sm font-bold tracking-widest text-muted-foreground mb-10 uppercase">
              Grateful to Work with Leading Clients
            </h3>
          </AnimatedSection>
          <div className="overflow-hidden relative">
            <motion.div
              className="flex gap-12 items-center"
              animate={{ x: [0, -1200] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              {[
                "Google", "Microsoft", "Amazon", "DAMAC", "Nakheel",
                "Volkswagen", "MAF", "Grundfos", "Jotun", "Kompan",
                "Google", "Microsoft", "Amazon", "DAMAC", "Nakheel",
                "Volkswagen", "MAF", "Grundfos", "Jotun", "Kompan",
              ].map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex-shrink-0 w-28 h-14 rounded-lg bg-secondary/60 border border-border flex items-center justify-center px-3"
                >
                  <span className="text-xs font-bold text-muted-foreground tracking-wide whitespace-nowrap">{name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Clients Love Us</h2>
              <p className="text-muted-foreground">Here's what our corporate clients say about our gifting services.</p>
            </div>
          </AnimatedSection>
          <TestimonialCarousel />
        </div>
      </section>

      {/* ═══════════ WHY CHOOSE US ═══════════ */}
      <section className="py-20 elvie-gradient-diagonal">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Why Choose Elvie Events for Corporate Gifting?</h2>
              <p className="text-primary-foreground/70 max-w-2xl mx-auto">
                Selecting the right corporate gifting partner is key to strengthening relationships and enhancing your brand image.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChoose.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <motion.div
                  className="p-6 rounded-xl bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 text-center hover:bg-primary-foreground/15 transition-colors"
                  whileHover={{ y: -6 }}
                >
                  <div className="w-14 h-14 rounded-full bg-[hsl(var(--elvie-gold)/0.2)] flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-elvie-gold" />
                  </div>
                  <h3 className="font-bold text-primary-foreground mb-2">{item.title}</h3>
                  <p className="text-primary-foreground/65 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ SMART GIFTING IDEAS ═══════════ */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Smart Ways to Leverage Corporate Gifting</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Corporate gifting goes beyond tradition — it's a smart strategy to strengthen relationships, enhance brand recall, and celebrate the people who matter most.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {smartGifting.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <motion.div
                  className="p-6 rounded-xl border border-border bg-card hover:shadow-xl transition-all group"
                  whileHover={{ y: -6 }}
                >
                  <div className="w-12 h-12 rounded-lg elvie-gradient flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQs ═══════════ */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about our corporate gifting services.</p>
            </div>
          </AnimatedSection>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ BOTTOM CTA ═══════════ */}
      <section className="py-16 elvie-gradient">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Ready to Elevate Your Corporate Gifting?</h2>
            <p className="text-primary-foreground/75 mb-8 max-w-xl mx-auto">
              Let us help you create unforgettable corporate gifts that strengthen relationships and enhance your brand.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="#inquiry"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-sm tracking-wider transition-all"
                style={{ background: "linear-gradient(135deg, hsl(40 80% 55%), hsl(35 90% 45%))" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Gift className="w-5 h-5" /> Get Custom Quote
              </motion.a>
              <motion.a
                href="tel:+971521327081"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-sm tracking-wider border-2 border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Phone className="w-4 h-4" /> Call Us Now
              </motion.a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ BOTTOM CONTACT BAR ═══════════ */}
      <section className="py-6 elvie-gradient-dark border-t border-primary-foreground/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-primary-foreground/70 text-sm">
            <a href="tel:+971521327081" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone className="w-4 h-4" /> +971 52 132 7081
            </a>
            <span className="hidden md:block text-primary-foreground/30">|</span>
            <a href="mailto:navazsherasiya0@gmail.com" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Mail className="w-4 h-4" /> elvieevents@gmail.com
            </a>
            <span className="hidden md:block text-primary-foreground/30">|</span>
            <a href="https://wa.me/+971521327081" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <MessageSquare className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <ElvieFooter />
      <ScrollToTop />
    </div>
  );
};

export default CorporateGifts;
