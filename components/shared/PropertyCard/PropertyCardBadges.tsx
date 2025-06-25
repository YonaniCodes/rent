
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { PropertyCardChildProps } from './types';

interface PropertyCardBadgesProps extends Partial<PropertyCardChildProps> {}

const PropertyCardBadges = ({ property, className }: PropertyCardBadgesProps) => {
  if (!property) return null;

  return (
    <div className={cn("absolute top-3 left-3 flex flex-col gap-1", className)}>
      {property.status && (
        <Badge className="bg-red-600 text-white text-xs font-medium px-2 py-1">
          {property.status}
        </Badge>
      )}
      {property.daysOnMarket && (
        <Badge className="bg-orange-600 text-white text-xs font-medium px-2 py-1">
          {property.daysOnMarket} days on market
        </Badge>
      )}
    </div>
  );
};

export default PropertyCardBadges;
