"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { MouseEvent, useRef, useState } from "react";

import { useDropdownPosition } from "@/app/(frontend)/(home)/_components/SearchFilters/hooks/useDropdownPosition";
import { Button } from "@/components/ui/button";
import { DropdownCategory } from "@/features/categories/types";
import { useToggleState } from "@/hooks/useToggleState";
import { cn } from "@/lib/utils";

import { SubcategoriesMenu } from "./SubcategoriesMenu";

const BACK_CATEGORY: DropdownCategory = {
  createdAt: new Date().toISOString(),
  id: "back",
  name: "Back",
  slug: "back",
  subCategories: [],
  updatedAt: new Date().toISOString(),
};

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

  const [currentCategory, setCurrentCategory] =
    useState<DropdownCategory>(category);

  const { handleClose, handleOpen, isOpen } = useToggleState();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownPosition = useDropdownPosition(dropdownRef, isOpen);

  const handleMouseEnter = () => {
    setHoveredCategoryId?.(category.id);
    if (currentCategory.subCategories?.length) {
      handleOpen();
    }
  };

  const handleMouseLeave = () => {
    setCurrentCategory(category);
    setHoveredCategoryId?.(null);
    handleClose();
  };

  // If category is "more", display its name, otherwise display the current category name
  // To prevent layout shift when category in "more" is selected
  const buttonDisplayName =
    category.id === "more" ? category.name : currentCategory.name;

  const handleDropdownCategoryClick = (subCategory: DropdownCategory) => () => {
    if (subCategory.slug === "back") {
      setCurrentCategory(category);
    } else {
      setCurrentCategory({
        ...subCategory,
        subCategories: [BACK_CATEGORY, ...(subCategory.subCategories ?? [])],
      });
    }
  };

  const handleCategoryClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (category.slug === "more") {
      e.preventDefault();
    } else {
      handleClose();
    }
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
        />
      )}
    </div>
  );
};
