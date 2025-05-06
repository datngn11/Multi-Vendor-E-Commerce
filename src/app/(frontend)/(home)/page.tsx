import { LayoutDashboardIcon } from "lucide-react";
import { SearchFilters } from "./_components/SearchFilters";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HomePage = async () => {
  return (
    <>
      <SearchFilters />
      <div className="p-4 lg:px-12">
        <h1 className="text-center text-4xl font-bold">Welcome to VELÉLS</h1>
        <p className="text-center">
          This is a simple and elegant design system for your projects.
        </p>
      </div>

      <div className="fixed right-4 bottom-4">
        <Link href="/admin">
          <Button size="icon" variant="default" className="rounded-full">
            <LayoutDashboardIcon />
          </Button>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
