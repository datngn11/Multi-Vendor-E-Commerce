import { Suspense } from "react";

import { CategoriesFilters } from "./CategoriesFilters";
import { SearchBar } from "./SearchBar";

const deffaultBg = "#f5f5f5";

export const SearchFilters = async () => {
  return (
    <Suspense fallback={<SearchFiltersSkeleton />}>
      <div
        className="flex flex-col gap-4 border-b px-4 py-8 lg:px-12"
        style={{
          backgroundColor: deffaultBg,
        }}
      >
        <SearchBar />
        <CategoriesFilters />
      </div>
    </Suspense>
  );
};

const SearchFiltersSkeleton = () => {
  return (
    <div
      className="flex animate-pulse flex-col gap-4 border-b px-4 py-8 lg:px-12"
      style={{
        backgroundColor: deffaultBg,
      }}
    >
      <SearchBar disabled />
      <div className="h-10 w-full animate-pulse rounded-md" />
    </div>
  );
};
