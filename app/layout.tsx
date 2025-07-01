import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "../app/components/footer";
import Navbar from "./components/navbar";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Hall of Football",
  description: "Best of the Best From Cradle to Canton",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lexend.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
