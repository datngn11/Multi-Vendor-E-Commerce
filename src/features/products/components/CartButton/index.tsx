import { useCart } from "@/features/checkout/hooks/useCart";
import { Button } from "@/shared/components/ui/button";

interface IProps {
  productId: string;
  tenantSlug: string;
}

export const CartButton = ({ productId, tenantSlug }: IProps) => {
  const { isProductInCart, toggleProduct } = useCart(tenantSlug);

  const handleToggleProduct = () => toggleProduct(productId);

  return (
    <Button
      className="border-foreground flex-1 border-2"
      onClick={handleToggleProduct}
      size="lg"
      variant="reverse"
    >
      {isProductInCart(productId) ? "Remove from Cart" : "Add to Cart"}
    </Button>
  );
};

export const CartButtonSkeleton = () => {
  return (
    <Button className="border-foreground flex-1 border-2" disabled size="lg" />
  );
};
