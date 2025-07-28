/**
 * Formats a numeric string as currency.
 *
 * @param value - The numeric string to format
 * @returns The formatted currency string.
 *          If the input is not a valid number, it returns an empty string.
 */

export const formatAsCurrency = (
  value: string,
  options?: Intl.NumberFormatOptions,
) => {
  const numericValue = value.replace(/[^0-9.]+/g, "");
  const parts = numericValue.split(".");

  const formattedValue =
    parts[0] + (parts.length > 1 ? `.${parts[1]?.slice(0, 2)}` : "");

  if (!formattedValue) return "";

  const numberValue = parseFloat(formattedValue);

  if (isNaN(numberValue)) return "";

  return Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
    style: "currency",
    ...options,
  }).format(numberValue);
};
