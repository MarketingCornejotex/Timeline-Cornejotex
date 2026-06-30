-- Bucket público para logos de licencias
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'logos',
  'logos',
  true,
  5242880, -- 5 MB
  array['image/jpeg','image/jpg','image/png','image/webp','image/svg+xml','image/gif']
)
on conflict (id) do nothing;

-- Lectura pública
create policy "logos_public_read"
  on storage.objects for select
  using ( bucket_id = 'logos' );

-- Solo usuarios autenticados pueden subir / actualizar / borrar
create policy "logos_admin_insert"
  on storage.objects for insert
  to authenticated
  with check ( bucket_id = 'logos' );

create policy "logos_admin_update"
  on storage.objects for update
  to authenticated
  using ( bucket_id = 'logos' );

create policy "logos_admin_delete"
  on storage.objects for delete
  to authenticated
  using ( bucket_id = 'logos' );
