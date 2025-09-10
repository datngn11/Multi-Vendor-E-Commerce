import { TRPCError } from "@trpc/server";
import z from "zod";

import { Media } from "@/payload-types";

import { baseProcedure, createTRPCRouter } from "../init";

export const tenantsRouter = createTRPCRouter({
  getBySlug: baseProcedure
    .input(
      z.object({
        slug: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { slug } = input;

      if (!slug) return null;

      const data = await ctx.payload.find({
        collection: "tenants",
        limit: 1,
        pagination: false,
        where: {
          slug: {
            equals: slug,
          },
        },
      });

      const tenant = data?.docs?.[0];

      if (!tenant) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tenant not found",
        });
      }

      return {
        ...tenant,
        image: tenant.image as Media,
      };
    }),
});
