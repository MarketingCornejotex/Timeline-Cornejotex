'use client'

import { useCallback, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { CategoryPhoto } from '@/types/database'

function extractStoragePath(publicUrl: string): string | null {
  const match = publicUrl.match(/\/storage\/v1\/object\/public\/books\/(.+)/)
  return match ? decodeURIComponent(match[1]) : null
}

export function useBooksAdmin() {
  const [photos, setPhotos] = useState<CategoryPhoto[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPhotos = useCallback(async (license_name: string) => {
    setLoading(true)
    setError(null)
    const sb = createClient()
    const { data, error: e } = await sb
      .from('category_photos')
      .select('*')
      .eq('license_name', license_name)
      .order('category')
      .order('order_index', { ascending: true })
    if (e) setError(e.message)
    setPhotos((data as CategoryPhoto[]) ?? [])
    setLoading(false)
  }, [])

  async function uploadPhoto(
    license_name: string,
    category: string,
    file: File
  ): Promise<boolean> {
    setUploading(true)
    setError(null)
    const sb = createClient()

    const ext = file.name.split('.').pop() ?? 'jpg'
    const slug = Math.random().toString(36).slice(2, 8)
    const ts   = String(Date.now()).slice(-7)  // últimos 7 dígitos, siempre < 2^31
    const path = `${license_name}/${category}/${ts}_${slug}.${ext}`

    const { error: upErr } = await sb.storage
      .from('books')
      .upload(path, file, { upsert: false })

    if (upErr) {
      setError(`Error al subir: ${upErr.message}`)
      setUploading(false)
      return false
    }

    const { data: urlData } = sb.storage.from('books').getPublicUrl(path)
    const file_type: 'image' | 'pdf' = file.type === 'application/pdf' ? 'pdf' : 'image'

    const { error: dbErr } = await sb.from('category_photos').insert({
      license_name,
      category,
      file_url: urlData.publicUrl,
      file_type,
      file_name: file.name,
      order_index: photos.length,
    } as unknown as Record<string, unknown>)

    if (dbErr) {
      setError(`Error al guardar: ${dbErr.message}`)
      setUploading(false)
      return false
    }

    await fetchPhotos(license_name)
    setUploading(false)
    return true
  }

  async function deletePhoto(photo: CategoryPhoto, license_name: string): Promise<boolean> {
    setUploading(true)
    setError(null)
    const sb = createClient()

    const storagePath = extractStoragePath(photo.file_url)
    if (storagePath) {
      await sb.storage.from('books').remove([storagePath])
    }

    const { error: e } = await (sb.from('category_photos').delete() as any).eq('id', photo.id)
    if (e) {
      setError(e.message)
      setUploading(false)
      return false
    }

    setPhotos(prev => prev.filter(p => p.id !== photo.id))
    setUploading(false)
    return true
  }

  return { photos, loading, uploading, error, fetchPhotos, uploadPhoto, deletePhoto }
}
