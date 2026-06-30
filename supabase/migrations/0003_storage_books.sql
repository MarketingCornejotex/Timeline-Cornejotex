-- ============================================================
-- Migración 0003: bucket de Storage para books/aspiraciones
-- Ejecutar en Supabase Dashboard → SQL Editor
-- ============================================================

-- Crear bucket público "books"
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'books',
  'books',
  true,
  10485760,  -- 10 MB
  ARRAY['image/jpeg','image/jpg','image/png','image/webp','image/gif','application/pdf']
)
ON CONFLICT (id) DO NOTHING;

-- RLS: lectura pública
DROP POLICY IF EXISTS "books_public_read"   ON storage.objects;
DROP POLICY IF EXISTS "books_admin_insert"  ON storage.objects;
DROP POLICY IF EXISTS "books_admin_update"  ON storage.objects;
DROP POLICY IF EXISTS "books_admin_delete"  ON storage.objects;

CREATE POLICY "books_public_read" ON storage.objects
  FOR SELECT TO anon, authenticated
  USING (bucket_id = 'books');

CREATE POLICY "books_admin_insert" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'books');

CREATE POLICY "books_admin_update" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'books');

CREATE POLICY "books_admin_delete" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'books');
