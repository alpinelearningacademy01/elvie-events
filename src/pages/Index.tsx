import ElvieNavbar from "@/components/ElvieNavbar";
import ElvieHero from "@/components/ElvieHero";
import ElvieGiftingBanner from "@/components/ElvieGiftingBanner";
import ElvieAbout from "@/components/ElvieAbout";
import ElvieClients from "@/components/ElvieClients";
import ElvieEventVideos from "@/components/ElvieEventVideos";
import ElvieServices from "@/components/ElvieServices";
import ElvieStats from "@/components/ElvieStats";
import ElvieCTA from "@/components/ElvieCTA";
import ElvieContact from "@/components/ElvieContact";
import ElvieFooter from "@/components/ElvieFooter";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <ElvieNavbar />
      <ElvieHero />
      <ElvieGiftingBanner />
      <ElvieAbout />
      <ElvieClients />
      <ElvieEventVideos />
      <ElvieServices />
      <ElvieStats />
      <ElvieCTA />
      <ElvieContact />
      <ElvieFooter />
      <ScrollToTop />
    </div>
  );
};

export default Index;
