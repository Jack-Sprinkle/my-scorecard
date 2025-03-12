import type { Metadata } from "next";
import "./globals.css";

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
      <body className="font-display">
        {children}
      </body>
    </html>
  );
}
