import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Tektur } from "next/font/google"
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const tektur = Tektur({
  subsets: ["latin"],
  variable: "--font-tektur",
})

export const metadata = {
  title: "Naman Jain",
  description: "A Software Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={tektur.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full flex flex-col`}>

        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
