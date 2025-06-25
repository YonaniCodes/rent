export interface ListedBy {
  role: "agent" | "landlord" | "real_estate";
  name: string;
  logo?: string;
  verified: boolean;
}

export interface Property {
  id: number;
  title: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  location: string;
  images: string[];
  listedBy: ListedBy;
  status?: string;
  daysOnMarket?: number;
  area?: string;
}

export interface PropertyCardProps {
  property?: Property;
  children: React.ReactNode;
  className?: string;
  onLike?: (propertyId: number, isLiked: boolean) => void;
  isLiked?: boolean;
}

export interface PropertyCardChildProps {
  property: Property;
  className?: string;
  onLike?: (propertyId: number, isLiked: boolean) => void;
  isLiked?: boolean;
}
