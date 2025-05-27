import { LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const HomePage = async () => {
  return (
    <>
      <div className="p-4 lg:px-12">
        <h1 className="text-center text-4xl font-bold">Welcome to VELÉLS</h1>
        <p className="text-center">
          This is a simple and elegant design system for your projects.
        </p>
      </div>

      <div className="fixed right-4 bottom-4">
        <Link href="/admin">
          <Button className="rounded-full" size="icon" variant="default">
            <LayoutDashboardIcon />
          </Button>
        </Link>
      </div>
    </>
  );
};

export default HomePage;
