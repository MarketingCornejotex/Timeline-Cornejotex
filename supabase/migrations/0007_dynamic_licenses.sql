CREATE TABLE public.dynamic_licenses (
  id          UUID    DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT    NOT NULL,
  licensor    TEXT    NOT NULL,
  type        TEXT    NOT NULL DEFAULT 'new'
                CHECK (type IN ('ann','new','opp','ev')),
  quarter     TEXT    CHECK (quarter IN ('Q1','Q2','Q3','Q4')),
  is_all_year BOOLEAN NOT NULL DEFAULT FALSE,
  month_id    TEXT,
  segs        TEXT[]  NOT NULL DEFAULT '{adultos}',
  category    TEXT,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.dynamic_licenses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public read" ON public.dynamic_licenses
  FOR SELECT TO anon, authenticated
  USING (is_published = true);

CREATE POLICY "admin write" ON public.dynamic_licenses
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);
