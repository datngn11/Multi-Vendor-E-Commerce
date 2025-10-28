import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CartState {
  addProduct: (tenantSlug: string, productId: string) => void;
  cart: Record<string, TenantCart>;
  clearCart: () => void;
  clearTenantCart: (tenantSlug: string) => void;
  getTenantProductIds: (tenantSlug: string) => string[];
  removeProduct: (tenantSlug: string, productId: string) => void;
}

interface TenantCart {
  productIds: string[];
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      addProduct: (tenantSlug, productId) => {
        set(({ cart }) => ({
          cart: {
            ...cart,
            [tenantSlug]: {
              productIds: [...(cart[tenantSlug]?.productIds || []), productId],
            },
          },
        }));
      },

      cart: {},

      clearCart: () => set({ cart: {} }),

      clearTenantCart: (tenantSlug) => {
        set(({ cart }) => ({
          cart: {
            ...cart,
            [tenantSlug]: { productIds: [] },
          },
        }));
      },

      getTenantProductIds: (tenantSlug) =>
        get().cart[tenantSlug]?.productIds ?? [],

      removeProduct: (tenantSlug, productId) => {
        set(({ cart }) => ({
          cart: {
            ...cart,
            [tenantSlug]: {
              productIds:
                cart[tenantSlug]?.productIds.filter((id) => id !== productId) ||
                [],
            },
          },
        }));
      },
    }),
    {
      name: "tenants_cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
