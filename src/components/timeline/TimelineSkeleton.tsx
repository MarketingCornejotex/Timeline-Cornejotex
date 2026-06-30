export function TimelineSkeleton() {
  return (
    <div className="relative max-w-3xl mx-auto px-4 py-12">
      {/* Línea vertical */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />

      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className={`relative flex items-start gap-8 mb-12 ${
            i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
          }`}
        >
          {/* Tarjeta */}
          <div className="w-5/12 animate-pulse">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="h-3 bg-gray-200 rounded w-1/3 mb-3" />
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-full mb-1" />
              <div className="h-3 bg-gray-200 rounded w-2/3" />
            </div>
          </div>
          {/* Nodo central */}
          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
          {/* Espacio opuesto */}
          <div className="w-5/12" />
        </div>
      ))}
    </div>
  )
}
