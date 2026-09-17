import type { InvitationEntry } from "./invitationRegistry";

export const INVITATION_DOMAIN = "invitaciones-access.smartbrain.lat";
export const PANEL_HOSTNAME = "panel.invitaciones-access.smartbrain.lat";
export const RESERVED_SLUGS = new Set(["panel", "admin", "api", "dashboard", "app", "auth", "static", "www"]);

type Registry = { bySlug: Map<string, InvitationEntry[]> };
export type HostResolution =
  | { kind: "standard" }
  | { kind: "panel" }
  | { kind: "missing" }
  | { kind: "collision"; slug: string }
  | { kind: "invitation"; entry: InvitationEntry };

export function resolveInvitationHostname(hostname: string, registry: Registry): HostResolution {
  const host = hostname.toLowerCase().replace(/\.$/, "");
  // Panel hostname is reserved - never treated as invitation
  if (host === PANEL_HOSTNAME || host.startsWith("panel.")) {
    return { kind: "panel" };
  }
  const suffix = `.${INVITATION_DOMAIN}`;
  if (!host.endsWith(suffix)) return { kind: "standard" };
  const slug = host.slice(0, -suffix.length);

  // Reservar expresamente panel y slugs de sistema: NUNCA resolver como invitación cliente
  if (slug === "panel") {
    return { kind: "panel" };
  }
  if (RESERVED_SLUGS.has(slug)) {
    return { kind: "missing" };
  }

  // Solo un subdominio directo: no convertir a.b.dominio en el cliente a.
  if (!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(slug)) return { kind: "missing" };
  const matches = registry.bySlug.get(slug) ?? [];
  if (matches.length > 1) return { kind: "collision", slug };
  return matches.length ? { kind: "invitation", entry: matches[0] } : { kind: "missing" };
}

// Simulación exclusivamente local y en desarrollo; ignorada en producción.
export function getRoutingHostname(hostname: string, search: string, development: boolean): string {
  if (development && ["localhost", "127.0.0.1", "[::1]"].includes(hostname)) {
    return new URLSearchParams(search).get("__invitationHost") || hostname;
  }
  return hostname;
}