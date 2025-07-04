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
        return role.charAt(0).toUpperCase() + role.slice(1);
    }
  };

  return (
    <div className={cn("px-4 py-2 border-t border-gray-100", className)}>
      <div className="flex items-center justify-between gap-2 text-xs text-gray-600">
        <span className="font-medium whitespace-nowrap">
          Listed by {getRoleDisplay(listedBy.role)}
        </span>

        {listedBy.verified && (
          <div className="flex items-center gap-1 text-blue-600 whitespace-nowrap">
            <Shield className="w-3.5 h-3.5" />
            <span className="font-medium">Verified</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCardListedBy;
