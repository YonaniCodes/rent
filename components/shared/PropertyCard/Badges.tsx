import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { PropertyCardChildProps } from "./types";

const PropertyCardBadges = ({
  home,
  className,
}: Partial<PropertyCardChildProps>) => {
  if (!home) return null;

  return (
    <div className={cn("absolute top-3 left-3 flex flex-row gap-1", className)}>
      {home.status && (
        <Badge className="bg-red-600 text-white text-xs font-medium px-2 py-1">
          {home.status}
        </Badge>
      )}
      {home.is_price_reduced && (
        <Badge className="bg-orange-600 text-white text-xs font-medium px-2 py-1">
          {home.is_price_reduced} days on market
        </Badge>
      )}
    </div>
  );
};

export default PropertyCardBadges;
