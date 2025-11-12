"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configuración de NProgress
NProgress.configure({ showSpinner: false, speed: 700, minimum: 0.35 });

export default function RouteProgress() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    const timeout = setTimeout(() => NProgress.done(), 1200); // simulamos carga corta
    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
