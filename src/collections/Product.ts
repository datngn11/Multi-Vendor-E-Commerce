import type { CollectionConfig } from "payload";

export const Product: CollectionConfig = {
  admin: {
    defaultColumns: ["image", "name", "price", "category", "tags"],
    listSearchableFields: ["name", "price"],
    useAsTitle: "name",
  },
  defaultSort: "name",
  fields: [
    {
      index: true,
      name: "name",
      required: true,
      type: "text",
    },
    {
      name: "description",
      type: "text",
    },
    {
      admin: {
        description: "Price in USD",
      },
      name: "price",
      required: true,
      type: "number",
    },
    {
      name: "category",
      relationTo: "categories",
      type: "relationship",
    },
    {
      hasMany: true,
      name: "tags",
      relationTo: "tags",
      type: "relationship",
    },
    {
      name: "image",
      relationTo: "media",
      required: true,
      type: "upload",
    },
    {
      defaultValue: "14Days",
      name: "refundPolicy",
      options: [
        {
          label: "No Refunds",
          value: "noRefunds",
        },

        {
          label: "14 Days",
          value: "14Days",
        },
        {
          label: "30 Days",
          value: "30Days",
        },
      ],
      type: "select",
    },
  ],
  slug: "products",
};
