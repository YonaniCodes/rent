"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

interface GalleryWithDialogProps {
  images: string[];
}

const GalleryWithDialog: React.FC<GalleryWithDialogProps> = ({ images }) => {
  const fallbackImage =
    "https://photos.zillowstatic.com/fp/a513e26f1cac66f51ad4bf21ab584a29-cc_ft_1152.webp";

  // Pad the image array to ensure we always have 5 thumbnails
  const paddedImages = [...images];
  while (paddedImages.length < 5) {
    paddedImages.push(fallbackImage);
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % paddedImages.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + paddedImages.length) % paddedImages.length
    );
  };

  if (!paddedImages.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 h-[400px]">
      {/* Main Image */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            className="relative col-span-2 h-full cursor-pointer"
            onClick={() => {
              setCurrentIndex(0);
              setOpen(true);
            }}
          >
            <Image
              src={paddedImages[0]}
              alt="Main Image"
              fill
              className="object-cover rounded-md"
              unoptimized
            />
          </div>
        </DialogTrigger>

        <DialogContent className="max-w-5xl p-0 overflow-hidden">
          <VisuallyHidden>
            <DialogTitle>Image viewer</DialogTitle>
          </VisuallyHidden>

          <div className="relative w-full h-[500px] bg-black">
            <Image
              src={paddedImages[currentIndex]}
              alt={`Full image ${currentIndex + 1}`}
              fill
              className="object-contain"
              unoptimized
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80"
              onClick={prevImage}
            >
              <ChevronLeft className="h-6 w-6 text-black" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80"
              onClick={nextImage}
            >
              <ChevronRight className="h-6 w-6 text-black" />
            </Button>
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
              {currentIndex + 1} / {paddedImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Thumbnails */}
      <div className="grid grid-cols-2 gap-2 h-full">
        {paddedImages.slice(1, 5).map((img, index) => (
          <Dialog key={index + 1} open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div
                className="relative h-full cursor-pointer"
                onClick={() => {
                  setCurrentIndex(index + 1);
                  setOpen(true);
                }}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                  unoptimized
                />
              </div>
            </DialogTrigger>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default GalleryWithDialog;
