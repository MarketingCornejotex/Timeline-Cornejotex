'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { TimelineEvent, TimelineEventInsert, TimelineEventUpdate } from '@/types/database'

export function useAdminTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAll = useCallback(async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('timeline_events')
      .select('*')
      .order('event_date', { ascending: true })
      .order('order_index', { ascending: true })

    if (error) { setError(error.message); return }
    setEvents((data as unknown as TimelineEvent[]) ?? [])
  }, [])

  useEffect(() => {
    fetchAll().finally(() => setLoading(false))
  }, [fetchAll])

  const createEvent = useCallback(async (payload: Omit<TimelineEventInsert, 'created_by'>) => {
    setSaving(true)
    setError(null)
    const supabase = createClient()

    const sameDay = events.filter(e => e.event_date === payload.event_date)
    const maxOrder = sameDay.reduce((max, e) => Math.max(max, e.order_index), -1)

    const { error } = await supabase
      .from('timeline_events')
      .insert({ ...payload, order_index: maxOrder + 1 } as unknown as Record<string, unknown>)

    if (error) { setError(error.message); setSaving(false); return false }
    await fetchAll()
    setSaving(false)
    return true
  }, [events, fetchAll])

  const updateEvent = useCallback(async (id: string, payload: TimelineEventUpdate) => {
    setSaving(true)
    setError(null)
    const supabase = createClient()

    const { error } = await supabase
      .from('timeline_events')
      .update(payload as unknown as Record<string, unknown>)
      .eq('id', id)

    if (error) { setError(error.message); setSaving(false); return false }
    await fetchAll()
    setSaving(false)
    return true
  }, [fetchAll])

  const deleteEvent = useCallback(async (id: string) => {
    setSaving(true)
    setError(null)
    const supabase = createClient()

    const { error } = await supabase
      .from('timeline_events')
      .delete()
      .eq('id', id)

    if (error) { setError(error.message); setSaving(false); return false }
    setEvents(prev => prev.filter(e => e.id !== id))
    setSaving(false)
    return true
  }, [])

  const togglePublish = useCallback(
    async (id: string, current: boolean) => updateEvent(id, { is_published: !current }),
    [updateEvent]
  )

  const reorderEvents = useCallback(async (reordered: TimelineEvent[]) => {
    setSaving(true)
    setError(null)
    const supabase = createClient()

    const updates = reordered.map((e, idx) =>
      supabase
        .from('timeline_events')
        .update({ order_index: idx } as unknown as Record<string, unknown>)
        .eq('id', e.id)
    )

    const results = await Promise.all(updates)
    const failed = results.find(r => r.error)

    if (failed?.error) {
      setError('Error al reordenar. Recargando...')
      await fetchAll()
      setSaving(false)
      return false
    }

    setEvents(reordered)
    setSaving(false)
    return true
  }, [fetchAll])

  return { events, loading, saving, error, createEvent, updateEvent, deleteEvent, togglePublish, reorderEvents, refetch: fetchAll }
}
