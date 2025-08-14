import type { SearchParams } from "nuqs";

import { ProductBrowseLayout } from "@/features/products/components/ProductBrowseLayout";
import { loadProductFilterParams } from "@/features/products/components/ProductsFilters/server";
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
      <ProductBrowseLayout slug={slug} />
    </HydrateClient>
  );
};

export default ProductsPage;
