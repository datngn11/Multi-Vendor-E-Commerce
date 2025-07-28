import { cva } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface IProps {
  avatar?: string;
  className?: string;
  name: string;
  size?: "default" | "lg";
}

export const Author = ({ avatar, className, name, size }: IProps) => {
  if (!name) return null;

  const imageSize = size === "lg" ? 20 : 18;

  const authorVariants = cva("flex items-center gap-2 font-normal", {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: {
        default: "text-sm",
        lg: "text-base",
      },
    },
  });

  const avatarVariants = cva("rounded-full border border-border", {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: {
        default: "size-4.5",
        lg: "size-5",
      },
    },
  });

  return (
    <Link className={cn(authorVariants({ size }), className)} href="/author">
      <Image
        alt={name || "Author Avatar"}
        className={avatarVariants({ size })}
        height={imageSize}
        src={avatar ?? "/images/author-placeholder.png"}
        width={imageSize}
      />
      <span className="underline">{name}</span>
    </Link>
  );
};
