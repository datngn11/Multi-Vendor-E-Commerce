import { createTRPCRouter } from "../init";
import { authRouter } from "./authRouters";
import { categoriesRouter } from "./categoriesRouter";
import { checkoutRouters } from "./checkoutRouters";
import { productsRouter } from "./productsRouter";
import { tagsRouter } from "./tagsRouter";
import { tenantsRouter } from "./tenantsRouter";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  categories: categoriesRouter,
  checkout: checkoutRouters,
  products: productsRouter,
  tags: tagsRouter,
  tenants: tenantsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
