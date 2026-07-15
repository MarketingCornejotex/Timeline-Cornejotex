'use client'

import { useMemo, useState } from 'react'
import { usePropertiesAdmin } from '@/lib/hooks/usePropertiesAdmin'
import { ALL_YEAR } from '@/data/all-year'
import { QUARTERS, QUARTERS_ORDER } from '@/data/quarters'
import type { QuarterKey } from '@/data/quarters'
import { SEG_LABELS, type SegmentKey, type LicenseType } from '@/data/segments'
import type { DynamicLicense, DynamicLicenseInsert } from '@/types/database'

const SEGS_ORDER: SegmentKey[] = ['bebes', 'ninos', 'adultos', 'hogar', 'mascotas']

// ─── Inventario estático (all-year.ts + quarters.ts) agrupado por nombre ────
// Sirve solo como catálogo de referencia (nombre, licenciante, departamentos
// por defecto). La temporalidad efectiva de cada propiedad SIEMPRE la decide
// dynamic_licenses: por defecto "Todo el año", y un trimestre solo si el
// admin lo asigna junto con un evento especial desde esta pestaña.

interface StaticContext {
  isAllYear: boolean
  quarter: QuarterKey | null
  monthId: string | null
}

interface StaticProperty {
  name: string
  licensor: string
  segs: SegmentKey[]
  type: LicenseType
  category: string | null
  contexts: StaticContext[]
}

const MONTH_LABELS: Record<string, string> = {}

const STATIC_PROPERTIES = (() => {
  const map = new Map<string, StaticProperty>()
  function add(name: string, licensor: string, segs: SegmentKey[], type: LicenseType, ctx: StaticContext) {
    const key = name.toLowerCase()
    const existing = map.get(key)
    if (existing) existing.contexts.push(ctx)
    else map.set(key, { name, licensor, segs, type, category: null, contexts: [ctx] })
  }

  ALL_YEAR.forEach(group => {
    group.licenses.forEach(lic => {
      add(lic.name, group.licensor, lic.segs, 'ann', { isAllYear: true, quarter: null, monthId: null })
    })
  })

  QUARTERS_ORDER.forEach(qKey => {
    QUARTERS[qKey].months.forEach(month => {
      MONTH_LABELS[month.id] = month.name
      month.licenses.forEach(lic => {
        add(lic.name, lic.licensor, lic.segs, lic.type, { isAllYear: false, quarter: qKey, monthId: month.id })
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
  hasStaticOrigin: boolean
  isHidden: boolean
  isAllYear: boolean
  quarter: QuarterKey | null
  monthId: string | null
  segs: SegmentKey[]
  specialEvents: string | null
  type: LicenseType
  category: string | null
  isPublished: boolean
  originalContextsLabel: string | null
}

function buildRows(items: DynamicLicense[]): Row[] {
  const overrideByName = new Map(items.map(it => [it.name.toLowerCase(), it]))
  const rows: Row[] = []

  STATIC_PROPERTIES.forEach((prop, key) => {
    const override = overrideByName.get(key)
    const hadQuarterContext = prop.contexts.some(c => !c.isAllYear)
    const originalContextsLabel = hadQuarterContext
      ? prop.contexts.map(c => temporalidadLabel(c.isAllYear, c.quarter, c.monthId)).join(' + ')
      : null

    rows.push({
      key: `p:${key}`,
      name: prop.name,
      licensor: override?.licensor ?? prop.licensor,
      dbId: override?.id ?? null,
      isCustom: !!override,
      hasStaticOrigin: true,
      isHidden: override?.is_hidden ?? false,
      // Sin override, toda propiedad parte como "Todo el año" — el trimestre
      // estático original queda solo como referencia (originalContextsLabel).
      isAllYear: override ? override.is_all_year : true,
      quarter: override ? (override.quarter as QuarterKey | null) : null,
      monthId: override ? override.month_id : null,
      segs: (override ? override.segs : prop.segs) as SegmentKey[],
      specialEvents: override?.special_events ?? null,
      type: (override?.type ?? prop.type) as LicenseType,
      category: override?.category ?? prop.category,
      isPublished: override?.is_published ?? true,
      originalContextsLabel,
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
        hasStaticOrigin: false,
        isHidden: it.is_hidden,
        isAllYear: it.is_all_year,
        quarter: it.quarter as QuarterKey | null,
        monthId: it.month_id,
        segs: it.segs as SegmentKey[],
        specialEvents: it.special_events,
        type: it.type,
        category: it.category,
        isPublished: it.is_published,
        originalContextsLabel: null,
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
  const { items, loading, saving, error, create, update, remove } = usePropertiesAdmin()
  const rows = useMemo(() => buildRows(items), [items])

  const [search, setSearch] = useState('')
  const [onlyCustom, setOnlyCustom] = useState(false)
  const [showHidden, setShowHidden] = useState(false)
  const [editKey, setEditKey] = useState<string | null>(null)
  const [draft, setDraft] = useState<DraftState | null>(null)
  const [rowError, setRowError] = useState<string | null>(null)
  const [confirmKey, setConfirmKey] = useState<string | null>(null)

  const hiddenCount = rows.filter(r => r.isHidden).length

  const q = search.trim().toLowerCase()
  const filtered = rows.filter(r =>
    r.isHidden === showHidden &&
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

  function changeSpecialEvents(value: string) {
    setDraft(prev => {
      if (!prev) return prev
      // Sin evento especial no se puede sostener un trimestre asignado:
      // se vuelve automáticamente al estado general ("Todo el año").
      if (!value.trim() && !prev.isAllYear) {
        return { ...prev, specialEvents: value, isAllYear: true, quarter: null, monthId: null }
      }
      return { ...prev, specialEvents: value }
    })
  }

  async function saveRow(row: Row) {
    if (!draft) return
    if (!draft.isAllYear && !draft.quarter) {
      setRowError('Selecciona un trimestre o activa "Todo el año"')
      return
    }
    if (!draft.isAllYear && !draft.specialEvents.trim()) {
      setRowError('Un trimestre solo puede asignarse junto con un evento especial')
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
          is_hidden: false,
          ...editableFields,
        } as DynamicLicenseInsert)

    if (ok) cancelEdit()
  }

  async function confirmDeleteOrHide(row: Row) {
    if (row.dbId && !row.hasStaticOrigin) {
      await remove(row.dbId)
    } else if (row.dbId) {
      await update(row.dbId, { is_hidden: true })
    } else {
      await create({
        name: row.name, licensor: row.licensor, type: row.type, category: row.category,
        quarter: row.quarter, is_all_year: row.isAllYear, month_id: row.monthId, segs: row.segs,
        special_events: row.specialEvents, is_published: row.isPublished, is_hidden: true,
      } as DynamicLicenseInsert)
    }
    setConfirmKey(null)
  }

  async function restoreRow(row: Row) {
    if (!row.dbId) return
    await update(row.dbId, { is_hidden: false })
  }

  const confirmRow = confirmKey ? rows.find(r => r.key === confirmKey) ?? null : null

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '13px', color: 'var(--txt-3)', flexShrink: 0 }}>
          {filtered.length} de {rows.filter(r => r.isHidden === showHidden).length} propiedades
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nombre o licenciante..."
          style={{ ...inp, flex: 1, minWidth: '200px', maxWidth: '340px' }}
        />
        <button type="button" onClick={() => setOnlyCustom(v => !v)} style={toggleBtn(onlyCustom)}>
          Solo editadas
        </button>
        {hiddenCount > 0 && (
          <button type="button" onClick={() => { setShowHidden(v => !v); cancelEdit() }} style={toggleBtn(showHidden)}>
            {showHidden ? 'Ver activas' : `Ver ocultas (${hiddenCount})`}
          </button>
        )}
      </div>

      <p style={{ fontSize: '11.5px', color: 'var(--txt-4)', margin: '0 0 16px' }}>
        Toda propiedad parte como &quot;Todo el año&quot;. Un trimestre (Q) solo puede asignarse si se registra un evento especial
        para ese periodo; si borras el evento, la propiedad vuelve al estado general. Los cambios se reflejan automáticamente
        en el catálogo público.
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
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12.5px', minWidth: '900px' }}>
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
                const qDisabled = isEditing && draft ? !draft.specialEvents.trim() : false
                return (
                  <tr key={row.key} style={{ borderTop: '1px solid var(--line)', background: isEditing ? 'rgba(0,174,239,.05)' : 'transparent', opacity: row.isHidden ? .6 : 1 }}>
                    <td style={td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 600, color: '#fff' }}>{row.name}</span>
                        <span style={{ fontSize: '9.5px', padding: '1px 6px', borderRadius: '5px', fontWeight: 700, background: row.isCustom ? 'rgba(0,174,239,.15)' : 'rgba(255,255,255,.06)', color: row.isCustom ? 'var(--brand-2)' : 'var(--txt-4)' }}>
                          {row.isCustom ? 'Personalizada' : 'Original'}
                        </span>
                        {row.isHidden && (
                          <span style={{ fontSize: '9.5px', padding: '1px 6px', borderRadius: '5px', fontWeight: 700, background: 'rgba(248,113,113,.15)', color: 'var(--danger)' }}>Oculta</span>
                        )}
                      </div>
                      <div style={{ color: 'var(--txt-3)', marginTop: '2px' }}>{row.licensor}</div>
                      {row.originalContextsLabel && (
                        <div style={{ color: 'var(--txt-4)', fontSize: '10.5px', marginTop: '1px', fontStyle: 'italic' }}>Catálogo original: {row.originalContextsLabel}</div>
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
                            {QUARTERS_ORDER.map(qk => <option key={qk} value={qk} disabled={qDisabled}>{qk}</option>)}
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
                          {qDisabled && <div style={{ fontSize: '10.5px', color: 'var(--txt-4)' }}>Agrega un evento especial para poder asignar un trimestre</div>}
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
                          onChange={e => changeSpecialEvents(e.target.value)}
                          placeholder="Ej: Navidad, Black Friday"
                          style={{ ...inp, minWidth: '170px' }}
                        />
                      ) : (
                        <span style={{ color: row.specialEvents ? 'var(--txt-2)' : 'var(--txt-4)' }}>{row.specialEvents || '—'}</span>
                      )}
                    </td>

                    <td style={{ ...td, textAlign: 'right', whiteSpace: 'nowrap' }}>
                      {row.isHidden ? (
                        <button onClick={() => restoreRow(row)} disabled={saving} style={btnGhost}>Restaurar</button>
                      ) : isEditing ? (
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button onClick={cancelEdit} style={btnGhost}>Cancelar</button>
                          <button onClick={() => saveRow(row)} disabled={saving} style={{ ...btnPrimary, opacity: saving ? .6 : 1 }}>
                            {saving ? 'Guardando...' : 'Guardar'}
                          </button>
                        </div>
                      ) : (
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button onClick={() => openEdit(row)} style={btnGhost}>Editar</button>
                          <button onClick={() => setConfirmKey(row.key)} style={{ ...btnGhost, color: 'var(--danger)', borderColor: 'rgba(248,113,113,.3)' }}>Eliminar</button>
                        </div>
                      )}
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--txt-4)' }}>
                    {showHidden ? 'No hay propiedades ocultas.' : 'Sin resultados para esa búsqueda.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {confirmRow && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ background: 'var(--surface-2)', border: '1px solid var(--line-2)', borderRadius: '16px', padding: '22px', maxWidth: '400px', width: '100%' }}>
            <div style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '15px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
              {confirmRow.hasStaticOrigin ? 'Ocultar propiedad' : 'Eliminar propiedad'}
            </div>
            <p style={{ fontSize: '12.5px', color: 'var(--txt-2)', lineHeight: 1.5, margin: '0 0 18px' }}>
              {confirmRow.hasStaticOrigin
                ? <>&quot;{confirmRow.name}&quot; viene del catálogo base y no puede borrarse del todo. Se <strong>ocultará</strong> del admin y del catálogo público. Podrás restaurarla luego desde &quot;Ver ocultas&quot;.</>
                : <>Esta acción borra &quot;{confirmRow.name}&quot; de forma <strong>permanente</strong> y no se puede deshacer.</>}
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button onClick={() => setConfirmKey(null)} style={btnGhost}>Cancelar</button>
              <button
                onClick={() => confirmDeleteOrHide(confirmRow)}
                disabled={saving}
                style={{ padding: '7px 16px', borderRadius: '9px', border: 'none', background: 'var(--danger)', color: '#fff', fontSize: '12px', fontWeight: 600, cursor: 'pointer', opacity: saving ? .6 : 1 }}
              >
                {confirmRow.hasStaticOrigin ? 'Ocultar' : 'Eliminar definitivamente'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function toggleBtn(active: boolean): React.CSSProperties {
  return {
    padding: '7px 14px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px', fontWeight: 600, flexShrink: 0,
    border: `1px solid ${active ? 'var(--brand)' : 'var(--line-2)'}`,
    background: active ? 'rgba(0,174,239,.15)' : 'transparent',
    color: active ? 'var(--brand-2)' : 'var(--txt-3)',
  }
}

const th: React.CSSProperties = { textAlign: 'left', padding: '10px 12px', fontSize: '10.5px', fontWeight: 700, color: 'var(--txt-4)', textTransform: 'uppercase', letterSpacing: '.05em', whiteSpace: 'nowrap' }
const td: React.CSSProperties = { padding: '10px 12px', verticalAlign: 'top' }
const inp: React.CSSProperties = { width: '100%', padding: '7px 10px', borderRadius: '9px', border: '1px solid var(--line-2)', background: 'var(--bg-2)', color: 'var(--txt)', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }
const btnGhost: React.CSSProperties = { padding: '5px 12px', borderRadius: '8px', border: '1px solid var(--line-2)', background: 'transparent', color: 'var(--txt-3)', fontSize: '11px', cursor: 'pointer', fontWeight: 500 }
const btnPrimary: React.CSSProperties = { padding: '5px 14px', borderRadius: '8px', border: 'none', background: 'var(--brand)', color: '#fff', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }
