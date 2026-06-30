-- ============================================================
-- Timeline Licencias Cornejotex 2026
-- Migración 0002: esquema específico del sistema de licencias
-- ============================================================

-- Logos por licencia
CREATE TABLE IF NOT EXISTS public.license_logos (
  id            UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  license_name  TEXT          NOT NULL UNIQUE,
  logo_url      TEXT          NOT NULL,
  created_at    TIMESTAMPTZ   DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION public.update_logo_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS set_logo_updated_at ON public.license_logos;
CREATE TRIGGER set_logo_updated_at
  BEFORE UPDATE ON public.license_logos
  FOR EACH ROW EXECUTE FUNCTION public.update_logo_updated_at();

-- Fotos / PDFs de books inspiracionales por licencia + categoría
CREATE TABLE IF NOT EXISTS public.category_photos (
  id            UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  license_name  TEXT          NOT NULL,
  category      TEXT          NOT NULL,
  file_url      TEXT          NOT NULL,
  file_type     TEXT          NOT NULL DEFAULT 'image',
  file_name     TEXT,
  order_index   INTEGER       NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ   DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_cat_photos_lic_cat
  ON public.category_photos (license_name, category, order_index ASC);

-- Estrenos / lanzamientos 2026
CREATE TABLE IF NOT EXISTS public.estrenos (
  id            UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT          NOT NULL,
  type          TEXT          NOT NULL DEFAULT 'Película',
  quarter       TEXT          NOT NULL CHECK (quarter IN ('Q1','Q2','Q3','Q4')),
  event_date    TEXT,
  studio        TEXT,
  description   TEXT,
  poster_url    TEXT,
  color_bg      TEXT          DEFAULT '#1A237E',
  color_fg      TEXT          DEFAULT '#fff',
  order_index   INTEGER       NOT NULL DEFAULT 0,
  is_published  BOOLEAN       NOT NULL DEFAULT TRUE,
  created_at    TIMESTAMPTZ   DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_estrenos_quarter_order
  ON public.estrenos (quarter, order_index ASC);

CREATE OR REPLACE FUNCTION public.update_estreno_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS set_estreno_updated_at ON public.estrenos;
CREATE TRIGGER set_estreno_updated_at
  BEFORE UPDATE ON public.estrenos
  FOR EACH ROW EXECUTE FUNCTION public.update_estreno_updated_at();

-- Overrides de nombres
CREATE TABLE IF NOT EXISTS public.name_overrides (
  id            UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  original_name TEXT          NOT NULL,
  override_type TEXT          NOT NULL CHECK (override_type IN ('license','studio')),
  display_name  TEXT          NOT NULL,
  created_at    TIMESTAMPTZ   DEFAULT NOW(),
  UNIQUE (original_name, override_type)
);

-- ============================================================
-- RLS
-- ============================================================
ALTER TABLE public.license_logos     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_photos   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estrenos          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.name_overrides    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_logos"      ON public.license_logos;
DROP POLICY IF EXISTS "public_read_cat_photos" ON public.category_photos;
DROP POLICY IF EXISTS "public_read_estrenos"   ON public.estrenos;
DROP POLICY IF EXISTS "public_read_overrides"  ON public.name_overrides;
DROP POLICY IF EXISTS "admin_logos"            ON public.license_logos;
DROP POLICY IF EXISTS "admin_cat_photos"       ON public.category_photos;
DROP POLICY IF EXISTS "admin_estrenos"         ON public.estrenos;
DROP POLICY IF EXISTS "admin_overrides"        ON public.name_overrides;

CREATE POLICY "public_read_logos"      ON public.license_logos    FOR SELECT TO anon USING (TRUE);
CREATE POLICY "public_read_cat_photos" ON public.category_photos  FOR SELECT TO anon USING (TRUE);
CREATE POLICY "public_read_estrenos"   ON public.estrenos         FOR SELECT TO anon USING (is_published = TRUE);
CREATE POLICY "public_read_overrides"  ON public.name_overrides   FOR SELECT TO anon USING (TRUE);

CREATE POLICY "admin_logos"      ON public.license_logos    FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "admin_cat_photos" ON public.category_photos  FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "admin_estrenos"   ON public.estrenos         FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY "admin_overrides"  ON public.name_overrides   FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);

-- ============================================================
-- Realtime
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.license_logos;
ALTER PUBLICATION supabase_realtime ADD TABLE public.estrenos;
ALTER PUBLICATION supabase_realtime ADD TABLE public.name_overrides;

-- ============================================================
-- Datos iniciales de estrenos
-- ============================================================
INSERT INTO public.estrenos (title, type, quarter, event_date, studio, description, color_bg, color_fg, order_index)
SELECT * FROM (VALUES
  ('Captain America: Brave New World', 'Película Marvel',  'Q1', 'En cartelera',  'Marvel / Disney',         'Sam Wilson como el nuevo Capitán América enfrenta amenazas globales.',                             '#B22222', '#FFD700', 0),
  ('Paddington en Perú',               'Película',          'Q1', 'En cartelera',  'StudioCanal / Netflix',   'El oso más querido del mundo viaja a Perú para visitar a su familia.',                          '#8B4513', '#FFD700', 1),
  ('Supergirl: Woman of Tomorrow',     'Película DC',       'Q2', 'Junio 2026',    'WB / DC Studios',         'La icónica heroína protagoniza su primera gran película en solitario del nuevo universo DC.',    '#C41E3A', '#FFD700', 0),
  ('Masters of the Universe',          'Película',          'Q2', 'Junio 2026',    'Mattel / Amazon MGM',     'He-Man regresa al cine en acción real. Gran oportunidad de licensing retro y nuevo.',           '#4B0082', '#FFD700', 1),
  ('Ed Sheeran – Tour Mundial',        'Concierto',         'Q2', 'Mayo 2026',     'Warner Music Group',      'El tour global de Ed Sheeran activa las categorías de ropa y accesorios de WMG.',              '#FF6B35', '#fff',    2),
  ('FIFA World Cup 2026',              'Evento Global',     'Q2', 'Jun–Jul 2026',  'FIFA',                    'Copa del Mundo en EEUU, Canadá y México. Temporada pico para todas las categorías deportivas.','#003DA5', '#fff',    3),
  ('Minions 3',                        'Película Animada',  'Q3', 'Julio 2026',    'Universal / Illumination','Los Minions regresan en una nueva aventura. Línea completa de niños y bebés disponible.',      '#FFD700', '#1A1A1A', 0),
  ('Super Wings – Nueva Temporada',    'Serie Animada',     'Q3', 'Q3 2026',       'Alpha Group',             'Nueva temporada con personajes actualizados y oportunidades de nueva propiedad.',               '#FF4500', '#fff',    1),
  ('Garfield – La Película 2',         'Película Animada',  'Q3', 'Agosto 2026',   'Sony Pictures',           'Garfield regresa con nuevas aventuras. Líneas de hogar, adultos y niños.',                     '#FF7700', '#fff',    2),
  ('Frozen 3',                         'Película Disney',   'Q4', 'Noviembre 2026','Disney',                  'Elsa y Anna regresan en la esperada tercera entrega. Peak de temporada navideña.',             '#4A90D9', '#fff',    0),
  ('Campaña Navidad 2026',             'Temporada Alta',    'Q4', 'Nov–Dic 2026',  'Multimarca',              'Temporada pico para todas las licencias. Planificación de colecciones navideñas.',             '#8B0000', '#FFD700', 1)
) AS v(title, type, quarter, event_date, studio, description, color_bg, color_fg, order_index)
WHERE NOT EXISTS (SELECT 1 FROM public.estrenos WHERE public.estrenos.title = v.title);
