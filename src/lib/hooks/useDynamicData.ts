'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { LicenseLogo, CategoryPhoto, Estreno, NameOverride } from '@/types/database'

export interface DynamicData {
  logos: Record<string, string>       // license_name → logo_url
  overrides: Record<string, string>   // "license:name" | "studio:name" → display_name
  estrenos: Estreno[]
  catPhotos: Record<string, CategoryPhoto[]> // "license||category" → photos
}

export function useDynamicData() {
  const [data, setData] = useState<DynamicData>({
    logos: {}, overrides: {}, estrenos: [], catPhotos: {}
  })
  const [loading, setLoading] = useState(true)

  const fetchAll = useCallback(async () => {
    const supabase = createClient()

    const [logosRes, estrenosRes, overridesRes] = await Promise.all([
      supabase.from('license_logos').select('*'),
      supabase.from('estrenos').select('*').eq('is_published', true).order('quarter').order('order_index'),
      supabase.from('name_overrides').select('*'),
    ])

    const logos: Record<string, string> = {}
    ;(logosRes.data as LicenseLogo[] | null ?? []).forEach(l => { logos[l.license_name] = l.logo_url })

    const overrides: Record<string, string> = {}
    ;(overridesRes.data as NameOverride[] | null ?? []).forEach(o => {
      overrides[`${o.override_type}:${o.original_name}`] = o.display_name
    })

    setData({
      logos,
      overrides,
      estrenos: (estrenosRes.data as Estreno[] | null) ?? [],
      catPhotos: {},
    })
  }, [])

  useEffect(() => {
    fetchAll().finally(() => setLoading(false))

    const supabase = createClient()
    const channel = supabase
      .channel('dynamic_data_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'license_logos' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'estrenos' }, fetchAll)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'name_overrides' }, fetchAll)
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [fetchAll])

  function dispName(name: string) {
    return data.overrides[`license:${name}`] ?? name
  }

  function dispStudio(name: string) {
    return data.overrides[`studio:${name}`] ?? name
  }

  async function fetchCatPhotos(licenseName: string, category: string) {
    const key = `${licenseName}||${category}`
    if (data.catPhotos[key]) return data.catPhotos[key]

    const supabase = createClient()
    const { data: photos } = await supabase
      .from('category_photos')
      .select('*')
      .eq('license_name', licenseName)
      .eq('category', category)
      .order('order_index')

    const result = (photos as CategoryPhoto[] | null) ?? []
    setData(prev => ({ ...prev, catPhotos: { ...prev.catPhotos, [key]: result } }))
    return result
  }

  return { data, loading, dispName, dispStudio, fetchCatPhotos, refetch: fetchAll }
}
