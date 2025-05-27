import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

interface IProps {
  disabled?: boolean;
}

export const SearchBar = ({ disabled }: IProps) => {
  return (
    <Input
      className="rounded-sm py-6"
      disabled={disabled}
      placeholder="Search Products"
      startIcon={SearchIcon}
    />
  );
};
