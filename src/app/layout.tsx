import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import Navbar from "@/components/ui/Navbar";
import Mascot from "@/components/mascot/Mascot";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "LearnVerse - Visual Learning Adventure",
  description: "A highly interactive educational platform focused on visual learning and gamified exploration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark`} suppressHydrationWarning>
      <body className="min-h-screen bg-bg-primary text-text-primary antialiased selection:bg-indigo-500/30">
        <Providers>
          <Navbar />
          <main className="flex-1 w-full h-full relative z-0">
            {children}
          </main>
          {/* Default Mascot in layout for general pages. Specific pages might hide or manage it */}
          <Mascot />
        </Providers>
      </body>
    </html>
  );
}
