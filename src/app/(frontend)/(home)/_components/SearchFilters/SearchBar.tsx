import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import React from "react";

export const SearchBar = () => {
  return (
    <Input
      className="rounded-sm py-6"
      placeholder="Search Products"
      startIcon={SearchIcon}
    />
  );
};
