"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatAsCurrency } from "@/shared/utils/numbers/formatAsCurrency";

import { FilterSchema } from "../../schemas";

interface IProps extends Pick<FilterSchema, "maxPrice" | "minPrice"> {
  onParamChange: (key: PriceFiltersKeys, value: string) => void;
}

type PriceFiltersKeys = keyof Pick<FilterSchema, "maxPrice" | "minPrice">;

export const PriceFilter = ({ maxPrice, minPrice, onParamChange }: IProps) => {
  const handleFilterChange = (key: PriceFiltersKeys, value: string) => {
    const sanitizedValue = value.replace(/[^0-9.]+/g, "");
    onParamChange(key, sanitizedValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label className="text-base font-medium">Min Price</Label>
        <Input
          onChange={(event) =>
            handleFilterChange("minPrice", event.target.value)
          }
          placeholder="Min Price"
          type="text"
          value={minPrice ? formatAsCurrency(minPrice) : ""}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-base font-medium">Max Price</Label>
        <Input
          onChange={(event) =>
            handleFilterChange("maxPrice", event.target.value)
          }
          placeholder="Max Price"
          type="text"
          value={maxPrice ? formatAsCurrency(maxPrice) : ""}
        />
      </div>
    </div>
  );
};
