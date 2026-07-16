-- "DC/WB" es una etiqueta de licenciante intencional (no una abreviatura a corregir).
-- Revierte por si ya se corrió una versión anterior de 0013 que la unificaba con
-- Warner Bros. Es seguro de correr aunque esa versión nunca se haya ejecutado
-- (las condiciones simplemente no matchean ninguna fila).
UPDATE public.dynamic_licenses SET licensor = 'DC/WB' WHERE name = 'Batwheels' AND licensor = 'Warner Bros';
UPDATE public.dynamic_licenses SET licensor = 'DC/WB' WHERE name = 'Justice League' AND licensor = 'Warner Bros';
UPDATE public.dynamic_licenses SET licensor = 'DC/WB' WHERE name = 'Supergirl' AND licensor = 'Warner Bros';
UPDATE public.dynamic_licenses SET licensor = 'DC/WB' WHERE name = 'Teen Titans' AND licensor = 'Warner Bros';
UPDATE public.dynamic_licenses SET licensor = 'DC/WB' WHERE name = 'Young Justice' AND licensor = 'Warner Bros';
