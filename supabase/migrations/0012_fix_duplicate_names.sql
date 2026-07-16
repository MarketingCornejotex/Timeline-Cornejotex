-- all-year.ts usaba "´" (acento) en vez de un apóstrofe normal en 3 nombres, lo que
-- hizo que la migración 0011 los tratara como propiedades distintas de sus versiones
-- ya curadas en 0010 (con apóstrofe correcto), generando filas duplicadas. Se corrigió
-- el nombre en all-year.ts y acá se borra la fila duplicada "Todo el año" mal escrita,
-- dejando la fila correctamente curada con su trimestre.
DELETE FROM public.dynamic_licenses WHERE name = 'Gabby´S Dollhouse';
DELETE FROM public.dynamic_licenses WHERE name = 'Where´S Waldo';
DELETE FROM public.dynamic_licenses WHERE name = 'Dexter´S Laboratory';
