"use client";

import React, { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { PropertyCardChildProps } from "./types";

interface PropertyCardImageProps extends Partial<PropertyCardChildProps> {
  imageClassName?: string;
}

const PropertyCardImage = ({
  property,
  className,
  imageClassName,
  onLike,
  isLiked: propIsLiked,
}: PropertyCardImageProps) => {
  const [localIsLiked, setLocalIsLiked] = useState(propIsLiked || false);

  if (!property) return null;

  const primaryImage = property.images[0] || "";
  const isLiked = propIsLiked !== undefined ? propIsLiked : localIsLiked;

  const handleLikeClick = (liked: boolean) => {
    if (onLike) {
      onLike(property.id, liked);
    } else {
      setLocalIsLiked(liked);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn("h-64 bg-cover bg-center relative", imageClassName)}
        style={{ backgroundImage: `url(${primaryImage})` }}
        role="img"
        aria-label={`Property image for ${property.title}`}
      >
        {/* Heart Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleLikeClick(!isLiked);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow z-10"
          aria-label={isLiked ? "Unlike property" : "Like property"}
        >
          <Heart
            className={cn(
              "w-4 h-4",
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
            )}
          />
        </button>
      </div>
    </div>
  );
};

export default PropertyCardImage;
