import type { CollectionConfig } from "payload";

export const Category: CollectionConfig = {
  admin: {
    baseListFilter: () => {
      return {
        parent: {
          exists: false,
        },
      };
    },
    defaultColumns: ["name", "parent", "color", "slug"],
    listSearchableFields: ["name", "slug", "color"],
    useAsTitle: "name",
  },
  defaultSort: "name",
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
    },
    {
      name: "slug",
      required: true,
      type: "text",
      unique: true,
    },
    {
      admin: {
        components: {
          Field: "@/components/fields/color-picker.tsx",
          Label: undefined,
        },
        condition: (data) => !data?.parent,
      },
      name: "color",

      type: "text",
    },
    {
      hasMany: false,
      name: "parent",
      relationTo: "categories",
      type: "relationship",
    },
    {
      admin: {
        condition: (data) => !data?.parent,
      },
      collection: "categories",
      hasMany: true,
      name: "subCategories",
      on: "parent",
      type: "join",
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        if (operation === "create" && data?.parent) {
          try {
            const parentCategory = await req.payload.findByID({
              collection: "categories",
              depth: 0,
              id: data.parent,
            });

            if (parentCategory?.color) {
              data.color = parentCategory.color;
            }
          } catch (err) {
            console.error("Error fetching parent category:", err);
          }
        }

        return data;
      },
    ],
  },
  slug: "categories",
};
