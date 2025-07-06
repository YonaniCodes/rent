"use client";
import React, { useState } from "react";
import MapView from "./MapView";
import HomeList from "./HomeList";
import MapListController from "./MapListController";
import { Home } from "@/types/home";

export default function MapAndList({ homes }: { homes: Home[] }) {
  const [view, setView] = useState<"map" | "list">("list");

  return (
    <div className="flex flex-col lg:flex-row gap-4 min-h-[calc(100vh-120px)]">
      <MapView homes={homes} view={view} />
      <HomeList view={view} homes={homes} />
      <div className="lg:hidden">
        <MapListController view={view} setView={setView} />
      </div>
    </div>
  );
}
