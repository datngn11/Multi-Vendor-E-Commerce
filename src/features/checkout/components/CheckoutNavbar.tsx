import Link from "next/link";

import { routes } from "@/configs/routes";
import { Button } from "@/shared/components/ui/button";

interface IProps {
  tenantSlug?: string;
}

export const CheckoutNavbar = ({ tenantSlug }: IProps) => {
  if (!tenantSlug) return null;

  return (
    <div className="bg-body-background flex h-20 items-center border-b px-6 lg:px-12">
      <div className="flex h-full w-full max-w-(--breakpoint-xl) items-center justify-between">
        <p className="text-xl"> Checkout</p>

        <Button asChild>
          <Link href={routes.tenants.buildPath({ slug: tenantSlug })}>
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  );
};
