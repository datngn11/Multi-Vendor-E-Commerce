import { CollectionConfig } from "payload";

import { UserRoles } from "@/shared/constants";

export const Tenant: CollectionConfig = {
  access: {
    create: ({ req }) =>
      Boolean(req.user?.roles?.includes(UserRoles.SuperAdmin)),
    delete: ({ req }) =>
      Boolean(req.user?.roles?.includes(UserRoles.SuperAdmin)),
    read: () => true,
    update: ({ req }) =>
      Boolean(req.user?.roles?.includes(UserRoles.SuperAdmin)),
  },
  admin: {
    useAsTitle: "slug",
  },
  fields: [
    {
      admin: {
        description: "The name of the store",
      },
      label: "Store Name",
      name: "name",
      required: true,
      type: "text",
    },
    {
      admin: {
        description: "The subdomain of the store (e.g., [slug].velels.com)",
      },
      name: "slug",
      required: true,
      type: "text",
      unique: true,
    },
    {
      name: "image",
      relationTo: "media",
      type: "upload",
    },
    {
      admin: {
        readOnly: true,
      },
      name: "stripeAccountId",
      required: true,
      type: "text",
    },
    {
      admin: {
        description: "Stripe details required for creating products",
        readOnly: true,
      },
      name: "stripeDetailsSubmitted",
      type: "checkbox",
    },
  ],
  slug: "tenants",
};
