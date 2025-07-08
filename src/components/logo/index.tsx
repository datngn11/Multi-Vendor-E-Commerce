import { Poppins } from "next/font/google";
import Link from "next/link";

import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export const Logo = () => (
  <Link className="flex w-fit items-center" href="/">
    <span
      className={cn(
        "text-4xl font-semibold tracking-wider lg:text-5xl lg:tracking-widest",
        poppins.className,
      )}
    >
      VELÉLS
    </span>
  </Link>
);
