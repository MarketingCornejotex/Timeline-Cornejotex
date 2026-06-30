'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { TimelineEvent } from '@/types/database'

type ConnectionStatus = 'connecting' | 'connected' | 'disconnected'

export function useTimeline() {
  const [events, setEvents] = useState<TimelineEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [status, setStatus] = useState<ConnectionStatus>('connecting')

  const fetchEvents = useCallback(async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('timeline_events')
      .select('*')
      .eq('is_published', true)
      .order('event_date', { ascending: true })
      .order('order_index', { ascending: true })

    if (error) { setError('No se pudieron cargar los eventos. Intenta nuevamente.'); return }
    setEvents((data as unknown as TimelineEvent[]) ?? [])
    setError(null)
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchEvents().finally(() => setLoading(false))

    const supabase = createClient()

    const channel = supabase
      .channel('public_timeline_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'timeline_events' }, () => {
        fetchEvents()
      })
      .subscribe((s) => {
        if (s === 'SUBSCRIBED') setStatus('connected')
        if (s === 'CLOSED' || s === 'CHANNEL_ERROR') setStatus('disconnected')
      })

    return () => { supabase.removeChannel(channel) }
  }, [fetchEvents])

  return { events, loading, error, status, refetch: fetchEvents }
}
