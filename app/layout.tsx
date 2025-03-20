import { Inter } from "next/font/google";
import "./globals.css";

import { type Metadata } from 'next'
import {ClerkProvider} from '@clerk/nextjs'
import './globals.css'
import { ThemeProvider } from "@/components/theme-provider";

const poppins = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "700"]
});


export const metadata: Metadata = {
  title: 'Clerk Next.js Quickstart',
  description: 'Generated by create next app',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning className="dark">
        <body
          className={`${poppins.className}  antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
