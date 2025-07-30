import { TRPCError } from "@trpc/server";
import z from "zod";

import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
  getBySlug: baseProcedure
    .input(
      z.object({
        slug: z.string().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const category = await ctx.payload.find({
        collection: "categories",
        where: {
          slug: {
            equals: input?.slug,
          },
        },
      });

      if (!category || !category.docs.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Category with slug "${input?.slug}" not found`,
        });
      }

      return category.docs.map((category) => ({
        ...category,
        subCategories: category.subCategories?.docs?.map((subCategory) => ({
          ...(subCategory as Category),
          subCategories: undefined,
        })),
      }))[0];
    }),

  getMany: baseProcedure.query(async ({ ctx }) => {
    const categories = await ctx.payload.find({
      collection: "categories",
      depth: 1,
      limit: 0,
      sort: "name",
      where: {
        parent: {
          exists: false,
        },
      },
    });

    const formattedData =
      categories.docs.map((category) => ({
        ...category,

        subCategories:
          category.subCategories?.docs?.map((subCategory) => ({
            //With depth 1 we are sure that doc is type of Category and not string
            ...(subCategory as Category),
            subCategories: undefined,
          })) ?? [],
      })) ?? [];

    return formattedData;
  }),
});
