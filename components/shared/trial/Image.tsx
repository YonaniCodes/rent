"use client";

import React from "react";
import { cn } from "@/lib/utils";
import LikeButton from "./LikeButton";

interface ImageProps {
  className?: string;
  imageClassName?: string;
  property: {
    title: string;
    images: string[];
  };
  defaultLiked?: boolean;
}

const Image: React.FC<ImageProps> = ({
  className,
  imageClassName,
  property,
  defaultLiked,
}) => {
  const primaryImage = property.images[0] || "";

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn("h-64 bg-cover bg-center rounded-lg", imageClassName)}
        style={{ backgroundImage: `url(${primaryImage})` }}
        role="img"
        aria-label={`Property image for ${property.title}`}
      >
        <LikeButton defaultLiked={defaultLiked} />
      </div>
    </div>
  );
};

export default Image;
