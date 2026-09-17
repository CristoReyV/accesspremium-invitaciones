// ============================================================
// ACCESSPREMIUM — Tabla de Respuestas
// ============================================================

import { useState, useCallback } from "react";
import { formatDateTime, formatPhone, statusLabel } from "../utils/formatters";
import type { EventResponse } from "../types";

interface Props {
  responses: EventResponse[];
  total: number;
  loading: boolean;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onFilterChange: (status: string, search: string) => void;
}

export default function PanelResponsesPage({
  responses,
  total,
  loading,
  page,
  limit,
  onPageChange,
  onFilterChange,
}: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleSearch = useCallback((val: string) => {
    setSearch(val);
    onFilterChange(statusFilter, val);
  }, [statusFilter, onFilterChange]);

  const handleStatusFilter = useCallback((val: string) => {
    setStatusFilter(val);
    onFilterChange(val, search);
  }, [search, onFilterChange]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", marginBottom: 20, letterSpacing: "-0.01em" }}>
        Respuestas · {total} total
      </h2>

      {/* Filters */}
      <div className="panel-filter">
        <input
          className="panel-filter__input"
          type="search"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          aria-label="Buscar respuestas"
        />
        <select
          className="panel-filter__select"
          value={statusFilter}
          onChange={(e) => handleStatusFilter(e.target.value)}
          aria-label="Filtrar por estado"
        >
          <option value="">Todos los estados</option>
          <option value="confirmed">Confirmados</option>
          <option value="declined">No asistirán</option>
          <option value="pending">Pendientes</option>
        </select>
      </div>

      {loading ? (
        <div className="panel-loading"><span className="spinner" /> Cargando respuestas...</div>
      ) : responses.length === 0 ? (
        <div className="panel-empty">
          <div className="panel-empty__icon">✉</div>
          <div className="panel-empty__title">Sin resultados</div>
          <div className="panel-empty__text">
            {search || statusFilter
              ? "Intenta con otros filtros de búsqueda."
              : "Aún no hay respuestas registradas."}
          </div>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="panel-card" style={{ padding: 0 }}>
            <div className="panel-table-wrap">
              <table className="panel-table" role="table">
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Personas</th>
                    <th scope="col">WhatsApp</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Mensaje</th>
                  </tr>
                </thead>
                <tbody>
                  {responses.map((r) => (
                    <>
                      <tr
                        key={r.id}
                        style={{ cursor: r.message ? "pointer" : "default" }}
                        onClick={() => r.message && setExpanded(expanded === r.id ? null : r.id)}
                        role={r.message ? "button" : undefined}
                        aria-expanded={r.message ? expanded === r.id : undefined}
                      >
                        <td style={{ fontWeight: 600 }}>{r.respondent_name}</td>
                        <td>
                          <span className={`badge badge--${r.status}`}>
                            {statusLabel(r.status)}
                          </span>
                        </td>
                        <td>{r.attendee_count}</td>
                        <td style={{ fontFamily: "monospace", fontSize: 12 }}>
                          {formatPhone(r.phone)}
                        </td>
                        <td style={{ color: "#6b7280", fontSize: 12, whiteSpace: "nowrap" }}>
                          {formatDateTime(r.submitted_at)}
                        </td>
                        <td style={{ maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "#6b7280", fontSize: 12 }}>
                          {r.message ? `"${r.message}"` : "—"}
                        </td>
                      </tr>
                      {expanded === r.id && r.message && (
                        <tr key={`${r.id}-detail`}>
                          <td colSpan={6} style={{ background: "#f9f8f6", padding: "12px 16px" }}>
                            <div style={{ fontStyle: "italic", color: "#374151" }}>"{r.message}"</div>
                            {r.attendee_names && (
                              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 6 }}>
                                Asistentes: {r.attendee_names}
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="panel-pagination">
              <span className="panel-pagination__info">
                Página {page} de {totalPages}
              </span>
              <button
                className="btn btn--secondary"
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                aria-label="Página anterior"
              >
                ← Anterior
              </button>
              <button
                className="btn btn--secondary"
                disabled={page >= totalPages}
                onClick={() => onPageChange(page + 1)}
                aria-label="Página siguiente"
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
