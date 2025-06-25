// components/property-card/types.ts

export interface ListedByData {
  logoUrl?: string;
  role: string;
  name: string;
  verified: boolean;
}

export interface PropertyData {
  id: string | number;
  imageSrc: string;
  imageAlt?: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  title: string;
  location: string;
  listedBy: ListedByData;
}
