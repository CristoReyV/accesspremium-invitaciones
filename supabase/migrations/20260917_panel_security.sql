-- ============================================================
-- Migration: Panel Security — Login Rate Limiting
-- Creates private schema + panel_login_attempts table
-- Adds guest_access_token_hash and guest_access_hint to guests
-- ============================================================

-- Create private schema if not exists
CREATE SCHEMA IF NOT EXISTS private;

-- Rate limiting table for login attempts
-- Stores only IP hash, never the raw IP
CREATE TABLE IF NOT EXISTS private_panel_login_attempts (
    id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ip_hash     TEXT NOT NULL,
    success     BOOLEAN NOT NULL DEFAULT false,
    attempted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast rate-limit lookups
CREATE INDEX IF NOT EXISTS idx_pla_ip_hash_attempted
    ON private_panel_login_attempts (ip_hash, attempted_at)
    WHERE success = false;

-- Auto-cleanup: delete records older than 24 hours (via cron or pg_cron)
-- Alternatively done in-query for simplicity in edge functions.

-- ---- Guest token preparation (controlled mode / future native RSVP) ----

-- Add guest token columns if not already present
ALTER TABLE guests
    ADD COLUMN IF NOT EXISTS guest_access_token_hash TEXT,
    ADD COLUMN IF NOT EXISTS guest_access_hint TEXT;

-- Add column for tracking source of confirmation
ALTER TABLE guests
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- Add credentials_configured field to sheet_integrations if not present
ALTER TABLE sheet_integrations
    ADD COLUMN IF NOT EXISTS credentials_configured BOOLEAN DEFAULT false;

-- ---- Comments ----
COMMENT ON TABLE private_panel_login_attempts IS
    'Rate limiting table for panel login. Stores hashed IPs only.';

COMMENT ON COLUMN guests.guest_access_token_hash IS
    'SHA-256 hash of the guest individual token for native RSVP. Never store plaintext.';

COMMENT ON COLUMN guests.guest_access_hint IS
    'Short non-secret hint shown to identify the token (e.g., last 4 chars). Optional.';

-- ============================================================
-- RLS: private_panel_login_attempts
-- Only service_role can access this table.
-- anon and authenticated have no access.
-- ============================================================

ALTER TABLE private_panel_login_attempts ENABLE ROW LEVEL SECURITY;

-- Service role bypasses RLS by default. Explicitly deny anon/authenticated:
CREATE POLICY "deny_anon_login_attempts"
    ON private_panel_login_attempts
    FOR ALL
    TO anon
    USING (false);

CREATE POLICY "deny_auth_login_attempts"
    ON private_panel_login_attempts
    FOR ALL
    TO authenticated
    USING (false);
