'use client'

import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { DynamicLicense, DynamicLicenseInsert } from '@/types/database'

export function usePropertiesAdmin() {
  const supabase = createClient()
  const [items, setItems]     = useState<DynamicLicense[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState<string | null>(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    const { data, error: e } = await supabase
      .from('dynamic_licenses')
      .select('*')
      .order('created_at', { ascending: false })
    if (e) setError(e.message)
    else setItems((data ?? []) as DynamicLicense[])
    setLoading(false)
  }, [supabase])

  useEffect(() => { fetchAll() }, [fetchAll])

  async function create(payload: DynamicLicenseInsert): Promise<boolean> {
    setSaving(true); setError(null)
    const { error: e } = await supabase.from('dynamic_licenses').insert(payload)
    setSaving(false)
    if (e) { setError(e.message); return false }
    await fetchAll()
    return true
  }

  async function update(id: string, payload: Partial<DynamicLicenseInsert>): Promise<boolean> {
    setSaving(true); setError(null)
    const { error: e } = await supabase.from('dynamic_licenses').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', id)
    setSaving(false)
    if (e) { setError(e.message); return false }
    await fetchAll()
    return true
  }

  async function remove(id: string): Promise<boolean> {
    setSaving(true); setError(null)
    const { error: e } = await supabase.from('dynamic_licenses').delete().eq('id', id)
    setSaving(false)
    if (e) { setError(e.message); return false }
    await fetchAll()
    return true
  }

  // Renombra todas las filas que tengan cualquiera de los licenciantes en `fromValues`
  // al licenciante canónico `to`, en una sola operación.
  async function bulkRenameLicensor(fromValues: string[], to: string): Promise<boolean> {
    setSaving(true); setError(null)
    const { error: e } = await supabase
      .from('dynamic_licenses')
      .update({ licensor: to, updated_at: new Date().toISOString() })
      .in('licensor', fromValues)
    setSaving(false)
    if (e) { setError(e.message); return false }
    await fetchAll()
    return true
  }

  // Fusiona un grupo de propiedades duplicadas en una sola: renombra la fila ganadora
  // (si hace falta) y borra el resto.
  async function mergeProperties(winnerId: string, winnerName: string, loserIds: string[]): Promise<boolean> {
    setSaving(true); setError(null)
    const { error: e1 } = await supabase
      .from('dynamic_licenses')
      .update({ name: winnerName, updated_at: new Date().toISOString() })
      .eq('id', winnerId)
    if (e1) { setSaving(false); setError(e1.message); return false }
    if (loserIds.length > 0) {
      const { error: e2 } = await supabase.from('dynamic_licenses').delete().in('id', loserIds)
      if (e2) { setSaving(false); setError(e2.message); return false }
    }
    setSaving(false)
    await fetchAll()
    return true
  }

  return { items, loading, saving, error, create, update, remove, bulkRenameLicensor, mergeProperties, refetch: fetchAll }
}
