"use client";

import { useQuery } from "@tanstack/react-query";
import { LoaderIcon } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

import { useTRPC } from "@/trpc/client";

import { useCart } from "../../hooks/useCart";
import { CheckoutCartItem } from "./CheckoutCartItem";
import { CheckoutCartNotFound } from "./CheckoutCartNotFound";
import { CheckoutCartSidebar } from "./CheckoutCartSidebar";

interface IProps {
  tenantSlug: string;
}

export const CheckoutCartLayout = ({ tenantSlug }: IProps) => {
  const { clearCart, productIds, removeFromCart } = useCart(tenantSlug);

  const trpc = useTRPC();

  const { data, error, isLoading } = useQuery(
    trpc.checkout.getProducts.queryOptions({
      ids: productIds,
    })
  );

  useEffect(() => {
    if (error?.data?.code === "NOT_FOUND") {
      clearCart();
      toast.warning("Invalid products in cart. Cart cleared.", {
        duration: 5000,
      });
    }
  }, [error, clearCart]);

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="bg-background flex h-96 items-center justify-center border-dashed p-6">
          <LoaderIcon className="animate-spin" size={24} />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 lg:px-12 lg:pt-16">
      {data?.products?.length ? (
        <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-7 lg:gap-16">
          <div
            className="bg-background divide-border border-border divide-y overflow-hidden rounded-md border lg:col-span-4"
            role="list"
          >
            {data.products.map((item) => (
              <CheckoutCartItem
                item={item}
                key={item.id}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          <div className="lg:col-span-3">
            <CheckoutCartSidebar totalPrice={data.totalPrice} />
          </div>
        </div>
      ) : (
        <CheckoutCartNotFound />
      )}
    </div>
  );
};
