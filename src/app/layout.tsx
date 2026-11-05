import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/homepage/Navbar";

const interTight = Inter_Tight({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StudioSpace — Find the Perfect Space for Your Next Creation",
  description:
    "Discover and book stunning studios for photography, filmmaking, podcasting and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${interTight.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* The CSS keys off a `.dark` class, so next-themes must write the class. */}
        
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
        
        
        </body>
    </html>
  );
}
