"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react";
import { useProperties } from "@/queries/properties/useProperties";
import Image from "next/image";
import PropertyQRModal from "./property-qr-modal";
import TableActions from "./table-actions";

export function PropertiesTable() {
  const { properties, isLoading, error } = useProperties();

  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
  return (
    <Table className="min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead>Property</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {properties?.map((property, i) => (
          <TableRow key={property.id} className="hover:bg-muted/50">
            {/* Date placeholder, you can replace with real date */}
            <TableCell className="text-muted-foreground text-sm">{i}</TableCell>

            {/* Property cell with thumbnail image and title + address */}
            <TableCell className="flex items-center gap-2">
              {property.images[0] && (
                <Image
                  width={50}
                  height={50}
                  src={property.images[0]}
                  alt={property.title}
                  className="h-10 w-16 rounded-md object-cover"
                />
              )}
              <div className="flex flex-col">
                <span className="font-semibold">{property.title}</span>
                <span className="text-muted-foreground text-sm">
                  {property.address}
                </span>
              </div>
            </TableCell>

            <TableCell>{property.city}</TableCell>

            <TableCell>
              {property.price.toLocaleString()} {property.currency}
            </TableCell>

            <TableCell>
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                  property.status === "sold"
                    ? "bg-red-100 text-red-700"
                    : property.status === "for sale"
                    ? "bg-green-100 text-green-700"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {property.status.replace("-", " ")}
              </span>
            </TableCell>

            {/* Actions dropdown */}
            <TableCell>
              <TableActions propertyId={property.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
