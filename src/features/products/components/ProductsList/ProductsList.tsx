"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { InboxIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { DEFAULT_PRODUCTS_LIMIT } from "@/shared/constants";
import { useTRPC } from "@/trpc/client";

import { useProductQueryParams } from "../ProductsFilters/hooks/useProductQueryParams";
import { ProductsCard, ProductsCardSkeleton } from "./ProductsCard";

interface IProps {
  narrowView?: boolean;
  slug?: string[];
  tenantSlug?: string;
  tenantView?: boolean;
}

export const ProductsList = ({
  narrowView,
  slug,
  tenantSlug,
  tenantView,
}: IProps) => {
  const [categorySlug, subCategorySlug, subSubCategorySlug] = slug || [];

  const trpc = useTRPC();

  const [params] = useProductQueryParams();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery(
      trpc.products.getMany.infiniteQueryOptions(
        {
          categorySlug: subSubCategorySlug || subCategorySlug || categorySlug,
          tenantSlug,
          ...params,
          limit: DEFAULT_PRODUCTS_LIMIT,
          sort: params.sort,
        },
        {
          getNextPageParam: ({ nextPage }) => nextPage,
        }
      )
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
      <div
        className={cn("grid grid-cols-2 gap-4 xl:grid-cols-3", {
          "2xl:grid-cols-4": !narrowView,
        })}
      >
        {data?.pages.map((page) =>
          page.products?.map((product) => (
            <ProductsCard
              key={product.id}
              product={product}
              tenantSlug={tenantSlug}
              tenantView={tenantView}
            />
          ))
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

export const ProductsListSkeleton = ({ narrowView }: IProps) => {
  return (
    <div
      className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3", {
        "2xl:grid-cols-4": !narrowView,
      })}
    >
      {Array.from({ length: 8 }).map((_, idx) => (
        <ProductsCardSkeleton key={idx} />
      ))}
    </div>
  );
};
