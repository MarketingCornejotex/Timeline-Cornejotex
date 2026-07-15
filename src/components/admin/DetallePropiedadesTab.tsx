'use client'

import { useMemo, useState } from 'react'
import { usePropertiesAdmin } from '@/lib/hooks/usePropertiesAdmin'
import { ALL_YEAR } from '@/data/all-year'
import { QUARTERS, QUARTERS_ORDER } from '@/data/quarters'
import type { QuarterKey } from '@/data/quarters'
import { SEG_LABELS, type SegmentKey, type LicenseType } from '@/data/segments'
import type { DynamicLicenseInsert } from '@/types/database'

const SEGS_ORDER: SegmentKey[] = ['bebes', 'ninos', 'adultos', 'hogar', 'mascotas']

// ─── Inventario estático (all-year.ts + quarters.ts) agrupado por nombre ────
// Sirve como base de referencia: cada propiedad puede aparecer en varios
// contextos (todo el año y/o uno o más trimestres/meses).

interface StaticContext {
  licensor: string
  segs: SegmentKey[]
  type: LicenseType
  isAllYear: boolean
  quarter: QuarterKey | null
  monthId: string | null
}

interface StaticProperty {
  name: string
  contexts: StaticContext[]
}

const MONTH_LABELS: Record<string, string> = {}

const STATIC_PROPERTIES = (() => {
  const map = new Map<string, StaticProperty>()
  function add(name: string, ctx: StaticContext) {
    const key = name.toLowerCase()
    const existing = map.get(key)
    if (existing) existing.contexts.push(ctx)
    else map.set(key, { name, contexts: [ctx] })
  }

  ALL_YEAR.forEach(group => {
    group.licenses.forEach(lic => {
      add(lic.name, { licensor: group.licensor, segs: lic.segs, type: 'ann', isAllYear: true, quarter: null, monthId: null })
    })
  })

  QUARTERS_ORDER.forEach(qKey => {
    QUARTERS[qKey].months.forEach(month => {
      MONTH_LABELS[month.id] = month.name
      month.licenses.forEach(lic => {
        add(lic.name, { licensor: lic.licensor, segs: lic.segs, type: lic.type, isAllYear: false, quarter: qKey, monthId: month.id })
      })
    })
  })

  return map
})()

function monthsOfQuarter(q: QuarterKey | null) {
  if (!q) return []
  return QUARTERS[q].months.map(m => ({ id: m.id, name: m.name }))
}

function temporalidadLabel(isAllYear: boolean, quarter: string | null, monthId: string | null) {
  if (isAllYear) return 'Todo el año'
  if (!quarter) return '—'
  return monthId ? `${quarter} · ${MONTH_LABELS[monthId] ?? monthId}` : quarter
}

// ─── Filas unificadas: estático + overrides/adiciones dinámicas ────────────

interface Row {
  key: string
  name: string
  licensor: string
  dbId: string | null
  isCustom: boolean
  isAllYear: boolean
  quarter: QuarterKey | null
  monthId: string | null
  segs: SegmentKey[]
  specialEvents: string | null
  type: LicenseType
  category: string | null
  isPublished: boolean
  contextsLabel: string
}

function buildRows(items: ReturnType<typeof usePropertiesAdmin>['items']): Row[] {
  const overrideByName = new Map(items.map(it => [it.name.toLowerCase(), it]))
  const rows: Row[] = []

  STATIC_PROPERTIES.forEach((prop, key) => {
    const override = overrideByName.get(key)
    const primary = prop.contexts[0]
    const contextsLabel = prop.contexts
      .map(c => temporalidadLabel(c.isAllYear, c.quarter, c.monthId))
      .join(' + ')

    rows.push({
      key: `p:${key}`,
      name: prop.name,
      licensor: override?.licensor ?? primary.licensor,
      dbId: override?.id ?? null,
      isCustom: !!override,
      isAllYear: override ? override.is_all_year : primary.isAllYear,
      quarter: override ? (override.quarter as QuarterKey | null) : primary.quarter,
      monthId: override ? override.month_id : primary.monthId,
      segs: (override ? override.segs : primary.segs) as SegmentKey[],
      specialEvents: override?.special_events ?? null,
      type: (override?.type ?? primary.type) as LicenseType,
      category: override?.category ?? null,
      isPublished: override?.is_published ?? true,
      contextsLabel,
    })
  })

  items
    .filter(it => !STATIC_PROPERTIES.has(it.name.toLowerCase()))
    .forEach(it => {
      rows.push({
        key: `d:${it.id}`,
        name: it.name,
        licensor: it.licensor,
        dbId: it.id,
        isCustom: true,
        isAllYear: it.is_all_year,
        quarter: it.quarter as QuarterKey | null,
        monthId: it.month_id,
        segs: it.segs as SegmentKey[],
        specialEvents: it.special_events,
        type: it.type,
        category: it.category,
        isPublished: it.is_published,
        contextsLabel: 'Agregada desde el admin',
      })
    })

  rows.sort((a, b) => a.name.localeCompare(b.name, 'es'))
  return rows
}

interface DraftState {
  isAllYear: boolean
  quarter: QuarterKey | null
  monthId: string | null
  segs: SegmentKey[]
  specialEvents: string
}

export function DetallePropiedadesTab() {
  const { items, loading, saving, error, create, update } = usePropertiesAdmin()
  const rows = useMemo(() => buildRows(items), [items])

  const [search, setSearch] = useState('')
  const [onlyCustom, setOnlyCustom] = useState(false)
  const [editKey, setEditKey] = useState<string | null>(null)
  const [draft, setDraft] = useState<DraftState | null>(null)
  const [rowError, setRowError] = useState<string | null>(null)

  const q = search.trim().toLowerCase()
  const filtered = rows.filter(r =>
    (!q || r.name.toLowerCase().includes(q) || r.licensor.toLowerCase().includes(q)) &&
    (!onlyCustom || r.isCustom)
  )

  function openEdit(row: Row) {
    setEditKey(row.key)
    setDraft({ isAllYear: row.isAllYear, quarter: row.quarter, monthId: row.monthId, segs: row.segs, specialEvents: row.specialEvents ?? '' })
    setRowError(null)
  }

  function cancelEdit() {
    setEditKey(null)
    setDraft(null)
    setRowError(null)
  }

  function toggleSeg(seg: SegmentKey) {
    setDraft(prev => {
      if (!prev) return prev
      const segs = prev.segs.includes(seg) ? prev.segs.filter(s => s !== seg) : [...prev.segs, seg]
      return { ...prev, segs: segs.length ? segs : ['adultos'] }
    })
  }

  async function saveRow(row: Row) {
    if (!draft) return
    if (!draft.isAllYear && !draft.quarter) {
      setRowError('Selecciona un trimestre o activa "Todo el año"')
      return
    }
    setRowError(null)

    const editableFields = {
      quarter: draft.isAllYear ? null : draft.quarter,
      is_all_year: draft.isAllYear,
      month_id: draft.isAllYear ? null : draft.monthId,
      segs: draft.segs,
      special_events: draft.specialEvents.trim() || null,
    }

    const ok = row.dbId
      ? await update(row.dbId, editableFields)
      : await create({
          name: row.name,
          licensor: row.licensor,
          type: row.type,
          category: row.category,
          is_published: row.isPublished,
          ...editableFields,
        } as DynamicLicenseInsert)

    if (ok) cancelEdit()
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '13px', color: 'var(--txt-3)', flexShrink: 0 }}>
          {filtered.length} de {rows.length} propiedades
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nombre o licenciante..."
          style={{ ...inp, flex: 1, minWidth: '200px', maxWidth: '340px' }}
        />
        <button
          type="button"
          onClick={() => setOnlyCustom(v => !v)}
          style={{
            padding: '7px 14px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, flexShrink: 0,
            border: `1px solid ${onlyCustom ? 'var(--brand)' : 'var(--line-2)'}`,
            background: onlyCustom ? 'rgba(0,174,239,.15)' : 'transparent',
            color: onlyCustom ? 'var(--brand-2)' : 'var(--txt-3)',
          }}
        >
          Solo editadas
        </button>
      </div>

      <p style={{ fontSize: '11.5px', color: 'var(--txt-4)', margin: '0 0 16px' }}>
        El inventario combina las propiedades del catálogo base con las agregadas desde el admin. Al guardar una propiedad
        &quot;Original&quot; se crea una versión personalizada con ese nombre, que reemplaza automáticamente a la original en el timeline público.
      </p>

      {error && (
        <div style={{ padding: '10px 14px', background: 'rgba(248,113,113,.12)', border: '1px solid rgba(248,113,113,.3)', borderRadius: '10px', color: 'var(--danger)', fontSize: '12px', marginBottom: '14px' }}>{error}</div>
      )}

      {loading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--txt-3)', fontSize: '13px', padding: '24px 0' }}>
          <div style={{ width: '14px', height: '14px', border: '2px solid var(--brand)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
          Cargando...
        </div>
      )}

      {!loading && (
        <div style={{ overflowX: 'auto', border: '1px solid var(--line)', borderRadius: '14px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', minWidth: '860px' }}>
            <thead>
              <tr style={{ background: 'var(--surface-2)' }}>
                <th style={th}>Propiedad</th>
                <th style={th}>Temporalidad</th>
                <th style={th}>Departamentos</th>
                <th style={th}>Eventos Especiales</th>
                <th style={{ ...th, textAlign: 'right' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(row => {
                const isEditing = editKey === row.key
                return (
                  <tr key={row.key} style={{ borderTop: '1px solid var(--line)', background: isEditing ? 'rgba(0,174,239,.05)' : 'transparent' }}>
                    <td style={td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 600, color: '#fff' }}>{row.name}</span>
                        <span style={{ fontSize: '9.5px', padding: '1px 6px', borderRadius: '5px', fontWeight: 700, background: row.isCustom ? 'rgba(0,174,239,.15)' : 'rgba(255,255,255,.06)', color: row.isCustom ? 'var(--brand-2)' : 'var(--txt-4)' }}>
                          {row.isCustom ? 'Personalizada' : 'Original'}
                        </span>
                      </div>
                      <div style={{ color: 'var(--txt-3)', marginTop: '2px' }}>{row.licensor}</div>
                      {!row.isCustom && (
                        <div style={{ color: 'var(--txt-4)', fontSize: '10.5px', marginTop: '1px', fontStyle: 'italic' }}>{row.contextsLabel}</div>
                      )}
                    </td>

                    <td style={td}>
                      {isEditing && draft ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', minWidth: '150px' }}>
                          <select
                            value={draft.isAllYear ? 'ALL' : (draft.quarter ?? '')}
                            onChange={e => {
                              const v = e.target.value
                              setDraft(prev => prev ? (v === 'ALL'
                                ? { ...prev, isAllYear: true, quarter: null, monthId: null }
                                : { ...prev, isAllYear: false, quarter: v as QuarterKey, monthId: null }) : prev)
                            }}
                            style={inp}
                          >
                            <option value="ALL">Todo el año</option>
                            {QUARTERS_ORDER.map(qk => <option key={qk} value={qk}>{qk}</option>)}
                          </select>
                          {!draft.isAllYear && draft.quarter && (
                            <select
                              value={draft.monthId ?? ''}
                              onChange={e => setDraft(prev => prev ? { ...prev, monthId: e.target.value || null } : prev)}
                              style={inp}
                            >
                              <option value="">— Cualquier mes</option>
                              {monthsOfQuarter(draft.quarter).map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                            </select>
                          )}
                          {rowError && <div style={{ fontSize: '10.5px', color: 'var(--danger)', fontWeight: 500 }}>⚠ {rowError}</div>}
                        </div>
                      ) : (
                        <span style={{ color: 'var(--txt-2)' }}>{temporalidadLabel(row.isAllYear, row.quarter, row.monthId)}</span>
                      )}
                    </td>

                    <td style={td}>
                      {isEditing && draft ? (
                        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', minWidth: '190px' }}>
                          {SEGS_ORDER.map(seg => {
                            const active = draft.segs.includes(seg)
                            return (
                              <button
                                key={seg}
                                type="button"
                                onClick={() => toggleSeg(seg)}
                                style={{
                                  padding: '4px 10px', borderRadius: '16px', cursor: 'pointer', fontSize: '10.5px', fontWeight: active ? 700 : 500,
                                  border: `1px solid ${active ? 'rgba(0,174,239,.5)' : 'var(--line-2)'}`,
                                  background: active ? 'rgba(0,174,239,.15)' : 'transparent',
                                  color: active ? 'var(--brand-2)' : 'var(--txt-3)',
                                }}
                              >
                                {SEG_LABELS[seg]}
                              </button>
                            )
                          })}
                        </div>
                      ) : (
                        <span style={{ color: 'var(--txt-2)' }}>{row.segs.map(s => SEG_LABELS[s]).join(', ')}</span>
                      )}
                    </td>

                    <td style={td}>
                      {isEditing && draft ? (
                        <input
                          value={draft.specialEvents}
                          onChange={e => setDraft(prev => prev ? { ...prev, specialEvents: e.target.value } : prev)}
                          placeholder="Ej: Navidad, Black Friday"
                          style={{ ...inp, minWidth: '170px' }}
                        />
                      ) : (
                        <span style={{ color: row.specialEvents ? 'var(--txt-2)' : 'var(--txt-4)' }}>{row.specialEvents || '—'}</span>
                      )}
                    </td>

                    <td style={{ ...td, textAlign: 'right', whiteSpace: 'nowrap' }}>
                      {isEditing ? (
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button onClick={cancelEdit} style={btnGhost}>Cancelar</button>
                          <button onClick={() => saveRow(row)} disabled={saving} style={{ ...btnPrimary, opacity: saving ? .6 : 1 }}>
                            {saving ? 'Guardando...' : 'Guardar'}
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => openEdit(row)} style={btnGhost}>Editar</button>
                      )}
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--txt-4)' }}>
                    Sin resultados para esa búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

const th: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', fontSize: '10.5px', fontWeight: 700, color: 'var(--txt-4)', textTransform: 'uppercase', letterSpacing: '.05em', whiteSpace: 'nowrap' }
const td: React.CSSProperties = { padding: '10px 12px', verticalAlign: 'top' }
const inp: React.CSSProperties = { width: '100%', padding: '7px 10px', borderRadius: '9px', border: '1px solid var(--line-2)', background: 'var(--bg-2)', color: 'var(--txt)', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }
const btnGhost: React.CSSProperties = { padding: '5px 12px', borderRadius: '8px', border: '1px solid var(--line-2)', background: 'transparent', color: 'var(--txt-3)', fontSize: '11px', cursor: 'pointer', fontWeight: 500 }
const btnPrimary: React.CSSProperties = { padding: '5px 14px', borderRadius: '8px', border: 'none', background: 'var(--brand)', color: '#fff', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }
