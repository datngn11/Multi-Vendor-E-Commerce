"use client";

import { Button } from "@/components/ui/button";
import { MoonStarIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export const DarkModeToggler = () => {
  const { setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((theme) => (theme === "dark" ? "light" : "dark"));
  };

  return (
    <Button variant="neutral" onClick={toggleTheme} size="icon">
      <MoonStarIcon className="dark:hidden" />

      <SunIcon className="hidden dark:block" />
    </Button>
  );
};
