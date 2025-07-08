"use client";

import { useQuery } from "@tanstack/react-query";
import { LogInIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { routes } from "@/configs/routes";
import { useTRPC } from "@/trpc/client";

export const AuthButton = () => {
  const trpc = useTRPC();
  const { data: auth } = useQuery(trpc.auth.session.queryOptions());

  const router = useRouter();

  const handleAuthClick = () =>
    router.push(auth?.user ? routes.profile.path : routes.auth.login.path);

  return (
    <Button
      aria-label={auth?.user ? "Go to profile" : "Go to login"}
      onClick={handleAuthClick}
      size="icon"
      variant="neutral"
    >
      {auth?.user ? <UserIcon className="h-20 w-20" /> : <LogInIcon />}
    </Button>
  );
};
