import { useProductQueryParams } from "./useProductQueryParams";

export const useProductQueryControl = () => {
  const [params, setParams] = useProductQueryParams();

  const onParamChange = <K extends keyof typeof params>(
    key: K,
    value: (typeof params)[K],
  ) => {
    setParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setParams((prev) => ({
      ...prev,
      maxPrice: null,
      minPrice: null,
      tags: [],
    }));
  };

  return {
    onParamChange,
    params,
    resetFilters,
  };
};
