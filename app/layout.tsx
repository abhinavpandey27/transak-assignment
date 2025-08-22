import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/ThemeProvider";

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: "--font-instrument-sans"
});

export const metadata: Metadata = {
  title: "Transak Demo Hub - Crypto Widget Experience",
  description: "Interactive demo hub showcasing Transak crypto widget functionality with device switching and screen selection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
          <html lang="en" suppressHydrationWarning className={instrumentSans.variable}>
      <body className={instrumentSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen border-t-4 border-blue-600">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
