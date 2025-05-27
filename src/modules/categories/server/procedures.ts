import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const categories = await ctx.payload.find({
      collection: "categories",
      depth: 1,
      sort: "name",
      where: {
        parent: {
          exists: false,
        },
      },
    });

    const formttedData =
      categories.docs.map((category) => ({
        ...category,

        subCategories:
          category.subCategories?.docs?.map((subCategory) => ({
            //With depth 1 we are sure that doc is type of Category and not string
            ...(subCategory as Category),
            subCategories: undefined,
          })) ?? [],
      })) ?? [];

    return formttedData;
  }),
});
