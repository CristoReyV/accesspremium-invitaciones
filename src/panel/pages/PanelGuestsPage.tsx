// ============================================================
// ACCESSPREMIUM — Gestión de Invitados (modo controlled)
// ============================================================

import { useState, type FormEvent } from "react";
import { formatRelative, statusLabel } from "../utils/formatters";
import type { Guest, GuestFormData } from "../types";

// ---- Guest Form Modal ----
interface GuestFormProps {
  initial?: Partial<Guest>;
  onSave: (data: GuestFormData) => Promise<void>;
  onClose: () => void;
  saving: boolean;
}

function GuestFormModal({ initial, onSave, onClose, saving }: GuestFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [phone, setPhone] = useState(initial?.phone ?? "");
  const [passes, setPasses] = useState(initial?.allowed_passes ?? 1);
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) { setError("El nombre es requerido."); return; }
    if (passes < 1) { setError("Debe tener al menos 1 pase."); return; }
    await onSave({ name: name.trim(), phone: phone.trim() || undefined, allowed_passes: passes, notes: notes.trim() || undefined });
  };

  return (
    <div className="panel-modal-overlay" role="dialog" aria-modal="true" aria-label={initial?.id ? "Editar invitado" : "Agregar invitado"}>
      <div className="panel-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="panel-modal__title">{initial?.id ? "Editar invitado" : "Agregar invitado"}</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="panel-form__field">
            <label className="panel-form__label" htmlFor="guest-name">Nombre completo *</label>
            <input id="guest-name" className="panel-form__input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Familia García" required />
          </div>
          <div className="panel-form__field">
            <label className="panel-form__label" htmlFor="guest-phone">WhatsApp</label>
            <input id="guest-phone" className="panel-form__input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="5512345678" type="tel" />
          </div>
          <div className="panel-form__field">
            <label className="panel-form__label" htmlFor="guest-passes">Pases permitidos *</label>
            <input
              id="guest-passes"
              className="panel-form__input"
              type="number"
              min={1}
              max={20}
              value={passes}
              onChange={(e) => setPasses(Number(e.target.value))}
              required
            />
          </div>
          <div className="panel-form__field">
            <label className="panel-form__label" htmlFor="guest-notes">Notas</label>
            <input id="guest-notes" className="panel-form__input" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Opcional..." />
          </div>

          {error && <div className="panel-form__error">{error}</div>}

          <div className="panel-form__actions">
            <button type="button" className="btn btn--ghost" onClick={onClose} disabled={saving}>Cancelar</button>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? <><span className="spinner" style={{ width: 14, height: 14 }} /> Guardando...</> : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---- Main Page ----
interface Props {
  guests: Guest[];
  total: number;
  loading: boolean;
  page: number;
  limit: number;
  onPageChange: (page: number) => void;
  onFilterChange: (status: string, search: string) => void;
  onSaveGuest: (data: GuestFormData, guestId?: string) => Promise<{ ok: boolean; error?: string }>;
  savingGuest: boolean;
}

export default function PanelGuestsPage({
  guests,
  total,
  loading,
  page,
  limit,
  onPageChange,
  onFilterChange,
  onSaveGuest,
  savingGuest,
}: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editGuest, setEditGuest] = useState<Guest | undefined>();
  const [saveError, setSaveError] = useState<string | null>(null);
  const totalPages = Math.ceil(total / limit);

  const handleSave = async (data: GuestFormData) => {
    setSaveError(null);
    const result = await onSaveGuest(data, editGuest?.id);
    if (result.ok) {
      setShowForm(false);
      setEditGuest(undefined);
    } else {
      setSaveError(result.error ?? "Error al guardar.");
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e", letterSpacing: "-0.01em" }}>
          Invitados · {total} total
        </h2>
        <button className="btn btn--primary" onClick={() => { setEditGuest(undefined); setShowForm(true); }}>
          + Agregar invitado
        </button>
      </div>

      <div className="panel-filter">
        <input
          className="panel-filter__input"
          type="search"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); onFilterChange(statusFilter, e.target.value); }}
          aria-label="Buscar invitados"
        />
        <select
          className="panel-filter__select"
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); onFilterChange(e.target.value, search); }}
          aria-label="Filtrar por estado"
        >
          <option value="">Todos</option>
          <option value="confirmed">Confirmados</option>
          <option value="pending">Pendientes</option>
          <option value="declined">No asistirán</option>
        </select>
      </div>

      {loading ? (
        <div className="panel-loading"><span className="spinner" /> Cargando invitados...</div>
      ) : guests.length === 0 ? (
        <div className="panel-empty">
          <div className="panel-empty__icon">◉</div>
          <div className="panel-empty__title">Sin invitados</div>
          <div className="panel-empty__text">Agrega tus invitados para comenzar a gestionar los pases.</div>
        </div>
      ) : (
        <>
          <div className="panel-card" style={{ padding: 0 }}>
            <div className="panel-table-wrap">
              <table className="panel-table">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Estado</th>
                    <th>Pases</th>
                    <th>Confirmados</th>
                    <th>WhatsApp</th>
                    <th>Notas</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.map((g) => (
                    <tr key={g.id}>
                      <td style={{ fontWeight: 600 }}>{g.name}</td>
                      <td>
                        <span className={`badge badge--${g.status}`}>{statusLabel(g.status)}</span>
                      </td>
                      <td>{g.allowed_passes}</td>
                      <td>{g.confirmed_passes}</td>
                      <td style={{ fontFamily: "monospace", fontSize: 12 }}>{g.phone ?? "—"}</td>
                      <td style={{ color: "#9ca3af", fontSize: 12, maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {g.notes ?? "—"}
                      </td>
                      <td>
                        <button
                          className="btn btn--ghost"
                          style={{ padding: "6px 10px", fontSize: 12 }}
                          onClick={() => { setEditGuest(g); setShowForm(true); }}
                          aria-label={`Editar ${g.name}`}
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {totalPages > 1 && (
            <div className="panel-pagination">
              <span className="panel-pagination__info">Página {page} de {totalPages}</span>
              <button className="btn btn--secondary" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>← Anterior</button>
              <button className="btn btn--secondary" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>Siguiente →</button>
            </div>
          )}
        </>
      )}

      {showForm && (
        <GuestFormModal
          initial={editGuest}
          onSave={handleSave}
          onClose={() => { setShowForm(false); setEditGuest(undefined); setSaveError(null); }}
          saving={savingGuest}
        />
      )}
    </div>
  );
}
