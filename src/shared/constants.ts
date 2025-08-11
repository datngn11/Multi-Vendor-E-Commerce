export const DEFAULT_TAGS_LIMIT = 5;

export const DEFAULT_PRODUCTS_LIMIT = 2;

export const UserRoles = {
  SuperAdmin: "super-admin",
  User: "user",
} as const;

export type UserRole = (typeof UserRoles)[keyof typeof UserRoles];
