"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";

interface ToolbarProps {
  children: React.ReactNode;
}

export default function Toolbar({ children }: ToolbarProps) {
  const [left, filters, sort] = React.Children.toArray(children);

  return (
    <div className="fixed top-20 left-4 right-4 z-30   bg-white pl-2 pr-1 flex flex-row items-center justify-between gap-4 flex-wrap">
      {/* Left: SearchBar (responsive) */}
      <div className="flex-1 min-w-0">{left}</div>

      {/* Right: Filters + Sort */}
      <div className="flex-shrink-0 flex items-center gap-2">
        {/* 📱 Mobile Dropdown */}
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal size={16} />
                Filters & Sort
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              side="bottom"
              className="w-[90vw] max-w-sm p-4 flex gap-6"
            >
              <div className="flex-1">{filters}</div>
              <div className="flex-1">{sort}</div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="hidden border p-2 rounded-lg lg:flex items-center gap-2">
          {filters}
          {sort}
        </div>
      </div>
    </div>
  );
}
