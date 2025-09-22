import { Suspense } from "react";

import { HydrateClient, prefetch, trpc } from "@/trpc/server";

import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import {
  SearchFilters,
  SearchFiltersSkeleton,
} from "./_components/SearchFilters";

const MainLayout = async ({ children }: LayoutProps<"/">) => {
  prefetch(trpc.categories.getMany.queryOptions());

  return (
    <HydrateClient>
      <div className="flex min-h-screen flex-col font-[family-name:var(--font-dm-sans)]">
        <Header />

        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>

        <main className="flex-1">{children}</main>

        <Footer />
      </div>
    </HydrateClient>
  );
};

export default MainLayout;
