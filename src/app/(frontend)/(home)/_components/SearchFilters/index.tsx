import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Category } from "@/payload-types";
import { SearchBar } from "./SearchBar";
import { CategoriesFilters } from "./CategoriesFilters";

export const SearchFilters = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
    depth: 1,
    where: {
      parent: {
        exists: false,
      },
    },
  });

  const formttedData =
    data.docs?.map((category) => ({
      ...category,

      subCategories:
        category.subCategories?.docs?.map((subCategory) => ({
          //With depth 1 we are sure that doc is type of Category and not string
          ...(subCategory as Category),
          subCategories: undefined,
        })) ?? [],
    })) ?? [];

  return (
    <div className="flex flex-col gap-4 border-b px-4 py-8 lg:px-12">
      <SearchBar />

      <CategoriesFilters categories={formttedData} />
    </div>
  );
};
