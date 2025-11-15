"use client";

import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  ChevronRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-12 pb-10 px-6 md:px-12">
      
      {/* --- GRID DE SECCIONES --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* --- BRAND --- */}
        <div>
          <h3 className="text-xl font-bold mb-4">ApiRenders</h3>
          <p className="text-sm opacity-80 leading-relaxed">
            Plataforma moderna pensada para brindar una experiencia rápida,
            elegante y totalmente responsive.
          </p>

          {/* Redes */}
          <div className="flex items-center gap-4 mt-5">
            <a href="#" className="opacity-80 hover:opacity-100 transition">
              <Github size={20} />
            </a>
            <a href="#" className="opacity-80 hover:opacity-100 transition">
              <Twitter size={20} />
            </a>
            <a href="#" className="opacity-80 hover:opacity-100 transition">
              <Linkedin size={20} />
            </a>
            <a href="#" className="opacity-80 hover:opacity-100 transition">
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* --- SECCIÓN 1: PRODUCTO --- */}
        <div>
          <h4 className="font-semibold mb-4">Producto</h4>
          <ul className="space-y-3 text-sm">
            <FooterItem label="Dashboard" />
            <FooterItem label="Estadísticas" />
            <FooterItem label="Integraciones" />
            <FooterItem label="Precios" />
          </ul>
        </div>

        {/* --- SECCIÓN 2: COMPAÑÍA --- */}
        <div>
          <h4 className="font-semibold mb-4">Compañía</h4>
          <ul className="space-y-3 text-sm">
            <FooterItem label="Sobre nosotros" />
            <FooterItem label="Blog" />
            <FooterItem label="Carreras" />
            <FooterItem label="Prensa" />
          </ul>
        </div>

        {/* --- SECCIÓN 3: SOPORTE --- */}
        <div>
          <h4 className="font-semibold mb-4">Soporte</h4>
          <ul className="space-y-3 text-sm">
            <FooterItem label="Centro de ayuda" />
            <FooterItem label="Estado del servicio" />
            <FooterItem label="Reportar un problema" />
            <FooterItem label="Contacto" />
          </ul>
        </div>
      </div>

      {/* --- LEGAL / COPYRIGHT --- */}
      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm opacity-80">
        <p>© {new Date().getFullYear()} Prueba Técnica. Todos los derechos reservados.</p>

        <div className="flex items-center gap-6">
          <a href="#" className="hover:opacity-100 opacity-80 transition">Privacidad</a>
          <a href="#" className="hover:opacity-100 opacity-80 transition">Términos</a>
          <a href="#" className="hover:opacity-100 opacity-80 transition">Cookies</a>
        </div>
      </div>
    </footer>
  );
}


/* --- Componente reutilizable para links --- */
function FooterItem({ label }: { label: string }) {
  return (
    <li>
      <a
        href="#"
        className="flex items-center gap-1 group hover:text-black dark:hover:text-white transition"
      >
        <ChevronRight
          size={16}
          className="opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
        />
        {label}
      </a>
    </li>
  );
}
