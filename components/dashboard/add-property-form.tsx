"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";

import { z } from "zod";
import { TextInput } from "@/components/forms/text-input";
import { SelectInput } from "@/components/forms/select-input";
import { CheckboxInput } from "@/components/forms/check-box";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Home,
  MapPin,
  DollarSign,
  Camera,
  Shield,
  Wifi,
  Zap,
  Droplets,
  Settings,
  Upload,
  X,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { getUserIdFromSession } from "@/utils/session-utils";
import { uploadImagesToCloudinary } from "@/utils/cloudinary";
import { useAddHomes } from "@/queries/properties/useAddHomes";

// Essential options only
const propertyTypeOptions = [
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "condo", label: "Condo" },
  { value: "townhouse", label: "Townhouse" },
];

const propertyStatusOptions = [
  { value: "for sale", label: "For Sale" },
  { value: "for rent", label: "For Rent" },
];

const currencyOptions = [
  { value: "ETB", label: "ETB" },
  { value: "USD", label: "USD" },
];

const utilityPaymentOptions = [
  { value: "included", label: "Included in Rent" },
  { value: "excluded", label: "Tenant Pays Separately" },
];

// Common amenities for easy selection
const commonAmenities = [
  "Parking",
  "Balcony",
  "Elevator",
  "Security",
  "Swimming Pool",
  "Gym",
  "Garden",
  "Air Conditioning",
  "Furnished",
  "Internet",
];

// Streamlined schema with file uploads
const PropertyFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  type: z.enum(["apartment", "house", "condo", "townhouse"]),
  status: z.enum(["for sale", "for rent"]),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  currency: z.enum(["ETB", "USD"]),
  bedrooms: z.number().min(0, "Bedrooms cannot be negative"),
  bathrooms: z.number().min(0, "Bathrooms cannot be negative"),
  area: z.string().min(1, "Area is required"),
  pets_allowed: z.boolean(),
  home_rules: z.string().max(1000, "Too long").optional(),
  amenities: z.array(z.string()),
  utilities: z
    .object({
      water: z.enum(["included", "excluded"]).optional(),
      electricity: z.enum(["included", "excluded"]).optional(),
      internet: z.enum(["included", "excluded"]).optional(),
      gas: z.enum(["included", "excluded"]).optional(),
    })
    .optional(),
  images: z.array(z.any()).max(6, "Maximum 6 images allowed"),
});

type PropertyFormValues = z.infer<typeof PropertyFormSchema>;

const Index = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const { isPending, addHome } = useAddHomes();

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(PropertyFormSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "apartment",
      status: "for sale",
      address: "",
      city: "",
      price: 0,
      currency: "ETB",
      bedrooms: 1,
      bathrooms: 1,
      area: "",
      pets_allowed: false,
      amenities: [],
      utilities: {
        water: undefined,
        electricity: undefined,
        internet: undefined,
        gas: undefined,
      },
      images: [],
      home_rules: "",
    },
  });

  const selectedAmenities = form.watch("amenities");

  const toggleAmenity = (amenity: string) => {
    const currentAmenities = form.getValues("amenities");
    if (currentAmenities.includes(amenity)) {
      form.setValue(
        "amenities",
        currentAmenities.filter((a) => a !== amenity)
      );
    } else {
      form.setValue("amenities", [...currentAmenities, amenity]);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const totalImages = uploadedImages.length + files.length;

    if (totalImages > 6) {
      toast(
        "You can only upload a maximum of 6 images. Please remove some images before uploading more"
      );
      return;
    }

    setUploadedImages((prev) => [...prev, ...files]);
    form.setValue("images", [...uploadedImages, ...files]);
  };

  const removeImage = (index: number) => {
    const newImages = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(newImages);
    form.setValue("images", newImages);
  };

  async function onSubmit(home: PropertyFormValues) {
    try {
      const urls = await uploadImagesToCloudinary(home.images); // File[] → string[]

      const owner_id = await getUserIdFromSession();
      const transformedUtilities: Record<string, string> = {};
      if (home.utilities) {
        for (const [key, value] of Object.entries(home.utilities)) {
          if (value !== undefined) {
            transformedUtilities[key] = value;
          }
        }
      }
      const homeRulesArray = home.home_rules
        ? home.home_rules
            .split(/[\n,]+/) // split by newline or comma (one or more)
            .map((rule) => rule.trim())
            .filter(Boolean) // remove empty strings
        : [];
      console.log(owner_id);
      const payload = {
        ...home,
        images: urls,
        owner_id,
        lat: 0, // replace with real location if you support that
        lng: 0,
        utilities: transformedUtilities,
        home_rules: homeRulesArray,
        is_available: true,
        is_verified: false,
        is_price_reduced: false,
      };

      addHome({ home: payload }); // ⬅️ send complete HomeForm
      toast.success("Property Submitted Successfully!");
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("Failed to create property. Try again.");
    }
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Home className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">
              Property Listing Form
            </h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create a stunning property listing in minutes. Fill out the
            essential details to showcase your property to potential buyers or
            renters.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Basic Information Card */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm p-8">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl text-gray-800">
                  <Home className="h-5 w-5 mr-2 text-blue-600" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <TextInput
                  control={form.control}
                  name="title"
                  label="Property Title"
                  placeholder="Modern 2-Bedroom Apartment in Bole"
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your property's best features, location benefits, and what makes it special..."
                          className="min-h-[120px] border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Write a compelling description that highlights your
                        property&apos; unique features
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectInput
                    control={form.control}
                    name="type"
                    label="Property Type"
                    placeholder="Select property type"
                    options={propertyTypeOptions}
                  />
                  <SelectInput
                    control={form.control}
                    name="status"
                    label="Listing Status"
                    placeholder="Select status"
                    options={propertyStatusOptions}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Location Card */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm p-8">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl text-gray-800">
                  <MapPin className="h-5 w-5 mr-2 text-green-600" />
                  Location Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <TextInput
                  control={form.control}
                  name="address"
                  label="Full Address"
                  placeholder="123 Bole Road, near Edna Mall"
                />
                <TextInput
                  control={form.control}
                  name="city"
                  label="City"
                  placeholder="Addis Ababa"
                />
              </CardContent>
            </Card>

            {/* Pricing & Details Card */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm  p-8">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl text-gray-800">
                  <DollarSign className="h-5 w-5 mr-2 text-emerald-600" />
                  Pricing & Property Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextInput
                    control={form.control}
                    name="price"
                    label="Price"
                    type="number"
                    placeholder="50000"
                  />
                  <SelectInput
                    control={form.control}
                    name="currency"
                    label="Currency"
                    placeholder="Select currency"
                    options={currencyOptions}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <TextInput
                    control={form.control}
                    name="bedrooms"
                    label="Bedrooms"
                    type="number"
                    placeholder="2"
                  />
                  <TextInput
                    control={form.control}
                    name="bathrooms"
                    label="Bathrooms"
                    type="number"
                    placeholder="2"
                  />
                  <TextInput
                    control={form.control}
                    name="area"
                    label="Area"
                    placeholder="120 sqm"
                  />
                </div>

                <div className="pt-4">
                  <CheckboxInput
                    control={form.control}
                    name="pets_allowed"
                    label="Pets Allowed"
                    description="Pets are welcome in this property"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Amenities Card */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm  p-8">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl text-gray-800">
                  <Settings className="h-5 w-5 mr-2 text-orange-600" />
                  Amenities & Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="amenities"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Select Available Amenities
                      </FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-3">
                        {commonAmenities.map((amenity) => (
                          <div
                            key={amenity}
                            onClick={() => toggleAmenity(amenity)}
                            className={`cursor-pointer p-3 rounded-lg border-2 transition-all duration-200 text-center ${
                              selectedAmenities.includes(amenity)
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 hover:border-gray-300 text-gray-600"
                            }`}
                          >
                            <span className="text-sm font-medium">
                              {amenity}
                            </span>
                          </div>
                        ))}
                      </div>
                      <FormDescription className="text-xs text-gray-500">
                        Click on amenities to select/deselect them
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Utilities Card */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm  p-8">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl text-gray-800">
                  <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                  Utilities Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center mb-2">
                      <Droplets className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Water
                      </span>
                    </div>
                    <SelectInput
                      control={form.control}
                      name="utilities.water"
                      label=""
                      placeholder="Select payment responsibility"
                      options={utilityPaymentOptions}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center mb-2">
                      <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Electricity
                      </span>
                    </div>
                    <SelectInput
                      control={form.control}
                      name="utilities.electricity"
                      label=""
                      placeholder="Select payment responsibility"
                      options={utilityPaymentOptions}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center mb-2">
                      <Wifi className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Internet
                      </span>
                    </div>
                    <SelectInput
                      control={form.control}
                      name="utilities.internet"
                      label=""
                      placeholder="Select payment responsibility"
                      options={utilityPaymentOptions}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center mb-2">
                      <Zap className="h-4 w-4 mr-2 text-orange-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Gas
                      </span>
                    </div>
                    <SelectInput
                      control={form.control}
                      name="utilities.gas"
                      label=""
                      placeholder="Select payment responsibility"
                      options={utilityPaymentOptions}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Media Card */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm  p-8">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl text-gray-800">
                  <Camera className="h-5 w-5 mr-2 text-purple-600" />
                  Property Images (Up to 6)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Upload Images
                      </FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          {/* Upload Button */}
                          <label className="cursor-pointer">
                            <Input
                              type="file"
                              accept="image/*"
                              multiple
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
                              <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                              <p className="text-sm text-gray-600">
                                Click to upload images or drag and drop
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                PNG, JPG, WebP up to 10MB each
                              </p>
                            </div>
                          </label>

                          {/* Image Preview Grid */}
                          {uploadedImages.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                              {uploadedImages.map((file, index) => (
                                <div key={index} className="relative group">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Upload ${index + 1}`}
                                    className="w-full h-32 object-cover rounded-lg border"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="h-4 w-4" />
                                  </button>
                                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                                    {file.name}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Upload high-quality images to make your listing stand
                        out. You can upload up to 6 images.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm p-8">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-xl text-gray-800">
                  <Shield className="h-5 w-5 mr-2 text-indigo-600" />
                  Home Rules (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="home_rules"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Home Rules
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="No smoking indoors, no loud music after 10pm, etc."
                          className="min-h-[100px] border-gray-200 focus:border-blue-500 focus:ring-blue-500 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-500">
                        Optional rules for tenants/guests to follow
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <Button
                disabled={isPending}
                type="submit"
                size="lg"
                className="px-12 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <Shield className="h-5 w-5 mr-2" />
                Create Property Listing
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Index;
