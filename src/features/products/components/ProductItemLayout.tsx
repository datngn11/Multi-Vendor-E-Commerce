"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { LinkIcon } from "lucide-react";
import Image from "next/image";

import { Author } from "@/shared/components/author";
import { Price } from "@/shared/components/price";
import { Rating } from "@/shared/components/rating";
import { Button } from "@/shared/components/ui/button";
import { useTRPC } from "@/trpc/client";

import { ProductRatings } from "./ProductRatings";

const refundPolicies = {
  "14Days": "14-day money-back guarantee.",
  "30Days": "30-day money-back guarantee.",
  noRefunds: "No refunds available.",
};

interface IProps {
  productId: string;
}

export const ProductItemLayout = ({ productId }: IProps) => {
  const trpc = useTRPC();
  const { data: product } = useSuspenseQuery(
    trpc.products.getById.queryOptions({
      id: productId,
    })
  );

  return (
    <div className="px-4 py-10 lg:px-12">
      <div className="border-foreground relative aspect-[2/1] overflow-hidden rounded-t-sm border-1">
        <Image
          alt={product.name}
          className="object-cover"
          fill
          src={product.image?.url || "/images/image-placeholder.png"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6">
        <div className="border-foreground col-span-4 border-1 border-t-0">
          <h1 className="border-foreground border-b-1 p-6 text-2xl font-medium lg:text-4xl">
            {product.name}
          </h1>

          <div className="border-foreground divide-foreground flex w-full flex-wrap items-stretch divide-x border-b-1 md:flex-nowrap">
            <div className="px-6 py-4">
              <Price price={product.price} />
            </div>

            <div className="flex border-r-0 px-6 py-4 md:border-r">
              <Author
                {...product.tenant}
                size="lg"
                tenantSlug={product.tenant.slug}
              />
            </div>

            <div className="border-foreground flex basis-full border-t px-6 py-4 md:basis-auto md:border-t-0">
              <Rating rating={3.5} reviews={2} variant="extended" />
            </div>
          </div>

          <div className="p-6">
            {product.description || (
              <div className="text-muted-foreground font-medium italic">
                No description provided.
              </div>
            )}
          </div>
        </div>
        <div className="border-foreground col-span-2 flex flex-col border-1 border-t-0 border-l-1 md:border-l-0">
          <div className="border-foreground flex flex-col border-b-1 p-6">
            <div className="flex flex-row items-center gap-2">
              <Button
                className="border-foreground flex-1 border-2"
                size="lg"
                variant="reverse"
              >
                Add to Cart
              </Button>
              <Button
                className="border-foreground border-2"
                size="lg"
                variant="reverse"
              >
                <LinkIcon />
              </Button>
            </div>

            {product.refundPolicy && (
              <p className="mt-4 text-center font-medium">
                {product.refundPolicy === "noRefunds"
                  ? refundPolicies.noRefunds
                  : refundPolicies[product.refundPolicy]}
              </p>
            )}
          </div>
          <div className="p-6">
            <ProductRatings />
          </div>
        </div>
      </div>
    </div>
  );
};
