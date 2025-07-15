"use client";

import { useQuery } from "@tanstack/react-query";
import { BookMarkedIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { routes } from "@/configs/routes";
import { useTRPC } from "@/trpc/client";

interface IProps {
  disabled?: boolean;
}

export const SearchBar = ({ disabled }: IProps) => {
  const trpc = useTRPC();
  const { data: session } = useQuery(trpc.auth.session.queryOptions());

  return (
    <div className="flex items-center justify-between gap-2 lg:gap-4">
      <Input
        className="rounded-sm py-6"
        disabled={disabled}
        placeholder="Search Products"
        startIcon={SearchIcon}
      />
      {session?.user && (
        <Button className="rounded-sm bg-transparent py-6" variant="reverse">
          <BookMarkedIcon />
          <Link href={routes.library.path}>{routes.library.label}</Link>
        </Button>
      )}
    </div>
  );
};
