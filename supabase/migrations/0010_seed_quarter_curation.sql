-- Migra la curación de trimestres que hoy vive hardcodeada en src/data/quarters.ts hacia
-- dynamic_licenses, para que el catálogo público pueda dejar de leer esa fuente estática
-- y pasar a depender exclusivamente de lo que se edite en la pestaña "Detalle Propiedades".
-- El texto de "Eventos Especiales" se autocompleta con los tags de temporada del mes de origen
-- (ej. "Halloween 🎃"). Idempotente: se puede correr más de una vez sin duplicar filas.

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Yogi Bear', 'WB', 'ann', 'Q1', false, 'ENE', ARRAY['adultos','ninos','mascotas']::text[], 'Summer Vibes 🌞', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Yogi Bear'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Flash Gordon', 'King Features', 'ann', 'Q1', false, 'ENE', ARRAY['adultos','hogar','mascotas']::text[], 'Summer Vibes 🌞', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Flash Gordon'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Gabby''s Dollhouse', 'Nickelodeon', 'ann', 'Q1', false, 'ENE', ARRAY['ninos','bebes']::text[], 'Summer Vibes 🌞', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Gabby''s Dollhouse'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Bi Bil n Billy', 'Cartoon Net.', 'ann', 'Q1', false, 'ENE', ARRAY['adultos','ninos']::text[], 'Summer Vibes 🌞', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Bi Bil n Billy'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'ThunderCats', 'WB', 'ann', 'Q1', false, 'ENE', ARRAY['adultos','ninos','mascotas']::text[], 'Summer Vibes 🌞', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('ThunderCats'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Chespirito', 'Chespirito', 'new', 'Q1', false, 'ENE', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Summer Vibes 🌞', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Chespirito'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Sonic', 'SEGA', 'new', 'Q1', false, 'ENE', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Summer Vibes 🌞', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Sonic'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Courage', 'Cartoon Net.', 'ann', 'Q1', false, 'FEB', ARRAY['adultos','ninos','mascotas']::text[], 'Valentine''s Day 💝', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Courage'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Legend of Korra', 'Nickelodeon', 'ann', 'Q1', false, 'FEB', ARRAY['adultos','ninos']::text[], 'Valentine''s Day 💝', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Legend of Korra'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Smiley World', 'Smiley', 'ann', 'Q1', false, 'FEB', ARRAY['adultos','ninos','bebes','hogar']::text[], 'Valentine''s Day 💝', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Smiley World'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Phantom', 'King Features', 'ann', 'Q1', false, 'FEB', ARRAY['adultos','mascotas']::text[], 'Valentine''s Day 💝', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Phantom'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Dragon', 'DreamWorks', 'ann', 'Q1', false, 'MAR', ARRAY['adultos','ninos','hogar']::text[], 'Happy Women''s Day 👩', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Dragon'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Barbie', 'Mattel', 'new', 'Q1', false, 'MAR', ARRAY['adultos','ninos','bebes','hogar']::text[], 'Happy Women''s Day 👩', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Barbie'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Hot Wheels', 'Mattel', 'new', 'Q1', false, 'MAR', ARRAY['adultos','ninos','hogar']::text[], 'Happy Women''s Day 👩', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Hot Wheels'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Dragon Ball', 'Toei', 'ann', 'Q2', false, 'ABR', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Pascua 🐣, Spring 🌸', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Dragon Ball'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Game of Thrones', 'WB', 'ann', 'Q2', false, 'ABR', ARRAY['adultos','hogar','mascotas']::text[], 'Pascua 🐣, Spring 🌸', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Game of Thrones'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Angry Beavers', 'Nickelodeon', 'ann', 'Q2', false, 'ABR', ARRAY['adultos','ninos','mascotas']::text[], 'Pascua 🐣, Spring 🌸', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Angry Beavers'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'CatDog', 'Nickelodeon', 'ann', 'Q2', false, 'ABR', ARRAY['adultos','ninos','mascotas']::text[], 'Pascua 🐣, Spring 🌸', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('CatDog'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Dexter''s Laboratory', 'Cartoon Net.', 'ann', 'Q2', false, 'ABR', ARRAY['adultos','ninos']::text[], 'Pascua 🐣, Spring 🌸', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Dexter''s Laboratory'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Casper', 'Universal', 'ann', 'Q2', false, 'MAY', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Día de la Madre 🌷, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Casper'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Pusheen', 'Pusheen', 'ann', 'Q2', false, 'MAY', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Día de la Madre 🌷, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Pusheen'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'TMNT', 'Nickelodeon', 'ann', 'Q2', false, 'MAY', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Día de la Madre 🌷, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('TMNT'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Ed Sheeran', 'Warner Music Group', 'ev', 'Q2', false, 'MAY', ARRAY['adultos']::text[], 'Día de la Madre 🌷, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Ed Sheeran'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'E.T.', 'Universal', 'ann', 'Q2', false, 'JUN', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Día del Padre 👔, Día del Niño 🧒, FIFA 2026 ⚽, Spring 🌿', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('E.T.'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Fast & Furious', 'Universal', 'ann', 'Q2', false, 'JUN', ARRAY['adultos','hogar','mascotas']::text[], 'Día del Padre 👔, Día del Niño 🧒, FIFA 2026 ⚽, Spring 🌿', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Fast & Furious'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Jaws', 'Universal', 'ann', 'Q2', false, 'JUN', ARRAY['adultos','hogar','mascotas']::text[], 'Día del Padre 👔, Día del Niño 🧒, FIFA 2026 ⚽, Spring 🌿', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Jaws'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Jurassic World', 'Universal', 'ann', 'Q2', false, 'JUN', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Día del Padre 👔, Día del Niño 🧒, FIFA 2026 ⚽, Spring 🌿', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Jurassic World'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Jurassic Park', 'Universal', 'ann', 'Q2', false, 'JUN', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Día del Padre 👔, Día del Niño 🧒, FIFA 2026 ⚽, Spring 🌿', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Jurassic Park'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Garfield', 'Nickelodeon', 'ann', 'Q2', false, 'JUN', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Día del Padre 👔, Día del Niño 🧒, FIFA 2026 ⚽, Spring 🌿', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Garfield'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Wild Thornberrys', 'Nickelodeon', 'ann', 'Q2', false, 'JUN', ARRAY['adultos','ninos','mascotas']::text[], 'Día del Padre 👔, Día del Niño 🧒, FIFA 2026 ⚽, Spring 🌿', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Wild Thornberrys'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Kung Fu Panda', 'DreamWorks', 'ann', 'Q2', false, 'JUN', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Día del Padre 👔, Día del Niño 🧒, FIFA 2026 ⚽, Spring 🌿', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Kung Fu Panda'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Where''s Waldo?', 'WB', 'ann', 'Q2', false, 'JUN', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Día del Padre 👔, Día del Niño 🧒, FIFA 2026 ⚽, Spring 🌿', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Where''s Waldo?'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Miffy', 'Dick Bruna', 'ann', 'Q2', false, 'JUN', ARRAY['adultos','ninos','bebes','hogar']::text[], 'Día del Padre 👔, Día del Niño 🧒, FIFA 2026 ⚽, Spring 🌿', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Miffy'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Supergirl', 'DC/WB', 'ev', 'Q2', false, 'JUN', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Día del Padre 👔, Día del Niño 🧒, FIFA 2026 ⚽, Spring 🌿', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Supergirl'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Masters of the Universe', 'Mattel', 'ev', 'Q2', false, 'JUN', ARRAY['adultos','ninos']::text[], 'Día del Padre 👔, Día del Niño 🧒, FIFA 2026 ⚽, Spring 🌿', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Masters of the Universe'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Gremlins', 'WB', 'ann', 'Q2', false, 'JUN', ARRAY['adultos','hogar','mascotas']::text[], 'Día del Padre 👔, Día del Niño 🧒, FIFA 2026 ⚽, Spring 🌿', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Gremlins'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Cow & Chicken', 'Cartoon Net.', 'ann', 'Q3', false, 'JUL', ARRAY['adultos','ninos','mascotas']::text[], 'Summer ☀️, FIFA 2026 ⚽', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Cow & Chicken'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Dragon Ball Super', 'Toei', 'ann', 'Q3', false, 'JUL', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Summer ☀️, FIFA 2026 ⚽', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Dragon Ball Super'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'American Pie', 'Universal', 'ann', 'Q3', false, 'JUL', ARRAY['adultos']::text[], 'Summer ☀️, FIFA 2026 ⚽', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('American Pie'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'League of Superpets', 'WB', 'ann', 'Q3', false, 'JUL', ARRAY['adultos','ninos','mascotas']::text[], 'Summer ☀️, FIFA 2026 ⚽', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('League of Superpets'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Back to the Future', 'Universal', 'ann', 'Q3', false, 'JUL', ARRAY['adultos','hogar','mascotas']::text[], 'Summer ☀️, FIFA 2026 ⚽', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Back to the Future'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Teen Titans', 'DC/WB', 'ann', 'Q3', false, 'JUL', ARRAY['adultos','ninos','mascotas']::text[], 'Summer ☀️, FIFA 2026 ⚽', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Teen Titans'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Super Wings', 'Alpha Group', 'new', 'Q3', false, 'JUL', ARRAY['ninos','bebes']::text[], 'Summer ☀️, FIFA 2026 ⚽', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Super Wings'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Minions 3', 'Universal', 'ev', 'Q3', false, 'JUL', ARRAY['adultos','ninos','bebes','hogar']::text[], 'Summer ☀️, FIFA 2026 ⚽', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Minions 3'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Foster''s Home', 'Cartoon Net.', 'ann', 'Q3', false, 'AGO', ARRAY['adultos','ninos','mascotas']::text[], 'Summer ☀️, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Foster''s Home'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Ren & Stimpy', 'Nickelodeon', 'ann', 'Q3', false, 'AGO', ARRAY['adultos','ninos','mascotas']::text[], 'Summer ☀️, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Ren & Stimpy'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'MTV', 'Warner Music Group', 'ann', 'Q3', false, 'AGO', ARRAY['adultos']::text[], 'Summer ☀️, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('MTV'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Dora', 'Nickelodeon', 'ann', 'Q3', false, 'AGO', ARRAY['ninos','bebes','hogar','mascotas']::text[], 'Summer ☀️, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Dora'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Big Mama', 'WB', 'ann', 'Q3', false, 'AGO', ARRAY['adultos','ninos','mascotas']::text[], 'Summer ☀️, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Big Mama'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Saved by the Bell', 'Nickelodeon', 'ann', 'Q3', false, 'AGO', ARRAY['adultos']::text[], 'Summer ☀️, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Saved by the Bell'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'South Park', 'Viacom', 'ann', 'Q3', false, 'AGO', ARRAY['adultos','hogar','mascotas']::text[], 'Summer ☀️, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('South Park'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Rocket Power', 'Nickelodeon', 'ann', 'Q3', false, 'AGO', ARRAY['adultos','ninos','mascotas']::text[], 'Summer ☀️, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Rocket Power'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'House of the Dragon', 'WB', 'ann', 'Q3', false, 'AGO', ARRAY['adultos','hogar','mascotas']::text[], 'Summer ☀️, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('House of the Dragon'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Rugrats', 'Nickelodeon', 'ann', 'Q3', false, 'AGO', ARRAY['adultos','ninos','mascotas']::text[], 'Summer ☀️, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Rugrats'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Flintstones', 'WB', 'ann', 'Q3', false, 'SEP', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Autumn 🍂, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Flintstones'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Jetsons', 'WB', 'ann', 'Q3', false, 'SEP', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Autumn 🍂, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Jetsons'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Miami Vice', 'Universal', 'ann', 'Q3', false, 'SEP', ARRAY['adultos']::text[], 'Autumn 🍂, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Miami Vice'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Big Bang Theory', 'WB', 'ann', 'Q3', false, 'SEP', ARRAY['adultos','hogar','mascotas']::text[], 'Autumn 🍂, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Big Bang Theory'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Friends', 'WB', 'ann', 'Q3', false, 'SEP', ARRAY['adultos','bebes','hogar','mascotas']::text[], 'Autumn 🍂, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Friends'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Animaniacs', 'WB', 'ann', 'Q3', false, 'SEP', ARRAY['adultos','ninos','mascotas']::text[], 'Autumn 🍂, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Animaniacs'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Mafalda', 'Mafalda', 'ann', 'Q3', false, 'SEP', ARRAY['adultos','ninos']::text[], 'Autumn 🍂, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Mafalda'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Batwheels', 'DC/WB', 'ann', 'Q3', false, 'SEP', ARRAY['ninos','bebes','hogar','mascotas']::text[], 'Autumn 🍂, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Batwheels'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Pinky the Brain', 'WB', 'ann', 'Q3', false, 'SEP', ARRAY['adultos','ninos','mascotas']::text[], 'Autumn 🍂, Back to School 📚', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Pinky the Brain'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Bluey', 'BBC', 'ann', 'Q4', false, 'OCT', ARRAY['ninos','bebes','hogar','mascotas']::text[], 'Halloween 🎃, Autumn 🍂', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Bluey'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Pitufos', 'Pitufos', 'ann', 'Q4', false, 'OCT', ARRAY['adultos','ninos','bebes','hogar','mascotas']::text[], 'Halloween 🎃, Autumn 🍂', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Pitufos'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Real Monsters', 'Nickelodeon', 'ann', 'Q4', false, 'OCT', ARRAY['adultos','ninos','mascotas']::text[], 'Halloween 🎃, Autumn 🍂', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Real Monsters'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Mortal Kombat', 'WB', 'ann', 'Q4', false, 'OCT', ARRAY['adultos','hogar','mascotas']::text[], 'Halloween 🎃, Autumn 🍂', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Mortal Kombat'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Emily in Paris', 'Universal', 'ann', 'Q4', false, 'OCT', ARRAY['adultos','hogar','mascotas']::text[], 'Halloween 🎃, Autumn 🍂', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Emily in Paris'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Peanuts', 'Peanuts', 'ann', 'Q4', false, 'OCT', ARRAY['adultos','ninos','bebes','hogar']::text[], 'Halloween 🎃, Autumn 🍂', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Peanuts'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Conjuring', 'WB', 'opp', 'Q4', false, 'OCT', ARRAY['adultos','mascotas']::text[], 'Halloween 🎃, Autumn 🍂', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Conjuring'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Freddy vs Jason', 'WB', 'opp', 'Q4', false, 'OCT', ARRAY['adultos','mascotas']::text[], 'Halloween 🎃, Autumn 🍂', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Freddy vs Jason'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Annabelle', 'WB', 'opp', 'Q4', false, 'OCT', ARRAY['adultos','mascotas']::text[], 'Halloween 🎃, Autumn 🍂', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Annabelle'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Nightmare', 'Universal', 'opp', 'Q4', false, 'OCT', ARRAY['adultos','mascotas']::text[], 'Halloween 🎃, Autumn 🍂', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Nightmare'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'IT', 'WB', 'opp', 'Q4', false, 'OCT', ARRAY['adultos','mascotas']::text[], 'Halloween 🎃, Autumn 🍂', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('IT'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Monsters', 'Universal', 'opp', 'Q4', false, 'OCT', ARRAY['adultos','mascotas']::text[], 'Halloween 🎃, Autumn 🍂', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Monsters'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Exorcist', 'Universal', 'opp', 'Q4', false, 'OCT', ARRAY['adultos','mascotas']::text[], 'Halloween 🎃, Autumn 🍂', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Exorcist'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Beetlejuice', 'WB', 'opp', 'Q4', false, 'OCT', ARRAY['adultos','mascotas']::text[], 'Halloween 🎃, Autumn 🍂', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Beetlejuice'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Godfather', 'Universal', 'opp', 'Q4', false, 'OCT', ARRAY['adultos','mascotas']::text[], 'Halloween 🎃, Autumn 🍂', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Godfather'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'The Nun', 'WB', 'opp', 'Q4', false, 'OCT', ARRAY['adultos','mascotas']::text[], 'Halloween 🎃, Autumn 🍂', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('The Nun'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Avatar', 'Nickelodeon', 'ann', 'Q4', false, 'OCT', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Halloween 🎃, Autumn 🍂', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Avatar'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Chowder', 'Cartoon Net.', 'ann', 'Q4', false, 'NOV', ARRAY['adultos','ninos','mascotas']::text[], 'Winter ❄️', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Chowder'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Felix the Cat', 'King Features', 'ann', 'Q4', false, 'NOV', ARRAY['adultos','ninos','mascotas']::text[], 'Winter ❄️', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Felix the Cat'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Justice League', 'DC/WB', 'ann', 'Q4', false, 'NOV', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Winter ❄️', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Justice League'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Powerpuff Girls', 'Cartoon Net.', 'ann', 'Q4', false, 'NOV', ARRAY['adultos','ninos','bebes','mascotas']::text[], 'Winter ❄️', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Powerpuff Girls'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Woody Woodpecker', 'Universal', 'ann', 'Q4', false, 'NOV', ARRAY['adultos','ninos','hogar','mascotas']::text[], 'Winter ❄️', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Woody Woodpecker'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Trolls', 'DreamWorks', 'ann', 'Q4', false, 'NOV', ARRAY['adultos','ninos','bebes','hogar']::text[], 'Winter ❄️', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Trolls'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Young Justice', 'DC/WB', 'ann', 'Q4', false, 'NOV', ARRAY['adultos','ninos','mascotas']::text[], 'Winter ❄️', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Young Justice'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Jimmy Neutron', 'Nickelodeon', 'ann', 'Q4', false, 'DIC', ARRAY['adultos','ninos','mascotas']::text[], 'Navidad 🎄', true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Jimmy Neutron'));

-- 88 propiedades migradas (deduplicadas por nombre; en caso de duplicado gana
-- la primera aparición en orden Q1→Q4 y mes).
