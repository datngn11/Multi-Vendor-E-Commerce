"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/payload-types";
import { Author } from "@/shared/components/author";
import { Price } from "@/shared/components/price";
import { Rating } from "@/shared/components/rating";

interface IProps {
  product: Omit<Product, "createdAt" | "updatedAt">;
}

export const ProductsCard = ({ product }: IProps) => {
  const router = useRouter();

  return (
    <Card
      className="shadow-0 cursor-pointer gap-0 border p-0 transition-shadow duration-200 ease-in-out hover:shadow-[4px_4px_0px_#fff]"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <CardHeader className="gap-0 rounded-t-md p-0">
        <div className="relative aspect-square h-full rounded-t-md">
          <Image
            alt={product.name}
            className="rounded-t-md object-cover"
            fill
            src={
              (typeof product.image === "object" && product.image?.url) ||
              "image-placeholder.png"
            }
          />
        </div>
      </CardHeader>
      <CardContent className="border-b-border flex flex-1 flex-col gap-2.5 border-t border-b border-t-white p-4">
        <CardTitle className="line-clamp-4 text-lg font-semibold wrap-anywhere sm:text-xl">
          {product.name}
        </CardTitle>
        <CardDescription className="mt-auto flex flex-col gap-2">
          <Author
            name={
              typeof product.tenant === "object" && product.tenant !== null
                ? product.tenant.name
                : ""
            }
            size="lg"
          />
          <Rating rating={3.5} reviews={4} />
        </CardDescription>
      </CardContent>
      <CardFooter className="flex w-full items-center justify-between rounded-b-lg p-4">
        <Price price={product.price} />
      </CardFooter>
    </Card>
  );
};

export const ProductsCardSkeleton = () => {
  return (
    <Card className="shadow-0 animate-pulse gap-0 border p-0">
      <CardHeader className="gap-0 rounded-t-md p-0">
        <div className="bg-secondary-background relative aspect-square h-full rounded-t-md" />
      </CardHeader>

      <CardContent className="border-b-border flex flex-1 flex-col gap-2.5 border-t border-b p-4">
        <div className="bg-muted h-8 w-full" />
        <div className="bg-muted mt-auto h-6 w-full" />
      </CardContent>

      <CardFooter className="flex w-full items-center justify-between rounded-b-lg p-4">
        <div className="bg-muted h-8 w-24" />
      </CardFooter>
    </Card>
  );
};
