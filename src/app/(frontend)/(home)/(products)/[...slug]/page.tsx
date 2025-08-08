import type { SearchParams } from "nuqs";

import { Suspense } from "react";

import { ProductFilters } from "@/features/products/components/ProductsFilters";
import { loadProductFilterParams } from "@/features/products/components/ProductsFilters/server";
import {
  ProductsList,
  ProductsListSkeleton,
} from "@/features/products/components/ProductsList";
import { ProductsSort } from "@/features/products/components/ProductsSort";
import { DEFAULT_PRODUCTS_LIMIT } from "@/shared/constants";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

interface IProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<SearchParams>;
}

const ProductsPage = async ({ params, searchParams }: IProps) => {
  const { slug } = await params;
  const filters = await loadProductFilterParams(searchParams);

  const [categorySlug, subCategorySlug, subSubCategorySlug] = slug || [];

  prefetch(
    trpc.products.getMany.infiniteQueryOptions({
      categorySlug: subSubCategorySlug || subCategorySlug || categorySlug,
      ...filters,
      limit: DEFAULT_PRODUCTS_LIMIT,
    }),
  );

  return (
    <HydrateClient>
      <div className="flex flex-col gap-4 px-4 py-8 lg:px-12">
        <ProductsSort />

        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-6 xl:grid-cols-8">
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters />
          </div>

          <div className="lg:col-span-4 xl:col-span-6">
            <Suspense fallback={<ProductsListSkeleton />}>
              <ProductsList slug={slug} />
            </Suspense>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
};

export default ProductsPage;
