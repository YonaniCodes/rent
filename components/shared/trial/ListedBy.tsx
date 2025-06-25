// components/shared/trial/ListedBy.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface ListedByProps {
  logoUrl?: string;
  role: string;
  name: string;
  verified: boolean;
  className?: string;
}

const ListedBy: React.FC<ListedByProps> = ({
  logoUrl,
  role,
  name,
  verified,
  className,
}) => {
  return (
    <footer
      className={cn("flex items-center gap-2 text-sm text-gray-700", className)}
    >
      {logoUrl && (
        <img
          src={logoUrl}
          alt={`${name} logo`}
          className="w-10 h-10 rounded-full object-cover"
        />
      )}
      <div>
        <p className="font-medium capitalize">{role}</p>
        <p>
          {name}{" "}
          {verified && (
            <span title="Verified" className="text-green-500 ml-1">
              ✔️
            </span>
          )}
        </p>
      </div>
    </footer>
  );
};

export default ListedBy;
