import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Fraunces, JetBrains_Mono } from "next/font/google";
import { clerkAppearance } from "@/lib/clerk-appearance";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const body = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Intervue — The mock interview that talks back",
  description:
    "Practice behavioral and technical interview questions and get specific, real-time coaching on what landed and what didn't — before it counts.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // ClerkProvider goes inside <body>, not wrapping <html> — required as of
    // Clerk Core 3. The font vars stay on <html> so they resolve for Clerk's
    // portal too.
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <ClerkProvider appearance={clerkAppearance}>{children}</ClerkProvider>
      </body>
    </html>
  );
}
