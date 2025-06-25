"use client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  property: {
    id: number;
    title: string;
    location: string;
    price: string;
    bedrooms: number;
    bathrooms: number;
    area: string;
    image: string;
    type: string;
    featured?: boolean;
    status?: string;
    daysOnZillow?: number;
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="relative overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer">
      <div className="relative">
        <div
          className="h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${property.image})` }}
        >
          {/* Heart icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow z-10"
          >
            <Heart
              className={`w-4 h-4 ${
                isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
              }`}
            />
          </button>

          {/* Status badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {property.status && (
              <Badge className="bg-red-600 text-white text-xs font-medium px-2 py-1">
                {property.status}
              </Badge>
            )}
            {property.daysOnZillow && (
              <Badge className="bg-orange-600 text-white text-xs font-medium px-2 py-1">
                {property.daysOnZillow} days on HabeshaHome
              </Badge>
            )}
          </div>

          {/* Property type badge */}
          <div className="absolute bottom-3 right-3">
            <div className="bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded">
              {property.type}
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Price */}
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {property.price}
        </div>

        {/* Bed/Bath/Sqft */}
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <span className="font-medium">{property.bedrooms} bds</span>
          <span className="mx-1">|</span>
          <span className="font-medium">{property.bathrooms} ba</span>
          <span className="mx-1">|</span>
          <span className="font-medium">{property.area}</span>
          <span className="mx-1">|</span>
          <span>Active</span>
        </div>

        {/* Address */}
        <div className="text-gray-700 text-sm mb-1">{property.title}</div>
        <div className="text-gray-600 text-sm">{property.location}</div>

        {/* MLS info */}
        <div className="text-xs text-gray-500 mt-2 truncate">
          MLS ID #{property.id.toString().padStart(8, "0")}, HabeshaHome Realty
        </div>
      </div>
    </Card>
  );
};

export default PropertyCard;
