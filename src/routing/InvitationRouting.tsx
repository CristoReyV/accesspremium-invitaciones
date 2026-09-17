import { lazy, Suspense, type ReactNode } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { invitationRegistry } from "./invitationRegistry";
import { getRoutingHostname, resolveInvitationHostname } from "./invitationHostname";
import InvitationUnavailable from "./InvitationUnavailable";

const pages = invitationRegistry.entries.map(entry => ({ ...entry, Page: lazy(entry.load) }));

/** Comparte el mismo componente entre ruta y subdominio, sin redirigir la URL. */
export default function InvitationRouting({ children }: { children: ReactNode }) {
  const location = useLocation();
  const hostname = getRoutingHostname(window.location.hostname, location.search, import.meta.env.DEV);
  const resolved = resolveInvitationHostname(hostname, invitationRegistry);
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
