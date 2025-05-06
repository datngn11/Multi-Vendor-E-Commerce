import { Category } from "@/payload-types";
import { CategoriesDropdown } from "./CategoriesDropdown";

export interface IRenderCategory extends Omit<Category, "subCategories"> {
  subCategories: Category[];
}

interface IProps {
  categories: IRenderCategory[];
}

export const CategoriesFilters = ({ categories }: IProps) => {
  return (
    <div className="relative">
      <div className="flex flex-nowrap items-center">
        {categories.map((category) => (
          <div key={category.id}>
            <CategoriesDropdown
              category={category}
              isActive={false}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
