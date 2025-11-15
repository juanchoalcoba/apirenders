import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Sidebar from "./components/Sidebar";
import RouteProgress from "./components/RouteProgress";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "ApiRenders",
  description: "Dashboard con sidebar y rutas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <Providers>
          <RouteProgress />

          {/* 
            👉 Layout adaptable:
            - md:flex → sidebar visible en desktop
            - flex-col → stack en móvil (main arriba, bottom-nav abajo)
          */}
          <div className="flex flex-col md:flex-row h-dvh dark:bg-black bg-white">
            <Sidebar />

            {/* 
              👇 Ajustes importantes:
              - En desktop: deja espacio al costado (ml-56 o ml-20)
              - En mobile: ocupa toda la pantalla (sin margen)
              - pb-16 → deja espacio para el bottom nav (que es fixed)
            */}
            <main className="flex-1 p-6 md:p-8 overflow-y-auto md:ml-56 transition-all duration-300 [body[data-sidebar-collapsed='true']_&]:md:ml-20 pb-16 md:pb-0">
              {children}
              <Footer />
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
