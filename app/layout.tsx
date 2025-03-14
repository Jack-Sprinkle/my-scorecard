import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/_components/header";
import Footer from "./_components/footer";

export const metadata: Metadata = {
  title: "My Scorecard",
  description: "Golf Scorecard made simple and easy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-default flex flex-col min-h-screen bg-gray-200">
        <Header/>
        <main className="flex-grow">{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
