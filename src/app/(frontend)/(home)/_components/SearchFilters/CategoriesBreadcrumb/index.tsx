"use client";

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FormattedCategory } from "@/features/categories/types";

interface IProps {
  category?: FormattedCategory;
  subcategorySlug?: string;
}

export const CategoriesBreadcrumb = ({ category, subcategorySlug }: IProps) => {
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
              <Link href={`/${category?.slug}`}>{categoryName}</Link>
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
