import { BookMarkedIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "@/configs/routes";
import { caller } from "@/trpc/server";

interface IProps {
  disabled?: boolean;
}

export const SearchBar = async ({ disabled }: IProps) => {
  const session = await caller.auth.session();

  return (
    <div className="flex items-center justify-between gap-2 lg:gap-4">
      <Input
        className="rounded-sm py-6"
        disabled={disabled}
        placeholder="Search Products"
        startIcon={SearchIcon}
      />
      {session.user && (
        <Button className="rounded-sm bg-transparent py-6" variant="reverse">
          <BookMarkedIcon />
          <Link href={routes.library.path}>{routes.library.label}</Link>
        </Button>
      )}
    </div>
  );
};
