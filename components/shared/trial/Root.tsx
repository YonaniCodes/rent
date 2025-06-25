import React, { ReactNode } from "react";
import type { PropertyData } from "./types";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type RootProps = {
  data: PropertyData;
  children: ReactNode;
  className?: string;
};

export const Root = ({ data, children, className = "" }: RootProps) => {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(
            child as React.ReactElement<{ property: PropertyData }>,
            { property: data }
          );
        }
        return child;
      })}
    </Card>
  );
};
