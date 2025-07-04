import { PropertyFilters } from "@/components/search/PropertyFilters";
import PropertySort from "@/components/search/PropertySort";
import Toolbar from "@/components/search/ToolBar";
import SearchBar from "@/components/shared/SearchBar";
import { getHomes } from "@/actions/auth/homes";
import MapAndList from "@/components/search/MapAndHomeList";

export default async function Search({
  params,
}: {
  params: Promise<{ lat: string; lng: string }>;
}) {
  const { lat, lng } = await params;
  const homes = await getHomes(lat, lng);
  if (!homes) return null;

  return (
    <div className="pt-[140px]">
      <div className="container mx-auto px-4">
        <Toolbar>
          <SearchBar
            className="w-full sm:w-[400px] lg:w-[600px]"
            inputClassName="h-10"
          />
          <PropertyFilters />
          <PropertySort />
        </Toolbar>
        <MapAndList homes={homes} />
      </div>
    </div>
  );
}
