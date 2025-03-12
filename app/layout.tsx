import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/header";

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
      <body className="font-default">
        <header>{Nav()}</header>
        <main>{children}</main>
      </body>
    </html>
  );
}
