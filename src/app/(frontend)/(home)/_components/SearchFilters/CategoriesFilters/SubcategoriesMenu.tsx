import { DropdownCategory } from "@/features/categories/types";

import { SubcategoriesMenuItem } from "./SubcategoriesMenuItem"; // Import the new component

interface ISubcategoriesMenuProps {
  category: DropdownCategory;
  handleCategoryClick: (subCategory: DropdownCategory) => () => void;
  handleClose: () => void;
  position: { left: number; top: number };
  reset: () => void;
}

export const SubcategoriesMenu = ({
  category,
  handleCategoryClick,
  handleClose,
  position,
  reset,
}: ISubcategoriesMenuProps) => {
  const handleNavigate = () => {
    handleClose();
    reset();
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
        style={{ backgroundColor: category.color ?? "#f5f5f5" }}
      >
        {category.subCategories?.map((subCategory) => (
          <SubcategoriesMenuItem
            item={subCategory}
            key={subCategory.id}
            onExpand={handleCategoryClick(subCategory)}
            onNavigate={handleNavigate}
            parentSlug={category.slug}
          />
        ))}
      </div>
    </div>
  );
};
