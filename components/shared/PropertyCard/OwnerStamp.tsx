"use client";

import { cn } from "@/lib/utils";
import { PropertyCardChildProps } from "./types";
import Image from "next/image";

const OwnerStamp = ({ home, className }: Partial<PropertyCardChildProps>) => {
  if (!home) return null;

  return (
    <div
      className={cn("absolute bottom-3 right-3 flex flex-row gap-1", className)}
    >
      {home.status && home.listed_by?.company.logo_url && (
        <Image
          src={home.listed_by?.company.logo_url}
          alt="Company logo"
          width={40}
          height={40}
          className="rounded-full object-cover border-2 border-white shadow-lg bg-white"
          unoptimized
        />
      )}
    </div>
  );
};

export default OwnerStamp;
