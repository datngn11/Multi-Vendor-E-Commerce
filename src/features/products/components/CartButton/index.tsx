"use client";

import { useCart } from "@/features/checkout/hooks/useCart";
import { Button } from "@/shared/components/ui/button";

interface IProps {
  productId: string;
  tenantSlug: string;
}

export const CartButton = ({ productId, tenantSlug }: IProps) => {
  const { isProductInCart, toggleProduct } = useCart(tenantSlug);

  const handleToggleProduct = () => toggleProduct(productId);

  const inCart = isProductInCart(productId);

  return (
    <Button
      aria-label={inCart ? "Remove from Cart" : "Add to Cart"}
      aria-pressed={inCart}
      className="border-foreground flex-1 border-2"
      onClick={handleToggleProduct}
      size="lg"
      variant="reverse"
    >
      {inCart ? "Remove from Cart" : "Add to Cart"}
    </Button>
  );
};

export const CartButtonSkeleton = () => {
  return (
    <Button className="border-foreground flex-1 border-2" disabled size="lg" />
  );
};
