'use client'

import { useTimeline } from '@/lib/hooks/useTimeline'
import { TimelineEventCard } from './TimelineEvent'
import { TimelineSkeleton } from './TimelineSkeleton'
import { formatYear } from '@/lib/utils'
import { WifiOff, RefreshCw } from 'lucide-react'

export function TimelineView() {
  const { events, loading, error, status, refetch } = useTimeline()

  if (loading) return <TimelineSkeleton />

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center px-4">
        <WifiOff className="w-10 h-10 text-gray-300" />
        <p className="text-gray-500 text-sm max-w-xs">{error}</p>
        <button
          onClick={refetch}
          className="flex items-center gap-2 text-sm text-[#429AB2] hover:underline font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Reintentar
        </button>
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-2 text-center px-4">
        <p className="text-gray-400 text-sm">No hay eventos publicados aún.</p>
      </div>
    )
  }

  // Agrupar por año para mostrar separadores visuales
  const eventsByYear: Record<string, typeof events> = {}
  for (const event of events) {
    const year = formatYear(event.event_date)
    if (!eventsByYear[year]) eventsByYear[year] = []
    eventsByYear[year].push(event)
  }

  return (
    <div className="relative">
      {/* Indicador de conexión en tiempo real */}
      {status === 'disconnected' && (
        <div className="sticky top-0 z-50 flex items-center justify-center gap-2 bg-amber-50 border-b border-amber-200 py-2 text-xs text-amber-700 font-medium">
          <WifiOff className="w-3 h-3" />
          Conexión perdida. Los datos pueden estar desactualizados.
          <button onClick={refetch} className="underline ml-1">Recargar</button>
        </div>
      )}

      {/* Línea vertical central */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#D1D1D1] to-transparent -translate-x-1/2 pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 py-12">
        {Object.entries(eventsByYear).map(([year, yearEvents]) => {
          // Calcular el índice global para alternar lado
          const globalStartIndex = events.findIndex(e => formatYear(e.event_date) === year)

          return (
            <div key={year}>
              {/* Separador de año */}
              <div className="flex items-center justify-center my-8">
                <div className="relative z-10 bg-[#323A45] text-white text-sm font-bold px-5 py-1.5 rounded-full shadow-md">
                  {year}
                </div>
              </div>

              {yearEvents.map((event, localIdx) => (
                <TimelineEventCard
                  key={event.id}
                  event={event}
                  index={globalStartIndex + localIdx}
                />
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}
