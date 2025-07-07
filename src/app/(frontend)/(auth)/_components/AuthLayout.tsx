"use client";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { routes } from "@/configs/routes";

type LayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === routes.auth.login.path;

  const titleText = isLoginPage ? "Welcome back!" : "Register your account";

  const btnText = isLoginPage ? "Register" : "Login";

  const handleButtonClick = () => {
    const targetPath = isLoginPage
      ? routes.auth.register.path
      : routes.auth.login.path;

    router.push(targetPath);
  };

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-5">
      <div className="h-screen w-full overflow-y-auto p-4 lg:col-span-3 lg:p-8">
        <div className="mb-8 flex items-center justify-between lg:mb-16">
          <Logo />
          <Button
            className="text-foreground text-base underline"
            onClick={handleButtonClick}
            variant="link"
          >
            {btnText}
          </Button>
        </div>

        <h3 className="mb-8 text-center text-4xl font-semibold lg:mb-12">
          {titleText}
        </h3>

        {children}
      </div>

      <div
        className="hidden h-screen w-full bg-cover bg-center bg-no-repeat lg:col-span-2 lg:block"
        style={{
          backgroundImage: "url('/images/auth-bg.jpg')",
        }}
      />
    </div>
  );
};
