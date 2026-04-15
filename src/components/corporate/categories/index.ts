import CorporateApparel, { gifts as apparelGifts } from "./CorporateApparel";
import CorporateCakes, { gifts as cakesGifts } from "./CorporateCakes";
import CorporateChocolates, { gifts as chocolatesGifts } from "./CorporateChocolates";
import CorporateCupcakes, { gifts as cupcakesGifts } from "./CorporateCupcakes";
import CorporateFlowers, { gifts as flowersGifts } from "./CorporateFlowers";
import CorporatePlants, { gifts as plantsGifts } from "./CorporatePlants";
import CorporateTechGifts, { gifts as techGifts } from "./CorporateTechGifts";
import GeneralCorporateGifts, { gifts as generalGifts } from "./GeneralCorporateGifts";
import LaptopBags, { gifts as laptopBagsGifts } from "./LaptopBags";
import OfficeGifts, { gifts as officeGifts } from "./OfficeGifts";
import OnboardingGifts, { gifts as onboardingGifts } from "./OnboardingGifts";
import PersonalAccessories, { gifts as personalAccessoriesGifts } from "./PersonalAccessories";
import PromotionalGifts, { gifts as promotionalGifts } from "./PromotionalGifts";
import CorporateGiftHampers, { gifts as hampersGifts } from "./CorporateGiftHampers";
import VipExecutiveGifts, { gifts as vipGifts } from "./VipExecutiveGifts";
import CorporateTravelBags, { gifts as travelBagsGifts } from "./CorporateTravelBags";
import OutdoorSafetyGifts, { gifts as safetyGifts } from "./OutdoorSafetyGifts";
import DrinkwareGifts, { gifts as drinkwareGifts } from "./DrinkwareGifts";
import TrendingGifts, { gifts as trendingGiftsData } from "./TrendingGifts";

export {
  CorporateApparel,
  CorporateCakes,
  CorporateChocolates,
  CorporateCupcakes,
  CorporateFlowers,
  CorporatePlants,
  CorporateTechGifts,
  GeneralCorporateGifts,
  LaptopBags,
  OfficeGifts,
  OnboardingGifts,
  PersonalAccessories,
  PromotionalGifts,
  CorporateGiftHampers,
  VipExecutiveGifts,
  CorporateTravelBags,
  OutdoorSafetyGifts,
  DrinkwareGifts,
  TrendingGifts,
  // Exporting data for thumbnails and filter
  apparelGifts,
  cakesGifts,
  chocolatesGifts,
  cupcakesGifts,
  flowersGifts,
  plantsGifts,
  techGifts,
  generalGifts,
  laptopBagsGifts,
  officeGifts,
  onboardingGifts,
  personalAccessoriesGifts,
  promotionalGifts,
  hampersGifts,
  vipGifts,
  travelBagsGifts,
  safetyGifts,
  drinkwareGifts,
  trendingGiftsData
};

export const allModularGifts = [
  ...apparelGifts,
  ...cakesGifts,
  ...chocolatesGifts,
  ...cupcakesGifts,
  ...flowersGifts,
  ...plantsGifts,
  ...techGifts,
  ...generalGifts,
  ...laptopBagsGifts,
  ...officeGifts,
  ...onboardingGifts,
  ...personalAccessoriesGifts,
  ...promotionalGifts,
  ...hampersGifts,
  ...vipGifts,
  ...travelBagsGifts,
  ...safetyGifts,
  ...drinkwareGifts
];
