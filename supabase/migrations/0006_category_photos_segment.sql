-- Añade campo de departamento a las fotos de books
ALTER TABLE category_photos
  ADD COLUMN IF NOT EXISTS segment TEXT NOT NULL DEFAULT 'adultos';
