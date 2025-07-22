import z from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const productsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const products = await ctx.payload.find({
      collection: "products",
      depth: 1,
      limit: 0,
    });

    return products;
  }),

  getManyByCategorySlug: baseProcedure
    .input(
      z.object({
        categorySlug: z.string().optional(),
        maxPrice: z.number().optional(),
        minPrice: z.number().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { categorySlug, maxPrice, minPrice } = input;

      const where: Record<string, unknown> = {};

      if (minPrice) {
        where.price = { gte: minPrice };
      }

      if (maxPrice) {
        where.price = { lte: maxPrice };
      }

      // 1. Fetch all categories to build the hierarchy in memory.
      // This is often more efficient than multiple DB calls for descendants.
      const { docs: allCategories } = await ctx.payload.find({
        collection: "categories",
        depth: 0, // We only need category IDs and parent relationships
        limit: 0,
      });

      // 2. Find the initial parent category by its slug.
      const parentCategory = allCategories.find(
        ({ slug }) => slug === categorySlug,
      );

      if (!parentCategory) {
        return [];
      }

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
      const allApplicableCategoryIds = [
        parentCategory.id,
        ...getAllDescendantIds(parentCategory.id),
      ];

      // 5. Find all products where the category is in our list of IDs.
      const { docs: products } = await ctx.payload.find({
        collection: "products",
        depth: 1,
        where: {
          category: {
            // Use the 'in' operator to match any ID in the array
            in: allApplicableCategoryIds,
          },
        },
      });

      return products.map((product) => ({
        description: product.description,
        id: product.id,
        image: {
          alt: (typeof product.image === "object" && product.image?.alt) || "",
          url: (typeof product.image === "object" && product.image?.url) || "",
        },
        name: product.name,
        price: product.price,
      }));
    }),
});
