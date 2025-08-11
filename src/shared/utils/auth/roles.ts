import { User } from "@/payload-types";
import { UserRoles } from "@/shared/constants";

type UserPropType = null | undefined | User;

/**
 * Helper function to check if a user has Super Admin role
 *
 * @param user - The user object to check
 * @returns True or False
 */

export const isSuperAdmin = (user: UserPropType): boolean => {
  if (!user) return false;

  return Boolean(user.roles?.includes(UserRoles.SuperAdmin));
};

/**
 * Helper function to check if a user has common User role
 *
 * @param user - The user object to check
 * @returns True or False
 */

export const isCommonUser = (user: UserPropType): boolean => {
  if (!user) return false;

  return Boolean(user.roles?.includes(UserRoles.User));
};
