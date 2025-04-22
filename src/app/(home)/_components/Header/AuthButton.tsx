import { Button } from "@/components/ui/button";
import { LogInIcon, UserIcon } from "lucide-react";
import React from "react";

export const AuthButton = () => {
  const isAuthorized = true;

  return (
    <Button variant="neutral" className="h-9 w-9 p-0">
      {isAuthorized ? <UserIcon className="h-20 w-20" /> : <LogInIcon />}
    </Button>
  );
};
