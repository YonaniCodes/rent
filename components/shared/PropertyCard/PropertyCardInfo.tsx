import React from "react";
import { cn } from "@/lib/utils";
import { PropertyCardChildProps } from "./types";

const PropertyCardInfo = ({
  property,
  className,
}: Partial<PropertyCardChildProps>) => {
  if (!property) return null;

  return (
    <div className={cn("px-4", className)}>
      {/* Price */}
      <div className="text-2xl font-bold text-gray-900 mb-1">
        {property.price}
      </div>

      {/* Bed/Bath/Area */}
      <div className="flex items-center text-gray-600 text-sm mb-2">
        <span className="font-medium">{property.bedrooms} bds</span>
        <span className="mx-1">|</span>
        <span className="font-medium">{property.bathrooms} ba</span>
        {property.area && (
          <>
            <span className="mx-1">|</span>
            <span className="font-medium">{property.area}</span>
          </>
        )}
        <span className="mx-1">|</span>
        <span>Active</span>
      </div>
      {/* Title */}
      <div className="text-gray-700 text-sm mb-1 font-medium">
        {property.title}
      </div>

      {/* Location */}
      <div className="text-gray-600 text-sm">{property.location}</div>
    </div>
  );
};

export default PropertyCardInfo;
