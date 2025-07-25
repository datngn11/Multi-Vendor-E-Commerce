/**
 * Utility function to check if there are any active filters.
 *
 * @param filters - An object containing filter criteria.
 * @returns A boolean indicating whether there are active filters.
 */

export const hasActiveFilters = (filters: Record<string, unknown>): boolean => {
  return Object.entries(filters).some(([key, value]) => {
    if (key === "sort") return false;
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object" && value !== null)
      return Object.keys(value).length > 0;
    return Boolean(value);
  });
};
