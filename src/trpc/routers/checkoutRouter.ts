import type Stripe from "stripe";

import { TRPCError } from "@trpc/server";
import z from "zod";

import { routes } from "@/configs/routes";
import { CheckoutMetadata, ProductMetadata } from "@/features/checkout/types";
import { stripe } from "@/lib/stripe";
import { Media, Tenant } from "@/payload-types";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";

export const checkoutRouters = createTRPCRouter({
  getProducts: baseProcedure
    .input(
      z.object({
        ids: z.array(z.string()).min(1).max(100),
      })
    )
    .query(async ({ ctx, input }) => {
      const uniqueIds = Array.from(new Set(input.ids));

      const data = await ctx.payload.find({
        collection: "products",
        depth: 2,
        where: {
          id: {
            in: uniqueIds,
          },
        },
      });

      if (data.totalDocs !== uniqueIds.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Some products not found",
        });
      }

      return {
        products: data.docs.map(({ id, image, name, price, tenant }) => ({
          id,
          image: image as Media,
          name,
          price,
          tenant: {
            ...(tenant as Tenant),
            image: (tenant as Tenant).image as Media | null,
          },
        })),
        totalPrice: data.docs
          .reduce((acc, p) => acc + Number(p.price), 0)
          .toString(),
      };
    }),

  purchase: protectedProcedure
    .input(
      z.object({
        productIds: z.array(z.string()).min(1).max(100),
        tenantSlug: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const products = await ctx.payload.find({
        collection: "products",
        where: {
          and: [
            {
              id: {
                in: input.productIds,
              },
            },
            {
              "tenant.slug": {
                equals: input.tenantSlug,
              },
            },
          ],
        },
      });

      if (products.totalDocs !== input.productIds.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Some products not found",
        });
      }

      const res = await ctx.payload.find({
        collection: "tenants",
        depth: 2,
        limit: 1,
        where: {
          slug: {
            equals: input.tenantSlug,
          },
        },
      });

      const tenant = res.docs[0];

      if (!tenant) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tenant not found",
        });
      }

      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        products.docs.map((product) => ({
          price_data: {
            currency: "usd",
            product_data: {
              description: product.description || "",
              metadata: {
                id: product.id,
                name: product.name,
                price: product.price,
                stripeAccountId: tenant.stripeAccountId,
              } as ProductMetadata,
              name: product.name,
            },
            unit_amount: Number(product.price) * 100,
          },
          quantity: 1,
        }));

      const publicUrl = process.env.NEXT_PUBLIC_BASE_URL;

      if (!publicUrl) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "NEXT_PUBLIC_BASE_URL is not defined",
        });
      }

      const checkoutPath = routes.tenants.checkout.buildPath({
        tenantSlug: tenant.slug,
      });

      const cancelUrl = new URL(checkoutPath, publicUrl);
      cancelUrl.searchParams.set("cancel", "true");

      const successUrl = new URL(checkoutPath, publicUrl);
      successUrl.searchParams.set("success", "true");

      const checkout = await stripe.checkout.sessions.create({
        cancel_url: cancelUrl.toString(),
        customer_email: ctx.session.user?.email,
        invoice_creation: { enabled: true },
        line_items: lineItems,
        metadata: {
          tenantId: tenant.id,
          userId: ctx.session.user?.id,
        } as CheckoutMetadata,
        mode: "payment",
        success_url: successUrl.toString(),
      });

      if (!checkout.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create checkout session",
        });
      }

      return { url: checkout.url };
    }),
});
