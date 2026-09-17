-- Cover the sheet integration foreign key used by sync log lookups/deletes.
CREATE INDEX IF NOT EXISTS sync_logs_integration_id_idx
  ON public.sync_logs (integration_id)
  WHERE integration_id IS NOT NULL;
