import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";

interface IProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IProps) => {
  return (
    <div className="flex min-h-screen flex-col font-[family-name:var(--font-dm-sans)]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
