export const hasItems = <T>(arr: null | T[] | undefined): arr is T[] => {
  return Array.isArray(arr) && arr.length > 0;
};
