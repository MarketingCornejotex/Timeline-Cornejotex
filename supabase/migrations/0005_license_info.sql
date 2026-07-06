-- Añade notas internas y opción de ocultar una licencia del catálogo público
ALTER TABLE license_logos
  ADD COLUMN IF NOT EXISTS notes TEXT,
  ADD COLUMN IF NOT EXISTS is_hidden BOOLEAN NOT NULL DEFAULT FALSE;
