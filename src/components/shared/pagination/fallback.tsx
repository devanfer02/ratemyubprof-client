import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationFallback() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 px-3 py-2 border rounded-xl w-24 justify-center">
        <ChevronLeft className="w-4 h-4 opacity-40" />
        <Skeleton className="h-4 w-10" />
      </div>

      <div className="flex items-center gap-2">
        <Skeleton className="h-9 w-9 rounded-xl" />
        <Skeleton className="h-9 w-9 rounded-xl" />
        <Skeleton className="h-9 w-9 rounded-xl" />
      </div>

      <div className="flex items-center gap-1 px-3 py-2 border rounded-xl w-24 justify-center">
        <Skeleton className="h-4 w-10" />
        <ChevronRight className="w-4 h-4 opacity-40" />
      </div>
    </div>
  );
}
