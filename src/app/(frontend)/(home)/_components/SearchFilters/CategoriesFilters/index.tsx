"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "lucide-react";
import { useRef } from "react";

import { useOverflowItems } from "@/app/(frontend)/(home)/_components/SearchFilters/hooks/useOverflowItems";
import { useTRPC } from "@/trpc/client";

import { CategoriesDropdown } from "./CategoriesDropdown";

export const CategoriesFilters = () => {
  const trpc = useTRPC();

  const { data: categories = [] } = useSuspenseQuery(
    trpc.categories.getMany.queryOptions(),
  );

  const viewMoreButtonRef = useRef<HTMLButtonElement | null>(null);
  const viewMoreButtonWidth = viewMoreButtonRef.current?.offsetWidth || 0;

  const { containerRef, hiddenItems, itemRefs, visibleItems } =
    useOverflowItems({
      items: categories || [],

      // Reserve space for the "View More" button
      // and the gap between items
      reserveSpace: viewMoreButtonWidth + (categories?.length || 0) * 6,
    });

  const activeCategory = "all";
  const activeCategoryIndex = categories?.findIndex(
    (category) => category.slug === activeCategory,
  );

  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleItems.length && activeCategoryIndex !== -1;

  return (
    <div
      className="relative flex min-h-10 w-full flex-nowrap items-center gap-1.5"
      ref={containerRef}
    >
      <div
        style={{
          height: 0,
          opacity: 0,
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
  );
};
