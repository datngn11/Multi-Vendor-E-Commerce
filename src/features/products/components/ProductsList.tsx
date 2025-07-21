"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useTRPC } from "@/trpc/client";

export const ProductsList = () => {
  const { slug } = useParams();
  const trpc = useTRPC();

  const [categorySlug, subCategorySlug, subSubCategorySlug] = slug || [];

  const { data: products } = useSuspenseQuery(
    trpc.products.getManyByCategorySlug.queryOptions({
      categorySlug: subSubCategorySlug || subCategorySlug || categorySlug,
    }),
  );

  return <pre>{JSON.stringify(products, null, 2)}</pre>;
};

export const ProductsListSkeleton = () => {
  return <div>Loading....</div>;
};
