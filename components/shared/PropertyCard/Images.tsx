"use client";

import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { PropertyCardChildProps } from "./types";

interface PropertyCardImageProps extends Partial<PropertyCardChildProps> {
  imageClassName?: string;
  showCarousel?: boolean;
  children?: React.ReactNode;
}

const PropertyCardImages = ({
  home,
  showCarousel,
  className,
  imageClassName,
  children,
  onLike,
  isLiked: propIsLiked,
}: PropertyCardImageProps) => {
  const [localIsLiked, setLocalIsLiked] = useState(propIsLiked || false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  if (!home) return null;

  const isLiked = propIsLiked !== undefined ? propIsLiked : localIsLiked;
  const images = home.images || [];

  const handleLikeClick = (liked: boolean) => {
    if (onLike) {
      onLike(home.id, liked);
    } else {
      setLocalIsLiked(liked);
    }
  };

  return (
    <div className={cn("relative", className)}>
      {showCarousel ? (
        <Carousel
          setApi={setCarouselApi}
          className={cn("w-full", imageClassName)}
        >
          <CarouselContent className="h-40">
            {images.map((img, index) => (
              <CarouselItem key={index} className="h-40 basis-full">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${img})` }}
                  role="img"
                  aria-label={`Property image ${index + 1} for ${home.title}`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="top-1/2 -translate-y-1/2 left-2" />
          <CarouselNext className="top-1/2 -translate-y-1/2 right-2" />
        </Carousel>
      ) : (
        <div
          className={cn("h-40 bg-cover bg-center", imageClassName)}
          style={{ backgroundImage: `url(${images[0]})` }}
          role="img"
          aria-label={`Property image for ${home.title}`}
        />
      )}

      {/* Slide Indicator */}
      {showCarousel && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white/80 text-sm rounded px-2 py-0.5 shadow z-10">
          Slide {current} of {count}
        </div>
      )}

      {/* Like Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleLikeClick(!isLiked);
        }}
        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow z-10"
        aria-label={isLiked ? "Unlike home" : "Like home"}
      >
        <Heart
          className={cn(
            "w-4 h-4",
            isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
          )}
        />
      </button>

      {children}
    </div>
  );
};

export default PropertyCardImages;
