-- Migra el catálogo "Todo el Año" (src/data/all-year.ts) hacia dynamic_licenses como estado
-- base por defecto de todo el inventario, tal como se usa hoy en el catálogo público bajo
-- la vista "Todo el Año". No pisa las propiedades que ya tienen un registro (p.ej. las 88
-- migradas en 0010 con su trimestre curado, o cualquier edición ya hecha desde el admin).
-- Idempotente: se puede correr más de una vez sin duplicar filas.

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Back to the Future', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['ninos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Back to the Future'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Casper', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Casper'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Chilly Willy', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Chilly Willy'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Chucky', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Chucky'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Despicable Me', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Despicable Me'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Dream Works Baby', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Dream Works Baby'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'E.T.', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('E.T.'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Fast and the Furious', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Fast and the Furious'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Felix the Cat', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Felix the Cat'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Gabby´S Dollhouse', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Gabby´S Dollhouse'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'How to Train Your Dragon', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('How to Train Your Dragon'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Jaws', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Jaws'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Jurassic World', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Jurassic World'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Jurassic Park', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Jurassic Park'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Kung Fu Panda', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Kung Fu Panda'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Little Lulu', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Little Lulu'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Sherk', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Sherk'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Trolls', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Trolls'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Universal Monsters', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Universal Monsters'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Where´S Waldo', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Where´S Waldo'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Woody Woodpecker and Friends', 'UNIVERSAL STUDIOS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Woody Woodpecker and Friends'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Ben 10', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Ben 10'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Powerpuff Girls', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Powerpuff Girls'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Rick and Morty', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Rick and Morty'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Steven Universe', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Steven Universe'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'We Baby Bears', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('We Baby Bears'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'We Bare Bears', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('We Bare Bears'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'the Flintstones', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('the Flintstones'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Jetsons', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Jetsons'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Scooby Doo', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Scooby Doo'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Tom & Jerry', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Tom & Jerry'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Wacky Races', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Wacky Races'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Looney Tunes', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Looney Tunes'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Animaniacs', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Animaniacs'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Thundercats', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Thundercats'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Aquaman Core', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Aquaman Core'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Aquaman and the Lost Kingdom', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Aquaman and the Lost Kingdom'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Batman Core', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Batman Core'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'the Batman (2022)', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('the Batman (2022)'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Batman: Arkham Asylum: Video Game', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Batman: Arkham Asylum: Video Game'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Batman Arkham City: Video Game', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Batman Arkham City: Video Game'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Batman: Arkham Night: Video Game', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Batman: Arkham Night: Video Game'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Batman: Arkham Origins : Video Game', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Batman: Arkham Origins : Video Game'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Cyborg Core', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Cyborg Core'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Dc Super Friends', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Dc Super Friends'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Dc Super Hero Girls', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Dc Super Hero Girls'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Dc Women Core', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Dc Women Core'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'the Flash Core', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('the Flash Core'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Green Lintern Core', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Green Lintern Core'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Justice League Core', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Justice League Core'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'the Justice League (2017)', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('the Justice League (2017)'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Supergirl Core', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Supergirl Core'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Superman Core', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Superman Core'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Wonder Woamn Core', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Wonder Woamn Core'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Black Adam', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Black Adam'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Dc League of Super-Pets', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Dc League of Super-Pets'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Batwheels', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Batwheels'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Young Justice', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Young Justice'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Gotham Knights', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Gotham Knights'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Infinite Crisis: Video Game', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Infinite Crisis: Video Game'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Injustice 2: Every Battle Defines You: Video Game', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Injustice 2: Every Battle Defines You: Video Game'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Injustice: Good Among Us: Video Game', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Injustice: Good Among Us: Video Game'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'the Exorcist', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('the Exorcist'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'the 13th Friday', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('the 13th Friday'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'It', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('It'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'the Lost Boys', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('the Lost Boys'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Freddy Vs Jason', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Freddy Vs Jason'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Nightmare On Elm Street', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Nightmare On Elm Street'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Annabelle', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Annabelle'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'the Conjuring', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('the Conjuring'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'the Nun', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('the Nun'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Aqua Teen Hunger Force', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Aqua Teen Hunger Force'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Cartoon Network Logo/Name', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Cartoon Network Logo/Name'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Chowder: Animated Series', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Chowder: Animated Series'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Courage the Cowardly Dog: Animate Series', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Courage the Cowardly Dog: Animate Series'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Cow and Chicken', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Cow and Chicken'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Dexter´S Laboratory', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Dexter´S Laboratory'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Ed, Edd, N Eddy', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Ed, Edd, N Eddy'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Foster´S Home For Imaginary Friends', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Foster´S Home For Imaginary Friends'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Grim Adventures of Billy & Mandy', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Grim Adventures of Billy & Mandy'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Robot Chicken', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Robot Chicken'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Samurai Jack', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Samurai Jack'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Space Ghost Coast to Coast', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Space Ghost Coast to Coast'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Captain Planet and the Planeteers', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Captain Planet and the Planeteers'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Yogi Bear', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Yogi Bear'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Pinky and the Brain', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Pinky and the Brain'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'the Big Bang Theory', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('the Big Bang Theory'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Friends', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Friends'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Game of Thrones', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Game of Thrones'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'House of the Dragon', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('House of the Dragon'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Mortal Kombat', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Mortal Kombat'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Beetlejuice', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Beetlejuice'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Gremlins', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Gremlins'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Harry Potter', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['hogar']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Harry Potter'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Hogwarts Legacy: Video Game', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Hogwarts Legacy: Video Game'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Gokko X Dc', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Gokko X Dc'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Gokko X Wizzard of Oz', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Gokko X Wizzard of Oz'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Supergirl', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Supergirl'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Gokko X Harry Potter', 'WARNER BROS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Gokko X Harry Potter'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Hello Kitty', 'SANRIO', 'ann', NULL, true, NULL, ARRAY['bebes','hogar']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Hello Kitty'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Hello Kitty and Friends', 'SANRIO', 'ann', NULL, true, NULL, ARRAY['bebes','hogar']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Hello Kitty and Friends'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'My Melody', 'SANRIO', 'ann', NULL, true, NULL, ARRAY['bebes','hogar']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('My Melody'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Keroppi', 'SANRIO', 'ann', NULL, true, NULL, ARRAY['bebes','hogar']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Keroppi'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Chococat', 'SANRIO', 'ann', NULL, true, NULL, ARRAY['bebes','hogar']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Chococat'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Badtz Maru', 'SANRIO', 'ann', NULL, true, NULL, ARRAY['bebes','hogar']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Badtz Maru'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Little Twin Stars', 'SANRIO', 'ann', NULL, true, NULL, ARRAY['bebes','hogar']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Little Twin Stars'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Kuromi', 'SANRIO', 'ann', NULL, true, NULL, ARRAY['bebes','hogar']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Kuromi'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Pochacco', 'SANRIO', 'ann', NULL, true, NULL, ARRAY['bebes','hogar']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Pochacco'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'My Melody & Kuromi', 'SANRIO', 'ann', NULL, true, NULL, ARRAY['bebes','hogar']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('My Melody & Kuromi'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Cinnamoroll', 'SANRIO', 'ann', NULL, true, NULL, ARRAY['bebes','hogar']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Cinnamoroll'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Pompompurin', 'SANRIO', 'ann', NULL, true, NULL, ARRAY['bebes','hogar']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Pompompurin'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Smileyworld', 'SMILEY WORLD', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Smileyworld'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'S.W. Smiley', 'SMILEY WORLD', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('S.W. Smiley'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Dragon Ball Z', 'TOEI ANIMATIONS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Dragon Ball Z'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Dragon Ball', 'TOEI ANIMATIONS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Dragon Ball'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Dragon Ball Super', 'TOEI ANIMATIONS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Dragon Ball Super'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Digimon', 'TOEI ANIMATIONS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Digimon'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Dragon Ball Daima', 'TOEI ANIMATIONS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Dragon Ball Daima'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'South Park', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('South Park'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Ren and Stimpy', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Ren and Stimpy'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Emily In Paris', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Emily In Paris'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Aaahh!!! Real Monsters', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Aaahh!!! Real Monsters'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Angry Beavers', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Angry Beavers'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Catdog', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Catdog'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Dora', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Dora'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Garfield', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Garfield'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Hey Arnold', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Hey Arnold'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Jimmy Neutron', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Jimmy Neutron'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Avatar Legend of Korra', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Avatar Legend of Korra'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Avatar the Last Airbender', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Avatar the Last Airbender'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Rocket Power', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Rocket Power'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Rocko´S Modern Life', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Rocko´S Modern Life'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Rugrats', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Rugrats'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Teenage Mutant Ninja Turtles', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Teenage Mutant Ninja Turtles'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Wild Thornberrys', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Wild Thornberrys'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Avatar', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Avatar'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'the Godfather', 'NICKELODEON', 'ann', NULL, true, NULL, ARRAY['adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('the Godfather'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Snoopy', 'PEANUTS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Snoopy'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Harvard-Peanuts', 'HARVARD-PEANUTS', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Harvard-Peanuts'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Bluey', 'BCC', 'ann', NULL, true, NULL, ARRAY['bebes','ninos']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Bluey'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Harvard', 'HARVARD', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Harvard'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Harvard University', 'HARVARD', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Harvard University'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Pusheen', 'PUSHEEN CORP', 'ann', NULL, true, NULL, ARRAY['adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Pusheen'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Miffy', 'AMV', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Miffy'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Popeye Y Oliva', 'KING FEATURES', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Popeye Y Oliva'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Flash Gordon', 'KING FEATURES', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Flash Gordon'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'the Panthom', 'KING FEATURES', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('the Panthom'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Mafalda', 'SPECTRUM', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Mafalda'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'El Chavo', 'CHESPIRITO', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('El Chavo'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'El Chavo Animado', 'CHESPIRITO', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('El Chavo Animado'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'El Chapulin Colorado', 'CHESPIRITO', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('El Chapulin Colorado'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'El Chapulin Animado', 'CHESPIRITO', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('El Chapulin Animado'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Classic Sonic', 'SEGA', 'ann', NULL, true, NULL, ARRAY['mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Classic Sonic'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Modern Sonic', 'SEGA', 'ann', NULL, true, NULL, ARRAY['mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Modern Sonic'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Barbie', 'MATTEL', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Barbie'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Hot Wheels', 'MATTEL', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Hot Wheels'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Hot Wheels Monster Trucks', 'MATTEL', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Hot Wheels Monster Trucks'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'He-Man and the Masters of the Universe', 'MATTEL', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar','mascotas']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('He-Man and the Masters of the Universe'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Superwings', 'ALPHAGROUP', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos','hogar']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Superwings'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Ed Sheeran', 'WARNER MUSIC', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Ed Sheeran'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Green Day', 'WARNER MUSIC', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Green Day'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Frank Sinatra', 'WARNER MUSIC', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Frank Sinatra'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Gorillaz', 'WARNER MUSIC', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Gorillaz'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Rage Against the Machine', 'WARNER MUSIC', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Rage Against the Machine'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Twenty One Pilots', 'WARNER MUSIC', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Twenty One Pilots'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Gratefull Dead', 'WARNER MUSIC', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Gratefull Dead'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Deep Purple', 'WARNER MUSIC', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Deep Purple'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Zz Top', 'WARNER MUSIC', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Zz Top'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Teddy Swims', 'WARNER MUSIC', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Teddy Swims'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Muse', 'WARNER MUSIC', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Muse'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Fleetwood Mac', 'WARNER MUSIC', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Fleetwood Mac'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Creedence Clearwater Revival', 'WARNER MUSIC', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Creedence Clearwater Revival'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'Goo Goo Dolls', 'WARNER MUSIC', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('Goo Goo Dolls'));

INSERT INTO public.dynamic_licenses (name, licensor, type, quarter, is_all_year, month_id, segs, special_events, is_published, is_hidden)
SELECT 'My Chemical Romance', 'WARNER MUSIC', 'ann', NULL, true, NULL, ARRAY['bebes','ninos','adultos']::text[], NULL, true, false
WHERE NOT EXISTS (SELECT 1 FROM public.dynamic_licenses WHERE lower(name) = lower('My Chemical Romance'));

-- 174 propiedades de "Todo el Año" preparadas para insertarse como base
-- (se omiten automáticamente las que ya tengan un registro en dynamic_licenses).
