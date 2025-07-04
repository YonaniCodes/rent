import React from "react";
import { cn } from "@/lib/utils";
import { PropertyCardChildProps } from "./types";
import { Shield } from "lucide-react";

const PropertyCardInfo = ({
  home,
  className,
}: Partial<PropertyCardChildProps>) => {
  if (!home) return null;

  const { is_verified, bedrooms, area, bathrooms, location } = home;

  return (
    <div className={cn("px-4 pb-4", className)}>
      {/* Price */}
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-gray-900 mb-1 ">
          {home.price}
        </div>
        <div>
          {is_verified && (
            <div className="flex items-center gap-1 text-blue-600 whitespace-nowrap">
              <Shield className="w-3.5 h-3.5" />
              <span className="font-medium">Verified</span>
            </div>
          )}
        </div>
      </div>

      {/* Bed/Bath/Area */}
      <div className="flex items-center text-gray-600 text-sm mb-2">
        <span className="font-medium">{bedrooms} bds</span>
        <span className="mx-1">|</span>
        <span className="font-medium">{bathrooms} ba</span>
        {home.area && (
          <>
            <span className="mx-1">|</span>
            <span className="font-medium">{area}</span>
          </>
        )}
        <span className="mx-1">|</span>
        <span>Active</span>
      </div>

      {/* Location */}
      <div className="text-gray-600 text-sm">{location}</div>
    </div>
  );
};

export default PropertyCardInfo;
