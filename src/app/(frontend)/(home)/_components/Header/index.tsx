import { Logo } from "@/components/logo";
import { ThemeToggler } from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";

import { AuthButton } from "./AuthButton";
import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <header className="dark:bg-background flex h-20 items-center justify-between border-b bg-white px-6 font-medium">
      <Logo />

      <Navigation />

      <div className="flex items-center gap-4">
        <ThemeToggler />

        <AuthButton />

        <Button className="font-bold">Get Started</Button>
      </div>
    </header>
  );
};
