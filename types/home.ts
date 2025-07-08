import { Company } from "./company";

export interface ListedBy {
  role: "agent" | "landlord" | "admin";
  name?: string;
  image?: string;
  telegram_id: string;
  company: Company;
}

export interface Home {
  id: number;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  location: string; // `${city}, ${state}`
  lat: number;
  lng: number;
  price: number;
  currency: string; // e.g. 'ETB', 'USD'
  bedrooms: number;
  bathrooms: number;
  area: string; // e.g. "120 sqm"
  floor?: number; // for apartments/townhouses
  year_built?: number;
  images: string[];
  video_url?: string;
  listed_by: ListedBy;
  status: "for sale" | "sold" | "for rent";
  type: "condo" | "house" | "apartment" | "townhouse" | "real estate";
  is_verified: boolean;
  is_price_reduced: boolean;

  // Additional features
  pets_allowed: boolean;
  parking_available?: boolean;
  balcony?: boolean;
  is_furnished?: boolean;
  service_fee?: number; // monthly, for condos/apartments

  // Utilities & amenities
  utilities?: Record<string, string>; // e.g., { water: "included", electricity: "excluded" }
  amenities?: string[]; // e.g., ["gym", "swimming pool"]

  // Home rules
  home_rules?: string[]; // e.g., ["No pets", "No smoking"]

  // Flexible extra fields for user-defined attributes
  additional_attributes?: Record<string, string | number | boolean>;

  created_at?: string; // ISO date string
  updated_at?: string; // ISO date string
}

export interface HomeForm {
  // Basic info
  title: string;
  description: string;
  type: "condo" | "house" | "apartment" | "townhouse" | "real estate";
  status: "for sale" | "sold" | "for rent";
  is_available: boolean;
  is_verified: boolean;
  is_price_reduced: boolean;

  // Location
  address: string; // Full street address
  city: string; // e.g. Addis Ababa
  state?: string; // e.g. Oromia
  zip_code?: string; // Optional, rare in Ethiopia
  lat: number;
  lng: number;

  // Property details
  price: number;
  currency: string; // 'ETB', 'USD', etc.
  bedrooms: number;
  bathrooms: number;
  area: string; // e.g. "120 sqm"
  floor?: number; // For apartments
  year_built?: number;

  // Features
  pets_allowed: boolean;
  amenities: string[]; // e.g. ['parking', 'balcony', 'elevator']
  utilities: Record<string, string>; // e.g. { electricity: "included", water: "excluded" }
  home_rules?: string[]; // e.g. ["No smoking", "No parties"]
  additional_attributes?: Record<string, string | number | boolean>; // optional, user-defined

  // Media
  images: string[]; // URLs
  video_url?: string; // Optional walkthrough

  // Ownership
  owner_id: string; // references profiles.telegram_id or UUID
}
