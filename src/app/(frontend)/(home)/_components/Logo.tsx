import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export const Logo = () => (
  <Link className="flex items-center" href="/">
    <span
      className={cn(
        "text-5xl font-semibold tracking-widest",
        poppins.className,
      )}
    >
      VELÉLS
    </span>
  </Link>
);
