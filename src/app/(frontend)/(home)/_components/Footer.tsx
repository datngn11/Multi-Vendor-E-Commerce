import Link from "next/link";
import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer className="dark:bg-background flex items-center justify-between border-t bg-white p-6">
      <Logo />

      <Link href="/admin">Admin</Link>
    </footer>
  );
};
