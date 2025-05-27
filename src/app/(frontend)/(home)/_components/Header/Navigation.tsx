"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

/* eslint-disable perfectionist/sort-objects */
const routes = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export const Navigation = () => {
  const currentPath = usePathname();

  return (
    <nav className="hidden items-center gap-4 lg:flex">
      {routes.map((route) => (
        <Button
          asChild
          key={route.name}
          variant={currentPath === route.href ? "default" : "neutral"}
        >
          <Link href={route.href}>{route.name}</Link>
        </Button>
      ))}
    </nav>
  );
};
