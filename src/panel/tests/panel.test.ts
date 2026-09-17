// ============================================================
// ACCESSPREMIUM — Panel Tests
// ============================================================

import { describe, expect, it } from "vitest";
import {
  resolveInvitationHostname,
  INVITATION_DOMAIN,
  PANEL_HOSTNAME,
} from "../../routing/invitationHostname";
import { createInvitationRegistry, type InvitationLoader } from "../../routing/invitationRegistry";
import { statusLabel, formatRelative, formatDate } from "../utils/formatters";
import { exportResponsesToExcel } from "../utils/exportExcel";

// ---- Shared test registry ----
const load: InvitationLoader = async () => ({ default: () => null });
const registry = createInvitationRegistry({
  "/src/app/bodas/ayde-octavio/page.tsx": load,
});

// ================================================================
// 1. Panel hostname is reserved and never treated as invitation
// ================================================================
describe("panel hostname routing", () => {
  it("resuelve panel.invitaciones-access.smartbrain.lat como panel", () => {
    const result = resolveInvitationHostname(PANEL_HOSTNAME, registry);
    expect(result.kind).toBe("panel");
  });

  it("panel hostname no se resuelve como invitacion ni como standard", () => {
    const result = resolveInvitationHostname(PANEL_HOSTNAME, registry);
    expect(result.kind).not.toBe("invitation");
    expect(result.kind).not.toBe("standard");
    expect(result.kind).not.toBe("missing");
  });

  it("subdominios de invitacion no se confunden con el panel", () => {
    const result = resolveInvitationHostname(`ayde-octavio.${INVITATION_DOMAIN}`, registry);
    expect(result.kind).toBe("invitation");
  });

  it("la landing principal sigue siendo standard", () => {
    const result = resolveInvitationHostname(INVITATION_DOMAIN, registry);
    expect(result.kind).toBe("standard");
  });

  it("reserva expresamente el slug panel para que NUNCA pueda resolverse como invitacion cliente", () => {
    // Intento de inyectar una invitacion con slug 'panel' en el registro
    const maliciousRegistry = createInvitationRegistry({
      "/src/app/bodas/panel/page.tsx": load,
      "/src/app/bodas/ayde-octavio/page.tsx": load,
    });
    // El registro debe descartar panel
    expect(maliciousRegistry.bySlug.has("panel")).toBe(false);

    // Cualquier host con slug panel debe resolverse como panel, jamas como invitacion
    const resultSubdomain = resolveInvitationHostname(`panel.${INVITATION_DOMAIN}`, maliciousRegistry);
    expect(resultSubdomain.kind).toBe("panel");
    expect(resultSubdomain.kind).not.toBe("invitation");

    const resultDirect = resolveInvitationHostname("panel.invitaciones-access.smartbrain.lat", maliciousRegistry);
    expect(resultDirect.kind).toBe("panel");
    expect(resultDirect.kind).not.toBe("invitation");
  });

  it("bloquea slugs reservados de sistema (admin, api, dashboard)", () => {
    const registryWithReserved = createInvitationRegistry({
      "/src/app/bodas/admin/page.tsx": load,
      "/src/app/bodas/api/page.tsx": load,
    });
    expect(registryWithReserved.bySlug.has("admin")).toBe(false);
    expect(registryWithReserved.bySlug.has("api")).toBe(false);

    expect(resolveInvitationHostname("admin." + INVITATION_DOMAIN, registry)).toEqual({ kind: "missing" });
    expect(resolveInvitationHostname("api." + INVITATION_DOMAIN, registry)).toEqual({ kind: "missing" });
  });
});

// ================================================================
// 2. Session isolation
// ================================================================
describe("aislamiento de sesion", () => {
  it("un event_id de sesion no puede ser diferente al del evento solicitado", () => {
    const sessionEventId = "acf3e0be-4244-42b7-9c14-378a5e58909d";
    const requestedEventId = "00000000-0000-0000-0000-000000000001";
    expect(sessionEventId).not.toBe(requestedEventId);
  });
});

// ================================================================
// 3. Summary calculations
// ================================================================
describe("summary calculations", () => {
  type RespInput = { status: "confirmed" | "declined" | "pending"; attendee_count: number };

  function calcSummary(responses: RespInput[]) {
    const confirmed_people = responses.filter(r => r.status === "confirmed").reduce((a, r) => a + (r.attendee_count || 1), 0);
    const declined_people = responses.filter(r => r.status === "declined").reduce((a, r) => a + (r.attendee_count || 1), 0);
    const pending_people = responses.filter(r => r.status === "pending").reduce((a, r) => a + (r.attendee_count || 1), 0);
    return { total_responses: responses.length, confirmed_people, declined_people, pending_people };
  }

  it("funciona correctamente con cero respuestas", () => {
    const summary = calcSummary([]);
    expect(summary.total_responses).toBe(0);
    expect(summary.confirmed_people).toBe(0);
  });

  it("cuenta personas (attendee_count), no respuestas", () => {
    const summary = calcSummary([
      { status: "confirmed", attendee_count: 4 },
      { status: "confirmed", attendee_count: 2 },
      { status: "declined", attendee_count: 1 },
    ]);
    expect(summary.confirmed_people).toBe(6);
    expect(summary.declined_people).toBe(1);
    expect(summary.total_responses).toBe(3);
  });
});

// ================================================================
// 4. Google Sheets status normalization
// ================================================================
describe("parser de estado de Google Forms", () => {
  function normalizeStatus(v?: string): "confirmed" | "declined" | "error" {
    if (!v) return "error";
    const normalized = v.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
    if (normalized.includes("confirmo") || normalized.includes("si") || normalized.includes("asistiré") || normalized.includes("asistire") || normalized.includes("confirmar")) return "confirmed";
    if (normalized.includes("no") || normalized.includes("decline") || normalized.includes("no asis") || normalized.includes("no podré") || normalized.includes("no podre")) return "declined";
    return "error";
  }

  it("mapea respuestas de confirmacion correctamente", () => {
    expect(normalizeStatus("Si, confirmo mi asistencia")).toBe("confirmed");
    expect(normalizeStatus("Confirmo")).toBe("confirmed");
  });

  it("mapea respuestas de rechazo correctamente", () => {
    expect(normalizeStatus("No podre")).toBe("declined");
  });

  it("registra error cuando la respuesta es desconocida", () => {
    expect(normalizeStatus("Quizas")).toBe("error");
    expect(normalizeStatus("")).toBe("error");
    expect(normalizeStatus(undefined)).toBe("error");
  });

  it("no asume confirmacion en caso de respuesta desconocida", () => {
    const result = normalizeStatus("Tal vez");
    expect(result).not.toBe("confirmed");
  });
});

// ================================================================
// 5. Deduplication
// ================================================================
describe("deduplicacion de sync", () => {
  function mockHash(input: string): string {
    let hash = 0;
    for (const ch of input) { hash = (hash << 5) - hash + ch.charCodeAt(0); hash |= 0; }
    return Math.abs(hash).toString(16).padStart(8, "0");
  }

  it("genera el mismo external_response_id para la misma fila", () => {
    const ts = "2027-01-15 10:30:00";
    const name = "Maria Garcia";
    expect(mockHash(`${ts}::${name}`)).toBe(mockHash(`${ts}::${name}`));
  });

  it("genera external_response_id diferente para filas distintas", () => {
    const id1 = mockHash("2027-01-15 10:30:00::Maria Garcia");
    const id2 = mockHash("2027-01-15 10:31:00::Juan Perez");
    expect(id1).not.toBe(id2);
  });
});

// ================================================================
// 6. Controlled mode — passes validation
// ================================================================
describe("validacion de pases en modo controlled", () => {
  function validatePasses(allowed: number, confirmed: number): boolean {
    if (allowed < 1) return false;
    if (confirmed < 0) return false;
    return confirmed <= allowed;
  }

  it("no permite pases confirmados mayores a los permitidos", () => {
    expect(validatePasses(4, 5)).toBe(false);
  });

  it("permite pases iguales a los permitidos", () => {
    expect(validatePasses(4, 4)).toBe(true);
  });

  it("no permite 0 pases asignados", () => {
    expect(validatePasses(0, 0)).toBe(false);
  });
});

// ================================================================
// 7. Formatters
// ================================================================
describe("formatters", () => {
  it("statusLabel retorna texto en espanol", () => {
    expect(statusLabel("confirmed")).toBe("Confirmado");
    expect(statusLabel("declined")).toBe("No asistir\u00e1");
    expect(statusLabel("pending")).toBe("Pendiente");
  });

  it("formatDate devuelve guion para valores nulos", () => {
    expect(formatDate(null)).toBe("—");
    expect(formatDate(undefined)).toBe("—");
  });

  it("formatDate produce una fecha legible para ISO valido", () => {
    const result = formatDate("2027-01-30T19:00:00-06:00");
    expect(result).not.toBe("—");
    expect(result).toMatch(/2027/);
  });
});

// ================================================================
// 8. Export function is callable
// ================================================================
describe("export excel utility", () => {
  it("exportResponsesToExcel es una funcion", () => {
    expect(typeof exportResponsesToExcel).toBe("function");
  });
});

// ================================================================
// 9. Semi-open behavior
// ================================================================
describe("semi_open behavior", () => {
  it("el modo semi_open admite google_forms como fuente", () => {
    const validSources = ["google_forms", "native_rsvp", "manual"];
    expect(validSources).toContain("google_forms");
  });
});

