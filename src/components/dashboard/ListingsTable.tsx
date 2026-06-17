"use client";

import Link from "next/link";
import { MoreHorizontal, Eye, ExternalLink, Edit, Trash2 } from "lucide-react";
import { properties } from "@/data/properties";
import { formatFullPrice } from "@/lib/constants";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const statusConfig: Record<
  string,
  { label: string; className: string }
> = {
  "for-sale": {
    label: "For Sale",
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  "for-rent": {
    label: "For Rent",
    className: "bg-blue-50 text-blue-700 border-blue-100",
  },
  sold: {
    label: "Sold",
    className: "bg-neutral-50 text-neutral-600 border-neutral-200",
  },
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-100",
  },
};

export function ListingsTable() {
  // Show first 6 properties for dashboard preview
  const myProperties = properties.slice(0, 6);

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white shadow-sm overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-100">
        <h3 className="text-base font-heading font-bold text-neutral-900">
          My Active Listings
        </h3>
        <Link 
          href="/listings"
          className="text-xs font-semibold text-emerald-800 hover:text-emerald-700 hover:underline transition-all"
        >
          View all ({properties.length})
        </Link>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-x-auto">
        <Table>
          <TableHeader className="bg-neutral-50/50">
            <TableRow>
              <TableHead className="pl-6 h-11 text-xs uppercase font-bold text-neutral-400">Property</TableHead>
              <TableHead className="h-11 text-xs uppercase font-bold text-neutral-400">Price</TableHead>
              <TableHead className="h-11 text-xs uppercase font-bold text-neutral-400">Status</TableHead>
              <TableHead className="h-11 text-xs uppercase font-bold text-neutral-400">Views</TableHead>
              <TableHead className="h-11 text-xs uppercase font-bold text-neutral-400 pr-6 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myProperties.map((property) => {
              const status = statusConfig[property.status] || statusConfig["for-sale"];
              
              // Fallback color for image placeholder
              const placeholderColor = "bg-emerald-950/10 text-emerald-800";

              return (
                <TableRow key={property.id} className="hover:bg-neutral-50/40">
                  {/* Property Details */}
                  <TableCell className="pl-6 py-4">
                    <div className="flex items-center gap-3.5 min-w-[240px]">
                      {/* Image Thumbnail */}
                      <div className={`relative size-12 rounded-lg overflow-hidden shrink-0 flex items-center justify-center font-bold text-xs ${placeholderColor}`}>
                        <span>EF</span>
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/property/${property.id}`}
                          className="font-semibold text-neutral-800 text-sm hover:text-emerald-800 hover:underline transition-colors block truncate"
                        >
                          {property.title}
                        </Link>
                        <span className="text-xs text-neutral-400 block truncate mt-0.5">
                          {property.address.city}, {property.address.state}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  {/* Price */}
                  <TableCell className="py-4">
                    <span className="font-semibold text-neutral-800 text-sm">
                      {formatFullPrice(property.price)}
                    </span>
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell className="py-4">
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${status.className}`}
                    >
                      {status.label}
                    </Badge>
                  </TableCell>

                  {/* Views */}
                  <TableCell className="py-4">
                    <div className="flex items-center gap-1.5 text-neutral-500 text-xs font-medium">
                      <Eye className="size-3.5" />
                      {property.views.toLocaleString()}
                    </div>
                  </TableCell>

                  {/* Actions Dropdown */}
                  <TableCell className="py-4 pr-6 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon-xs"
                            className="text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 rounded-lg"
                          />
                        }
                      >
                        <MoreHorizontal className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 border border-neutral-100 bg-white shadow-md">
                        <DropdownMenuItem
                          render={
                            <Link href={`/property/${property.id}`} className="flex items-center gap-2" />
                          }
                          className="cursor-pointer"
                        >
                          <ExternalLink className="size-3.5 text-neutral-400" />
                          <span>View details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                          <Edit className="size-3.5 text-neutral-400" />
                          <span>Edit listing</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-neutral-100" />
                        <DropdownMenuItem className="cursor-pointer flex items-center gap-2 text-red-600 focus:bg-red-50 focus:text-red-700">
                          <Trash2 className="size-3.5" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
