///page.tsx (if using App Router and Next.js 13+)

import Navbar from "@/components/shared/Navbar";
import HeroSection from "@/components/home/HeroSection";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import LocationSection from "@/components/home/LocationSection";
import StatsSection from "@/components/home/StatsSection";
import Footer from "@/components/shared/Footer";
import UserProfile from "@/components/home/UserProfile";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar>
        <UserProfile />
      </Navbar>
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
