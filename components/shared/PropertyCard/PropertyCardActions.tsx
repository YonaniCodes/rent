import React from "react";
import { cn } from "@/lib/utils";
import { PropertyCardChildProps } from "./types";

interface PropertyCardActionsProps extends Partial<PropertyCardChildProps> {
  children: React.ReactNode;
}

const PropertyCardActions = ({
  className,
  children,
}: PropertyCardActionsProps) => {
  return <div className={cn("px-4  flex gap-2", className)}>{children}</div>;
};

export default PropertyCardActions;
