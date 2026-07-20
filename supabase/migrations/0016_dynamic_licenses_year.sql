-- Agrega el año al que pertenece cada propiedad, para poder empezar a cargar el
-- catálogo 2027 sin mezclarlo con 2026. Todas las filas existentes son 2026.
ALTER TABLE public.dynamic_licenses
  ADD COLUMN year INTEGER NOT NULL DEFAULT 2026;
