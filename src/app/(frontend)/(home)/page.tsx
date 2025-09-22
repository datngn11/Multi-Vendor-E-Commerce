import { ProductBrowseLayout } from "@/features/products/components/ProductBrowseLayout";
import { loadProductFilterParams } from "@/features/products/components/ProductsFilters/server";
import { DEFAULT_PRODUCTS_LIMIT } from "@/shared/constants";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

const HomePage = async ({ searchParams }: PageProps<"/">) => {
  const filters = await loadProductFilterParams(searchParams);

  prefetch(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: DEFAULT_PRODUCTS_LIMIT,
    })
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
