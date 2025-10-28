import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";

import { routes } from "@/configs/routes";
import { Button } from "@/shared/components/ui/button";

import { useCart } from "../hooks/useCart";

interface IProps {
  className?: string;
  hideIfEmpty?: boolean;
  tenantSlug: string;
}

export const CheckoutButton = ({ hideIfEmpty, tenantSlug }: IProps) => {
  const { totalItems } = useCart(tenantSlug);

  if (hideIfEmpty && totalItems === 0) return null;

  return (
    <Button asChild size="lg" variant="neutral">
      <Link href={routes.tenants.buildPath({ slug: tenantSlug })}>
        <ShoppingCartIcon /> {totalItems || ""}
      </Link>
    </Button>
  );
};

export const CheckoutButtonSkeleton = () => {
  return (
    <Button disabled size="lg" variant="neutral">
      <ShoppingCartIcon />
    </Button>
  );
};
