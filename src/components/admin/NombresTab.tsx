'use client'

import { useState } from 'react'
import type { NameOverride } from '@/types/database'

interface Props {
  overrides: NameOverride[]
  saving: boolean
  onUpsert: (original: string, type: 'license' | 'studio', display: string) => Promise<boolean>
  onDelete: (id: string) => Promise<boolean>
}

export function NombresTab({ overrides, saving, onUpsert, onDelete }: Props) {
  const [form, setForm] = useState({ original: '', type: 'license' as 'license' | 'studio', display: '' })
  const [confirmDel, setConfirmDel] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)

  async function handleSave() {
    if (!form.original.trim() || !form.display.trim()) return
    const ok = await onUpsert(form.original.trim(), form.type, form.display.trim())
    if (ok) { setForm({ original: '', type: 'license', display: '' }); setShowForm(false) }
  }

  const licenses = overrides.filter(o => o.override_type === 'license')
  const studios = overrides.filter(o => o.override_type === 'studio')

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div style={{ fontSize: '13px', color: 'var(--txt-3)' }}>
          Renombra licencias y estudios en la vista pública sin tocar el código.
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: '8px 18px', borderRadius: '11px', background: 'var(--brand)', color: '#fff', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
          + Agregar
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: 'var(--surface-2)', border: '1px solid rgba(0,174,239,.3)', borderRadius: '16px', padding: '18px', marginBottom: '18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 160px 1fr', gap: '10px', alignItems: 'end' }}>
            <div>
              <label style={lbl}>Nombre original (en el código)</label>
              <input value={form.original} onChange={e => setForm(p => ({ ...p, original: e.target.value }))} placeholder="Ej: Gabby's Dollhouse" style={inp} />
            </div>
            <div>
              <label style={lbl}>Tipo</label>
              <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value as 'license' | 'studio' }))} style={inp}>
                <option value="license">Licencia</option>
                <option value="studio">Estudio</option>
              </select>
            </div>
            <div>
              <label style={lbl}>Nombre a mostrar</label>
              <input value={form.display} onChange={e => setForm(p => ({ ...p, display: e.target.value }))} placeholder="Ej: Gabby & the Dollhouse" style={inp} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '12px' }}>
            <button onClick={() => setShowForm(false)} style={{ padding: '7px 14px', borderRadius: '9px', border: '1px solid var(--line-2)', background: 'transparent', color: 'var(--txt-3)', fontSize: '12px', cursor: 'pointer' }}>Cancelar</button>
            <button onClick={handleSave} disabled={saving || !form.original || !form.display} style={{ padding: '7px 16px', borderRadius: '9px', background: 'var(--brand)', color: '#fff', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer', opacity: saving ? .6 : 1 }}>
              {saving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>
      )}

      {/* Groups */}
      {[{ title: 'Licencias', items: licenses }, { title: 'Estudios', items: studios }].map(group => (
        <div key={group.title} style={{ marginBottom: '22px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--txt-4)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '10px' }}>{group.title}</div>
          {group.items.length === 0 && (
            <div style={{ fontSize: '12px', color: 'var(--txt-4)', padding: '12px 0' }}>Sin sobrescrituras configuradas.</div>
          )}
          {group.items.map(o => (
            <div key={o.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '12px', marginBottom: '6px' }}>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '12px', color: 'var(--txt-3)' }}>{o.original_name}</span>
                <span style={{ fontSize: '12px', color: 'var(--txt-4)', margin: '0 8px' }}>→</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{o.display_name}</span>
              </div>
              {confirmDel === o.id ? (
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button onClick={() => { onDelete(o.id); setConfirmDel(null) }} style={{ padding: '4px 10px', borderRadius: '7px', background: 'rgba(248,113,113,.18)', border: '1px solid rgba(248,113,113,.35)', color: 'var(--danger)', fontSize: '11px', cursor: 'pointer' }}>Confirmar</button>
                  <button onClick={() => setConfirmDel(null)} style={{ padding: '4px 8px', borderRadius: '7px', border: '1px solid var(--line)', background: 'transparent', color: 'var(--txt-4)', fontSize: '11px', cursor: 'pointer' }}>✕</button>
                </div>
              ) : (
                <button onClick={() => setConfirmDel(o.id)} style={{ padding: '4px 8px', borderRadius: '7px', border: '1px solid transparent', background: 'transparent', color: 'var(--txt-4)', fontSize: '13px', cursor: 'pointer' }}>🗑</button>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const lbl: React.CSSProperties = { display: 'block', fontSize: '10.5px', fontWeight: 600, color: 'var(--txt-4)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '5px' }
const inp: React.CSSProperties = { width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--line-2)', background: 'var(--bg-2)', color: 'var(--txt)', fontSize: '12.5px', outline: 'none' }
