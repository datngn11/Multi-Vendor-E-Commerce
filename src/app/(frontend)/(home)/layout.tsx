import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";

interface IProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: IProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-auto px-6 py-3">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
