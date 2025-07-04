import { getHome } from "@/actions/auth/homes";
import Description from "@/components/home/Description";
import HomeDetailActions from "@/components/home/HomeDetailActions";
import { HomeDetails } from "@/components/home/HomeDetails";
import HomeHeader from "@/components/home/HomeHeader";
import GalleryWithDialog from "@/components/home/ImageCrousel";
import { LocationInfo } from "@/components/home/LocationInfo";
import HomeWrapper from "@/components/home/main";

import ListerInfo from "@/components/home/AgentInfo";

export default async function page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const home = await getHome(id);

  return (
    <HomeWrapper>
      <HomeDetailActions status={home.status} />
      <GalleryWithDialog images={home.images}></GalleryWithDialog>
      <HomeHeader
        title={home.title}
        address={home.address}
        city={home.city}
        state={home.state}
        zipCode={home.zipCode}
        rating={home.rating}
        reviews={home.reviews}
        price={home.price}
        priceType={home.priceType}
        sqft={home.area}
      />
      <HomeDetails
        bedrooms={home.bedrooms}
        bathrooms={home.bathrooms}
        sqft={home.area}
        yearBuilt={1999}
        propertyType={home.type}
      />
      <Description description={home.description} />
      {/* <AmenitiesList amenities={home.amenities} /> */}
      <LocationInfo
        address={`${home.address}, ${home.city}, ${home.state} ${home.zip_code}`}
      />
      <ListerInfo listedBy={home.listedBy} />
    </HomeWrapper>
  );
}
