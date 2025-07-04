import React from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const PropertyCardRoot = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer ",
        className
      )}
    >
      {children}
    </Card>
  );
};

export default PropertyCardRoot;
