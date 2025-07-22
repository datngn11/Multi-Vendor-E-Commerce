import { useProductFilterParams } from "./useProductFilterParams";

export const useProductsFilter = () => {
  const [filters, setFilters] = useProductFilterParams();

  const onFilterChange = (key: keyof typeof filters, value: unknown) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      maxPrice: null,
      minPrice: null,
    });
  };

  return {
    filters,
    onFilterChange,
    resetFilters,
  };
};
