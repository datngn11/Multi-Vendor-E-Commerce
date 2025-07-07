export const runtime = "nodejs"; // Ensure SSR

export const generateMetadata = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      robots: "noindex",
      title: "Not Found",
    };
  }
};

const DevLayout = ({ children }: { children: React.ReactNode }) => {
  if (process.env.NODE_ENV === "production") return null;
  return <>{children}</>;
};

export default DevLayout;
