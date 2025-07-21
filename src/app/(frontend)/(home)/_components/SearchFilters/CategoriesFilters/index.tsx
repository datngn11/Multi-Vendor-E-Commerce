"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ChevronDownIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

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
  const [viewMoreButtonWidth, setViewMoreButtonWidth] = useState(0);
  const viewMoreButtonRef = useRef<HTMLButtonElement | null>(null);

  const { data: categories = [] } = useSuspenseQuery(
    trpc.categories.getMany.queryOptions(),
  );

  const { containerRef, hiddenItems, itemRefs, visibleItems } =
    useOverflowItems({
      items: categories || [],

      // Reserve space for the "View More" button
      // and the gap between items
      reserveSpace: viewMoreButtonWidth + (categories?.length || 0) * 10,
    });

  const moreCategory = useMemo(() => {
    if (!hiddenItems.length) return null;

    return {
      createdAt: new Date().toISOString(),
      id: "more",
      name: "More",
      slug: "more",
      subCategories: hiddenItems,
      updatedAt: new Date().toISOString(),
    };
  }, [hiddenItems]);

  const activeCategorySlug = activeCategoryParam || "all";

  const isActiveCategoryHidden = hiddenItems.some(
    (item) => item.slug === activeCategorySlug,
  );

  useLayoutEffect(() => {
    if (viewMoreButtonRef.current) {
      setViewMoreButtonWidth(viewMoreButtonRef.current.offsetWidth);
    }
  }, [categories.length]);

  return (
    <div
      className="relative flex min-h-10 w-full flex-nowrap items-center gap-1.5"
      ref={containerRef}
    >
      {/* Render all categories in a hidden container
          to count their widths and handle overflow correctly */}
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

      {moreCategory && (
        <CategoriesDropdown
          buttonRef={(el) => (viewMoreButtonRef.current = el)}
          category={moreCategory}
          Icon={<ChevronDownIcon />}
          isActive={isActiveCategoryHidden}
          isNavigationHovered={hoveredCategoryId === "more"}
          setHoveredCategoryId={setHoveredCategoryId}
        />
      )}
    </div>
  );
};
