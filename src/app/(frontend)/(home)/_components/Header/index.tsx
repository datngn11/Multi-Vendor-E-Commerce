import { Logo } from "@/components/logo";
import { ThemeToggler } from "@/components/theme-toggler";

import { Sidebar } from "../Sidebar";
import { AuthButton } from "./AuthButton";
import { Navigation } from "./Navigation";

export const Header = () => {
  return (
    <header className="bg-body-background flex h-20 items-center justify-between border-b px-6 font-medium">
      <Logo />

      <Navigation />

      <div className="hidden items-center gap-4 lg:flex">
        <ThemeToggler />

        <AuthButton />
      </div>

      <Sidebar />
    </header>
  );
};
