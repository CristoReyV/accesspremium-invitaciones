// ============================================================
// ACCESSPREMIUM — Exportación Excel
// Usa la librería xlsx (SheetJS)
// ============================================================

import * as XLSX from "xlsx";
import { statusLabel } from "./formatters";
import type { EventResponse } from "../types";

export function exportResponsesToExcel(responses: EventResponse[], slug: string): void {
  const rows = responses.map((r) => ({
    "Fecha": r.submitted_at ? new Date(r.submitted_at).toLocaleDateString("es-MX") : "—",
    "Nombre": r.respondent_name ?? "",
    "Estado": statusLabel(r.status),
    "Número de asistentes": r.attendee_count,
    "Nombres de asistentes": r.attendee_names.join(", "),
    "WhatsApp": r.phone ?? "",
    "Mensaje": r.message ?? "",
    "Origen": r.source === "google_forms" ? "Google Forms" : r.source === "manual" ? "Manual" : "RSVP",
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Confirmaciones");

  ws["!cols"] = [
    { wch: 14 },
    { wch: 32 },
    { wch: 14 },
    { wch: 20 },
    { wch: 40 },
    { wch: 16 },
    { wch: 40 },
    { wch: 14 },
  ];

  XLSX.writeFile(wb, `confirmaciones-${slug}.xlsx`);
}
