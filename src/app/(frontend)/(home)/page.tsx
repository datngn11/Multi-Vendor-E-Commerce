import { Suspense } from "react";

import {
  ProductFilters,
  ProductFiltersSkeleton,
} from "@/features/products/components/ProductsFilters";
import {
  ProductsList,
  ProductsListSkeleton,
} from "@/features/products/components/ProductsList";
import {
  ProductsSort,
  ProductsSortSkeleton,
} from "@/features/products/components/ProductsSort";
import { HydrateClient } from "@/trpc/server";

const HomePage = () => {
  return (
    <HydrateClient>
      <div className="px-4 py-20 lg:px-12">
        <h1 className="text-center text-4xl font-bold">Welcome to VELÉLS</h1>
        <p className="text-center">
          This is a simple and elegant design system for your projects.
        </p>
      </div>

      <div className="flex flex-col gap-4 px-4 py-8 lg:px-12">
        <Suspense fallback={<ProductsSortSkeleton />}>
          <ProductsSort />
        </Suspense>

        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-6 xl:grid-cols-8">
          <div className="lg:col-span-2 xl:col-span-2">
            <Suspense fallback={<ProductFiltersSkeleton />}>
              <ProductFilters />
            </Suspense>
          </div>

          <div className="lg:col-span-4 xl:col-span-6">
            <Suspense fallback={<ProductsListSkeleton />}>
              <ProductsList />
            </Suspense>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
};

export default HomePage;
