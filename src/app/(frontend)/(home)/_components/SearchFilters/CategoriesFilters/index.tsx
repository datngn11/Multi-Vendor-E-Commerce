"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

import { useOverflowItems } from "@/app/(frontend)/(home)/_components/SearchFilters/hooks/useOverflowItems";
import { useTRPC } from "@/trpc/client";

import { CategoriesDropdown } from "./CategoriesDropdown";

export const CategoriesFilters = () => {
  const trpc = useTRPC();
  const { slug } = useParams();
  const activeCategoryParam = slug?.[0];

  const [hoveredCategoryId, setHoveredCategoryId] = useState<null | string>(
    null,
  );

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

  const activeCategorySlug = activeCategoryParam || "all";
  const activeCategoryIndex = categories?.findIndex(
    (category) => category.slug === activeCategorySlug,
  );

  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleItems.length && activeCategoryIndex !== -1;

  return (
    <div
      className="relative flex min-h-10 w-full flex-nowrap items-center gap-1.5"
      ref={containerRef}
    >
      <div className="visibility-hidden pointer-events-none absolute h-0 opacity-0">
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
          isActive={activeCategorySlug === category.slug}
          isNavigationHovered={hoveredCategoryId === category.id}
          key={category.id}
          setHoveredCategoryId={setHoveredCategoryId}
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
          isNavigationHovered={hoveredCategoryId === "more"}
          setHoveredCategoryId={setHoveredCategoryId}
        />
      )}
    </div>
  );
};
