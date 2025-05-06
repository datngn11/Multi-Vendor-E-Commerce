"use client";
import { Button } from "@/components/ui/button";

import { IRenderCategory } from "./CategoriesFilters";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { useDropdownPosition } from "@/hooks/useDropdownPosition";
import Link from "next/link";

interface IProps {
  category: IRenderCategory;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

export const CategoriesDropdown = ({
  category,
  isActive = true,
  isNavigationHovered = false,
}: IProps) => {
  const [isOpen, setisOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const position = useDropdownPosition(dropdownRef);

  const onMouseEnter = () => {
    if (category.subCategories.length > 0) {
      setisOpen(true);
    }
  };

  const onMouseLeave = () => {
    setisOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="relative"
    >
      <div className="relative">
        <Button
          variant="noShadow"
          className={cn(
            "hover:border-foreground text-foreground rounded-full border-transparent bg-transparent",
            "dark:hover:text-primary-foreground dark:hover:border-transparent",
            isActive &&
              !isNavigationHovered &&
              "dark:text-primary-foreground border-transparent",
            "relative",
          )}
        >
          {category.name}
        </Button>
      </div>

      {isOpen && <SubcategoriesMenu category={category} position={position} />}
    </div>
  );
};

interface ISubcategoriesMenu {
  category: IRenderCategory;
  position: { top: number; left: number };
}

const SubcategoriesMenu = ({ category, position }: ISubcategoriesMenu) => {
  return (
    <div className="fixed z-100">
      <div
        style={{
          top: position.top,
          left: position.left,
        }}
      >
        <div
          className="shadow-shadow mt-4 w-48 -translate-x-[2px] -translate-y-[2px] overflow-hidden rounded-md border"
          style={{ backgroundColor: category.color || "#f5f5f5" }}
        >
          {category.subCategories.map((subCategory) => (
            <Link
              key={subCategory.slug}
              href={`/products/${subCategory.slug}`}
              className="flex w-full items-center justify-between p-4 text-left font-medium text-black underline hover:bg-[#dddddd]"
            >
              {subCategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
