import React from "react";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

export default function PropertySort() {
  return (
    <Button variant="outline" className="flex items-center gap-1 text-sm">
      <ArrowUpDown className="w-4 h-4" />
      Sort
    </Button>
  );
}
