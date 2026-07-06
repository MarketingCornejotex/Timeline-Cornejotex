'use client'

import { useState } from 'react'
import type { NameOverride } from '@/types/database'

interface Props {
  overrides: NameOverride[]
  saving: boolean
  onUpsert: (original: string, type: 'license' | 'studio', display: string) => Promise<boolean>
  onDelete: (id: string) => Promise<boolean>
}

type FormState = { original: string; type: 'license' | 'studio'; display: string }
const EMPTY: FormState = { original: '', type: 'license', display: '' }

export function NombresTab({ overrides, saving, onUpsert, onDelete }: Props) {
  const [form, setForm] = useState<FormState | null>(null)
  const [editId, setEditId] = useState<string | null>(null)
  const [confirmDel, setConfirmDel] = useState<string | null>(null)

  function openCreate() {
    setForm({ ...EMPTY })
    setEditId(null)
    setTimeout(() => document.getElementById('nombres-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  function openEdit(o: NameOverride) {
    setForm({ original: o.original_name, type: o.override_type as 'license' | 'studio', display: o.display_name })
    setEditId(o.id)
    setConfirmDel(null)
    setTimeout(() => document.getElementById('nombres-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => prev ? { ...prev, [key]: value } : prev)
  }

  async function handleSave() {
    if (!form || !form.original.trim() || !form.display.trim()) return
    const ok = await onUpsert(form.original.trim(), form.type, form.display.trim())
    if (ok) { setForm(null); setEditId(null) }
  }

  const licenses = overrides.filter(o => o.override_type === 'license')
  const studios  = overrides.filter(o => o.override_type === 'studio')

  return (
    <div>
      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div style={{ fontSize: '13px', color: 'var(--txt-3)' }}>
          Renombra licencias y estudios en la vista pública sin tocar el código. · {overrides.length} configurados
        </div>
        <button
          onClick={openCreate}
          style={{ padding: '8px 18px', borderRadius: '11px', background: 'var(--brand)', color: '#fff', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer' }}
        >
          + Agregar
        </button>
      </div>

      {/* ── Formulario (estilo EstrenosTab) ── */}
      {form && (
        <div
          id="nombres-form"
          style={{ background: 'var(--surface-2)', border: '1px solid rgba(0,174,239,.3)', borderRadius: '18px', padding: '20px', marginBottom: '20px' }}
        >
          <div style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '16px' }}>
            {editId ? 'Editar sobrescritura' : 'Nueva sobrescritura'}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 1fr', gap: '12px', marginBottom: '12px' }}>
            {/* Nombre original */}
            <div>
              <label style={lbl}>Nombre original (en el código) *</label>
              <input
                value={form.original}
                onChange={e => set('original', e.target.value)}
                placeholder="Ej: Gabby's Dollhouse"
                disabled={!!editId}
                style={{ ...inp, opacity: editId ? 0.6 : 1, cursor: editId ? 'not-allowed' : 'text' }}
              />
              {editId && (
                <div style={{ fontSize: '10px', color: 'var(--txt-4)', marginTop: '4px' }}>El nombre original no puede cambiarse; elimina y crea uno nuevo si es necesario.</div>
              )}
            </div>

            {/* Tipo */}
            <div>
              <label style={lbl}>Tipo</label>
              <select
                value={form.type}
                onChange={e => set('type', e.target.value as 'license' | 'studio')}
                style={inp}
              >
                <option value="license">Licencia</option>
                <option value="studio">Estudio</option>
              </select>
            </div>

            {/* Nombre a mostrar */}
            <div>
              <label style={lbl}>Nombre a mostrar en el catálogo *</label>
              <input
                value={form.display}
                onChange={e => set('display', e.target.value)}
                placeholder="Ej: Gabby & the Dollhouse"
                style={inp}
              />
            </div>
          </div>

          {/* Preview */}
          {form.original && form.display && (
            <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(0,174,239,.06)', border: '1px solid rgba(0,174,239,.15)', marginBottom: '12px', fontSize: '12px', color: 'var(--txt-2)' }}>
              Vista previa: <span style={{ color: 'var(--txt-3)' }}>{form.original}</span>
              <span style={{ margin: '0 10px', color: 'var(--txt-4)' }}>→</span>
              <span style={{ color: 'var(--brand-2)', fontWeight: 600 }}>{form.display}</span>
            </div>
          )}

          {/* Botones */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '8px', borderTop: '1px solid var(--line)' }}>
            <button
              onClick={() => { setForm(null); setEditId(null) }}
              style={{ padding: '8px 16px', borderRadius: '10px', border: '1px solid var(--line-2)', background: 'transparent', color: 'var(--txt-3)', fontSize: '12px', cursor: 'pointer' }}
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !form.original.trim() || !form.display.trim()}
              style={{ padding: '8px 18px', borderRadius: '10px', background: 'var(--brand)', color: '#fff', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer', opacity: (saving || !form.original.trim() || !form.display.trim()) ? .5 : 1 }}
            >
              {saving ? 'Guardando...' : (editId ? 'Guardar cambios' : 'Crear')}
            </button>
          </div>
        </div>
      )}

      {/* ── Grupos: Licencias / Estudios ── */}
      {[
        { title: 'Licencias', items: licenses },
        { title: 'Estudios', items: studios },
      ].map(group => (
        <div key={group.title} style={{ marginBottom: '24px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--txt-4)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
            {group.title} <span style={{ fontWeight: 500, color: 'var(--txt-5)' }}>({group.items.length})</span>
          </div>

          {group.items.length === 0 && (
            <div style={{ fontSize: '12px', color: 'var(--txt-4)', padding: '12px 0' }}>Sin sobrescrituras configuradas.</div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {group.items.map(o => {
              const isEditing = editId === o.id
              return (
                <div
                  key={o.id}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '10px 14px', background: 'var(--surface)',
                    border: `1px solid ${isEditing ? 'rgba(0,174,239,.4)' : 'var(--line)'}`,
                    borderRadius: '12px', transition: 'border-color .15s',
                  }}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '12px', color: 'var(--txt-3)' }}>{o.original_name}</span>
                      <span style={{ fontSize: '12px', color: 'var(--txt-5)' }}>→</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>{o.display_name}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => isEditing ? (setForm(null), setEditId(null)) : openEdit(o)}
                    style={{
                      padding: '5px 12px', borderRadius: '8px',
                      border: `1px solid ${isEditing ? 'rgba(0,174,239,.4)' : 'var(--line-2)'}`,
                      background: isEditing ? 'rgba(0,174,239,.1)' : 'transparent',
                      color: isEditing ? 'var(--brand-2)' : 'var(--txt-3)',
                      fontSize: '11px', cursor: 'pointer', fontWeight: 500,
                    }}
                  >
                    {isEditing ? '↑ Cerrar' : 'Editar'}
                  </button>

                  {confirmDel === o.id ? (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => { onDelete(o.id); setConfirmDel(null) }} style={{ padding: '4px 10px', borderRadius: '7px', background: 'rgba(248,113,113,.18)', border: '1px solid rgba(248,113,113,.35)', color: 'var(--danger)', fontSize: '11px', cursor: 'pointer' }}>Confirmar</button>
                      <button onClick={() => setConfirmDel(null)} style={{ padding: '4px 8px', borderRadius: '7px', border: '1px solid var(--line)', background: 'transparent', color: 'var(--txt-4)', fontSize: '11px', cursor: 'pointer' }}>✕</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmDel(o.id)} style={{ padding: '4px 8px', borderRadius: '7px', border: '1px solid transparent', background: 'transparent', color: 'var(--txt-4)', fontSize: '13px', cursor: 'pointer' }}>🗑</button>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

const lbl: React.CSSProperties = { display: 'block', fontSize: '10.5px', fontWeight: 600, color: 'var(--txt-4)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '5px' }
const inp: React.CSSProperties = { width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--line-2)', background: 'var(--bg-2)', color: 'var(--txt)', fontSize: '12.5px', outline: 'none', boxSizing: 'border-box' }
