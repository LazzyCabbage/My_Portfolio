import type { Metadata } from "next";
import { Sora, DM_Mono } from "next/font/google";
import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ashutosh Bansal · Portfolio",
  description:
    "Portfolio of Ashutosh Bansal — full-stack & blockchain developer building at the intersection of Web3, AI, and great UX. Coming soon.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${sora.variable} ${dmMono.variable} font-sora antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
