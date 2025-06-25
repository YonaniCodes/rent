import React from "react";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { PropertyCardChildProps } from "./types";

const PropertyCardListedBy = ({
  property,
  className,
}: PropertyCardChildProps) => {
  if (!property) return null;

  const { listedBy } = property;

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case "agent":
        return "Real Estate Agent";
      case "landlord":
        return "Landlord";
      case "real_estate":
        return "Real Estate Company";
      default:
        return role;
    }
  };

  return (
    <div className={cn("px-4", className)}>
      {/* Flex container to hold Listed by + logo */}
      <div className="flex items-center justify-between relative">
        {/* Listed by info */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Listed by {getRoleDisplay(listedBy.role)}</span>
          {listedBy.verified && (
            <div className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-blue-600" />
              <span className="text-blue-600 font-medium">Verified</span>
            </div>
          )}
        </div>

        {/* Logo aligned to the right */}
        {listedBy.logo && (
          <img
            src={listedBy.logo}
            alt={`${listedBy.name} logo`}
            className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
          />
        )}
      </div>

      <div className="text-sm font-medium text-gray-700 mt-1">
        {listedBy.name}
      </div>
    </div>
  );
};

export default PropertyCardListedBy;
