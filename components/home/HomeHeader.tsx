import React from "react";
import { MapPin, Star } from "lucide-react";

interface HomeHeaderProps {
  title: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  rating?: number;
  reviews?: number;
  price: number;
  priceType: "rent" | "sale";
  sqft: number;
}

function formatPrice(price: number) {
  return price.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function HomeHeader({
  title,
  address,
  city,
  state,
  zipCode,
  rating,
  reviews,
  price,
  priceType,
  sqft,
}: HomeHeaderProps) {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>
              {address}, {city}, {state} {zipCode}
            </span>
          </div>
          {rating && (
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 text-sm font-medium">{rating}</span>
              {reviews && (
                <span className="ml-1 text-sm text-gray-500">
                  ({reviews} reviews)
                </span>
              )}
            </div>
          )}
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600">
            {formatPrice(price)}
            {priceType === "rent" && (
              <span className="text-lg text-gray-600">/month</span>
            )}
          </div>
          <div className="text-sm text-gray-500">
            ${Math.round(price / sqft)}/sqft
          </div>
        </div>
      </div>
    </div>
  );
}
