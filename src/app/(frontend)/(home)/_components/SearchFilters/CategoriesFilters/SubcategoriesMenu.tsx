import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { DropdownCategory } from "@/features/categories/types";

interface ISubcategoriesMenuProps {
  category: DropdownCategory;
  initialCategory: DropdownCategory;
  position: { left: number; top: number };
  setCurrentCategory: React.Dispatch<React.SetStateAction<DropdownCategory>>;
}

const BACK_CATEGORY: DropdownCategory = {
  createdAt: new Date().toISOString(),
  id: "back",
  name: "Back",
  slug: "back",
  subCategories: [],
  updatedAt: new Date().toISOString(),
};

export const SubcategoriesMenu = ({
  category,
  initialCategory,
  position,
  setCurrentCategory,
}: ISubcategoriesMenuProps) => {
  const handleCategoryClick = (subCategory: DropdownCategory) => () => {
    if (subCategory.slug === "back") {
      setCurrentCategory(initialCategory);
    } else {
      setCurrentCategory({
        ...subCategory,
        subCategories: [BACK_CATEGORY, ...(subCategory.subCategories ?? [])],
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
