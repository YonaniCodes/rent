import { Heart, Share2 } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import React from "react";

export default function HomeDetailActions({
  status,
}: {
  status: React.ReactNode;
}) {
  return (
    <>
      <div className="">
        <Button
          variant="secondary"
          size="icon"
          className="bg-white/90 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="bg-white/90 hover:bg-white"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
      ``
      <div className="absolute top-4 left-4">
        <Badge
          variant="secondary"
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          {status}
        </Badge>
      </div>
    </>
  );
}
