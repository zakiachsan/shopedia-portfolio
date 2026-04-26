import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Shopedia - Toko Online Demo",
  description: "Portfolio demo of Shopedia E-commerce Storefront",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
