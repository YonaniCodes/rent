// schema.ts
import { z } from "zod";

export const HomeFormSchema = z.object({
  // Basic info
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters."),
  type: z.enum(["condo", "house", "apartment", "townhouse", "real estate"], {
    required_error: "Property type is required.",
  }),
  status: z.enum(["for sale", "sold", "for rent"], {
    required_error: "Status is required.",
  }),
  is_available: z.boolean(),
  is_verified: z.boolean(),
  is_price_reduced: z.boolean(),

  // Location
  address: z.string().min(10, "Full address is required."),
  city: z.string().min(2, "City is required."),
  state: z.string().min(2, "State is required."),
  zip_code: z.string().optional(),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),

  // Property details
  price: z.number().positive("Price must be a positive number."),
  currency: z.string().min(1, "Currency is required."),
  bedrooms: z.number().int().min(0, "Bedrooms cannot be negative."),
  bathrooms: z.number().int().min(0, "Bathrooms cannot be negative."),
  area: z.string().min(5, "Area is required (e.g., '120 sqm')."),
  floor: z.number().int().optional(),
  year_built: z
    .number()
    .int()
    .min(1800)
    .max(new Date().getFullYear())
    .optional(),

  // Features
  pets_allowed: z.boolean(),
  amenities: z.array(z.string()).optional(), // Can be empty
  utilities: z.record(z.string(), z.string()).optional(), // Allow any string key-value pair
  home_rules: z.array(z.string()).optional(),
  additional_attributes: z.record(z.string(), z.any()).optional(),

  // Media
  images: z
    .array(z.string().url("Must be a valid URL."))
    .min(1, "At least one image is required."),
  video_url: z
    .string()
    .url("Must be a valid URL.")
    .optional()
    .or(z.literal("")), // Allow empty string for optional

  // Ownership
  owner_id: z.string().min(1, "Owner ID is required."),
});

export type HomeFormValues = z.infer<typeof HomeFormSchema>;
