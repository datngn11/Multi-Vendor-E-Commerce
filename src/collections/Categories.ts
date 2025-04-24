import type { CollectionConfig } from "payload";

export const Category: CollectionConfig = {
  slug: "categories",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
};
