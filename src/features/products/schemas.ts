import {
  parseAsArrayOf,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";
import { z } from "zod";

/**
 * Types for product filters.
 */

export const filterParams = {
  maxPrice: parseAsString.withOptions({
    clearOnDefault: true,
  }),
  minPrice: parseAsString.withOptions({
    clearOnDefault: true,
  }),
  tags: parseAsArrayOf(parseAsString)
    .withOptions({
      clearOnDefault: true,
    })
    .withDefault([]),
};

export type FilterSchema = z.infer<typeof filterZodSchema>;

export const filterZodSchema = z.object({
  maxPrice: z.string().optional().nullable(),
  minPrice: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
});

/**
 * Types for sorting products.
 */

export enum SortValues {
  Curated = "curated",
  Newest = "newest",
  Trending = "trending",
}

const sortEnumValues = Object.values(SortValues);

export const sortParams = {
  sort: parseAsStringLiteral(sortEnumValues)
    .withOptions({ clearOnDefault: true })
    .withDefault(SortValues.Curated),
};

export const sortZodSchema = z.object({
  sort: z.nativeEnum(SortValues).optional().default(SortValues.Curated),
});

export type SortSchema = z.infer<typeof sortZodSchema>["sort"];
