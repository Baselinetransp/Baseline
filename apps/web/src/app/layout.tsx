import type { Metadata } from "next";

import { Epilogue, Inter } from "next/font/google";

import "../index.css";
import Providers from "@/components/providers";

const epilogue = Epilogue({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BaselineDrivers - Connect Drivers & Recruiters",
  description: "UK & Nigeria's leading transport recruitment platform connecting professional drivers with top employers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${epilogue.variable} ${inter.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
