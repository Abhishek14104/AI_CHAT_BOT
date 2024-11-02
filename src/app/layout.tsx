import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import {Providers} from "@/app/components/Providers";

export const metadata: Metadata = {
  title: "AI Chat Bot",
  description: "AI Chat Bot",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen antialiased")}>
        <Providers >
          <main className="h-screen dark text-foreground  bg-background">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
