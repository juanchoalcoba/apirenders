import { Home, User, Settings, Info } from "lucide-react";

export type TabKey = "home" | "profile" | "settings" | "about";

export interface TabItem {
  key: TabKey;
  label: string;
  Icon: React.ComponentType<{ size?: number }>; // nota el cambio
}

export const tabs: TabItem[] = [
  { key: "home", label: "Inicio", Icon: Home },
  { key: "profile", label: "Perfil", Icon: User },
  { key: "settings", label: "Ajustes", Icon: Settings },
  { key: "about", label: "Acerca de", Icon: Info },
];
