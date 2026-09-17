import { lazy, Suspense, type ReactNode } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { invitationRegistry } from "./invitationRegistry";
import { getRoutingHostname, resolveInvitationHostname } from "./invitationHostname";
import InvitationUnavailable from "./InvitationUnavailable";

const PanelApp = lazy(() => import("../panel/PanelApp"));
const pages = invitationRegistry.entries.map(entry => ({ ...entry, Page: lazy(entry.load) }));

/** Comparte el mismo componente entre ruta y subdominio, sin redirigir la URL. */
export default function InvitationRouting({ children }: { children: ReactNode }) {
  const location = useLocation();
  const hostname = getRoutingHostname(window.location.hostname, location.search, import.meta.env.DEV);
  const resolved = resolveInvitationHostname(hostname, invitationRegistry);

  // Panel hostname: render panel app entirely
  if (resolved.kind === "panel") {
    return (
      <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}><div style={{ width: 24, height: 24, borderRadius: "50%", border: "2px solid #e5e7eb", borderTopColor: "#B8972B", animation: "spin 0.7s linear infinite" }} /></div>}>
        <PanelApp />
      </Suspense>
    );
  }

  // Path-based panel fallback: /panel route served by PanelApp
  if (!resolved.kind.startsWith("invitation") && location.pathname.startsWith("/panel")) {
    return (
      <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}><div style={{ width: 24, height: 24, borderRadius: "50%", border: "2px solid #e5e7eb", borderTopColor: "#B8972B", animation: "spin 0.7s linear infinite" }} /></div>}>
        <PanelApp />
      </Suspense>
    );
  }

  if (resolved.kind === "missing" || resolved.kind === "collision") {
    return <InvitationUnavailable collision={resolved.kind === "collision"} />;
  }

  const isInvitationHost = resolved.kind === "invitation";
  // En hosts de cliente no se permite navegar a landing, catálogo u otro cliente.
  if (isInvitationHost && location.pathname !== "/" && location.pathname !== resolved.entry.path && location.pathname !== `${resolved.entry.path}/`) {
    return <InvitationUnavailable />;
  }
  const routeLocation = isInvitationHost ? { ...location, pathname: resolved.entry.path } : location;
  return (
    <Suspense fallback={<p role="status" className="p-8 text-center">Cargando invitación…</p>}>
      <Routes location={routeLocation}>
        {pages.map(({ path, Page }) => <Route key={path} path={path} element={<Page />} />)}
        {!isInvitationHost && <Route path="*" element={children} />}
      </Routes>
    </Suspense>
  );
}
