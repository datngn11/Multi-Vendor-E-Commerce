import { parseAsBoolean, useQueryStates } from "nuqs";

export const useCheckoutStates = () => {
  return useQueryStates({
    cancel: parseAsBoolean.withDefault(false).withOptions({
      clearOnDefault: true,
    }),
    success: parseAsBoolean.withDefault(false).withOptions({
      clearOnDefault: true,
    }),
  });
};
