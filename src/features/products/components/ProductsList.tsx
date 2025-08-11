"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { InboxIcon } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { DEFAULT_PRODUCTS_LIMIT } from "@/shared/constants";
import { useTRPC } from "@/trpc/client";

import { ProductsCard, ProductsCardSkeleton } from "./ProductsCard";
import { useProductQueryParams } from "./ProductsFilters/hooks/useProductQueryParams";

interface IProps {
  slug?: string[];
}

export const ProductsList = ({ slug }: IProps) => {
  const [categorySlug, subCategorySlug, subSubCategorySlug] = slug || [];

  const trpc = useTRPC();

  const [params] = useProductQueryParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions(
        {
          categorySlug: subSubCategorySlug || subCategorySlug || categorySlug,
          ...params,
          limit: DEFAULT_PRODUCTS_LIMIT,
          sort: params.sort,
        },
        {
          getNextPageParam: ({ nextPage }) => nextPage,
        },
      ),
    );

  if (!data || data.pages?.[0]?.docs?.length === 0) {
    return (
      <div className="bg-background border-border flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-lg border border-dashed p-4">
        <InboxIcon />
        <p className="font-medium">No products found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4">
        {data?.pages.map((page) =>
          page.products?.map((product) => (
            <ProductsCard key={product.id} product={product} />
          )),
        )}
      </div>

      {hasNextPage && (
        <Button
          className="mx-auto"
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          size="lg"
        >
          Load more...
        </Button>
      )}
    </div>
  );
};

export const ProductsListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <ProductsCardSkeleton key={idx} />
      ))}
    </div>
  );
};
