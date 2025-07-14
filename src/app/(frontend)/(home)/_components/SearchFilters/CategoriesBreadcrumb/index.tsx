"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTRPC } from "@/trpc/client";

export const CategoriesBreadcrumb = () => {
  const { slug } = useParams();
  const [categorySlug, subcategorySlug] = slug || [];

  const trpc = useTRPC();

  const { data: category } = useSuspenseQuery(
    trpc.categories.getBySlug.queryOptions({
      slug: categorySlug || "all",
    }),
  );

  const categoryName = category?.name || "All Categories";
  const subCategoryName = category?.subCategories?.find(
    (sub) => sub.slug === subcategorySlug,
  )?.name;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="text-primary-foreground text-xl">
          {subcategorySlug ? (
            <BreadcrumbLink asChild className="underline">
              <Link href={`/${categorySlug}`}>{categoryName}</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{categoryName}</BreadcrumbPage>
          )}
        </BreadcrumbItem>

        {subcategorySlug && (
          <>
            <BreadcrumbSeparator className="text-primary-foreground text-lg">
              {/* <SlashIcon /> */} /
            </BreadcrumbSeparator>

            <BreadcrumbItem className="text-primary-foreground text-xl">
              <BreadcrumbPage>
                {subCategoryName || "Subcategory"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
