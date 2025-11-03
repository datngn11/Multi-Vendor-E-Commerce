import { TRPCError } from "@trpc/server";
import z from "zod";

import { Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const checkoutRouters = createTRPCRouter({
  getProducts: baseProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.payload.find({
        collection: "products",
        depth: 2,
        where: {
          id: {
            in: input.ids,
          },
        },
      });

      if (data.totalDocs !== input.ids.length) {
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
          .reduce((acc, product) => acc + product.price, 0)
          .toString(),
      };
    }),
});
