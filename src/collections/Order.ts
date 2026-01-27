import { CollectionConfig } from "payload";

export const Order: CollectionConfig = {
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
    },
    {
      hasMany: false,
      name: "user",
      relationTo: "users",
      required: true,
      type: "relationship",
    },
    {
      hasMany: false,
      name: "product",
      relationTo: "products",
      required: true,
      type: "relationship",
    },
    {
      name: "stripeCheckoutSessionId",
      required: true,
      type: "text",
    },
  ],
  slug: "orders",
};
