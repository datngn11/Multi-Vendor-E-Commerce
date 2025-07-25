"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { hasActiveFilters } from "@/shared/utils/filtering";

import { useProductQueryControl } from "./hooks/useProductsQueryControl";
import { PriceFilter } from "./PriceFilter";
import { TagsFilter } from "./TagsFilter";

export const ProductFilters = () => {
  const { onParamChange, params, resetFilters } = useProductQueryControl();

  return (
    <div className="bg-background rounded-md">
      <div className="flex h-16 items-center justify-between border border-b-0 p-4">
        <span className="font-semibold">Filters</span>

        {hasActiveFilters(params) && (
          <Button
            className="text-foreground"
            onClick={resetFilters}
            size="sm"
            variant="link"
          >
            Clear
          </Button>
        )}
      </div>

      <Accordion type="multiple">
        <ProductFilterItem title="Tags">
          <TagsFilter
            onParamChange={onParamChange}
            selectedTags={params.tags}
          />
        </ProductFilterItem>
        <ProductFilterItem title="Price">
          <PriceFilter
            maxPrice={params.maxPrice}
            minPrice={params.minPrice}
            onParamChange={onParamChange}
          />
        </ProductFilterItem>
        <ProductFilterItem title="Brands">
          Yes. It adheres to the WAI-ARIA design pattern.
        </ProductFilterItem>
      </Accordion>
    </div>
  );
};

interface IProps {
  children: React.ReactNode;
  title: string;
}

const ProductFilterItem = ({ children, title }: IProps) => {
  return (
    <AccordionItem className="last:border-b" value={title}>
      <AccordionTrigger className="font-semibold">{title}</AccordionTrigger>
      <AccordionContent containerClassname="data-[state=open]:overflow-visible">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
};
