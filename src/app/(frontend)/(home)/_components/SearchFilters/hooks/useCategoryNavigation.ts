"use client";

import { useCallback, useState } from "react";

import { DropdownCategory } from "@/features/categories/types";

// A constant for the "Back" button to ensure type safety and consistency
const BACK_CATEGORY: DropdownCategory = {
  createdAt: new Date().toISOString(),
  id: "back",
  name: "Back",
  slug: "back",
  subCategories: [],
  updatedAt: new Date().toISOString(),
};

/**
 * A custom hook to manage the state and navigation logic
 * for a multi-level category menu.
 *
 * @param initialCategory The top-level category for the menu.
 * @return An object containing the current category,
 *         a function to navigate to a new category,
 *         and a function to reset the navigation state.
 */

export const useCategoryNavigation = (initialCategory: DropdownCategory) => {
  const [currentCategory, setCurrentCategory] = useState(initialCategory);

  // Resets the navigation state to the initial category.
  const reset = useCallback(() => {
    setCurrentCategory(initialCategory);
  }, [initialCategory]);

  // Navigates to a new category level or back to the initial level.
  const navigateTo = useCallback(
    (nextCategory: DropdownCategory) => {
      if (nextCategory.id === "back") {
        setCurrentCategory(initialCategory);
      } else {
        setCurrentCategory({
          ...nextCategory,
          subCategories: [
            BACK_CATEGORY,
            // Include "All {Category} link
            {
              ...nextCategory,
              name: `All ${nextCategory.name}`,
              subCategories: [], // This item acts as a direct link
            },
            ...(nextCategory.subCategories ?? []),
          ],
        });
      }
    },

    [initialCategory],
  );

  return { currentCategory, navigateTo, reset };
};
