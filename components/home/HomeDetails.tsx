import React from "react";
import { Bed, Bath, Square, Calendar } from "lucide-react";

interface PropertyDetailsProps {
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  propertyType: string;
}

export const HomeDetails: React.FC<PropertyDetailsProps> = ({
  bedrooms,
  bathrooms,
  sqft,
  yearBuilt,
  propertyType,
}) => {
  return (
    <div className="border-t border-b border-gray-200 py-4 my-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="flex items-center">
          <Bed className="h-5 w-5 text-gray-500 mr-2" />
          <div>
            <div className="font-semibold">{bedrooms}</div>
            <div className="text-sm text-gray-600">Bedrooms</div>
          </div>
        </div>

        <div className="flex items-center">
          <Bath className="h-5 w-5 text-gray-500 mr-2" />
          <div>
            <div className="font-semibold">{bathrooms}</div>
            <div className="text-sm text-gray-600">Bathrooms</div>
          </div>
        </div>

        <div className="flex items-center">
          <Square className="h-5 w-5 text-gray-500 mr-2" />
          <div>
            <div className="font-semibold">{sqft.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Sq Ft</div>
          </div>
        </div>

        <div className="flex items-center">
          <Calendar className="h-5 w-5 text-gray-500 mr-2" />
          <div>
            <div className="font-semibold">{yearBuilt}</div>
            <div className="text-sm text-gray-600">Year Built</div>
          </div>
        </div>

        <div className="flex items-center">
          <div>
            <div className="font-semibold">{propertyType}</div>
            <div className="text-sm text-gray-600">Property Type</div>
          </div>
        </div>
      </div>
    </div>
  );
};
