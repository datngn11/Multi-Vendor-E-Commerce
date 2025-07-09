import { redirect, RedirectType } from "next/navigation";
import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Spinner } from "@/components/ui/spinner";
import { caller } from "@/trpc/server";

import { AuthLayout as AuthLayoutComponent } from "./_components/AuthLayout";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await caller.auth.session();

  // Redirect to home if user is already logged in
  if (session.user) {
    redirect("/", RedirectType.replace);
  }

  return (
    <Suspense
      fallback={
        <div className="flex size-full items-center justify-center">
          <Spinner size="md" />
        </div>
      }
    >
      <ErrorBoundary fallback={<div>Something went wrong!</div>}>
        <AuthLayoutComponent>{children}</AuthLayoutComponent>
      </ErrorBoundary>
    </Suspense>
  );
};

export default AuthLayout;
