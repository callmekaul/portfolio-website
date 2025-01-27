import type { Metadata } from "next";
import "./globals.css";
import {Montserrat} from "next/font/google";
import { twMerge } from "tailwind-merge";

const monster = Montserrat({subsets: ["latin"], variable: "--font-sans"})

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "Created with the help of Frontend Tribe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={twMerge(
        monster.variable,
        "bg-zinc-950 text-white antialiased font-sans"
        )}>{children}</body>
    </html>
  );
}
