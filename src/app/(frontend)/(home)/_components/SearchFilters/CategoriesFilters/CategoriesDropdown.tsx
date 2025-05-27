"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { useDropdownPosition } from "@/hooks/useDropdownPosition";
import { useToggleState } from "@/hooks/useToggleState";
import { cn } from "@/lib/utils";
import { DropdownCategory } from "@/modules/categories/types";

import { SubcategoriesMenu } from "./SubcategoriesMenu";

interface IProps {
  buttonRef?: (element: HTMLButtonElement | null) => void;
  category: DropdownCategory;
  Icon?: React.ReactNode;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

export const CategoriesDropdown = ({
  buttonRef,
  category,
  Icon,
  isActive,
  isNavigationHovered = false,
}: IProps) => {
  const [currentCategory, setCurrentCategory] =
    useState<DropdownCategory>(category);
  const { handleClose, handleOpen, isOpen } = useToggleState();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownPosition = useDropdownPosition(dropdownRef, isOpen);

  const handleMouseEnter = () => {
    if (currentCategory.subCategories?.length) {
      handleOpen();
    }
  };

  const handleMouseLeave = () => {
    setCurrentCategory(category);
    handleClose();
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef}
    >
      <Link
        href={currentCategory.slug === "all" ? "/" : `/${currentCategory.slug}`}
      >
        <Button
          className={cn(
            "hover:border-foreground text-foreground relative rounded-full border-transparent bg-transparent",

            isOpen || (isActive && !isNavigationHovered && "border-foreground"),
          )}
          ref={buttonRef}
          variant="noShadow"
        >
          {currentCategory.name}

          {Icon}
        </Button>
      </Link>

      {isOpen && (
        <SubcategoriesMenu
          category={currentCategory}
          initialCategory={category}
          position={dropdownPosition}
          setCurrentCategory={setCurrentCategory}
        />
      )}
    </div>
  );
};
