"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";

import { useProductQueryParams } from "./ProductsFilters/hooks/useProductQueryParams";

interface IProps {
  slug?: string[];
}

export const ProductsList = ({ slug }: IProps) => {
  const [categorySlug, subCategorySlug, subSubCategorySlug] = slug || [];

  const trpc = useTRPC();

  const [params] = useProductQueryParams();

  const { data: products } = useSuspenseQuery(
    trpc.products.getManyByCategorySlug.queryOptions({
      categorySlug: subSubCategorySlug || subCategorySlug || categorySlug,
      ...params,
      sort: params.sort,
    }),
  );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {products.map((product) => (
        <Card className="cursor-pointer" key={product.id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
            <CardDescription>{product.description}</CardDescription>
          </CardHeader>

          <CardFooter className="flex w-full items-center justify-between">
            <span className="text-lg font-semibold">
              ${product.price.toFixed(2)}
            </span>
            <Button>Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
      {products.length === 0 && <p>No products found.</p>}
    </div>
  );
};

export const ProductsListSkeleton = () => {
  return <div>Loading....</div>;
};
