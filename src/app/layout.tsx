import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/navbar/navbar";

export const metadata: Metadata = {
  title: "RateMyUbProf",
  description: "Rate My University Brawijaya Professors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
