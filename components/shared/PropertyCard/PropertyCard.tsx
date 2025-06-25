import PropertyCardRoot from "./PropertyCardRoot";
import PropertyCardImage from "./PropertyCardImage";
import PropertyCardBadges from "./PropertyCardBadges";
import PropertyCardInfo from "./PropertyCardInfo";
import PropertyCardListedBy from "./PropertyCardListedBy";
import PropertyCardActions from "./PropertyCardActions";

// Create the compound component with proper typing
const PropertyCard = Object.assign(PropertyCardRoot, {
  Image: PropertyCardImage,
  Badges: PropertyCardBadges,
  Info: PropertyCardInfo,
  ListedBy: PropertyCardListedBy,
  Actions: PropertyCardActions,
});

export default PropertyCard;
export type { Property, ListedBy } from "./types";
