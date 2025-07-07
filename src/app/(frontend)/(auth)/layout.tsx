import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { Spinner } from "@/components/ui/spinner";

import { AuthLayout as AuthLayoutComponent } from "./_components/AuthLayout";

const AuthLayout = ({ children }: { children: ReactNode }) => {
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
