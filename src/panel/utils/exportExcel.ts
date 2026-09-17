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
    "Nombre": r.respondent_name,
    "Estado": statusLabel(r.status),
    "Número de asistentes": r.attendee_count,
    "Nombres de asistentes": r.attendee_names ?? "",
    "WhatsApp": r.phone ?? "",
    "Mensaje": r.message ?? "",
    "Origen": r.source === "google_forms" ? "Google Forms" : r.source === "manual" ? "Manual" : "RSVP",
  }));

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Confirmaciones");

  // Adjust column widths
  const colWidths = [
    { wch: 14 }, // Fecha
    { wch: 32 }, // Nombre
    { wch: 14 }, // Estado
    { wch: 20 }, // Asistentes
    { wch: 40 }, // Nombres asistentes
    { wch: 16 }, // WhatsApp
    { wch: 40 }, // Mensaje
    { wch: 14 }, // Origen
  ];
  ws["!cols"] = colWidths;

  XLSX.writeFile(wb, `confirmaciones-${slug}.xlsx`);
}
