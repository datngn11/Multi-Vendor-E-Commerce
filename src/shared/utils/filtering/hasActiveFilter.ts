/**
 * Utility function to check if there are any active filters.
 *
 * @param filters - An object containing filter criteria.
 * @returns A boolean indicating whether there are active filters.
 */

export const hasActiveFilters = (filters: Record<string, unknown>): boolean => {
  delete filters.sort; // Exclude sort from active filters check

  return Object.entries(filters).some(([, value]) => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "object" && value !== null)
      return Object.keys(value).length > 0;
    return Boolean(value);
  });
};
