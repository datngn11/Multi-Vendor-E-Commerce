import { Suspense } from "react";

import { ProductFilters } from "@/features/products/components/ProductsFilters";
import {
  ProductsList,
  ProductsListSkeleton,
} from "@/features/products/components/ProductsList";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

interface IProps {
  params: Promise<{ slug?: string[] }>;
}

const ProductsPage = async ({ params }: IProps) => {
  const { slug } = await params;

  const [categorySlug, subCategorySlug, subSubCategorySlug] = slug || [];

  prefetch(trpc.categories.getMany.queryOptions());

  prefetch(
    trpc.products.getManyByCategorySlug.queryOptions({
      categorySlug: subSubCategorySlug || subCategorySlug || categorySlug,
    }),
  );

  return (
    <HydrateClient>
      <div className="flex flex-col gap-4 px-4 py-8 lg:px-12">
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
