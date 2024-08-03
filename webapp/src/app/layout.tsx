import { ThemeProvider } from "@/components/theme-provider";
import { TailwindIndicator } from "@/components/ui/tailwind-indicator";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ambianced",
  description: "Create immersive experiences with Ambianced",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await auth();
  return (
      <html lang="en">
        <body className={`max-h-screen ${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
  );
}
