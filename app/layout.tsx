import type { Metadata } from "next";
import { Noto_Sans, Newsreader } from "next/font/google";
import "@/app/ui/styles/globals.css";
import { Footer } from "@/app/ui/components/common/Footer";
import { Header } from "@/app/ui/components/common/Header";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
});

export const metadata: Metadata = {
  title: "Foccuz Book Shelf",
  description: "A simple bookshelf app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${newsreader.variable} antialiased overflow-x-hidden`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
