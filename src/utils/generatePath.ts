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
