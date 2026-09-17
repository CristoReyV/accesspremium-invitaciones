// ============================================================
// ACCESSPREMIUM — Utilidades de formato para el panel
// ============================================================

function parseDateValue(value: string): Date | null {
  // PostgreSQL DATE values arrive as YYYY-MM-DD. `new Date("YYYY-MM-DD")`
  // interprets them as UTC, which can shift the calendar date backwards in
  // Mexico and other negative-offset time zones. Build date-only values in the
  // local calendar instead so an event on Jan 30 always renders as Jan 30.
  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (dateOnly) {
    const [, year, month, day] = dateOnly;
    const date = new Date(Number(year), Number(month) - 1, Number(day));
    return Number.isNaN(date.getTime()) ? null : date;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDate(iso: string | null | undefined, opts?: Intl.DateTimeFormatOptions): string {
  if (!iso) return "—";
  const date = parseDateValue(iso);
  if (!date) return "—";
  return date.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...opts,
  });
}

export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = parseDateValue(iso);
  if (!date) return "—";
  return date.toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatRelative(iso: string | null | undefined): string {
  if (!iso) return "—";
  const date = parseDateValue(iso);
  if (!date) return "—";
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "justo ahora";
  if (mins < 60) return `hace ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `hace ${hours} h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `hace ${days} día${days !== 1 ? "s" : ""}`;
  return formatDate(iso);
}

export function formatPhone(phone: string | null | undefined): string {
  if (!phone) return "—";
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  return phone;
}

export function statusLabel(status: string): string {
  switch (status) {
    case "confirmed": return "Confirmado";
    case "declined": return "No asistirá";
    case "pending": return "Pendiente";
    default: return status;
  }
}

export function statusColor(status: string): string {
  switch (status) {
    case "confirmed": return "text-emerald-600 bg-emerald-50";
    case "declined": return "text-rose-600 bg-rose-50";
    case "pending": return "text-amber-600 bg-amber-50";
    default: return "text-slate-600 bg-slate-50";
  }
}
