import { Logo } from "../Logo";

import { DarkModeToggler } from "../DarkModeToggler";
import { Navigation } from "./Navigation";
import { Button } from "@/components/ui/button";
import { AuthButton } from "./AuthButton";

export const Header = () => {
  return (
    <header className="dark:bg-background flex h-20 items-center justify-between border-b bg-white px-6 font-medium">
      <Logo />

      <Navigation />

      <div className="flex items-center gap-4">
        <Button className="mr-4 font-bold" variant="default">
          Get Started
        </Button>

        <AuthButton />

        <DarkModeToggler />
      </div>
    </header>
  );
};
