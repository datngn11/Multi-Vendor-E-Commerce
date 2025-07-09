import { DialogTitle } from "@radix-ui/react-dialog";
import { MenuIcon } from "lucide-react";

import { Logo } from "@/components/logo";
import { ThemeToggler } from "@/components/theme-toggler";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { AuthButton } from "../Header/AuthButton";
import { MobileNavigation } from "../Header/Navigation";

export const Sidebar = () => {
  return (
    <div className="lg:hidden">
      <Drawer direction="left">
        <DrawerTrigger asChild>
          <Button
            aria-label="Toggle menu"
            className="lg:hidden"
            size="icon"
            variant="neutral"
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="border-b-border border-b-2 px-5">
            <div className="flex items-center justify-between">
              <DialogTitle>
                <Logo />
              </DialogTitle>
              <div className="flex items-center gap-3">
                <ThemeToggler />
                <AuthButton />
              </div>
            </div>
          </DrawerHeader>

          <MobileNavigation />
        </DrawerContent>
      </Drawer>
    </div>
  );
};
