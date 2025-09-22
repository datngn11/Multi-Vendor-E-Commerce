import { Suspense } from "react";

import { ProductFilters, ProductFiltersSkeleton } from "./ProductsFilters";
import {
  ProductsList,
  ProductsListSkeleton,
} from "./ProductsList/ProductsList";
import { ProductsSort, ProductsSortSkeleton } from "./ProductsSort";

interface IProps {
  narrowView?: boolean;
  slug?: string[];
  tenantSlug?: string;
  tenantView?: boolean;
}

export const ProductBrowseLayout = ({
  narrowView = false,
  slug,
  tenantSlug,
  tenantView = false,
}: IProps) => {
  return (
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
          <Suspense fallback={<ProductsListSkeleton narrowView={narrowView} />}>
            <ProductsList
              narrowView={narrowView}
              slug={slug}
              tenantSlug={tenantSlug}
              tenantView={tenantView}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
