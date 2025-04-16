import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/shared/navbar/navbar";
import NextAuthProvider from "@/components/provider/next-auth";

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
        <NextAuthProvider>
          <Navbar />
          {children}
        </NextAuthProvider>
      </body>
    </html>

  );
}
