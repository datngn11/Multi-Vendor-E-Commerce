import { inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "@/trpc/routers/_app";

export type CategoriesGetManyOutput =
  inferRouterOutputs<AppRouter>["categories"]["getMany"];

export type CategoriesGetManyOutputSingle = CategoriesGetManyOutput[number];

// This type is used to support deeply nested categories in the dropdown
export type FormattedCategory = Omit<
  CategoriesGetManyOutputSingle,
  "subCategories"
> & {
  subCategories?: FormattedCategory[];
};
