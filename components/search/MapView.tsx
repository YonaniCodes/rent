"use client";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

// Fix Leaflet's default icon URLs (required for Next.js)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

interface Property {
  id: string | number;
  lat: number;
  lng: number;
  title: string;
  location: string;
}

interface MapViewProps {
  homes: Property[];
  initialCenter?: [number, number];
  view: "map" | "list";
}

export default function MapView({
  homes,
  initialCenter = [9.03, 38.74],
  view, // Default to Addis Ababa
}: MapViewProps) {
  return (
    <div
      className={`${
        view === "map" ? "block" : "hidden"
      } w-full lg:block lg:w-1/3 h-[300px] lg:h-[calc(100vh-120px)] lg:sticky lg:top-[80px] z-10`}
    >
      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={initialCenter}
          zoom={15}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {homes.map((home) => (
            <Marker key={home.id} position={[home.lat, home.lng]}>
              <Popup>
                <strong>{home.title}</strong>
                <br />
                {home.location}
              </Popup>
            </Marker>
          ))}

          <ChangeCenter position={initialCenter} />
        </MapContainer>

        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg z-[1000]">
          <p className="text-sm font-medium">{homes.length} homes in view</p>
        </div>
      </div>
    </div>
  );
}

function ChangeCenter({ position }: { position: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
}
