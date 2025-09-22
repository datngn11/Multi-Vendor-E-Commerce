import type { Metadata } from "next";

import { DM_Sans } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import AppProviders from "./providers";

import "@/styles/globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  description: "A simple and elegant platform",
  title: "VELÉLS",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} antialiased`}>
        <AppProviders>{children}</AppProviders>

        <Toaster richColors />
      </body>
    </html>
  );
}
