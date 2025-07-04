import PropertyCardRoot from "./Root";
import PropertyCardImages from "./Images";
import PropertyCardBadges from "./Badges";
import PropertyCardInfo from "./Info";
import OwnerStamp from "./OwnerStamp";

// Create the compound component with proper typing
const PropertyCard = Object.assign(PropertyCardRoot, {
  Images: PropertyCardImages,
  Badges: PropertyCardBadges,
  Info: PropertyCardInfo,
  OwnerStamp,
});

export default PropertyCard;
