import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import {
  Building,
  MapPin,
  DollarSign,
  Home,
  Bed,
  Bath,
  Maximize,
  Camera,
  Navigation,
} from "lucide-react";

const propertySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  listingType: z.enum(["sale", "rent"], {
    required_error: "Please select listing type",
  }),
  price: z.number().min(1, "Price must be greater than 0"),
  location: z.string().min(5, "Location is required"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  type: z.enum(["apartment", "house", "condo", "studio"], {
    required_error: "Please select property type",
  }),
  bedrooms: z.number().min(0, "Bedrooms cannot be negative"),
  bathrooms: z.number().min(0.5, "Must have at least 0.5 bathrooms"),
  area: z.number().min(1, "Area must be greater than 0"),
  features: z.array(z.string()).optional(),
  furnished: z.boolean().optional(),
  petFriendly: z.boolean().optional(),
  parking: z.boolean().optional(),
  garden: z.boolean().optional(),
  balcony: z.boolean().optional(),
  heating: z.string().optional(),
  cooling: z.string().optional(),
  flooring: z.string().optional(),
  yearBuilt: z.number().optional(),
  availableFrom: z.string().optional(),
  leaseTerm: z.string().optional(),
});

type PropertyFormData = z.infer<typeof propertySchema>;

const propertyFeatures = [
  "Air Conditioning",
  "Heating",
  "Fireplace",
  "Hardwood Floors",
  "Carpet",
  "Tile Floors",
  "Updated Kitchen",
  "Stainless Steel Appliances",
  "Granite Countertops",
  "Walk-in Closet",
  "Laundry In-Unit",
  "Dishwasher",
  "Microwave",
  "Refrigerator",
  "Oven/Range",
  "Garbage Disposal",
  "High-Speed Internet",
  "Cable Ready",
  "Security System",
  "Intercom",
  "Elevator",
  "Wheelchair Accessible",
  "Swimming Pool",
  "Gym/Fitness Center",
  "Rooftop Deck",
  "Courtyard",
  "Storage Unit",
  "Bike Storage",
];

const AddPropertyForm = () => {
  const { user } = useAuth();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [images, setImages] = useState<FileList | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationConfirmed, setLocationConfirmed] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState<string>("");
  const [vpnDetected, setVpnDetected] = useState(false);

  const form = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      listingType: "rent",
      bedrooms: 1,
      bathrooms: 1,
      area: 500,
      features: [],
      furnished: false,
      petFriendly: false,
      parking: false,
      garden: false,
      balcony: false,
    },
  });

  const watchListingType = form.watch("listingType");

  // Check for VPN and get location
  const checkVPNAndGetLocation = async () => {
    try {
      setIsGettingLocation(true);

      // Check for VPN using IP geolocation service
      const ipResponse = await fetch("https://ipapi.co/json/");
      const ipData = await ipResponse.json();

      if (
        ipData.error ||
        ipData.org?.toLowerCase().includes("vpn") ||
        ipData.org?.toLowerCase().includes("proxy")
      ) {
        setVpnDetected(true);
        toast({
          title: "VPN Detected",
          description: "Please disable your VPN to use location services.",
          variant: "destructive",
        });
        return;
      }

      // Get user's current location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            // Reverse geocode to get address
            try {
              const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY&limit=1`
              );
              const data = await response.json();

              if (data.results && data.results[0]) {
                const address = data.results[0].formatted;
                setDetectedLocation(address);
                form.setValue("location", address);
                form.setValue("latitude", latitude);
                form.setValue("longitude", longitude);

                toast({
                  title: "Location Detected",
                  description:
                    "Please confirm if this is the correct location for your property.",
                });
              }
            } catch (error) {
              console.error("Geocoding error:", error);
              // Fallback to basic location info
              const basicLocation = `${latitude.toFixed(
                4
              )}, ${longitude.toFixed(4)}`;
              setDetectedLocation(basicLocation);
              form.setValue("location", basicLocation);
              form.setValue("latitude", latitude);
              form.setValue("longitude", longitude);
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
            toast({
              title: "Location Access Denied",
              description:
                "Please enable location access or enter address manually.",
              variant: "destructive",
            });
          }
        );
      } else {
        toast({
          title: "Geolocation Not Supported",
          description: "Your browser doesn't support location services.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Location service error:", error);
      toast({
        title: "Location Service Error",
        description: "Please enter your address manually.",
        variant: "destructive",
      });
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    setSelectedFeatures((prev) =>
      checked ? [...prev, feature] : prev.filter((f) => f !== feature)
    );
    form.setValue(
      "features",
      checked
        ? [...selectedFeatures, feature]
        : selectedFeatures.filter((f) => f !== feature)
    );
  };

  const onSubmit = (data: PropertyFormData) => {
    if (vpnDetected) {
      toast({
        title: "VPN Detected",
        description: "Please disable your VPN before submitting.",
        variant: "destructive",
      });
      return;
    }

    console.log("Property data:", {
      ...data,
      features: selectedFeatures,
      images,
    });

    toast({
      title: "Property Added Successfully!",
      description: `Your property has been submitted for ${data.listingType}.`,
    });

    // Reset form
    form.reset();
    setSelectedFeatures([]);
    setImages(null);
    setLocationConfirmed(false);
    setDetectedLocation("");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Beautiful 2BR Apartment"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="listingType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Listing Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select listing type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="rent">For Rent</SelectItem>
                        <SelectItem value="sale">For Sale</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="house">House</SelectItem>
                        <SelectItem value="condo">Condo</SelectItem>
                        <SelectItem value="studio">Studio</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your property, its features, and what makes it special..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Location & Pricing */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location & Pricing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={checkVPNAndGetLocation}
                  disabled={isGettingLocation || vpnDetected}
                  className="flex items-center gap-2"
                >
                  <Navigation className="h-4 w-4" />
                  {isGettingLocation
                    ? "Getting Location..."
                    : "Use My Location"}
                </Button>
                {vpnDetected && (
                  <span className="text-sm text-red-600">
                    VPN detected - please disable to use location
                  </span>
                )}
              </div>

              {detectedLocation && !locationConfirmed && (
                <div className="bg-blue-50 p-4 rounded-lg border">
                  <p className="text-sm font-medium mb-2">Detected Location:</p>
                  <p className="text-sm text-gray-700 mb-3">
                    {detectedLocation}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => setLocationConfirmed(true)}
                    >
                      Confirm Location
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setDetectedLocation("");
                        form.setValue("location", "");
                      }}
                    >
                      Enter Manually
                    </Button>
                  </div>
                </div>
              )}

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 123 Main St, City, State, ZIP"
                        {...field}
                        disabled={detectedLocation && !locationConfirmed}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      {watchListingType === "rent"
                        ? "Monthly Rent ($)"
                        : "Sale Price ($)"}
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={
                          watchListingType === "rent"
                            ? "e.g., 1500"
                            : "e.g., 250000"
                        }
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Property Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Property Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Bed className="h-4 w-4" />
                      Bedrooms
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bathrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Bath className="h-4 w-4" />
                      Bathrooms
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.5"
                        min="0.5"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Maximize className="h-4 w-4" />
                      Area (sq ft)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="1"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="yearBuilt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Built</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 2020"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value ? Number(e.target.value) : undefined
                          )
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {watchListingType === "rent" && (
                <FormField
                  control={form.control}
                  name="availableFrom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Available From</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {watchListingType === "rent" && (
              <FormField
                control={form.control}
                name="leaseTerm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lease Term</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select lease term" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="month-to-month">
                          Month-to-Month
                        </SelectItem>
                        <SelectItem value="6-months">6 Months</SelectItem>
                        <SelectItem value="1-year">1 Year</SelectItem>
                        <SelectItem value="2-years">2 Years</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </CardContent>
        </Card>

        {/* Property Features */}
        <Card>
          <CardHeader>
            <CardTitle>Property Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Quick toggles */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <FormField
                control={form.control}
                name="furnished"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Furnished</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="petFriendly"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Pet Friendly</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="parking"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Parking</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="garden"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Garden</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="balcony"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Balcony</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            {/* Additional features */}
            <div>
              <Label className="text-base font-medium mb-3 block">
                Additional Features
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {propertyFeatures.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={`feature-${feature}`}
                      checked={selectedFeatures.includes(feature)}
                      onCheckedChange={(checked) =>
                        handleFeatureChange(feature, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`feature-${feature}`}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Property Images
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Label htmlFor="images">Upload Property Images</Label>
              <Input
                id="images"
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages(e.target.files)}
                className="cursor-pointer"
              />
              <p className="text-sm text-gray-500">
                Upload multiple images to showcase your property. First image
                will be used as the main photo.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            className="px-8"
            disabled={vpnDetected}
          >
            {watchListingType === "rent" ? "List for Rent" : "List for Sale"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddPropertyForm;
