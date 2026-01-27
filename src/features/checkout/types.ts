import Stripe from "stripe";

import { Product, Tenant } from "@/payload-types";

export type CheckoutMetadata = {
  tenantId: string;
  userId: string;
};

export type ExpandedLineItem = Stripe.LineItem & {
  price: Stripe.Price & {
    product: Stripe.Product & {
      metadata: ProductMetadata;
    };
  };
};

export type ProductMetadata = Pick<Product, "id" | "name" | "price"> &
  Pick<Tenant, "stripeAccountId">;
