import React from "react";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LocationInfoProps {
  address: string;
}

export const LocationInfo: React.FC<LocationInfoProps> = ({ address }) => {
  return (
    <div className="my-6">
      <h3 className="text-lg font-semibold mb-3">Location</h3>
      <div className="bg-gray-100 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-gray-700">{address}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Navigation className="h-4 w-4" />
            Get Directions
          </Button>
        </div>

        {/* Placeholder for map */}
        <div className="mt-4 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">
            Interactive Map (Integration needed)
          </span>
        </div>
      </div>
    </div>
  );
};
