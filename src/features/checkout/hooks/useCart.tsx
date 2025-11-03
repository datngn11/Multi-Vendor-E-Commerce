import { useCartStore } from "../store/useCartStore";

export const useCart = (tenantSlug: string) => {
  const {
    addProduct,
    clearCart,
    clearTenantCart: clearCartByTenant,
    getTenantProductIds,
    removeProduct,
  } = useCartStore();

  const productIds = getTenantProductIds(tenantSlug);

  const toggleProduct = (productId: string) => {
    if (productIds?.includes(productId)) {
      removeProduct(tenantSlug, productId);
    } else {
      addProduct(tenantSlug, productId);
    }
  };

  const isProductInCart = (productId: string) =>
    productIds?.includes(productId);

  const addToCart = (productId: string) => addProduct(tenantSlug, productId);

  const removeFromCart = (productId: string) =>
    removeProduct(tenantSlug, productId);

  const clearTenantCart = () => clearCartByTenant(tenantSlug);

  return {
    addToCart,
    clearCart,
    clearTenantCart,
    isProductInCart,
    productIds,
    removeFromCart,
    toggleProduct,
    totalItems: productIds?.length ?? 0,
  };
};
