'use client'

import { useState } from 'react'
import type { Estreno, EstrenoInsert } from '@/types/database'

const QUARTERS_LIST = ['Q1', 'Q2', 'Q3', 'Q4'] as const
const TYPES = ['Película Marvel', 'Película DC', 'Película Disney', 'Película Animada', 'Película', 'Serie Animada', 'Concierto', 'Evento Global', 'Temporada Alta', 'Cumpleaños', 'Aniversario', 'Nueva Propiedad']

type EstrenoForm = Omit<EstrenoInsert, 'order_index'>

const EMPTY: EstrenoForm = {
  title: '', type: 'Película Animada', quarter: 'Q1',
  event_date: null, studio: null, description: null,
  poster_url: null, color_bg: '#1A237E', color_fg: '#ffffff',
  is_published: true,
}

interface Props {
  estrenos: Estreno[]
  saving: boolean
  onCreate: (data: EstrenoInsert) => Promise<boolean>
  onUpdate: (id: string, data: Partial<EstrenoInsert>) => Promise<boolean>
  onDelete: (id: string) => Promise<boolean>
}

export function EstrenosTab({ estrenos, saving, onCreate, onUpdate, onDelete }: Props) {
  const [form, setForm] = useState<EstrenoForm | null>(null)
  const [editId, setEditId] = useState<string | null>(null)
  const [confirmDel, setConfirmDel] = useState<string | null>(null)

  function openCreate() {
    setForm({ ...EMPTY })
    setEditId(null)
  }

  function openEdit(e: Estreno) {
    setForm({ title: e.title, type: e.type, quarter: e.quarter, event_date: e.event_date, studio: e.studio, description: e.description, poster_url: e.poster_url, color_bg: e.color_bg, color_fg: e.color_fg, is_published: e.is_published })
    setEditId(e.id)
    setConfirmDel(null)
  }

  function set<K extends keyof EstrenoForm>(key: K, value: EstrenoForm[K]) {
    setForm(prev => prev ? { ...prev, [key]: value } : prev)
  }

  async function handleSave() {
    if (!form) return
    const payload: EstrenoInsert = { ...form, order_index: estrenos.length }
    if (editId) {
      await onUpdate(editId, payload)
    } else {
      await onCreate(payload)
    }
    setForm(null)
    setEditId(null)
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div style={{ fontSize: '13px', color: 'var(--txt-3)' }}>{estrenos.length} estrenos · {estrenos.filter(e => e.is_published).length} publicados</div>
        <button
          onClick={openCreate}
          style={{ padding: '8px 18px', borderRadius: '11px', background: 'var(--brand)', color: '#fff', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
        >
          + Nuevo estreno
        </button>
      </div>

      {/* Form */}
      {form && (
        <div style={{ background: 'var(--surface-2)', border: '1px solid rgba(0,174,239,.3)', borderRadius: '18px', padding: '20px', marginBottom: '20px' }}>
          <div style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '16px' }}>
            {editId ? 'Editar estreno' : 'Nuevo estreno'}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
            {/* Title */}
            <div style={{ gridColumn: '1/-1' }}>
              <label style={lbl}>Título *</label>
              <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Ej: Spider-Man: Nueva Generación" style={inp} />
            </div>
            {/* Type */}
            <div>
              <label style={lbl}>Tipo</label>
              <select value={form.type} onChange={e => set('type', e.target.value)} style={inp}>
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            {/* Quarter */}
            <div>
              <label style={lbl}>Trimestre</label>
              <select value={form.quarter} onChange={e => set('quarter', e.target.value as 'Q1')} style={inp}>
                {QUARTERS_LIST.map(q => <option key={q}>{q}</option>)}
              </select>
            </div>
            {/* Event date */}
            <div>
              <label style={lbl}>Fecha de estreno</label>
              <input value={form.event_date ?? ''} onChange={e => set('event_date', e.target.value || null)} placeholder="Ej: Enero 2026" style={inp} />
            </div>
            {/* Studio */}
            <div>
              <label style={lbl}>Estudio / Licenciatario</label>
              <input value={form.studio ?? ''} onChange={e => set('studio', e.target.value || null)} placeholder="Ej: Marvel Studios" style={inp} />
            </div>
            {/* Poster URL */}
            <div style={{ gridColumn: '1/-1' }}>
              <label style={lbl}>URL del póster</label>
              <input value={form.poster_url ?? ''} onChange={e => set('poster_url', e.target.value || null)} placeholder="https://..." style={inp} />
            </div>
            {/* Description */}
            <div style={{ gridColumn: '1/-1' }}>
              <label style={lbl}>Descripción</label>
              <textarea rows={2} value={form.description ?? ''} onChange={e => set('description', e.target.value || null)} placeholder="Breve descripción..." style={{ ...inp, resize: 'none' }} />
            </div>
            {/* Colors */}
            <div>
              <label style={lbl}>Color de fondo</label>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input type="color" value={form.color_bg} onChange={e => set('color_bg', e.target.value)} style={{ width: '40px', height: '36px', borderRadius: '8px', border: '1px solid var(--line-2)', background: 'transparent', cursor: 'pointer', padding: '2px' }} />
                <input value={form.color_bg} onChange={e => set('color_bg', e.target.value)} style={{ ...inp, flex: 1 }} placeholder="#1A237E" />
              </div>
            </div>
            {/* Published toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', paddingTop: '20px' }}>
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
            <button onClick={handleSave} disabled={saving || !form.title} style={{ padding: '8px 18px', borderRadius: '10px', background: 'var(--brand)', color: '#fff', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer', opacity: saving ? .6 : 1 }}>
              {saving ? 'Guardando...' : (editId ? 'Guardar cambios' : 'Crear')}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {estrenos.map(e => (
          <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '14px', padding: '11px 14px' }}>
            {/* Color bar */}
            <div style={{ width: '4px', height: '40px', borderRadius: '2px', background: e.color_bg, flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: '13px', color: '#fff', marginBottom: '2px' }}>{e.title}</div>
              <div style={{ fontSize: '11px', color: 'var(--txt-3)' }}>{e.quarter} · {e.type}{e.studio ? ` · ${e.studio}` : ''}{e.event_date ? ` · ${e.event_date}` : ''}</div>
            </div>
            <span style={{ fontSize: '10px', fontWeight: 600, padding: '3px 10px', borderRadius: '20px', background: e.is_published ? 'rgba(46,211,158,.15)' : 'rgba(255,255,255,.06)', color: e.is_published ? 'var(--badge-new)' : 'var(--txt-4)', border: `1px solid ${e.is_published ? 'rgba(46,211,158,.3)' : 'var(--line)'}` }}>
              {e.is_published ? 'Publicado' : 'Borrador'}
            </span>
            <button onClick={() => openEdit(e)} style={{ padding: '5px 12px', borderRadius: '8px', border: '1px solid var(--line-2)', background: 'transparent', color: 'var(--txt-3)', fontSize: '11px', cursor: 'pointer' }}>Editar</button>
            {confirmDel === e.id ? (
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => { onDelete(e.id); setConfirmDel(null) }} style={{ padding: '5px 10px', borderRadius: '8px', background: 'rgba(248,113,113,.18)', border: '1px solid rgba(248,113,113,.35)', color: 'var(--danger)', fontSize: '11px', cursor: 'pointer' }}>Confirmar</button>
                <button onClick={() => setConfirmDel(null)} style={{ padding: '5px 8px', borderRadius: '8px', border: '1px solid var(--line)', background: 'transparent', color: 'var(--txt-4)', fontSize: '11px', cursor: 'pointer' }}>✕</button>
              </div>
            ) : (
              <button onClick={() => setConfirmDel(e.id)} style={{ padding: '5px 8px', borderRadius: '8px', border: '1px solid transparent', background: 'transparent', color: 'var(--txt-4)', fontSize: '13px', cursor: 'pointer' }}>🗑</button>
            )}
          </div>
        ))}
        {estrenos.length === 0 && <div style={{ textAlign: 'center', padding: '40px', color: 'var(--txt-4)', fontSize: '13px' }}>No hay estrenos cargados aún.</div>}
      </div>
    </div>
  )
}

const lbl: React.CSSProperties = { display: 'block', fontSize: '10.5px', fontWeight: 600, color: 'var(--txt-4)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '5px' }
const inp: React.CSSProperties = { width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--line-2)', background: 'var(--bg-2)', color: 'var(--txt)', fontSize: '12.5px', outline: 'none' }
