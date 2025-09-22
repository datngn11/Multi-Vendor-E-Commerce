import { ProductBrowseLayout } from "@/features/products/components/ProductBrowseLayout";
import { loadProductFilterParams } from "@/features/products/components/ProductsFilters/server";
import { DEFAULT_PRODUCTS_LIMIT } from "@/shared/constants";
import { HydrateClient, prefetch, trpc } from "@/trpc/server";

const TenantPage = async ({
  params,
  searchParams,
}: PageProps<"/tenants/[tenantSlug]">) => {
  const { tenantSlug } = await params;

  const filters = await loadProductFilterParams(searchParams);

  prefetch(
    trpc.products.getMany.infiniteQueryOptions({
      tenantSlug,
      ...filters,
      limit: DEFAULT_PRODUCTS_LIMIT,
    })
  );

  return (
    <HydrateClient>
      <ProductBrowseLayout narrowView tenantSlug={tenantSlug} tenantView />;
    </HydrateClient>
  );
};

export default TenantPage;
