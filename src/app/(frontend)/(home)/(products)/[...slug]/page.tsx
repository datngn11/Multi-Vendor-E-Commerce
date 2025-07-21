import { Suspense } from "react";

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
      <Suspense fallback={<ProductsListSkeleton />}>
        <ProductsList />
      </Suspense>
    </HydrateClient>
  );
};

export default ProductsPage;
