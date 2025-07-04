import PropertyCard from "@/components/shared/PropertyCard";
import { properties } from "@/data/data";
// or "./index"

const FeaturedProperties = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lbg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Homes For You in Addis Ababa, Ethiopia
          </h2>
          <p className="text-gray-600">Based on homes you recently viewed</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} className="w-full">
              <PropertyCard.Images property={property} showCarousel={true}>
                <PropertyCard.Badges property={property} />
                <PropertyCard.OwnerStamp property={property} />
              </PropertyCard.Images>
              <PropertyCard.Info property={property} />
              {/* <PropertyCard.ListedBy property={property} /> */}
            </PropertyCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
