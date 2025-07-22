import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { TRPCReactProvider } from "@/trpc/client";

interface IProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: IProps) => {
  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
        enableSystem
      >
        <NuqsAdapter>{children}</NuqsAdapter>
      </ThemeProvider>
    </TRPCReactProvider>
  );
};

export default AppProviders;
