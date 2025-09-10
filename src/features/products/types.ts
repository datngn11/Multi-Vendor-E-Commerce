import { Media, Product, Tenant } from "@/payload-types";

export type PopulatedProduct = Omit<
  Product,
  "createdAt" | "image" | "tenant" | "updatedAt"
> & {
  image?: Media | null;
  tenant: PopulatedTenant;
};

export type PopulatedTenant = Omit<Tenant, "image"> & {
  image?: Media | null;
};
