'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Estreno, EstrenoInsert, LicenseLogo, NameOverride } from '@/types/database'

export function useAdminData() {
  const [logos, setLogos] = useState<LicenseLogo[]>([])
  const [estrenos, setEstrenos] = useState<Estreno[]>([])
  const [overrides, setOverrides] = useState<NameOverride[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAll = useCallback(async () => {
    const sb = createClient()
    const [lr, er, or_] = await Promise.all([
      sb.from('license_logos').select('*').order('license_name'),
      sb.from('estrenos').select('*').order('quarter').order('order_index'),
      sb.from('name_overrides').select('*').order('original_name'),
    ])
    if (lr.data) setLogos(lr.data as LicenseLogo[])
    if (er.data) setEstrenos(er.data as Estreno[])
    if (or_.data) setOverrides(or_.data as NameOverride[])
    setLoading(false)
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  async function upsertLogo(license_name: string, logo_url: string): Promise<boolean> {
    setSaving(true); setError(null)
    const sb = createClient()
    const { error: e } = await sb.from('license_logos').upsert(
      { license_name, logo_url } as unknown as Record<string, unknown>,
      { onConflict: 'license_name' }
    )
    setSaving(false)
    if (e) { setError(e.message); return false }
    await fetchAll()
    return true
  }

  async function uploadLogoFile(license_name: string, file: File): Promise<boolean> {
    setSaving(true); setError(null)
    const sb = createClient()
    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'png'
    const slug = license_name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
    const path = `${slug}.${ext}`
    const { error: uploadErr } = await sb.storage
      .from('logos')
      .upload(path, file, { upsert: true, contentType: file.type })
    if (uploadErr) { setSaving(false); setError(uploadErr.message); return false }
    const { data: urlData } = sb.storage.from('logos').getPublicUrl(path)
    const logo_url = `${urlData.publicUrl}?v=${Date.now()}`
    const { error: dbErr } = await sb.from('license_logos').upsert(
      { license_name, logo_url } as unknown as Record<string, unknown>,
      { onConflict: 'license_name' }
    )
    setSaving(false)
    if (dbErr) { setError(dbErr.message); return false }
    await fetchAll()
    return true
  }

  async function updateLicenseInfo(
    license_name: string,
    info: { notes?: string | null; is_hidden?: boolean }
  ): Promise<boolean> {
    setSaving(true); setError(null)
    const sb = createClient()
    const { data: existing } = await sb
      .from('license_logos')
      .select('license_name')
      .eq('license_name', license_name)
      .single()
    let e
    if (existing) {
      const result = await (sb.from('license_logos').update(info as unknown as Record<string, unknown>) as any)
        .eq('license_name', license_name)
      e = result.error
    } else {
      const result = await sb.from('license_logos').insert({
        license_name, logo_url: '', ...info,
      } as unknown as Record<string, unknown>)
      e = result.error
    }
    setSaving(false)
    if (e) { setError(e.message); return false }
    await fetchAll()
    return true
  }

  async function deleteLogo(license_name: string): Promise<boolean> {
    setSaving(true); setError(null)
    const sb = createClient()
    const { error: e } = await (sb.from('license_logos').delete() as any).eq('license_name', license_name)
    setSaving(false)
    if (e) { setError(e.message); return false }
    await fetchAll()
    return true
  }

  async function createEstreno(data: EstrenoInsert): Promise<boolean> {
    setSaving(true); setError(null)
    const sb = createClient()
    const { error: e } = await sb.from('estrenos').insert(data as unknown as Record<string, unknown>)
    setSaving(false)
    if (e) { setError(e.message); return false }
    await fetchAll()
    return true
  }

  async function updateEstreno(id: string, data: Partial<EstrenoInsert>): Promise<boolean> {
    setSaving(true); setError(null)
    const sb = createClient()
    const { error: e } = await (sb.from('estrenos').update(data as unknown as Record<string, unknown>) as any).eq('id', id)
    setSaving(false)
    if (e) { setError(e.message); return false }
    await fetchAll()
    return true
  }

  async function deleteEstreno(id: string): Promise<boolean> {
    setSaving(true); setError(null)
    const sb = createClient()
    const { error: e } = await (sb.from('estrenos').delete() as any).eq('id', id)
    setSaving(false)
    if (e) { setError(e.message); return false }
    await fetchAll()
    return true
  }

  async function upsertOverride(original_name: string, override_type: 'license' | 'studio', display_name: string): Promise<boolean> {
    setSaving(true); setError(null)
    const sb = createClient()
    const { error: e } = await sb.from('name_overrides').upsert(
      { original_name, override_type, display_name } as unknown as Record<string, unknown>,
      { onConflict: 'original_name,override_type' }
    )
    setSaving(false)
    if (e) { setError(e.message); return false }
    await fetchAll()
    return true
  }

  async function deleteOverride(id: string): Promise<boolean> {
    setSaving(true); setError(null)
    const sb = createClient()
    const { error: e } = await (sb.from('name_overrides').delete() as any).eq('id', id)
    setSaving(false)
    if (e) { setError(e.message); return false }
    await fetchAll()
    return true
  }

  return {
    logos, estrenos, overrides, loading, saving, error,
    upsertLogo, uploadLogoFile, updateLicenseInfo, deleteLogo,
    createEstreno, updateEstreno, deleteEstreno,
    upsertOverride, deleteOverride,
    refetch: fetchAll,
  }
}
