import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { DropdownCategory } from "@/features/categories/types";
import { hasItems } from "@/shared/utils/arrays";

interface IMenuItemProps {
  item: DropdownCategory;
  onExpand: () => void;
  onNavigate: () => void;
  parentSlug: string;
}

export const SubcategoriesMenuItem = ({
  item,
  onExpand,
  onNavigate,
  parentSlug,
}: IMenuItemProps) => {
  // Determine if this item opens another menu level
  const isExpandable = hasItems(item.subCategories) || item.slug === "back";

  // Base classes are shared to avoid repetition
  const baseClasses =
    "flex w-full items-center p-4 text-left font-medium text-primary-foreground underline hover:bg-[#ffeec1]";

  if (isExpandable) {
    return (
      <div className={`${baseClasses} cursor-pointer gap-2`} onClick={onExpand}>
        {item.slug === "back" ? <ChevronLeftIcon /> : null}
        <span>{item.name}</span>
        {item.slug !== "back" ? <ChevronRightIcon /> : null}
      </div>
    );
  }

  // This is a final link
  const href = item.parent ? `/${parentSlug}/${item.slug}` : `/${item.slug}`;

  return (
    <Link className={baseClasses} href={href} onClick={onNavigate}>
      {item.name}
    </Link>
  );
};
