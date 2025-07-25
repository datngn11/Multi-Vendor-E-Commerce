// import { generatePath } from "@/shard/utils/routing";

export type RouteConfig<
  TParams extends Record<string, unknown> = Record<never, never>,
> = {
  buildPath: (params: TParams) => string;
  // generatePath: (params: TParams) => string;
  label?: string;
  path: string;
  protected?: boolean;
};

export const routes = {
  about: {
    buildPath: () => "/about",
    label: "About",
    path: "/about",
    protected: false,
  } satisfies RouteConfig,

  auth: {
    login: {
      buildPath: () => "/login",
      label: "Login",
      path: "/login",
      protected: false,
    },

    register: {
      buildPath: () => "/register",
      label: "Register",
      path: "/register",
      protected: false,
    },
  } satisfies {
    login: RouteConfig;
    register: RouteConfig;
  },

  contact: {
    buildPath: () => "/contact",
    label: "Contact",
    path: "/contact",
    protected: false,
  } satisfies RouteConfig,

  dashboard: {
    buildPath: () => "/admin",
    label: "Admin Dashboard",
    path: "/admin",
    protected: true,
  } satisfies RouteConfig,

  features: {
    buildPath: () => "/features",
    label: "Features",
    path: "/features",
    protected: false,
  } satisfies RouteConfig,

  home: {
    buildPath: () => "/",
    label: "Home",
    path: "/",
    protected: false,
  } satisfies RouteConfig,

  library: {
    buildPath: () => "/library",
    label: "Library",
    path: "/library",
    protected: true,
  } satisfies RouteConfig,

  pricing: {
    buildPath: () => "/pricing",
    label: "Pricing",
    path: "/pricing",
    protected: false,
  } satisfies RouteConfig,
} as const;
