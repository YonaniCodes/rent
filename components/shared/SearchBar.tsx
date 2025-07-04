"use client";

import { Search, Clock, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Suggestion = {
  name: string;
  city?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
};

type Size = "sm" | "md" | "lg" | "full";

const sizeMap: Record<Size, string> = {
  sm: "w-48", // 12rem
  md: "w-72", // 18rem
  lg: "w-96", // 24rem
  full: "w-full max-w-2xl", // responsive full width
};

type PhotonFeature = {
  properties: {
    name: string;
    city?: string;
  };
  geometry: {
    coordinates: [number, number];
  };
};

export default function SearchBar({
  onSelect,
  size = "md",
  className = "",
  placeholder = "Enter an address, neighborhood, city, or ZIP code",
  width,
  inputClassName = "",
}: {
  onSelect?: (coords: { lat: number; lng: number }, label: string) => void;
  size?: Size;
  className?: string;
  placeholder?: string;
  width?: string; // e.g., 'w-[500px]'
  inputClassName?: string;
  // custom class for input, e.g., 'h-14'
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.length > 2) {
        axios
          .get("https://photon.komoot.io/api/", {
            params: { q: query, lang: "en" },
          })
          .then((res) => {
            const features: PhotonFeature[] = res.data.features || [];
            const parsed: Suggestion[] = features.map((f) => ({
              name: f.properties.name,
              city: f.properties.city,
              coordinates: {
                lat: f.geometry.coordinates[1],
                lng: f.geometry.coordinates[0],
              },
            }));
            setResults(parsed.slice(0, 10));
            setShowDropdown(true);
          });
      } else {
        setShowDropdown(false);
        setResults([]);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (s: Suggestion) => {
    const label = `${s.name}${s.city ? ", " + s.city : ""}`;
    setQuery(label);
    setShowDropdown(false);
    router.push(
      `/search?lat=${s.coordinates.lat}&lng=${
        s.coordinates.lng
      }&q=${encodeURIComponent(label)}`
    );
    onSelect?.(s.coordinates, label);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && results.length > 0) {
      e.preventDefault();
      handleSelect(results[0]);
    }
  };

  const handleClear = () => {
    setQuery("");
    setShowDropdown(false);
    setResults([]);
  };

  // Compose width/height classes
  const widthClass = width ? width : sizeMap[size];

  return (
    <div
      className={`flex items-center border rounded-lg  ${widthClass} ${className} p-0`}
    >
      <div className="flex-1 relative">
        <Input
          type="text"
          placeholder={placeholder}
          value={query ?? ""}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`w-full px-4 py-2 text-base bg-transparent pr-10
    !outline-none !ring-0 !border-0 !shadow-none 
    focus:!outline-none focus:!ring-0 focus:!border-0 focus:!shadow-none 
    ${inputClassName}`}
        />

        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2"
            tabIndex={-1}
            aria-label="Clear search"
          >
            <X className="w-5 h-5 text-gray-400 hover:text-black" />
          </button>
        )}
        {showDropdown && results.length > 0 && (
          <ul className="absolute z-[9999] bg-white w-full mt-1 border border-gray-200 rounded max-h-64 overflow-y-auto">
            {results.map((s, i) => (
              <li
                key={i}
                onClick={() => handleSelect(s)}
                className="flex items-start gap-3 px-4 py-3 text-left hover:bg-gray-100 cursor-pointer w-full"
              >
                <Clock className="mt-1 w-5 h-5 text-gray-400 shrink-0" />
                <div className="flex flex-col w-full">
                  <span className="text-sm font-medium text-black break-words whitespace-normal w-full">
                    {s.name}
                  </span>
                  {s.city && (
                    <span className="text-xs text-gray-500 break-words whitespace-normal w-full">
                      {s.city}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <Button variant="ghost" className={`px-3 py-2`}>
        <Search
          onClick={() => results.length > 0 && handleSelect(results[0])}
          className="h-5 w-5 text-gray-700"
        />
      </Button>
    </div>
  );
}
