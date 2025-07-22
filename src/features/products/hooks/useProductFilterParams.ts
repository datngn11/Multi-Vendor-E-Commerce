import { parseAsString, useQueryStates } from "nuqs";

export const useProductFilterParams = () => {
  return useQueryStates({
    maxPrice: parseAsString.withOptions({
      clearOnDefault: true,
    }),
    minPrice: parseAsString.withOptions({
      clearOnDefault: true,
    }),
  });
};
