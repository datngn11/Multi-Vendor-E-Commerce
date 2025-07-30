import { FormattedCategory } from "@/features/categories/types";

import { SubcategoriesMenuItem } from "./SubcategoriesMenuItem"; // Import the new component

interface ISubcategoriesMenuProps {
  category: FormattedCategory;
  handleCategoryClick: (subCategory: FormattedCategory) => () => void;
  handleClose: () => void;
  position: { left: number };
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
      className="absolute top-full z-100"
      style={{
        ...position,
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
