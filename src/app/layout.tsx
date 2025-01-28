"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme-Provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { UserProvider } from "@/providers/UserProvider";

const inter = Inter({ subsets: ["latin"] });

const metadata: Metadata = {
  title: "TSEC-HACKS-25",
  description: "Hacktivists",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title as React.ReactNode}</title>
        <meta name="description" content={metadata.description ?? undefined} />
        <link rel="icon" href="../public/logo.ico" sizes="any" />
      </head>
      <body className={`${inter.className} w-full h-screen overflow-auto`}>
        <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
