"use client";
import { Button } from "@/components/ui/button";
import { useDropdownPosition } from "@/hooks/useDropdownPosition";
import { useToggleState } from "@/hooks/useToggleState";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

import { IRenderCategory } from "./CategoriesFilters";

interface IProps {
  buttonRef?: (element: HTMLButtonElement | null) => void;
  category: IRenderCategory;
  Icon?: React.ReactNode;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

export const CategoriesDropdown = ({
  buttonRef,
  category,
  Icon,
  isActive = true,
  isNavigationHovered = false,
}: IProps) => {
  const [currentCategory, setCurrentCategory] = useState(category);
  const { handleClose, handleOpen, isOpen } = useToggleState();

  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownPosition = useDropdownPosition(dropdownRef, isOpen);

  const handleMouseEnter = () => {
    if (
      currentCategory.subCategories &&
      currentCategory.subCategories.length > 0
    ) {
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

            isActive && !isNavigationHovered && "border-foreground",
            isOpen && "border-foreground",
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

interface ISubcategoriesMenuProps {
  category: IRenderCategory;
  initialCategory: IRenderCategory;
  position: { left: number; top: number };
  setCurrentCategory: React.Dispatch<React.SetStateAction<IRenderCategory>>;
}

const SubcategoriesMenu = ({
  category,
  initialCategory,
  position,
  setCurrentCategory,
}: ISubcategoriesMenuProps) => {
  const handleCategoryClick = (subCategory: IRenderCategory) => () => {
    if (subCategory.slug === "back") {
      setCurrentCategory(initialCategory);
    } else {
      setCurrentCategory({
        ...subCategory,
        subCategories: [
          {
            createdAt: "",
            id: "back",
            name: "Back",
            slug: "back",
            subCategories: [],
            updatedAt: "",
          },
          ...(subCategory.subCategories ?? []),
        ],
      });
    }
  };

  return (
    <div
      className="fixed z-100"
      style={{
        left: position.left,
        top: position.top,
      }}
    >
      <div
        className="shadow-shadow mt-4 w-48 -translate-x-[2px] -translate-y-[2px] overflow-hidden rounded-md border"
        style={{ backgroundColor: category.color || "#f5f5f5" }}
      >
        {category.subCategories?.map((subCategory) => {
          if (
            (subCategory.subCategories &&
              subCategory.subCategories.length > 0) ||
            subCategory.slug === "back"
          ) {
            return (
              <div
                className="flex w-full cursor-pointer items-center gap-2 p-4 text-left font-medium text-black underline hover:bg-[#e1e1cd]"
                key={subCategory.slug}
                onClick={handleCategoryClick(subCategory)}
              >
                {subCategory.slug === "back" ? (
                  <>
                    <ChevronLeftIcon />
                    {subCategory.name}
                  </>
                ) : (
                  <>
                    {subCategory.name}
                    <ChevronRightIcon />
                  </>
                )}
              </div>
            );
          }

          return (
            <Link
              className="flex w-full items-center p-4 text-left font-medium text-black underline hover:bg-[#e1e1cd]"
              href={
                subCategory.parent
                  ? `${category.slug}/${subCategory.slug}`
                  : `/${subCategory.slug}`
              }
              key={subCategory.slug}
            >
              {subCategory.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
