import HeroSection from "@/components/landing-page/HeroSection";
import FeaturedProperties from "@/components/landing-page/FeaturedProperties";
import LocationSection from "@/components/landing-page/LocationSection";
import StatsSection from "@/components/landing-page/StatsSection";
import Footer from "@/components/shared/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <FeaturedProperties />
        <LocationSection />
        <StatsSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
