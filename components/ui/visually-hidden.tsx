import * as React from "react";
import { cn } from "@/lib/utils"; // ShadCN utility for merging classes

export const VisuallyHidden = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("sr-only", className)} {...props} />
));

VisuallyHidden.displayName = "VisuallyHidden";
