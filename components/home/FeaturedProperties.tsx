import PropertyCard, { Property } from "@/components/shared/PropertyCard";
// or "./index"

const FeaturedProperties = () => {
  const properties: Property[] = [
    {
      id: 1,
      title: "2924 Bethel Rd",
      location: "Bole, Addis Ababa, 1000",
      price: "253,100 ETB",
      bedrooms: 4,
      bathrooms: 2,
      area: "1,050 sqft",
      images: [
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      status: "New heater",
      listedBy: {
        role: "agent",
        name: "Sarah Johnson",
        verified: true,
        logo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=32&h=32&fit=crop&crop=face",
      },
    },
    {
      id: 2,
      title: "2905 W 3rd St",
      location: "Old Airport, Addis Ababa, 1000",
      price: "250,000 ETB",
      bedrooms: 3,
      bathrooms: 1,
      area: "1,464 sqft",
      images: [
        "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      status: "Hardwood flooring",
      listedBy: {
        role: "landlord",
        name: "Michael Chen",
        verified: false,
      },
    },
    {
      id: 3,
      title: "1125 Morton Ave",
      location: "CMC, Addis Ababa, 1000",
      price: "170,000 ETB",
      bedrooms: 3,
      bathrooms: 1,
      area: "1,088 sqft",
      images: [
        "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      daysOnMarket: 9,
      listedBy: {
        role: "real_estate",
        name: "Prime Properties Inc",
        verified: true,
        logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=32&h=32&fit=crop&crop=center",
      },
    },
    {
      id: 4,
      title: "714 Villa Dr",
      location: "Kazanchis, Addis Ababa, 1000",
      price: "310,000 ETB",
      bedrooms: 3,
      bathrooms: 3,
      area: "1,805 sqft",
      images: [
        "https://images.unsplash.com/photo-1472396961693-142e6e269027?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      status: "Open: Sun 12-2pm",
      listedBy: {
        role: "agent",
        name: "David Wilson",
        verified: true,
        logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      },
    },
    {
      id: 5,
      title: "1234 Piazza Ave",
      location: "Piazza, Addis Ababa, 1000",
      price: "185,000 ETB",
      bedrooms: 2,
      bathrooms: 1,
      area: "890 sqft",
      images: [
        "https://images.unsplash.com/photo-1524230572899-a752b3835840?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      daysOnMarket: 5,
      listedBy: {
        role: "landlord",
        name: "Emma Thompson",
        verified: true,
      },
    },
    {
      id: 6,
      title: "5678 Sarbet St",
      location: "Sarbet, Addis Ababa, 1000",
      price: "420,000 ETB",
      bedrooms: 4,
      bathrooms: 3,
      area: "2,200 sqft",
      images: [
        "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      status: "Price reduced",
      listedBy: {
        role: "real_estate",
        name: "Luxury Homes Realty",
        verified: true,
        logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=32&h=32&fit=crop&crop=center",
      },
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Homes For You in Addis Ababa, Ethiopia
          </h2>
          <p className="text-gray-600">Based on homes you recently viewed</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} className="w-full">
              <PropertyCard.Image property={property} />
              <PropertyCard.Badges property={property} />
              <PropertyCard.Info property={property} />
              <PropertyCard.ListedBy property={property} />
            </PropertyCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
