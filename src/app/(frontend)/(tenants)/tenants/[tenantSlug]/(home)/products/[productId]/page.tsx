import { ProductItemLayout } from "@/features/products/components/ProductItemLayout";

const TenantProductPage = async ({
  params,
}: PageProps<"/tenants/[tenantSlug]/products/[productId]">) => {
  const { productId } = await params;

  return <ProductItemLayout productId={productId} />;
};

export default TenantProductPage;
