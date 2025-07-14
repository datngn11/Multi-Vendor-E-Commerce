import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { DropdownCategory } from "@/features/categories/types";
import { hasItems } from "@/utils";

interface ISubcategoriesMenuProps {
  category: DropdownCategory;
  handleCategoryClick: (subCategory: DropdownCategory) => () => void;
  handleClose: () => void;
  position: { left: number; top: number };
}

export const SubcategoriesMenu = ({
  category,
  handleCategoryClick,
  handleClose,
  position,
}: ISubcategoriesMenuProps) => {
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
            hasItems(subCategory.subCategories) ||
            subCategory.slug === "back"
          ) {
            return (
              <div
                className="flex w-full cursor-pointer items-center gap-2 p-4 text-left font-medium text-black underline hover:bg-[#ffeec1]"
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
              className="flex w-full items-center p-4 text-left font-medium text-black underline hover:bg-[#ffeec1]"
              href={
                subCategory.parent
                  ? `/${category.slug}/${subCategory.slug}`
                  : `/${subCategory.slug}`
              }
              key={subCategory.slug}
              onClick={handleClose}
            >
              {subCategory.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
