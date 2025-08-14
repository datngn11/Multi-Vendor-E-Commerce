import { type SearchParams } from "nuqs/server";

import { ProductBrowseLayout } from "@/features/products/components/ProductBrowseLayout";
import { loadProductFilterParams } from "@/features/products/components/ProductsFilters/server";
import { DEFAULT_PRODUCTS_LIMIT } from "@/shared/constants";
import { prefetch, trpc } from "@/trpc/server";

interface IProps {
  params: Promise<{ tenantSlug?: string }>;
  searchParams: Promise<SearchParams>;
}

const TenantPage = async ({ params, searchParams }: IProps) => {
  const { tenantSlug } = await params;
  const filters = await loadProductFilterParams(searchParams);

  prefetch(
    trpc.products.getMany.infiniteQueryOptions({
      tenantSlug,
      ...filters,
      limit: DEFAULT_PRODUCTS_LIMIT,
    })
  );

  return <ProductBrowseLayout narrowView tenantSlug={tenantSlug} />;
};

export default TenantPage;
