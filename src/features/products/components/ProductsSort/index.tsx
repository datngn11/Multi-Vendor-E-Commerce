"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { SortValues } from "../../schemas";
import { useProductQueryControl } from "../ProductsFilters/hooks/useProductsQueryControl";

export const ProductsSort = () => {
  const { onParamChange, params } = useProductQueryControl();

  const productsSortingTitle = {
    [SortValues.Curated]: "Curated for you",
    [SortValues.Newest]: "New products",
    [SortValues.Trending]: "On the market",
  };

  return (
    <div className="flex flex-col justify-between gap-y-2 sm:flex-row lg:items-center lg:gap-y-0">
      <p className="text-2xl font-medium">
        {productsSortingTitle[params.sort]}
      </p>

      <div className="flex items-center gap-2">
        {Object.entries(SortValues).map(([label, value]) => {
          const isActive = value === params.sort;

          return (
            <Button
              className={cn(
                "hover:border-border text-foreground rounded-full border-transparent bg-transparent",
                isActive && "bg-secondary-background border-border",
              )}
              key={value}
              onClick={() => onParamChange("sort", value)}
              variant="noShadow"
            >
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export const ProductsSortSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col justify-between gap-y-2 sm:flex-row lg:items-center lg:gap-y-0">
      <div className="bg-secondary-background h-8 w-56 rounded" />

      <div className="flex items-center gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            className="bg-secondary-background h-10 w-24 rounded-full"
            key={i}
          />
        ))}
      </div>
    </div>
  );
};
