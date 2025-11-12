import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Sidebar from "./components/Sidebar";
import RouteProgress from "./components/RouteProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prueba Técnica",
  description: "Dashboard con sidebar y rutas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <RouteProgress /> {/* 👈 barra global */}
          <div className="flex min-h-screen dark:bg-black bg-white">
            <Sidebar />
            <main className="flex-1 p-8 overflow-y-auto ml-56 transition-all duration-300 [body[data-sidebar-collapsed='true']_&]:ml-20">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}