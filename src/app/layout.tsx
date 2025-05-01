import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientAnimationWrapper from "@/components/ClientAnimationWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Respect Her Privacy | Your Pain Is Not Invisible",
  description: "A safe, anonymous space for reporting unauthorized sharing of private images and videos. We're here to help and support you.",
  keywords: "anonymous reporting, online harassment, digital exploitation, support, respect privacy, protect women online",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://respectherprivacy.in",
    title: "Respect Her Privacy | Your Pain Is Not Invisible",
    description: "Report unauthorized content sharing anonymously",
    siteName: "Respect Her Privacy",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-white  relative z-10 flex flex-col min-h-screen`}
      >
        {/* AnimatedBackground is imported in ClientAnimationWrapper */}
        <ClientAnimationWrapper />
        
        
          <NavBar/>
          <main className="flex-grow">
            {children}
          </main>
          <Footer/>
      </body>
    </html>
  );
}
