'use client'

import { useMemo, useRef, useState } from 'react'
import { QUARTERS } from '@/data/quarters'
import { ALL_YEAR } from '@/data/all-year'
import { getCategoriesForLicensor } from '@/data/categories'
import { useBooksAdmin } from '@/lib/hooks/useBooksAdmin'
import type { CategoryPhoto } from '@/types/database'

function getAllLicenses(): { name: string; licensor: string }[] {
  const seen = new Set<string>()
  const result: { name: string; licensor: string }[] = []
  for (const q of Object.values(QUARTERS)) {
    for (const m of q.months) {
      for (const l of m.licenses) {
        if (!seen.has(l.name)) { seen.add(l.name); result.push({ name: l.name, licensor: l.licensor }) }
      }
    }
  }
  for (const g of ALL_YEAR) {
    for (const l of g.licenses) {
      if (!seen.has(l)) { seen.add(l); result.push({ name: l, licensor: g.licensor }) }
    }
  }
  return result.sort((a, b) => a.name.localeCompare(b.name))
}

export function BooksTab() {
  const [search, setSearch]     = useState('')
  const [selected, setSelected] = useState<{ name: string; licensor: string } | null>(null)
  const [expandedCat, setExpandedCat] = useState<string | null>(null)
  const { photos, loading, uploading, error, fetchPhotos, uploadPhoto, deletePhoto } = useBooksAdmin()

  const all = useMemo(() => getAllLicenses(), [])
  const filtered = search
    ? all.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.licensor.toLowerCase().includes(search.toLowerCase()))
    : all

  const photosByCategory = useMemo(() => {
    const map: Record<string, CategoryPhoto[]> = {}
    photos.forEach(p => {
      if (!map[p.category]) map[p.category] = []
      map[p.category].push(p)
    })
    return map
  }, [photos])

  function selectLicense(lic: { name: string; licensor: string }) {
    setSelected(lic)
    setExpandedCat(null)
    fetchPhotos(lic.name)
  }

  const categories = selected ? getCategoriesForLicensor(selected.licensor) : []

  return (
    <div style={{ display: 'flex', gap: '20px', height: 'calc(100vh - 220px)', minHeight: '520px' }}>

      {/* ── Columna izquierda: lista de licencias ── */}
      <div style={{ width: '260px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar licencia..."
          style={{ padding: '9px 12px', borderRadius: '12px', border: '1px solid var(--line-2)', background: 'var(--bg-2)', color: 'var(--txt)', fontSize: '13px', outline: 'none' }}
        />
        <div style={{ fontSize: '11px', color: 'var(--txt-4)', marginBottom: '2px' }}>{filtered.length} licencias</div>
        <div style={{ overflow: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '3px', paddingRight: '4px' }}>
          {filtered.map(lic => {
            const isActive = selected?.name === lic.name
            const catPhotos = isActive ? photos.length : 0
            return (
              <button
                key={lic.name}
                onClick={() => selectLicense(lic)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '8px 12px', borderRadius: '10px', cursor: 'pointer', textAlign: 'left',
                  border: `1px solid ${isActive ? 'rgba(0,174,239,.4)' : 'var(--line)'}`,
                  background: isActive ? 'rgba(0,174,239,.1)' : 'var(--surface)',
                  color: isActive ? '#fff' : 'var(--txt-2)',
                  fontSize: '12px', fontWeight: isActive ? 600 : 400,
                }}
              >
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lic.name}</span>
                {isActive && catPhotos > 0 && (
                  <span style={{ padding: '1px 6px', borderRadius: '6px', background: 'var(--brand)', color: '#fff', fontSize: '10px', marginLeft: '6px', flexShrink: 0 }}>{catPhotos}</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Columna derecha: categorías ── */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {!selected && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '10px' }}>
            <div style={{ fontSize: '40px' }}>📂</div>
            <div style={{ color: 'var(--txt-3)', fontSize: '14px' }}>Selecciona una licencia para gestionar sus books</div>
          </div>
        )}

        {selected && (
          <>
            {/* Header */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '18px', fontWeight: 700, color: '#fff' }}>{selected.name}</div>
              <div style={{ fontSize: '12px', color: 'var(--txt-3)', marginTop: '3px' }}>
                {selected.licensor} · {categories.length} categorías · {photos.length} imagen{photos.length !== 1 ? 'es' : ''}
              </div>
            </div>

            {error && (
              <div style={{ padding: '10px 14px', background: 'rgba(248,113,113,.12)', border: '1px solid rgba(248,113,113,.3)', borderRadius: '10px', color: 'var(--danger)', fontSize: '12px', marginBottom: '14px' }}>
                {error}
              </div>
            )}

            {loading && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--txt-3)', fontSize: '13px', padding: '24px 0' }}>
                <div style={{ width: '14px', height: '14px', border: '2px solid var(--brand)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
                Cargando fotos...
              </div>
            )}

            {!loading && categories.length === 0 && (
              <div style={{ color: 'var(--txt-4)', fontSize: '13px' }}>No hay categorías configuradas para {selected.licensor}.</div>
            )}

            {/* Lista de categorías */}
            {!loading && categories.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {categories.map(cat => (
                  <CategoryPanel
                    key={cat}
                    category={cat}
                    photos={photosByCategory[cat] ?? []}
                    isExpanded={expandedCat === cat}
                    uploading={uploading}
                    onToggle={() => setExpandedCat(expandedCat === cat ? null : cat)}
                    onUpload={async files => {
                      for (const file of Array.from(files)) {
                        await uploadPhoto(selected.name, cat, file)
                      }
                    }}
                    onDelete={photo => deletePhoto(photo, selected.name)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Panel de una categoría
// ─────────────────────────────────────────────────────────────

interface CategoryPanelProps {
  category: string
  photos: CategoryPhoto[]
  isExpanded: boolean
  uploading: boolean
  onToggle: () => void
  onUpload: (files: FileList) => void
  onDelete: (photo: CategoryPhoto) => Promise<boolean>
}

function CategoryPanel({ category, photos, isExpanded, uploading, onToggle, onUpload, onDelete }: CategoryPanelProps) {
  const fileRef  = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver]         = useState(false)
  const [hoveredId, setHoveredId]       = useState<string | null>(null)
  const [confirmId, setConfirmId]       = useState<string | null>(null)

  return (
    <div style={{
      background: 'var(--surface)',
      border: `1px solid ${isExpanded ? 'rgba(0,174,239,.35)' : 'var(--line)'}`,
      borderRadius: '14px', overflow: 'hidden', transition: 'border-color .15s',
    }}>
      {/* ── Cabecera ── */}
      <button
        onClick={onToggle}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#fff', textAlign: 'left' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600 }}>{category}</span>
          {photos.length > 0 && (
            <span style={{ padding: '1px 7px', borderRadius: '6px', background: 'rgba(0,174,239,.2)', color: 'var(--brand-2)', fontSize: '11px', fontWeight: 600 }}>{photos.length}</span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Miniaturas previas (colapsado) */}
          {!isExpanded && photos.length > 0 && (
            <div style={{ display: 'flex', gap: '3px' }}>
              {photos.slice(0, 5).map(p => (
                <div key={p.id} style={{ width: '26px', height: '26px', borderRadius: '5px', overflow: 'hidden', background: 'var(--bg-2)', flexShrink: 0 }}>
                  {p.file_type === 'image'
                    ? <img src={p.file_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', color: 'var(--txt-3)' }}>PDF</div>}
                </div>
              ))}
              {photos.length > 5 && (
                <div style={{ width: '26px', height: '26px', borderRadius: '5px', background: 'var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: 'var(--txt-3)' }}>
                  +{photos.length - 5}
                </div>
              )}
            </div>
          )}
          <span style={{ color: 'var(--txt-4)', fontSize: '11px', display: 'inline-block', transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▼</span>
        </div>
      </button>

      {/* ── Contenido expandido ── */}
      {isExpanded && (
        <div style={{ padding: '0 16px 16px', borderTop: '1px solid var(--line)' }}>

          {/* Zona de arrastre / subida */}
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); if (e.dataTransfer.files.length) onUpload(e.dataTransfer.files) }}
            onClick={() => fileRef.current?.click()}
            style={{
              marginTop: '14px', padding: '22px 16px',
              borderRadius: '12px', border: `2px dashed ${dragOver ? 'var(--brand)' : 'var(--line-2)'}`,
              background: dragOver ? 'rgba(0,174,239,.07)' : 'rgba(255,255,255,.02)',
              textAlign: 'center', cursor: 'pointer', transition: 'all .15s',
            }}
          >
            <input
              ref={fileRef}
              type="file"
              multiple
              accept="image/jpeg,image/png,image/webp,image/gif,application/pdf"
              style={{ display: 'none' }}
              onChange={e => { if (e.target.files?.length) { onUpload(e.target.files); e.target.value = '' } }}
            />
            {uploading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: 'var(--brand-2)', fontSize: '13px' }}>
                <div style={{ width: '14px', height: '14px', border: '2px solid var(--brand-2)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
                Subiendo...
              </div>
            ) : (
              <>
                <div style={{ fontSize: '26px', marginBottom: '6px' }}>📤</div>
                <div style={{ fontSize: '13px', color: 'var(--txt-2)', fontWeight: 500 }}>Arrastra fotos aquí o haz clic para seleccionar</div>
                <div style={{ fontSize: '11px', color: 'var(--txt-4)', marginTop: '4px' }}>JPG · PNG · WEBP · PDF · Máx. 10 MB por archivo</div>
              </>
            )}
          </div>

          {/* Grid de fotos */}
          {photos.length > 0 && (
            <div style={{ marginTop: '14px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))', gap: '8px' }}>
              {photos.map(p => (
                <div
                  key={p.id}
                  onMouseEnter={() => setHoveredId(p.id)}
                  onMouseLeave={() => { setHoveredId(null); setConfirmId(null) }}
                  style={{ position: 'relative', aspectRatio: '1', borderRadius: '10px', overflow: 'hidden', background: 'var(--bg-2)', border: '1px solid var(--line)', cursor: 'default' }}
                >
                  {p.file_type === 'image' ? (
                    <img src={p.file_url} alt={p.file_name ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '6px' }}>
                      <div style={{ fontSize: '22px' }}>📄</div>
                      <div style={{ fontSize: '9px', color: 'var(--txt-3)', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' }}>{p.file_name}</div>
                    </div>
                  )}

                  {/* Overlay de hover */}
                  {hoveredId === p.id && (
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.65)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {confirmId === p.id ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center' }}>
                          <div style={{ fontSize: '11px', color: '#fff', fontWeight: 600, marginBottom: '2px' }}>¿Eliminar?</div>
                          <div style={{ display: 'flex', gap: '5px' }}>
                            <button
                              onClick={e => { e.stopPropagation(); onDelete(p) }}
                              style={{ padding: '4px 10px', borderRadius: '6px', background: 'var(--danger)', color: '#fff', fontSize: '11px', border: 'none', cursor: 'pointer', fontWeight: 700 }}
                            >Sí</button>
                            <button
                              onClick={e => { e.stopPropagation(); setConfirmId(null) }}
                              style={{ padding: '4px 10px', borderRadius: '6px', background: 'rgba(255,255,255,.15)', color: '#fff', fontSize: '11px', border: 'none', cursor: 'pointer' }}
                            >No</button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={e => { e.stopPropagation(); setConfirmId(p.id) }}
                          style={{ padding: '6px 12px', borderRadius: '8px', background: 'rgba(239,68,68,.9)', color: '#fff', fontSize: '11px', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                        >
                          🗑 Eliminar
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {photos.length === 0 && !uploading && (
            <div style={{ marginTop: '12px', fontSize: '12px', color: 'var(--txt-4)', textAlign: 'center' }}>Sin imágenes aún en esta categoría</div>
          )}
        </div>
      )}
    </div>
  )
}
