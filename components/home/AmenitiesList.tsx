import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Wifi,
  Car,
  Waves,
  Dumbbell,
  Trees,
  Shield,
  Zap,
  Snowflake,
  Flame,
  Shirt,
} from "lucide-react";

interface AmenitiesListProps {
  amenities: string[];
}

const amenityIcons: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="h-4 w-4" />,
  Parking: <Car className="h-4 w-4" />,
  Pool: <Waves className="h-4 w-4" />,
  Gym: <Dumbbell className="h-4 w-4" />,
  Garden: <Trees className="h-4 w-4" />,
  Security: <Shield className="h-4 w-4" />,
  Electric: <Zap className="h-4 w-4" />,
  "Air Conditioning": <Snowflake className="h-4 w-4" />,
  Heating: <Flame className="h-4 w-4" />,
  Laundry: <Shirt className="h-4 w-4" />,
};

export const AmenitiesList: React.FC<AmenitiesListProps> = ({ amenities }) => {
  if (!amenities.length) return null;

  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-3">Amenities</h3>
      <div className="flex flex-wrap gap-2">
        {amenities.map((amenity, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="flex items-center gap-1 px-3 py-1"
          >
            {amenityIcons[amenity]}
            <span>{amenity}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
};
