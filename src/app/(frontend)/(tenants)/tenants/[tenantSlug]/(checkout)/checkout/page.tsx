import { CheckoutCartLayout } from "@/features/checkout/components/CheckoutCart/CheckoutCartLayout";

const CheckoutPage = async ({
  params,
}: PageProps<"/tenants/[tenantSlug]/checkout">) => {
  const { tenantSlug } = await params;

  return <CheckoutCartLayout tenantSlug={tenantSlug} />;
};

export default CheckoutPage;
