ALTER TABLE public.dynamic_licenses
  ADD COLUMN is_hidden BOOLEAN NOT NULL DEFAULT FALSE;
