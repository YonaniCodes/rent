
import { Card, CardContent } from "@/components/ui/card";

const LocationSection = () => {
  const cities = [
    {
      name: "Addis Ababa",
      properties: "1,200+ properties",
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "The capital city with modern amenities"
    },
    {
      name: "Bahir Dar",
      properties: "350+ properties", 
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Beautiful lakeside city"
    },
    {
      name: "Hawassa",
      properties: "280+ properties",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Growing industrial hub"
    },
    {
      name: "Mekelle",
      properties: "190+ properties",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Historic northern city"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore by Location
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find your ideal home in Ethiopia's most vibrant cities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((city, index) => (
            <Card key={index} className="property-card-hover cursor-pointer border-0 shadow-lg overflow-hidden">
              <div className="relative">
                <div 
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${city.image})` }}
                >
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{city.name}</h3>
                    <p className="text-sm text-gray-200">{city.properties}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-gray-600 text-sm">{city.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
