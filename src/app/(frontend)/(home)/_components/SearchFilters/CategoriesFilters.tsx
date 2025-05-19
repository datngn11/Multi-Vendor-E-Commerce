"use client";

import { useOverflowItems } from "@/hooks/useOverflowItems";
import { Category } from "@/payload-types";
import { ChevronDownIcon } from "lucide-react";
import { useRef } from "react";

import { CategoriesDropdown } from "./CategoriesDropdown";

export interface IRenderCategory extends Omit<Category, "subCategories"> {
  subCategories?: IRenderCategory[];
}

interface IProps {
  categories: IRenderCategory[];
}

export const CategoriesFilters = ({ categories }: IProps) => {
  const viewMoreButtonRef = useRef<HTMLButtonElement | null>(null);
  const viewMoreButtonWidth = viewMoreButtonRef.current?.offsetWidth || 0;

  const { containerRef, hiddenItems, itemRefs, visibleItems } =
    useOverflowItems({
      items: categories,

      // Reserve space for the "View More" button
      // and the gap between items
      reserveSpace: viewMoreButtonWidth + categories.length * 6,
    });

  const activeCategory = "all";
  const activeCategoryIndex = categories.findIndex(
    (category) => category.slug === activeCategory,
  );

  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleItems.length && activeCategoryIndex !== -1;

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex w-full flex-nowrap items-center gap-1.5">
        <div
          style={{
            height: 0,
            pointerEvents: "none",
            position: "absolute",
            visibility: "hidden",
          }}
        >
          {categories.map((el, i) => (
            <CategoriesDropdown
              buttonRef={(el) => {
                itemRefs.current[i] = el;
              }}
              category={el}
              key={el.id}
            />
          ))}
        </div>

        {visibleItems.map((category) => (
          <CategoriesDropdown
            category={category}
            isActive={activeCategory === category.slug}
            isNavigationHovered={false}
            key={category.id}
          />
        ))}

        {hiddenItems.length > 0 && (
          <CategoriesDropdown
            buttonRef={(el) => {
              viewMoreButtonRef.current = el;
            }}
            category={{
              ...hiddenItems[0],
              id: "more",
              name: "More",
              slug: "more",
              subCategories: hiddenItems,
            }}
            Icon={<ChevronDownIcon />}
            isActive={isActiveCategoryHidden}
            isNavigationHovered={false}
          />
        )}
      </div>
    </div>
  );
};
