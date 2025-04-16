import type { Metadata } from "next";
import "./styles/globals.css";
import Navbar from "@/components/shared/navbar/navbar";
import NextAuthProvider from "@/components/provider/next-auth";

export const metadata: Metadata = {
  title: "RateMyUbProf",
  description: "Rate My University Brawijaya Professors",
  icons: {
    icon: "https://wiki.ub.ac.id/lib/exe/fetch.php?cache=&media=ub-logo-small.png"
  }
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
