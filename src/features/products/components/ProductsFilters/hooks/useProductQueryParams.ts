import { useQueryStates } from "nuqs";

import { filterParams, sortParams } from "@/features/products/schemas";

/**
 * Custom hook to manage product filter parameters using Nuqs.
 * It provides query states for maxPrice and minPrice, allowing them to be parsed as strings.
 *
 * @returns {Array} An array containing the current filter parameters and update function.
 */

export const useProductQueryParams = () => {
  const productQueryParams = {
    ...filterParams,
    ...sortParams,
  };

  return useQueryStates(productQueryParams);
};
