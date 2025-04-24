import { ThemeProvider } from "next-themes";

interface IProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: IProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

export default AppProviders;
