import { Home } from "@/types/home";

export interface PropertyCardProps {
  home?: Home;
  children: React.ReactNode;
  className?: string;
  onLike?: (propertyId: number, isLiked: boolean) => void;
  isLiked?: boolean;
}

export interface PropertyCardChildProps {
  home: Home;
  className?: string;
  onLike?: (propertyId: number, isLiked: boolean) => void;
  isLiked?: boolean;
}
