import type { CollectionConfig } from "payload";

export const Category: CollectionConfig = {
  slug: "categories",

  admin: {
    useAsTitle: "name",
    listSearchableFields: ["name", "slug", "color"],
    defaultColumns: ["name", "parent", "color", "slug"],
    baseListFilter: () => {
      return {
        parent: {
          exists: false,
        },
      };
    },
  },
  hooks: {
    beforeChange: [
      async ({ data, req, operation }) => {
        if (operation === "create" && data?.parent) {
          try {
            const parentCategory = await req.payload.findByID({
              collection: "categories",
              id: data.parent,
              depth: 0,
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
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "color",
      type: "text",

      admin: {
        components: {
          Field: "@/components/fields/color-picker.tsx",
          Label: undefined,
        },
        condition: (data) => !data?.parent,
      },
    },
    {
      name: "parent",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "subCategories",
      type: "join",
      collection: "categories",
      on: "parent",
      hasMany: true,
      admin: {
        condition: (data) => !data?.parent,
      },
    },
  ],
};
