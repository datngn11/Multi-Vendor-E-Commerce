"use client";

import { useQuery } from "@tanstack/react-query";
import { LayoutDashboardIcon, LogInIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { routes } from "@/configs/routes";
import { useTRPC } from "@/trpc/client";

export const AuthButton = ({ withRegistration = true }) => {
  const trpc = useTRPC();
  const { data: auth } = useQuery(trpc.auth.session.queryOptions());

  const router = useRouter();

  const isAuthenticated = !!auth?.user;

  const handleAuthClick = () =>
    router.push(
      isAuthenticated ? routes.dashboard.path : routes.auth.login.path,
    );

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              aria-label={isAuthenticated ? "Dashboard" : "Login"}
              onClick={handleAuthClick}
              size="icon"
              variant="neutral"
            >
              {isAuthenticated ? <LayoutDashboardIcon /> : <LogInIcon />}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-primary">
            <p>{isAuthenticated ? "Dashboard" : "Login"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {!isAuthenticated && withRegistration && (
        <Button className="font-bold">
          <Link href={routes.auth.register.path}>Get Started</Link>
        </Button>
      )}
    </>
  );
};
