import { Sort, Where } from "payload";
import z from "zod";

import {
  filterZodSchema,
  SortValues,
  sortZodSchema,
} from "@/features/products/schemas";
import { Media, Tenant } from "@/payload-types";
import { DEFAULT_PRODUCTS_LIMIT } from "@/shared/constants";
import { hasItems } from "@/shared/utils/arrays";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        categorySlug: z.string().optional(),
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_PRODUCTS_LIMIT),
        tenantSlug: z.string().optional(),
        ...filterZodSchema.shape,
        ...sortZodSchema.shape,
      }),
    )
    .query(async ({ ctx, input }) => {
      const { categorySlug, maxPrice, minPrice, sort, tags, tenantSlug } =
        input;

      const where: Where = {};
      let sortParam: Sort = "-createdAt";

      /**
       * Handle filtering
       */
      if (minPrice !== null || maxPrice !== null) {
        where.price = {
          ...(minPrice !== null && { greater_than_equal: minPrice }),
          ...(maxPrice !== null && { less_than_equal: maxPrice }),
        };
      }

      if (hasItems(tags)) {
        where["tags.name"] = {
          in: tags,
        };
      }

      /**
       * Handle sorting
       */
      switch (sort) {
        case SortValues.Curated:
          sortParam = "createdAt";
          break;
        case SortValues.Newest:
          sortParam = "-createdAt";
          break;
        case SortValues.Trending:
          sortParam = "name";
          break;
      }

      // 1. Fetch all categories to build the hierarchy in memory.
      // This is often more efficient than multiple DB calls for descendants.
      const { docs: allCategories } = await ctx.payload.find({
        collection: "categories",
        depth: 0, // We only need category IDs and parent relationships
        limit: 0,
      });

      // 2. Find the initial parent category by its slug.
      const parentCategory = categorySlug
        ? allCategories.find(({ slug }) => slug === categorySlug)
        : null;

      // if (!parentCategory) {
      //   throw new TRPCError({
      //     code: "NOT_FOUND",
      //     message: "Category not found",
      //   });
      // }

      // 3. A recursive function to find all descendant category IDs.
      const getAllDescendantIds = (categoryId: string): string[] => {
        // Find direct children
        const children = allCategories.filter(
          (cat) => cat.parent === categoryId,
        );

        // Get IDs of direct children
        const descendantIds = children.map((child) => child.id);

        // Recursively find IDs of grandchildren and so on
        children.forEach((child) => {
          descendantIds.push(...getAllDescendantIds(child.id));
        });

        return descendantIds;
      };

      // 4. Get all relevant category IDs (parent + all descendants).
      const allApplicableCategoryIds = parentCategory
        ? [parentCategory.id, ...getAllDescendantIds(parentCategory.id)]
        : [];

      if (hasItems(allApplicableCategoryIds)) {
        where.category = {
          in: allApplicableCategoryIds,
        };
      }

      if (tenantSlug) {
        where["tenant.slug"] = {
          equals: tenantSlug,
        };
      }

      // 5. Find all products where the category is in our list of IDs.
      const response = await ctx.payload.find({
        collection: "products",
        depth: 2,
        limit: input.limit,
        page: input.cursor,
        sort: sortParam,
        where,
      });

      return {
        products: response.docs.map(({ id, image, name, price, tenant }) => ({
          id,
          image: image as Media,
          name,
          price,
          tenant: {
            ...(tenant as Tenant),
            image: (tenant as Tenant).image as Media | null,
          },
        })),
        ...response,
      };
    }),
});
