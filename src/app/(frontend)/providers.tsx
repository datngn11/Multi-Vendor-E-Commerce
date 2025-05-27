import { ThemeProvider } from "next-themes";

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
        {children}
      </ThemeProvider>
    </TRPCReactProvider>
  );
};

export default AppProviders;
