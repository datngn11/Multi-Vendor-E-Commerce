// import { generatePath } from "@/utils/generatePath";

export type RouteConfig<
  TParams extends Record<string, unknown> = Record<never, never>,
> = {
  buildPath: (params: TParams) => string;
  label?: string;
  path: string;
  protected?: boolean;
};

export const routes = {
  auth: {
    login: {
      buildPath: () => "/login",
      label: "Login",
      path: "/login",
      protected: false,
    } satisfies RouteConfig,
    register: {
      buildPath: () => "/register",
      label: "Register",
      path: "/register",
      protected: false,
    } satisfies RouteConfig,
  },
  dashboard: {
    buildPath: () => "/admin",
    label: "Admin Dashboard",
    path: "/admin",
    protected: true,
  } satisfies RouteConfig,

  home: {
    buildPath: () => "/",
    label: "Home",
    path: "/",
    protected: false,
  },

  profile: {
    buildPath: () => "/profile",
    label: "Profile",
    path: "/profile",
    protected: true,
  } satisfies RouteConfig,
} as const;
