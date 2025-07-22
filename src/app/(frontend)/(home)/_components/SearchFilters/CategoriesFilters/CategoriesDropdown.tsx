"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MouseEvent, useRef } from "react";

import { useDropdownPosition } from "@/app/(frontend)/(home)/_components/SearchFilters/hooks/useDropdownPosition";
import { Button } from "@/components/ui/button";
import { DropdownCategory } from "@/features/categories/types";
import { cn } from "@/lib/utils";
import { useToggleState } from "@/shared/hooks/useToggleState";

import { useCategoryNavigation } from "../hooks/useCategoryNavigation";
import { SubcategoriesMenu } from "./SubcategoriesMenu";

interface IProps {
  buttonRef?: (element: HTMLButtonElement | null) => void;
  category: DropdownCategory;
  Icon?: React.ReactNode;
  isActive?: boolean;
  isNavigationHovered?: boolean;
  setHoveredCategoryId?: (id: null | string) => void;
}

export const CategoriesDropdown = ({
  buttonRef,
  category,
  Icon,
  isActive,
  isNavigationHovered = false,
  setHoveredCategoryId,
}: IProps) => {
  const { slug } = useParams();
  const [categorySlug] = slug || [];

  const { handleClose, handleOpen, isOpen } = useToggleState();
  const { currentCategory, navigateTo, reset } =
    useCategoryNavigation(category);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownPosition = useDropdownPosition(dropdownRef, isOpen);

  const handleCategoryClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (category.id === "more") {
      e.preventDefault(); // The "More" button itself doesn't navigate
    } else {
      handleClose(); // Close dropdown upon successful navigation
    }
  };

  const handleMouseEnter = () => {
    setHoveredCategoryId?.(category.id);
    // Only open the dropdown if there are subcategories to show
    if (category.subCategories?.length) {
      handleOpen();
    }
  };

  const handleMouseLeave = () => {
    reset(); // Reset navigation state on leave
    setHoveredCategoryId?.(null);
    handleClose();
  };

  const handleDropdownCategoryClick = (subCategory: DropdownCategory) => () => {
    navigateTo(subCategory);
  };

  // If category is "more", display its name, otherwise display the current category name
  // To prevent layout shift when category in "more" is selected
  const buttonDisplayName =
    category.id === "more" ? category.name : currentCategory.name;

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef}
    >
      <Link
        href={currentCategory.slug === "all" ? "/" : `/${currentCategory.slug}`}
        onClick={handleCategoryClick}
      >
        <Button
          className={cn(
            "text-foreground relative rounded-full border-transparent bg-transparent",

            isOpen || isActive || isNavigationHovered
              ? categorySlug
                ? "border-primary-foreground"
                : "border-foreground"
              : "hover:border-foreground border-transparent",
            categorySlug && "text-primary-foreground",
          )}
          ref={buttonRef}
          type="button"
          variant="noShadow"
        >
          {buttonDisplayName}
          {Icon}
        </Button>
      </Link>

      {isOpen && (
        <SubcategoriesMenu
          category={currentCategory}
          handleCategoryClick={handleDropdownCategoryClick}
          handleClose={handleClose}
          position={dropdownPosition}
          reset={reset}
        />
      )}
    </div>
  );
};
