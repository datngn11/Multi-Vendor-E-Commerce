import { cva } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

import { routes } from "@/configs/routes";
import { cn } from "@/lib/utils";

interface IProps {
  avatar?: null | string;
  className?: string;
  name: string;
  size?: "default" | "lg" | "sm";
  tenantSlug: string;
}

export const Author = ({
  avatar,
  className,
  name,
  size,
  tenantSlug,
}: IProps) => {
  if (!name) return null;

  const imageSize = size === "lg" ? 20 : 18;

  const authorVariants = cva("flex items-center gap-2 font-normal underline", {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: {
        default: "text-base",
        lg: "text-xl font-medium gap-3",
        sm: "text-sm",
      },
    },
  });

  const avatarVariants = cva("rounded-full border border-border object-cover", {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: {
        default: "size-5",
        lg: "size-6.25",
        sm: "size-4.5",
      },
    },
  });

  return (
    <Link
      className={cn(authorVariants({ size }), className)}
      href={routes.tenants.buildPath({ slug: tenantSlug })}
      onClick={(e) => e.stopPropagation()}
    >
      <Image
        alt={name || "Author Avatar"}
        className={avatarVariants({ size })}
        height={imageSize}
        src={avatar ?? "/images/author-placeholder.png"}
        width={imageSize}
      />
      <span>{name}</span>
    </Link>
  );
};
