import { getQueryClient, HydrateClient, trpc } from "@/trpc/server";

import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { SearchFilters } from "./_components/SearchFilters";

interface IProps {
  children: React.ReactNode;
}

const MainLayout = async ({ children }: IProps) => {
  getQueryClient().prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <HydrateClient>
      <div className="flex min-h-screen flex-col font-[family-name:var(--font-dm-sans)]">
        <Header />

        <SearchFilters />

        <main className="flex-1">{children}</main>

        <Footer />
      </div>
    </HydrateClient>
  );
};

export default MainLayout;
