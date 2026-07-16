-- Alinea 3 licenciantes más que quedaron inconsistentes entre quarters.ts y all-year.ts
-- (Universal/Universal Studios, Pusheen/Pusheen Corp, Warner Music/Warner Music Group),
-- para que sus propiedades se agrupen bajo el mismo estudio en "Todo el Año" en vez de
-- crear una sección duplicada. "ALPHAGROUP" ya no tiene filas (se resolvió al borrar el
-- duplicado Superwings en 0012), así que no requiere UPDATE acá.
-- También hace consistente is_all_year=true en todas las filas: asignar un trimestre ya
-- no saca a una propiedad de "Todo el año", así que el flag deja de ser excluyente.

UPDATE public.dynamic_licenses SET is_all_year = true WHERE is_all_year = false;

UPDATE public.dynamic_licenses SET licensor = 'Universal Studios' WHERE licensor = 'Universal';
UPDATE public.dynamic_licenses SET licensor = 'Pusheen Corp' WHERE licensor = 'Pusheen';
UPDATE public.dynamic_licenses SET licensor = 'Warner Music Group' WHERE licensor = 'WARNER MUSIC';
