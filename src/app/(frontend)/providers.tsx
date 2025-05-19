import { ThemeProvider } from "next-themes";

interface IProps {
  children: React.ReactNode;
}

const AppProviders = ({ children }: IProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
      enableSystem
    >
      {children}
    </ThemeProvider>
  );
};

export default AppProviders;
