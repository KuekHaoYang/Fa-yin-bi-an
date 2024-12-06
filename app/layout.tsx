import { Providers } from "./providers";
import { AppNavbar } from "./components/Navbar";
import { AppFooter } from "./components/Footer";
import { AIChatButton } from "./components/AIChatButton";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "法音彼岸",
  description: "现代化佛教宣传Web应用",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="bg-[#F5F5DC]">
        <Providers>
          <div className="min-h-screen flex flex-col">
            <AppNavbar />
            <main className="flex-1">
              {children}
            </main>
            <AppFooter />
            <AIChatButton />
          </div>
        </Providers>
      </body>
    </html>
  );
}
