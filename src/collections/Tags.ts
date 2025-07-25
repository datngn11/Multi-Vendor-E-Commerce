import type { CollectionConfig } from "payload";

export const Tag: CollectionConfig = {
  admin: {
    defaultColumns: ["name", "updatedAt", "createdAt"],
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
      unique: true,
    },
  ],
  slug: "tags",
};
