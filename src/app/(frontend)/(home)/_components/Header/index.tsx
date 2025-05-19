import { Button } from "@/components/ui/button";

import { DarkModeToggler } from "../DarkModeToggler";
import { Logo } from "../Logo";
import { AuthButton } from "./AuthButton";
import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <header className="dark:bg-background flex h-20 items-center justify-between border-b bg-white px-6 font-medium">
      <Logo />

      <Navigation />

      <div className="flex items-center gap-4">
        <DarkModeToggler />

        <AuthButton />

        <Button className="font-bold">Get Started</Button>
      </div>
    </header>
  );
};
