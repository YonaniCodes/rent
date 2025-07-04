import { Company } from "./company";

export interface ListedBy {
  role: "agent" | "landlord" | "real_estate";
  name?: string;
  image?: string;
  telegram_id: string;
  company: Company;
}

export interface Home {
  description: string;
  address: string;
  lat: number;
  lng: number;
  id: number;
  title: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  location: string; // frontend-composed: e.g., `${city}, ${state}`
  images: string[];
  listed_by: ListedBy;
  status: "for sale" | "sold" | "for rent";
  area: string;
  city: string;
  state: string;
  zipCode: string;
  type: "condo" | "house" | "apartment" | "townhouse" | "real estate";
  is_verified: boolean;
  is_price_reduced: boolean;
}

export interface PropertyForm {
  title: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  price: number;
  currency: string; // 'ETB', etc.
  bedrooms: number;
  bathrooms: number;
  type: "condo" | "house" | "apartment" | "townhouse" | "real estate";
  status: "for sale" | "sold" | "for rent";
  is_available: boolean;
  is_verified: boolean;
  pets_allowed: boolean;
  amenities: string;
  utilities: Record<string, string>; // JSONB, can define structure if needed
  images: string[]; // array of image URLs
  area: string;
  city: string;
  state: string;
  zip_code: string;
  is_price_reduced: boolean;
  owner_id: string; // references profiles.telegram_id
}
