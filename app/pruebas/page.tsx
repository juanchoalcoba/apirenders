"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { tabs, TabKey } from "./tabs/tabs";
import { HomeTab, Profile, AboutTab, SettingsTab } from "./tabs";

export default function ModernTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>("home");

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeTab />;
      case "profile":
        return <Profile />;
      case "settings":
        return <SettingsTab />;
      case "about":
        return <AboutTab />;
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-24 p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      {/* Barra de navegación */}
      <div className="flex justify-between mb-6 bg-gray-50 p-2 rounded-xl">
        {tabs.map((tab) => {
          const Icon = tab.Icon; // Instanciamos el componente
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex flex-col items-center gap-1 py-2 rounded-lg transition-all duration-300
                ${
                  activeTab === tab.key
                    ? "bg-white shadow text-blue-600 font-semibold"
                    : "text-gray-500 hover:text-blue-500"
                }`}
            >
              <Icon size={18} />
              <span className="text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Contenido animado */}
      <div className="min-h-[100px] text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
