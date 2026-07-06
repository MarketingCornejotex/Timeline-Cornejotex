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

  return { items, loading, saving, error, create, update, remove, refetch: fetchAll }
}
