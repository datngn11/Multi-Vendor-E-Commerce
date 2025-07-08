import { Suspense } from "react";

import { CategoriesFilters } from "./CategoriesFilters";
import { SearchBar } from "./SearchBar";

export const SearchFilters = () => {
  return (
    <Suspense fallback={<SearchFiltersSkeleton />}>
      <div className="flex flex-col gap-4 border-b px-4 py-8 lg:px-12">
        <SearchBar />
        <CategoriesFilters />
      </div>
    </Suspense>
  );
};

const SearchFiltersSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-4 border-b px-4 py-8 lg:px-12">
      <SearchBar disabled />
      <div className="h-10 w-full animate-pulse rounded-md" />
    </div>
  );
};
