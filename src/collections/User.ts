import type { CollectionConfig } from "payload";

import { tenantsArrayField } from "@payloadcms/plugin-multi-tenant/fields";

import { UserRoles } from "@/shared/constants";
import { isSuperAdmin } from "@/shared/utils/auth";

const defaultTenantArrayField = tenantsArrayField({
  arrayFieldAccess: {
    create: () => true,
    read: () => true,
    update: () => true,
  },
  tenantsArrayFieldName: "tenants",
  tenantsArrayTenantFieldName: "tenant",
  tenantsCollectionSlug: "tenants",
});

export const User: CollectionConfig = {
  access: {
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
    read: () => true,
    update: ({ req }) => isSuperAdmin(req.user),
  },
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
    {
      admin: {
        position: "sidebar",
      },
      defaultValue: [UserRoles.User],
      hasMany: true,
      name: "roles",
      options: Object.values(UserRoles),
      type: "select",
    },
    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField.admin || {}),
        position: "sidebar",
      },
    },
  ],
  slug: "users",
};
