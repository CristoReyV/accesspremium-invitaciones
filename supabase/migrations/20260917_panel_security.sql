-- ============================================================
-- Migration: Panel Security
-- Adds login rate limiting support, safe incomplete-response handling,
-- and future controlled RSVP tokens. Existing production rows are preserved.
-- ============================================================

-- Login attempt audit / rate limiting table.
-- Kept in public schema for Supabase REST access from service_role,
-- but fully blocked from anon/authenticated by grants + RLS.
CREATE TABLE IF NOT EXISTS public.private_panel_login_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ip_hash TEXT NOT NULL,
    success BOOLEAN NOT NULL DEFAULT false,
    attempted_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_private_panel_login_attempts_failed
    ON public.private_panel_login_attempts (ip_hash, attempted_at DESC)
    WHERE success = false;

ALTER TABLE public.private_panel_login_attempts ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.private_panel_login_attempts FROM anon, authenticated;
GRANT ALL ON TABLE public.private_panel_login_attempts TO service_role;

COMMENT ON TABLE public.private_panel_login_attempts IS
    'Panel login rate-limit audit. Stores only a keyed hash of the request IP, never the raw IP.';

-- Allow an imported response to remain pending when Google Forms contains
-- a value we cannot safely map. This preserves raw_data without counting it
-- as confirmed/declined. Confirmed responses must contain at least 1 attendee.
ALTER TABLE public.responses
    DROP CONSTRAINT IF EXISTS responses_status_not_pending;
ALTER TABLE public.responses
    DROP CONSTRAINT IF EXISTS responses_confirmed_positive_attendees;
ALTER TABLE public.responses
    ADD CONSTRAINT responses_confirmed_positive_attendees
    CHECK (status <> 'confirmed' OR attendee_count >= 1);

-- Future controlled RSVP support.
ALTER TABLE public.guests
    ADD COLUMN IF NOT EXISTS guest_access_token_hash TEXT,
    ADD COLUMN IF NOT EXISTS guest_access_hint TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS guests_event_guest_access_token_unique
    ON public.guests (event_id, guest_access_token_hash)
    WHERE guest_access_token_hash IS NOT NULL;

COMMENT ON COLUMN public.guests.guest_access_token_hash IS
    'SHA-256 hash of a future per-guest RSVP token. Plaintext tokens are never stored.';
COMMENT ON COLUMN public.guests.guest_access_hint IS
    'Optional non-secret token hint for support/identification.';
