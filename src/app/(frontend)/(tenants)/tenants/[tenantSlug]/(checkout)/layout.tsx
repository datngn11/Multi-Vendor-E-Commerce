import { CheckoutNavbar } from "@/features/checkout/components/CheckoutNavbar";

const CheckoutLayout = async ({
  children,
  params,
}: LayoutProps<"/tenants/[tenantSlug]">) => {
  const { tenantSlug } = await params;

  return (
    <div className="flex min-h-screen flex-col">
      <CheckoutNavbar tenantSlug={tenantSlug} />

      <div className="flex-1">
        <div className="mx-auto max-w-(--breakpoint-xl)">{children}</div>
      </div>
    </div>
  );
};

export default CheckoutLayout;
