-- ============================================================
-- Timeline Interactivo Cornejotex
-- Migración 0001: tabla principal con índices y políticas RLS
-- ============================================================

-- Tabla principal de eventos
CREATE TABLE public.timeline_events (
  id            UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
  title         TEXT          NOT NULL,
  description   TEXT,
  event_date    DATE          NOT NULL,
  order_index   INTEGER       NOT NULL DEFAULT 0,
  is_published  BOOLEAN       NOT NULL DEFAULT FALSE,
  category      TEXT,
  image_url     TEXT,
  color         TEXT          DEFAULT '#429AB2',
  created_at    TIMESTAMPTZ   DEFAULT NOW(),
  updated_at    TIMESTAMPTZ   DEFAULT NOW(),
  created_by    UUID          REFERENCES auth.users(id) ON DELETE SET NULL
);

-- Índice compuesto para ordenamiento eficiente (app pública y admin)
CREATE INDEX idx_timeline_date_order
  ON public.timeline_events (event_date ASC, order_index ASC);

-- Índice parcial solo para eventos publicados (consulta más frecuente)
CREATE INDEX idx_timeline_published
  ON public.timeline_events (event_date ASC, order_index ASC)
  WHERE is_published = TRUE;

-- Trigger: auto-actualizar updated_at en cada UPDATE
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.timeline_events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================
-- RLS — Seguridad a nivel de fila
-- ============================================================

ALTER TABLE public.timeline_events ENABLE ROW LEVEL SECURITY;

-- Anónimos: solo lectura de eventos publicados
CREATE POLICY "public_read_published_events"
  ON public.timeline_events
  FOR SELECT
  TO anon
  USING (is_published = TRUE);

-- Autenticados (admin): acceso CRUD completo
CREATE POLICY "admin_full_access"
  ON public.timeline_events
  FOR ALL
  TO authenticated
  USING (TRUE)
  WITH CHECK (TRUE);

-- ============================================================
-- Realtime: habilitar cambios en esta tabla
-- Ejecutar en Supabase Dashboard → Database → Replication
-- o descomentar si usas Supabase CLI con configuración extendida:
-- ============================================================
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.timeline_events;
