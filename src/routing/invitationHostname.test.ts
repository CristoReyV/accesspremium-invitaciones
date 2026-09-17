import { describe, expect, it } from "vitest";
import { createInvitationRegistry, invitationRegistry, type InvitationLoader } from "./invitationRegistry";
import { getRoutingHostname, INVITATION_DOMAIN, resolveInvitationHostname } from "./invitationHostname";

const load: InvitationLoader = async () => ({ default: () => null });
const registry = createInvitationRegistry({ "/src/app/bodas/ayde-octavio/page.tsx": load });

describe("registro de invitaciones", () => {
  it("descubre la entrada real de Ayde y Octavio", () => {
    expect(invitationRegistry.bySlug.get("ayde-octavio")?.[0].path).toBe("/bodas/ayde-octavio");
  });
  it("ignora carpetas, archivos y segmentos fuera de la estructura válida", () => {
    const result = createInvitationRegistry({
      "/src/app/bodas/valida/page.tsx": load,
      "/src/pages/bodas/falsa/page.tsx": load,
      "/src/app/bodas/falsa/component.tsx": load,
      "/src/app/bodas/anidada/extra/page.tsx": load,
      "/src/app/bodas/Mayusculas/page.tsx": load,
      "/src/app/bodas/-invalida/page.tsx": load,
    });
    expect(result.entries.map(entry => entry.slug)).toEqual(["valida"]);
  });
  it("bloquea colisiones sin elegir una categoría arbitraria", () => {
    const duplicate = createInvitationRegistry({
      "/src/app/bodas/igual/page.tsx": load,
      "/src/app/bautizo/igual/page.tsx": load,
    });
    expect(duplicate.collisions).toHaveLength(1);
    expect(resolveInvitationHostname(`igual.${INVITATION_DOMAIN}`, duplicate)).toEqual({ kind: "collision", slug: "igual" });
    expect(duplicate.entries).toHaveLength(2);
  });
});

describe("hostname", () => {
  it.each([INVITATION_DOMAIN, "invitaciones-access.netlify.app", "localhost", "127.0.0.1", "ayde-octavio.invitaciones-access.smartbrain.lat.ejemplo.com"])("conserva routing por ruta: %s", host => {
    expect(resolveInvitationHostname(host, registry)).toEqual({ kind: "standard" });
  });
  it.each([`ayde-octavio.${INVITATION_DOMAIN}`, `AYDE-OCTAVIO.${INVITATION_DOMAIN.toUpperCase()}.`])("resuelve el host del cliente: %s", host => {
    expect(resolveInvitationHostname(host, registry)).toMatchObject({ kind: "invitation", entry: { path: "/bodas/ayde-octavio" } });
  });
  it.each([`desconocido.${INVITATION_DOMAIN}`, `otro.ayde-octavio.${INVITATION_DOMAIN}`])("rechaza host desconocido o anidado: %s", host => {
    expect(resolveInvitationHostname(host, registry)).toEqual({ kind: "missing" });
  });
  it("limita la simulación a desarrollo local", () => {
    const query = `?__invitationHost=ayde-octavio.${INVITATION_DOMAIN}`;
    expect(getRoutingHostname("localhost", query, true)).toBe(`ayde-octavio.${INVITATION_DOMAIN}`);
    expect(getRoutingHostname("localhost", query, false)).toBe("localhost");
    expect(getRoutingHostname(INVITATION_DOMAIN, query, true)).toBe(INVITATION_DOMAIN);
  });
});
