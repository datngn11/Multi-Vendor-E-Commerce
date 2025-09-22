// routes.ts
import type { Route } from "next";

import { generatePath } from "@/shared/utils/routing";

export type RouteConfig<
  TParams extends Record<string, unknown> = Record<never, never>,
> = {
  buildPath?: (params: TParams) => string;
  label?: string;
  path: Route;
  protected?: boolean;
};

export const routes = {
  about: {
    label: "About",
    path: "/about" satisfies Route,
    protected: false,
  } satisfies RouteConfig,

  auth: {
    login: {
      label: "Login",
      path: "/login" satisfies Route,
      protected: false,
    },

    register: {
      label: "Register",
      path: "/register" satisfies Route,
      protected: false,
    },
  } satisfies {
    login: RouteConfig;
    register: RouteConfig;
  },

  contact: {
    label: "Contact",
    path: "/contact" satisfies Route,
    protected: false,
  } satisfies RouteConfig,

  dashboard: {
    label: "Admin Dashboard",
    path: "/admin" as Route,
    protected: true,
  } satisfies RouteConfig,

  features: {
    label: "Features",
    path: "/features" satisfies Route,
    protected: false,
  } satisfies RouteConfig,

  home: {
    category: {
      buildPath: ({ parentSlug, slug }: { parentSlug: string; slug: string }) =>
        generatePath("/:parentSlug/:slug", { parentSlug, slug }),
      label: "Category",
      path: "/:parentSlug/:slug" satisfies Route,
      protected: false,
    } satisfies RouteConfig<{ parentSlug: string; slug: string }>,
    label: "Home",
    path: "/" satisfies Route,
    protected: false,
  } satisfies RouteConfig & {
    category: RouteConfig<{ parentSlug: string; slug: string }>;
  },

  library: {
    label: "Library",
    path: "/library" satisfies Route,
    protected: true,
  } satisfies RouteConfig,

  pricing: {
    label: "Pricing",
    path: "/pricing" satisfies Route,
    protected: false,
  } satisfies RouteConfig,

  tenants: {
    buildPath: ({ slug }: { slug: string }) =>
      generatePath("/tenants/:slug", { slug }),
    label: "Tenant",
    path: "/tenants/:slug" satisfies Route,
    product: {
      buildPath: ({
        productId,
        tenantSlug,
      }: {
        productId: string;
        tenantSlug: string;
      }) =>
        generatePath("/tenants/:tenantSlug/products/:productId", {
          productId,
          tenantSlug,
        }),
      label: "Product",
      path: "/tenants/:tenantSlug/products/:productId" satisfies Route,
      protected: true,
    } satisfies RouteConfig<{ productId: string; tenantSlug: string }>,

    protected: true,
  } satisfies {
    buildPath: (params: { slug: string }) => string;
    label: string;
    path: Route;
    product: RouteConfig<{ productId: string; tenantSlug: string }>;
    protected: boolean;
  },
} as const;
