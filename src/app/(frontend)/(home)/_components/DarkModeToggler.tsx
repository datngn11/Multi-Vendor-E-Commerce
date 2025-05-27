"use client";

import { MoonStarIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export const DarkModeToggler = () => {
  const { setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  };

  return (
    <Button onClick={toggleTheme} size="icon" variant="neutral">
      <MoonStarIcon className="dark:hidden" />

      <SunIcon className="hidden dark:block" />
    </Button>
  );
};
