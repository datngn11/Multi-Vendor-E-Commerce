import Image from "next/image";
import Link from "next/link";

import { routes } from "@/configs/routes";
import { Button } from "@/shared/components/ui/button";

export const CehckoutCartNotFound = () => {
  return (
    <div className="bg-background border-border flex h-full w-full flex-col items-center justify-center gap-y-4 rounded-lg border border-dashed p-6 sm:text-center">
      <figure className="w-full">
        <Image
          alt="No products found"
          className="h-auto w-full object-contain"
          height={0}
          sizes="100vw"
          src="/images/not-found.webp"
          width={0}
        />
      </figure>

      <h3 className="text-center text-xl">
        You haven&apos;t added anything...yet!
      </h3>

      <p className="text-center">
        Once you do, it&apos;ll show up here so you can complete your purchases.
      </p>

      <Button asChild size="lg">
        <Link href={routes.home.path}>Discover Products</Link>
      </Button>
    </div>
  );
};
