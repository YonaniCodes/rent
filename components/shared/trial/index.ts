// components/property-card/index.ts
import { Root } from "./Root";
import Image from "./Image";
import Info from "./Info";
import ListedBy from "./ListedBy";

export const PropertyCard = Object.assign(Root, {
  Image,
  Info,
  ListedBy,
});

export default PropertyCard;
