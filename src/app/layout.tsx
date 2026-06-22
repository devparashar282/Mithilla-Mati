import type { Metadata } from "next";
import { Playfair_Display, Lora, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/providers/CartProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MITHILA MAATI | Premium GI-Tagged Makhana",
  description: "Authentic, premium Makhana (Fox Nuts) sourced directly from the heart of Mithila. Enjoy traditional heritage in every crunchy bite.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lora.variable} ${inter.variable} ${montserrat.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-ivory text-dark-text">
        <AuthProvider>
          <CartProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
