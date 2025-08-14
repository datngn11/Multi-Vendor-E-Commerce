import { SearchParams } from "nuqs";

import { ProductBrowseLayout } from "@/features/products/components/ProductBrowseLayout";
import { loadProductFilterParams } from "@/features/products/components/ProductsFilters/server";
import { DEFAULT_PRODUCTS_LIMIT } from "@/shared/constants";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

interface IProps {
  params: Promise<{ slug?: string[] }>;
  searchParams: Promise<SearchParams>;
}

const HomePage = async ({ params, searchParams }: IProps) => {
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
      <div className="px-4 py-20 lg:px-12">
        <h1 className="text-center text-4xl font-bold">Welcome to VELÉLS</h1>
        <p className="text-center">
          This is a simple and elegant design system for your projects.
        </p>
      </div>

      <ProductBrowseLayout />
    </HydrateClient>
  );
};

export default HomePage;
