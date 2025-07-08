/**
 * @desc Generates a URL path with optional path parameters and query parameters.
 * 
 * @param path - The base path with placeholders for parameters (e.g., "/users/:userId").
 * @param pathParams - An object containing path parameters to replace in the path.
 * @param queryParams - An optional object containing query parameters to append to the path.
 * 
 * @returns The generated URL path with replaced path parameters and appended query parameters.
 
* @example
 * // generatePath("/users/:userId", { userId: 123 }, { search: "test" })
 * // returns "/users/123?search=test"
 */

export const generatePath = <
  TPathParams extends Record<string, boolean | number | string>,
>(
  path: string,
  pathParams: TPathParams,
  queryParams?: Record<string, boolean | null | number | string | undefined>,
): string => {
  // Replace :params in path with actual values
  for (const key in pathParams) {
    const value = pathParams[key];
    path = path.replace(`:${key}`, encodeURIComponent(String(value)));
  }

  // If no query params, return path as is
  if (!queryParams) return path;

  // Add query string
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  }

  const queryString = searchParams.toString();
  return queryString ? `${path}?${queryString}` : path;
};
