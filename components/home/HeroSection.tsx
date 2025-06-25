import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1524230572899-a752b3835840?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold mb-8">
          Find Your Dream Home in Ethiopia
        </h1>

        {/* Zillow-style Search Bar */}
        <div className="bg-white rounded-lg p-1 shadow-2xl max-w-2xl mx-auto">
          <div className="flex items-center">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Enter an address, neighborhood, city, or ZIP code"
                className="h-14 text-lg border-0 bg-transparent text-gray-800 placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button className="h-12 w-12 bg-primary hover:bg-primary/90 rounded-md">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
