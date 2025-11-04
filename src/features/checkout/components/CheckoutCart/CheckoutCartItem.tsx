import Image from "next/image";
import Link from "next/link";

import { routes } from "@/configs/routes";
import { PopulatedProduct } from "@/features/products/types";
import { Author } from "@/shared/components/author";
import { Button } from "@/shared/components/ui/button";
import { formatAsCurrency } from "@/shared/utils/numbers/formatAsCurrency";

interface IProps {
  item: PopulatedProduct;
  removeFromCart: (productId: string) => void;
}

export const CheckoutCartItem = ({ item, removeFromCart }: IProps) => {
  const { image, name, price, tenant } = item ?? {};

  const onRemove = (productId: string) => () => removeFromCart(productId);

  return (
    <div
      className="group p-4 first:rounded-t-md last:rounded-b-md sm:p-0 sm:pr-4"
      key={item.id}
      role="listitem"
    >
      <section className="grid grid-cols-[3.625rem_1fr_auto] gap-4 sm:grid-cols-[8.5rem_1fr_auto]">
        <figure className="relative aspect-square h-[58px] w-[58px] rounded-md sm:h-full sm:w-full">
          <Link
            href={routes.tenants.product.buildPath({
              productId: item.id,
              tenantSlug: tenant.slug,
            })}
          >
            <Image
              alt={item.name}
              className="rounded-md border border-white object-cover sm:rounded-none sm:border-0 sm:border-r sm:border-r-white sm:group-first:rounded-tl-md sm:group-last:rounded-bl-md"
              fill
              src={image?.url || "/images/image-placeholder.png"}
            />
          </Link>
        </figure>

        <section className="flex flex-col gap-2 sm:py-4">
          <Link
            className="line-clamp-2 text-sm font-bold underline"
            href={routes.tenants.product.buildPath({
              productId: item.id,
              tenantSlug: tenant.slug,
            })}
          >
            {name}
          </Link>

          <Author
            {...tenant}
            className="text-sm"
            tenantSlug={tenant.slug}
            withAvatar={false}
          />
        </section>

        <section className="flex flex-col items-end justify-between gap-1 sm:py-4">
          <span className="font-semibold">
            {formatAsCurrency(price.toString())}
          </span>

          <Button
            className="text-destructive"
            onClick={onRemove(item.id)}
            size="link"
            variant="link"
          >
            Remove
          </Button>
        </section>
      </section>
    </div>
  );
};
