"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { routes } from "@/configs/routes";
import { cn } from "@/lib/utils";

const navRoutes = [
  routes.home,
  routes.about,
  routes.features,
  routes.pricing,
  routes.contact,
];

const mobileRoutes = [
  routes.about,
  routes.features,
  routes.pricing,
  routes.contact,
];

export const Navigation = () => {
  const currentPath = usePathname();

  return (
    <nav className="hidden items-center gap-4 lg:flex">
      {navRoutes.map((route) => (
        <Button
          asChild
          key={route.label}
          variant={currentPath === route.path ? "default" : "neutral"}
        >
          <Link href={route.path}>{route.label}</Link>
        </Button>
      ))}
    </nav>
  );
};

export const MobileNavigation = () => {
  const currentPath = usePathname();

  return (
    <nav className="flex flex-col">
      {mobileRoutes.map((route) => (
        <Link
          className={cn(
            "border-b-border flex w-full items-center gap-2 border-b-2 px-5 py-4 font-medium",
            "hover:bg-primary hover:text-primary-foreground",
            currentPath === route.path && "bg-primary text-primary-foreground"
          )}
          href={route.path}
          key={route.label}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
