"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useTRPC } from "@/trpc/client";

import { CategoriesBreadcrumb } from "./CategoriesBreadcrumb";
import { CategoriesFilters } from "./CategoriesFilters";
import { SearchBar } from "./SearchBar";

export const SearchFilters = () => {
  const trpc = useTRPC();
  const { slug } = useParams();
  const [categorySlug, subcategorySlug] = slug || [];

  const { data: category } = useSuspenseQuery(
    trpc.categories.getBySlug.queryOptions({
      slug: categorySlug || "all",
    }),
  );

  const backgroundColor = category?.color ?? "transparent";

  return (
    <div
      className={"flex flex-col gap-4 border-b px-4 py-8 lg:px-12"}
      style={{
        backgroundColor,
      }}
    >
      <SearchBar />

      <CategoriesFilters />

      {categorySlug && category && (
        <CategoriesBreadcrumb
          category={category}
          subcategorySlug={subcategorySlug}
        />
      )}
    </div>
  );
};

export const SearchFiltersSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-4 border-b px-4 py-8 lg:px-12">
      <SearchBar disabled />

      <div className="h-10 w-full animate-pulse rounded-md" />
    </div>
  );
};
