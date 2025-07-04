import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import PropertyQRModal from "./property-qr-modal";

export default function TableActions({ propertyId }: { propertyId: number }) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0"
          aria-label="Property actions"
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Delete</DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push(`/homes/${propertyId}`)}>
          View Details
        </DropdownMenuItem>
        <PropertyQRModal propertyId={propertyId}>
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Share QR
          </DropdownMenuItem>
        </PropertyQRModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
