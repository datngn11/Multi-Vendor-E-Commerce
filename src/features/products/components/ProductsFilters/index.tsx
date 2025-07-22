"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { useProductsFilter } from "../../hooks/useProductsFilter";
import { PriceFilter } from "./PriceFilter";

export const ProductFilters = () => {
  const { filters, onFilterChange, resetFilters } = useProductsFilter();

  return (
    <div className="rounded-md">
      <div className="flex items-center justify-between border border-b-0 p-4">
        <span className="font-semibold">Filters</span>

        <Button
          className="text-foreground"
          onClick={resetFilters}
          size="sm"
          variant="link"
        >
          Clear
        </Button>
      </div>

      <Accordion collapsible type="single">
        <ProductFilterItem title="Tags">
          Yes. It adheres to the WAI-ARIA design pattern.
        </ProductFilterItem>
        <ProductFilterItem title="Price">
          <PriceFilter
            maxPrice={filters.maxPrice}
            minPrice={filters.minPrice}
            onFilterChange={onFilterChange}
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
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent containerClassname="data-[state=open]:overflow-visible">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
};
