"use client";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import PropertyCard from "../shared/PropertyCard";
import { Home } from "@/types/home";

export default function HomeList({
  homes,
  view,
}: {
  homes: Home[];
  view: "map" | "list";
}) {
  const searchParams = useSearchParams();
  const filteredHomes = filterProperties(searchParams, homes);
  return (
    <div
      className={`
      // ${view === "list" ? "block" : "hidden"} 
      lg:block 
      w-full lg:w-2/3
    `}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
        {filteredHomes.map((home) => (
          <PropertyCard key={home.id} className="w-full">
            <PropertyCard.Images home={home} showCarousel={true}>
              <PropertyCard.Badges home={home} />
              <PropertyCard.OwnerStamp home={home} />
            </PropertyCard.Images>
            <PropertyCard.Info home={home} />
          </PropertyCard>
        ))}
        ``
        {filteredHomes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No properties found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function filterProperties(
  params: ReadonlyURLSearchParams,
  homes: Home[]
): Home[] {
  const search = params.get("search");
  const minPrice = params.get("minPrice");
  const maxPrice = params.get("maxPrice");
  const beds = params.get("beds");
  const baths = params.get("baths");
  const homeType = params.get("homeType");
  const status = params.get("status");

  return homes.filter((home) => {
    const price = home.price;

    return (
      (!search ||
        home.title.toLowerCase().includes(search.toLowerCase()) ||
        home.city?.toLowerCase().includes(search.toLowerCase())) &&
      (!minPrice || price >= parseInt(minPrice)) &&
      (!maxPrice || price <= parseInt(maxPrice)) &&
      (!beds || home.bedrooms >= parseInt(beds)) &&
      (!baths || home.bathrooms >= parseInt(baths)) &&
      (!homeType || homeType === "all" || home.type === homeType) &&
      (!status || status === "all" || home.status === status)
    );
  });
}
