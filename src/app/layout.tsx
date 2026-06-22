import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/lenis-provider";
import CustomCursor from "@/components/custom-cursor";
import ThemeProvider from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Apoorv Anand | Agentic AI Engineer & Full-Stack SaaS Builder",
  description:
    "Agentic AI engineer specializing in autonomous multi-agent coding systems and production SaaS platforms. Architect of KaiSchool and KaiBot.",
  openGraph: {
    title: "Apoorv Anand | Agentic AI Engineer",
    description:
      "Building autonomous multi-agent coding systems and production SaaS platforms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <LenisProvider>
            <CustomCursor />
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
