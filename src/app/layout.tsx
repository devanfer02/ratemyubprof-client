import type { Metadata } from "next";
import "./styles/globals.css";
import Navbar from "@/components/shared/navbar/navbar";
import NextAuthProvider from "@/components/provider/next-auth";
import Footer from "@/components/shared/footer/footer";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "RateMyUbProf",
  description: "Rate My University Brawijaya Professors",
  icons: {
    icon: "https://wiki.ub.ac.id/lib/exe/fetch.php?cache=&media=ub-logo-small.png"
  },
  openGraph: {
    title: "RateMyUbProf",
    description: "Rate My University Brawijaya Professors",
    url: "https://rmubprof.dvnnfrr.my.id",
    siteName: "Rate My UB professor",
    images: [
      {
        url: "https://wiki.ub.ac.id/lib/exe/fetch.php?cache=&media=ub-logo-small.png",
        width: 1200,
        height: 630,
        alt: "UB Logo"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RateMyUbProf",
    description: "Rate My University Brawijaya Professors",
    images: ["https://wiki.ub.ac.id/lib/exe/fetch.php?cache=&media=ub-logo-small.png"]
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
          <Toaster />
        </NextAuthProvider>
        <Footer/>
      </body>
    </html>

  );
}
