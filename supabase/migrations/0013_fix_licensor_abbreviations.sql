-- Corrige licenciantes abreviados en filas ya migradas a dynamic_licenses (WB, Cartoon Net.,
-- Toei, Smiley), usando los nombres completos ya establecidos en el resto del catálogo
-- (WARNER BROS, TOEI ANIMATIONS, SMILEY WORLD en all-year.ts). Cartoon Network ya vive
-- agrupada bajo Warner Bros en "Todo el Año", por eso se unifica ahí también.
-- "DC/WB" se deja tal cual: es una etiqueta de licenciante intencional, no una abreviatura
-- a corregir. 31 propiedades afectadas.

UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Animaniacs' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Annabelle' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Beetlejuice' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Bi Bil n Billy' AND licensor = 'Cartoon Net.';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Big Bang Theory' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Big Mama' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Chowder' AND licensor = 'Cartoon Net.';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Conjuring' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Courage' AND licensor = 'Cartoon Net.';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Cow & Chicken' AND licensor = 'Cartoon Net.';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Dexter''s Laboratory' AND licensor = 'Cartoon Net.';
UPDATE public.dynamic_licenses SET licensor = 'Toei Animations' WHERE name = 'Dragon Ball' AND licensor = 'Toei';
UPDATE public.dynamic_licenses SET licensor = 'Toei Animations' WHERE name = 'Dragon Ball Super' AND licensor = 'Toei';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Flintstones' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Foster''s Home' AND licensor = 'Cartoon Net.';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Freddy vs Jason' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Friends' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Game of Thrones' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Gremlins' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'House of the Dragon' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'IT' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Jetsons' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'League of Superpets' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Mortal Kombat' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Pinky the Brain' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Powerpuff Girls' AND licensor = 'Cartoon Net.';
UPDATE public.dynamic_licenses SET licensor = 'Smiley World' WHERE name = 'Smiley World' AND licensor = 'Smiley';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'The Nun' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'ThunderCats' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Where''s Waldo?' AND licensor = 'WB';
UPDATE public.dynamic_licenses SET licensor = 'Warner Bros' WHERE name = 'Yogi Bear' AND licensor = 'WB';
