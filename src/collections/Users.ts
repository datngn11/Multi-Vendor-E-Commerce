import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "username",
      required: true,
      type: "text",
      unique: true,
    },
  ],
  slug: "users",
};
