// ============================================================
// ACCESSPREMIUM — Panel Navigation Component
// ============================================================

export type PanelTab = "summary" | "responses" | "messages" | "guests" | "integration" | "export";

interface NavItem {
  id: PanelTab;
  label: string;
  icon: string;
  modes?: ("semi_open" | "controlled")[];
}

const NAV_ITEMS: NavItem[] = [
  { id: "summary", label: "Resumen", icon: "◈" },
  { id: "responses", label: "Respuestas", icon: "✉", modes: ["semi_open"] },
  { id: "guests", label: "Invitados", icon: "◉", modes: ["controlled"] },
  { id: "messages", label: "Mensajes", icon: "❝" },
  { id: "integration", label: "Integración", icon: "⟳", modes: ["semi_open"] },
  { id: "export", label: "Exportar", icon: "↓" },
];

interface Props {
  activeTab: PanelTab;
  onTabChange: (tab: PanelTab) => void;
  controlMode?: "semi_open" | "controlled";
}

export default function PanelNav({ activeTab, onTabChange, controlMode = "semi_open" }: Props) {
  const visibleItems = NAV_ITEMS.filter(
    (item) => !item.modes || item.modes.includes(controlMode)
  );

  return (
    <nav className="panel-nav" aria-label="Navegación del panel" role="navigation">
      {visibleItems.map((item) => (
        <button
          key={item.id}
          className={`panel-nav__item${activeTab === item.id ? " panel-nav__item--active" : ""}`}
          onClick={() => onTabChange(item.id)}
          aria-current={activeTab === item.id ? "page" : undefined}
        >
          <span aria-hidden="true">{item.icon}</span>
          {item.label}
        </button>
      ))}
    </nav>
  );
}
