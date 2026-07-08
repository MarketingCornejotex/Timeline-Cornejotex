'use client'

import { useState } from 'react'
import { usePropertiesAdmin } from '@/lib/hooks/usePropertiesAdmin'
import type { DynamicLicense, DynamicLicenseInsert } from '@/types/database'

const QUARTERS_LIST = ['Q1', 'Q2', 'Q3', 'Q4'] as const
const MONTHS = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC']
const MONTH_LABELS: Record<string, string> = {
  ENE:'Enero', FEB:'Febrero', MAR:'Marzo', ABR:'Abril', MAY:'Mayo', JUN:'Junio',
  JUL:'Julio', AGO:'Agosto', SEP:'Septiembre', OCT:'Octubre', NOV:'Noviembre', DIC:'Diciembre',
}
const TYPES_MAP = [
  { key: 'new', label: 'Nueva Propiedad' },
  { key: 'ann', label: 'Aniversario' },
  { key: 'opp', label: 'Oportunidad' },
  { key: 'ev',  label: 'Evento' },
] as const

const SEGS = [
  { key: 'bebes',   label: 'Bebés' },
  { key: 'ninos',   label: 'Niños' },
  { key: 'adultos', label: 'Adultos' },
  { key: 'hogar',   label: 'Hogar' },
  { key: 'mascotas',label: 'Mascotas' },
] as const

type FormState = Omit<DynamicLicenseInsert, 'segs'> & { segs: string[] }

const EMPTY: FormState = {
  name: '', licensor: '', type: 'new',
  quarter: null, is_all_year: false, month_id: null,
  segs: ['adultos'], category: null, is_published: true,
}

export function PropiedadesTab() {
  const { items, loading, saving, error, create, update, remove } = usePropertiesAdmin()
  const [form, setForm] = useState<FormState | null>(null)
  const [editId, setEditId] = useState<string | null>(null)
  const [confirmDel, setConfirmDel] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  function openCreate() {
    setForm({ ...EMPTY })
    setEditId(null)
    setTimeout(() => document.getElementById('props-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  function openEdit(item: DynamicLicense) {
    setForm({
      name: item.name, licensor: item.licensor, type: item.type,
      quarter: item.quarter, is_all_year: item.is_all_year, month_id: item.month_id,
      segs: item.segs, category: item.category, is_published: item.is_published,
    })
    setEditId(item.id)
    setConfirmDel(null)
    setTimeout(() => document.getElementById('props-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => prev ? { ...prev, [key]: value } : prev)
  }

  function toggleSeg(seg: string) {
    if (!form) return
    const segs = form.segs.includes(seg)
      ? form.segs.filter(s => s !== seg)
      : [...form.segs, seg]
    set('segs', segs.length ? segs : ['adultos'])
  }

  async function handleSave() {
    if (!form || !form.name.trim() || !form.licensor.trim()) return
    if (!form.is_all_year && !form.quarter) {
      setFormError('Selecciona un trimestre o activa "Todo el año"')
      return
    }
    setFormError(null)
    const payload: DynamicLicenseInsert = {
      ...form,
      name: form.name.trim(),
      licensor: form.licensor.trim(),
      quarter: form.is_all_year ? null : form.quarter,
      month_id: form.is_all_year ? null : form.month_id,
    }
    const ok = editId ? await update(editId, payload) : await create(payload)
    if (ok) { setForm(null); setEditId(null) }
  }

  const q = search.toLowerCase()
  const filtered = search
    ? items.filter(i => i.name.toLowerCase().includes(q) || i.licensor.toLowerCase().includes(q))
    : items

  const typeLabel = (t: string) => TYPES_MAP.find(x => x.key === t)?.label ?? t

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '13px', color: 'var(--txt-3)', flexShrink: 0 }}>
          {items.length} propiedades dinámicas
        </div>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nombre o licenciatario..."
          style={{ ...inp, flex: 1, minWidth: '200px', maxWidth: '360px' }}
        />
        <button
          onClick={openCreate}
          style={{ marginLeft: 'auto', padding: '8px 18px', borderRadius: '11px', background: 'var(--brand)', color: '#fff', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', flexShrink: 0 }}
        >
          + Nueva propiedad
        </button>
      </div>

      {error && (
        <div style={{ padding: '10px 14px', background: 'rgba(248,113,113,.12)', border: '1px solid rgba(248,113,113,.3)', borderRadius: '10px', color: 'var(--danger)', fontSize: '12px', marginBottom: '14px' }}>{error}</div>
      )}

      {/* Formulario */}
      {form && (
        <div id="props-form" style={{ background: 'var(--surface-2)', border: '1px solid rgba(0,174,239,.3)', borderRadius: '18px', padding: '20px', marginBottom: '20px' }}>
          <div style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '16px' }}>
            {editId ? 'Editar propiedad' : 'Nueva propiedad'}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            {/* Nombre */}
            <div>
              <label style={lbl}>Nombre de la propiedad *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Ej: Bluey" style={inp} />
            </div>

            {/* Licenciatario */}
            <div>
              <label style={lbl}>Licenciatario / Estudio *</label>
              <input value={form.licensor} onChange={e => set('licensor', e.target.value)} placeholder="Ej: BBC Studios" style={inp} />
            </div>

            {/* Tipo */}
            <div>
              <label style={lbl}>Tipo</label>
              <select value={form.type} onChange={e => set('type', e.target.value as FormState['type'])} style={inp}>
                {TYPES_MAP.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
              </select>
            </div>

            {/* Categoría */}
            <div>
              <label style={lbl}>Categoría (opcional)</label>
              <input value={form.category ?? ''} onChange={e => set('category', e.target.value || null)} placeholder="Ej: Ropa Bebé, Útiles, Pijamas..." style={inp} />
            </div>

            {/* Toggle todo el año */}
            <div style={{ gridColumn: '1/-1' }}>
              <label style={lbl}>Temporalidad</label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => { set('is_all_year', true); set('quarter', null); set('month_id', null); setFormError(null) }}
                  style={{
                    padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px', fontWeight: 600,
                    border: `1px solid ${form.is_all_year ? 'var(--brand)' : 'var(--line-2)'}`,
                    background: form.is_all_year ? 'rgba(0,174,239,.15)' : 'transparent',
                    color: form.is_all_year ? 'var(--brand-2)' : 'var(--txt-3)',
                  }}
                >
                  🗓 Todo el año
                </button>
                {QUARTERS_LIST.map(q => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => { set('is_all_year', false); set('quarter', q); setFormError(null) }}
                    style={{
                      padding: '8px 16px', borderRadius: '10px', cursor: 'pointer', fontSize: '12px', fontWeight: 600,
                      border: `1px solid ${!form.is_all_year && form.quarter === q ? 'var(--brand)' : 'var(--line-2)'}`,
                      background: !form.is_all_year && form.quarter === q ? 'rgba(0,174,239,.15)' : 'transparent',
                      color: !form.is_all_year && form.quarter === q ? 'var(--brand-2)' : 'var(--txt-3)',
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
              {formError && (
                <div style={{ fontSize: '11px', color: 'var(--danger)', marginTop: '6px', fontWeight: 500 }}>
                  ⚠ {formError}
                </div>
              )}
            </div>

            {/* Mes (solo si quarter seleccionado) */}
            {!form.is_all_year && form.quarter && (
              <div>
                <label style={lbl}>Mes (opcional)</label>
                <select value={form.month_id ?? ''} onChange={e => set('month_id', e.target.value || null)} style={inp}>
                  <option value="">— Cualquier mes del trimestre</option>
                  {MONTHS.map(m => <option key={m} value={m}>{MONTH_LABELS[m]}</option>)}
                </select>
              </div>
            )}

            {/* Departamentos */}
            <div style={{ gridColumn: '1/-1' }}>
              <label style={lbl}>Departamentos</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {SEGS.map(s => {
                  const active = form.segs.includes(s.key)
                  return (
                    <button
                      key={s.key}
                      type="button"
                      onClick={() => toggleSeg(s.key)}
                      style={{
                        padding: '6px 14px', borderRadius: '20px', cursor: 'pointer', fontSize: '12px', fontWeight: active ? 700 : 500,
                        border: `1px solid ${active ? 'rgba(0,174,239,.5)' : 'var(--line-2)'}`,
                        background: active ? 'rgba(0,174,239,.15)' : 'transparent',
                        color: active ? 'var(--brand-2)' : 'var(--txt-3)',
                      }}
                    >
                      {s.label}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Publicado */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => set('is_published', !form.is_published)}
                style={{ width: '42px', height: '24px', borderRadius: '12px', background: form.is_published ? 'var(--brand)' : 'var(--line-3)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background .2s' }}
              >
                <span style={{ position: 'absolute', top: '3px', left: form.is_published ? '21px' : '3px', width: '18px', height: '18px', borderRadius: '50%', background: '#fff', transition: 'left .2s', boxShadow: '0 1px 4px rgba(0,0,0,.4)' }} />
              </button>
              <span style={{ fontSize: '12px', color: 'var(--txt-2)', fontWeight: 500 }}>{form.is_published ? 'Publicado' : 'Borrador'}</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '8px', borderTop: '1px solid var(--line)' }}>
            <button onClick={() => { setForm(null); setEditId(null) }} style={{ padding: '8px 16px', borderRadius: '10px', border: '1px solid var(--line-2)', background: 'transparent', color: 'var(--txt-3)', fontSize: '12px', cursor: 'pointer' }}>Cancelar</button>
            <button onClick={handleSave} disabled={saving || !form.name.trim() || !form.licensor.trim()} style={{ padding: '8px 18px', borderRadius: '10px', background: 'var(--brand)', color: '#fff', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer', opacity: (saving || !form.name.trim() || !form.licensor.trim()) ? .5 : 1 }}>
              {saving ? 'Guardando...' : (editId ? 'Guardar cambios' : 'Crear')}
            </button>
          </div>
        </div>
      )}

      {/* Lista */}
      {loading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--txt-3)', fontSize: '13px', padding: '24px 0' }}>
          <div style={{ width: '14px', height: '14px', border: '2px solid var(--brand)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
          Cargando...
        </div>
      )}

      {!loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {filtered.map(item => {
            const isEditing = editId === item.id
            const temporal = item.is_all_year
              ? 'Todo el año'
              : [item.quarter, item.month_id ? MONTH_LABELS[item.month_id] : null].filter(Boolean).join(' · ')
            return (
              <div key={item.id} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                background: 'var(--surface)',
                border: `1px solid ${isEditing ? 'rgba(0,174,239,.4)' : 'var(--line)'}`,
                borderRadius: '14px', padding: '11px 14px',
              }}>
                {/* Color bar by type */}
                <div style={{ width: '4px', height: '40px', borderRadius: '2px', background: item.type === 'ann' ? '#fbbf24' : item.type === 'new' ? 'var(--badge-new)' : item.type === 'ev' ? 'var(--brand)' : 'var(--txt-4)', flexShrink: 0 }} />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, fontSize: '13px', color: '#fff' }}>{item.name}</span>
                    <span style={{ fontSize: '10px', padding: '1px 7px', borderRadius: '6px', background: 'rgba(255,255,255,.07)', color: 'var(--txt-3)', fontWeight: 600 }}>{typeLabel(item.type)}</span>
                    {!item.is_published && (
                      <span style={{ fontSize: '10px', padding: '1px 7px', borderRadius: '6px', background: 'rgba(255,255,255,.04)', color: 'var(--txt-4)', fontWeight: 600 }}>Borrador</span>
                    )}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--txt-3)', marginTop: '2px' }}>
                    {item.licensor} · {temporal} · {item.segs.join(', ')}
                    {item.category ? ` · ${item.category}` : ''}
                  </div>
                </div>

                <button
                  onClick={() => isEditing ? (setForm(null), setEditId(null)) : openEdit(item)}
                  style={{ padding: '5px 12px', borderRadius: '8px', border: `1px solid ${isEditing ? 'rgba(0,174,239,.4)' : 'var(--line-2)'}`, background: isEditing ? 'rgba(0,174,239,.1)' : 'transparent', color: isEditing ? 'var(--brand-2)' : 'var(--txt-3)', fontSize: '11px', cursor: 'pointer', fontWeight: 500 }}
                >
                  {isEditing ? '↑ Cerrar' : 'Editar'}
                </button>

                {confirmDel === item.id ? (
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => { remove(item.id); setConfirmDel(null) }} style={{ padding: '4px 10px', borderRadius: '7px', background: 'rgba(248,113,113,.18)', border: '1px solid rgba(248,113,113,.35)', color: 'var(--danger)', fontSize: '11px', cursor: 'pointer' }}>Confirmar</button>
                    <button onClick={() => setConfirmDel(null)} style={{ padding: '4px 8px', borderRadius: '7px', border: '1px solid var(--line)', background: 'transparent', color: 'var(--txt-4)', fontSize: '11px', cursor: 'pointer' }}>✕</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirmDel(item.id)} style={{ padding: '4px 8px', borderRadius: '7px', border: '1px solid transparent', background: 'transparent', color: 'var(--txt-4)', fontSize: '13px', cursor: 'pointer' }}>🗑</button>
                )}
              </div>
            )
          })}
          {filtered.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--txt-4)', fontSize: '13px' }}>
              {search ? 'Sin resultados para esa búsqueda.' : 'No hay propiedades dinámicas creadas aún.'}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const lbl: React.CSSProperties = { display: 'block', fontSize: '10.5px', fontWeight: 600, color: 'var(--txt-4)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '5px' }
const inp: React.CSSProperties = { width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--line-2)', background: 'var(--bg-2)', color: 'var(--txt)', fontSize: '12.5px', outline: 'none', boxSizing: 'border-box' }
