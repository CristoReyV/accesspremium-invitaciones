// ============================================================
// ACCESSPREMIUM — Panel de Control: Tipos TypeScript
// ============================================================

export type EventControlMode = "semi_open" | "controlled";
export type EventStatus = "active" | "inactive" | "archived";
export type GuestStatus = "pending" | "confirmed" | "declined";
export type ResponseSource = "google_forms" | "native_rsvp" | "manual";
export type SyncStatus = "pending" | "running" | "success" | "error";

// ---- Event ----
export interface PanelEvent {
  id: string;
  slug: string;
  name: string;
  event_date: string | null;
  control_mode: EventControlMode;
  status: EventStatus;
  url: string | null;
  created_at: string;
}

// ---- Guest ----
export interface Guest {
  id: string;
  event_id: string;
  name: string;
  phone: string | null;
  allowed_passes: number;
  confirmed_passes: number;
  status: GuestStatus;
  notes: string | null;
  guest_access_hint: string | null;
  created_at: string;
  updated_at: string;
}

export interface GuestFormData {
  name: string;
  phone?: string;
  allowed_passes: number;
  notes?: string;
}

// ---- Response ----
export interface EventResponse {
  id: string;
  event_id: string;
  guest_id: string | null;
  respondent_name: string;
  phone: string | null;
  status: GuestStatus;
  attendee_count: number;
  attendee_names: string | null;
  message: string | null;
  source: ResponseSource;
  submitted_at: string;
  external_response_id: string | null;
  raw_data: Record<string, unknown> | null;
  created_at: string;
}

// ---- Dashboard Summary ----
export interface DashboardSummary {
  total_responses: number;
  confirmed_people: number;
  declined_people: number;
  pending_people: number;
  last_response_at: string | null;
  last_sync_at: string | null;
  total_guests?: number;
  total_allowed_passes?: number;
  total_confirmed_passes?: number;
  total_pending_guests?: number;
}

// ---- Sheet Integration ----
export interface SheetIntegration {
  id: string;
  event_id: string;
  spreadsheet_id: string;
  sheet_name: string;
  field_mapping: Record<string, string>;
  last_sync_at: string | null;
  credentials_configured: boolean;
  created_at: string;
}

// ---- Sync ----
export interface SyncResult {
  imported_count: number;
  updated_count: number;
  skipped_count: number;
  error_count: number;
  status: SyncStatus;
  message: string;
  started_at: string;
  finished_at: string;
}

// ---- Panel Session ----
export interface PanelSession {
  token: string;
  event_id: string;
  event_slug: string;
  expires_at: string;
}

// ---- API Responses ----
export interface ApiSuccess<T> {
  ok: true;
  data: T;
}

export interface ApiError {
  ok: false;
  error: string;
  code?: string;
}

export type ApiResult<T> = ApiSuccess<T> | ApiError;

// ---- Auth ----
export interface LoginRequest {
  code: string;
}

export interface LoginResponse {
  token: string;
  event_id: string;
  event_slug: string;
  expires_at: string;
}

export interface ValidateSessionResponse {
  valid: boolean;
  event_id?: string;
  event_slug?: string;
  expires_at?: string;
}
