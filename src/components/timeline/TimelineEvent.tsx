'use client'

import { formatEventDate } from '@/lib/utils'
import type { TimelineEvent } from '@/types/database'

interface Props {
  event: TimelineEvent
  index: number
}

export function TimelineEventCard({ event, index }: Props) {
  const isLeft = index % 2 === 0

  return (
    <div
      className={`relative flex items-center gap-0 mb-10 group ${
        isLeft ? 'flex-row' : 'flex-row-reverse'
      }`}
    >
      {/* Tarjeta */}
      <div className={`w-5/12 ${isLeft ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
        <div
          className="bg-white rounded-2xl p-5 shadow-md border border-gray-100
                     transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
        >
          {/* Fecha */}
          <p className="text-xs font-medium text-[#429AB2] uppercase tracking-widest mb-1">
            {formatEventDate(event.event_date)}
          </p>

          {/* Categoría */}
          {event.category && (
            <span
              className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-2"
              style={{ backgroundColor: event.color + '20', color: event.color }}
            >
              {event.category}
            </span>
          )}

          {/* Título */}
          <h3 className="text-base font-bold text-[#323A45] leading-snug mb-2">
            {event.title}
          </h3>

          {/* Descripción */}
          {event.description && (
            <p className="text-sm text-gray-500 leading-relaxed">
              {event.description}
            </p>
          )}

          {/* Imagen opcional */}
          {event.image_url && (
            <img
              src={event.image_url}
              alt={event.title}
              className="mt-3 w-full h-32 object-cover rounded-lg"
              loading="lazy"
            />
          )}
        </div>
      </div>

      {/* Nodo central con línea de conexión */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
        <div
          className="w-5 h-5 rounded-full border-4 border-white shadow-md
                     transition-transform duration-300 group-hover:scale-125"
          style={{ backgroundColor: event.color }}
        />
      </div>

      {/* Espacio opuesto vacío */}
      <div className="w-5/12" />
    </div>
  )
}
