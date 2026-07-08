'use client'

import { useRef, useState, useMemo, useCallback } from 'react'
import { QUARTERS } from '@/data/quarters'
import { ALL_YEAR } from '@/data/all-year'
import { getBrandStyle } from '@/data/brand-colors'
import type { LicenseLogo, NameOverride } from '@/types/database'

interface Props {
  logos: LicenseLogo[]
  overrides: NameOverride[]
  dynamicLicenses?: { id: string; name: string; licensor: string }[]
  onDeleteDynamic?: (id: string) => Promise<boolean>
  saving: boolean
  onUploadFile: (name: string, file: File) => Promise<boolean>
  onUpdateInfo: (name: string, info: { notes?: string | null; is_hidden?: boolean }) => Promise<boolean>
  onUpsertOverride: (original: string, type: 'license' | 'studio', display: string) => Promise<boolean>
  onDelete: (name: string) => Promise<boolean>
}

function getAllLicenses(dynamic: { name: string; licensor: string }[] = []): { name: string; licensor: string }[] {
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
      if (!seen.has(l.name)) { seen.add(l.name); result.push({ name: l.name, licensor: g.licensor }) }
    }
  }
  for (const d of dynamic) {
    if (!seen.has(d.name)) { seen.add(d.name); result.push({ name: d.name, licensor: d.licensor }) }
  }
  return result.sort((a, b) => a.name.localeCompare(b.name))
}

export function LicenciasTab({ logos, overrides, dynamicLicenses, onDeleteDynamic, saving, onUploadFile, onUpdateInfo, onUpsertOverride, onDelete }: Props) {
  const [search, setSearch] = useState('')
  const [showHidden, setShowHidden] = useState(false)
  const [editName, setEditName] = useState<string | null>(null)
  const [editLicensor, setEditLicensor] = useState('')
  const [editDynId, setEditDynId] = useState<string | null>(null)

  // Logo upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Info form state
  const [editNotes, setEditNotes] = useState('')
  const [editHidden, setEditHidden] = useState(false)
  const [editDisplayName, setEditDisplayName] = useState('')

  const all = useMemo(() => getAllLicenses(dynamicLicenses ?? []), [dynamicLicenses])

  const logoMap = useMemo(() => {
    const m: Record<string, LicenseLogo> = {}
    logos.forEach(l => { m[l.license_name] = l })
    return m
  }, [logos])

  const overrideMap = useMemo(() => {
    const m: Record<string, string> = {}
    overrides.forEach(o => { if (o.override_type === 'license') m[o.original_name] = o.display_name })
    return m
  }, [overrides])

  const filtered = useMemo(() => {
    return all.filter(l => {
      const info = logoMap[l.name]
      const isHidden = info?.is_hidden ?? false
      if (!showHidden && isHidden) return false
      if (!search) return true
      return l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.licensor.toLowerCase().includes(search.toLowerCase())
    })
  }, [all, logoMap, search, showHidden])

  const hiddenCount = useMemo(() => logos.filter(l => l.is_hidden).length, [logos])

  function startEdit(lic: { name: string; licensor: string }) {
    const info = logoMap[lic.name]
    setEditName(lic.name)
    setEditLicensor(lic.licensor)
    const dynEntry = dynamicLicenses?.find(d => d.name.toLowerCase() === lic.name.toLowerCase())
    setEditDynId(dynEntry?.id ?? null)
    setSelectedFile(null)
    setPreviewUrl(info?.logo_url ?? null)
    setEditNotes(info?.notes ?? '')
    setEditHidden(info?.is_hidden ?? false)
    setEditDisplayName(overrideMap[lic.name] ?? '')
    // Scroll form into view
    setTimeout(() => document.getElementById('licencias-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }

  function cancelEdit() {
    setEditName(null)
    setEditDynId(null)
    setSelectedFile(null)
    if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setEditNotes('')
    setEditHidden(false)
    setEditDisplayName('')
  }

  function applyFile(file: File) {
    if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl)
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) applyFile(file)
    e.target.value = ''
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith('image/')) applyFile(file)
  }, [])

  async function saveEdit() {
    if (!editName) return
    let ok = true
    if (selectedFile) ok = await onUploadFile(editName, selectedFile)
    if (ok) ok = await onUpdateInfo(editName, { notes: editNotes.trim() || null, is_hidden: editHidden })
    if (ok && editDisplayName.trim()) ok = await onUpsertOverride(editName, 'license', editDisplayName.trim())
    if (ok) cancelEdit()
  }

  async function handleDelete() {
    if (!editName) return
    await onDelete(editName)
    cancelEdit()
  }

  async function handleDeleteDynamic() {
    if (!editDynId || !onDeleteDynamic) return
    await onDeleteDynamic(editDynId)
    cancelEdit()
  }

  const currentInfo = editName ? logoMap[editName] : null

  return (
    <div>
      {/* ── Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '13px', color: 'var(--txt-3)' }}>
          {logos.filter(l => !l.is_hidden).length} con logo · {all.length - logos.filter(l => !l.is_hidden).length} sin logo
        </div>
        <div style={{ flex: 1 }} />
        {hiddenCount > 0 && (
          <button
            onClick={() => setShowHidden(v => !v)}
            style={{
              padding: '7px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
              border: `1px solid ${showHidden ? 'rgba(248,113,113,.4)' : 'var(--line-2)'}`,
              background: showHidden ? 'rgba(248,113,113,.1)' : 'rgba(255,255,255,.04)',
              color: showHidden ? 'var(--danger)' : 'var(--txt-3)',
            }}
          >
            👁 {showHidden ? 'Ocultar' : 'Mostrar'} ocultas ({hiddenCount})
          </button>
        )}
      </div>

      {/* ── Formulario de edición (estilo EstrenosTab) ── */}
      {editName && (
        <div
          id="licencias-form"
          style={{ background: 'var(--surface-2)', border: '1px solid rgba(0,174,239,.3)', borderRadius: '18px', padding: '20px', marginBottom: '20px' }}
        >
          {/* Form title */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '15px', fontWeight: 700, color: '#fff' }}>
              Editando licencia
            </div>
            <div style={{ fontSize: '13px', color: 'var(--brand-2)', fontWeight: 600, marginTop: '3px' }}>
              {editName} <span style={{ color: 'var(--txt-4)', fontWeight: 400 }}>· {editLicensor}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>

            {/* Logo upload — ocupa columna izquierda */}
            <div>
              <label style={lbl}>Logo de la licencia</label>
              <div
                onDragOver={e => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: `2px dashed ${dragging ? 'var(--brand)' : 'var(--line-2)'}`,
                  borderRadius: '12px', padding: '18px',
                  textAlign: 'center', cursor: 'pointer',
                  background: dragging ? 'rgba(0,174,239,.06)' : 'var(--bg-2)',
                  transition: 'all .2s var(--ease)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                  height: '120px', justifyContent: 'center',
                }}
              >
                {previewUrl ? (
                  <img src={previewUrl} alt="preview" style={{ maxHeight: '60px', maxWidth: '140px', objectFit: 'contain', borderRadius: '6px' }} />
                ) : (
                  <>
                    <div style={{ fontSize: '24px', lineHeight: 1 }}>🖼️</div>
                    <div style={{ fontSize: '11.5px', color: 'var(--txt-3)', fontWeight: 500 }}>Haz clic o arrastra una imagen</div>
                  </>
                )}
                {selectedFile && (
                  <div style={{ fontSize: '10px', color: 'var(--txt-3)' }}>{selectedFile.name}</div>
                )}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--txt-4)', marginTop: '5px' }}>PNG · JPG · SVG · WEBP — máx. 5 MB</div>
              <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onInputChange} />
            </div>

            {/* Columna derecha: notas + toggle */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={lbl}>Nombre en catálogo</label>
                <input
                  value={editDisplayName}
                  onChange={e => setEditDisplayName(e.target.value)}
                  placeholder={`Dejar vacío para usar "${editName}"`}
                  style={inp}
                />
                <div style={{ fontSize: '10px', color: 'var(--txt-4)', marginTop: '4px' }}>
                  Reemplaza el nombre mostrado en el catálogo público
                </div>
              </div>

              <div>
                <label style={lbl}>Notas internas</label>
                <textarea
                  value={editNotes}
                  onChange={e => setEditNotes(e.target.value)}
                  placeholder="Notas para el equipo (no se muestran en el catálogo)..."
                  rows={2}
                  style={{ ...inp, resize: 'none' }}
                />
              </div>

              {/* Toggle ocultar */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '10px 14px', borderRadius: '10px',
                background: editHidden ? 'rgba(248,113,113,.08)' : 'rgba(255,255,255,.03)',
                border: `1px solid ${editHidden ? 'rgba(248,113,113,.25)' : 'var(--line)'}`,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: editHidden ? 'var(--danger)' : 'var(--txt-2)' }}>
                    Ocultar del catálogo
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'var(--txt-4)', marginTop: '2px' }}>
                    No aparecerá en ninguna vista pública
                  </div>
                </div>
                <button
                  onClick={() => setEditHidden(v => !v)}
                  style={{
                    width: '42px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                    background: editHidden ? 'var(--danger)' : 'var(--line-2)',
                    position: 'relative', flexShrink: 0, transition: 'background .2s',
                  }}
                >
                  <span style={{
                    position: 'absolute', top: '3px',
                    left: editHidden ? '21px' : '3px',
                    width: '18px', height: '18px', borderRadius: '50%', background: '#fff',
                    transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.3)',
                  }} />
                </button>
                <span style={{ fontSize: '12px', color: editHidden ? 'var(--danger)' : 'var(--txt-4)', fontWeight: 500, minWidth: '50px' }}>
                  {editHidden ? 'Oculta' : 'Visible'}
                </span>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '12px', borderTop: '1px solid var(--line)', alignItems: 'center' }}>
            <div style={{ marginRight: 'auto', display: 'flex', gap: '8px' }}>
              {currentInfo?.logo_url && (
                <button
                  onClick={handleDelete}
                  disabled={saving}
                  style={{
                    padding: '8px 14px', borderRadius: '10px',
                    border: '1px solid rgba(248,113,113,.3)', background: 'rgba(248,113,113,.08)',
                    color: 'var(--danger)', fontSize: '12px', cursor: 'pointer', fontWeight: 500,
                  }}
                >
                  🗑 Eliminar logo
                </button>
              )}
              {editDynId && onDeleteDynamic && (
                <button
                  onClick={handleDeleteDynamic}
                  disabled={saving}
                  style={{
                    padding: '8px 14px', borderRadius: '10px',
                    border: '1px solid rgba(248,113,113,.5)', background: 'rgba(248,113,113,.14)',
                    color: 'var(--danger)', fontSize: '12px', cursor: 'pointer', fontWeight: 600,
                  }}
                >
                  🗑 Borrar licencia
                </button>
              )}
            </div>
            <button onClick={cancelEdit} style={{ padding: '8px 16px', borderRadius: '10px', border: '1px solid var(--line-2)', background: 'transparent', color: 'var(--txt-3)', fontSize: '12px', cursor: 'pointer' }}>
              Cancelar
            </button>
            <button
              onClick={saveEdit}
              disabled={saving}
              style={{ padding: '8px 20px', borderRadius: '10px', background: 'var(--brand)', color: '#fff', fontSize: '12px', fontWeight: 600, border: 'none', cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? .6 : 1 }}
            >
              {saving ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </div>
      )}

      {/* ── Buscador ── */}
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Buscar licencia o licenciatario..."
        style={{ ...inp, maxWidth: '400px', marginBottom: '14px' }}
      />

      {/* ── Lista ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {filtered.map(lic => {
          const info = logoMap[lic.name]
          const [bg, fg] = getBrandStyle(lic.name)
          const hasLogo = !!info?.logo_url && !info?.is_hidden
          const isHidden = info?.is_hidden ?? false
          const isEditing = editName === lic.name

          return (
            <div
              key={lic.name}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                background: 'var(--surface)',
                border: `1px solid ${isEditing ? 'rgba(0,174,239,.4)' : isHidden ? 'rgba(248,113,113,.2)' : 'var(--line)'}`,
                borderRadius: '14px', padding: '10px 14px',
                opacity: isHidden ? 0.65 : 1, transition: 'border-color .15s',
              }}
            >
              {/* Thumb */}
              <div style={{
                width: '44px', height: '44px', borderRadius: '9px', flexShrink: 0,
                background: hasLogo ? '#111c22' : `linear-gradient(145deg,${bg},${bg}99)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
              }}>
                {hasLogo ? (
                  <img src={info!.logo_url} alt={lic.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '3px' }} />
                ) : (
                  <span style={{ fontSize: '9px', fontWeight: 700, color: fg, textAlign: 'center', padding: '2px', wordBreak: 'break-word' }}>
                    {lic.name.slice(0, 6)}
                  </span>
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 600, fontSize: '13px', color: '#fff' }}>{lic.name}</span>
                  {isHidden && (
                    <span style={{ fontSize: '10px', padding: '1px 7px', borderRadius: '6px', background: 'rgba(248,113,113,.2)', color: 'var(--danger)', fontWeight: 600 }}>
                      Oculta
                    </span>
                  )}
                  {info?.notes && (
                    <span style={{ fontSize: '10px', color: 'var(--txt-4)', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>
                      {info.notes}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--txt-3)', marginTop: '1px' }}>{lic.licensor}</div>
              </div>

              {/* Dot */}
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: hasLogo ? 'var(--badge-new)' : 'var(--line-3)', flexShrink: 0 }} />

              {/* Editar */}
              <button
                onClick={() => isEditing ? cancelEdit() : startEdit(lic)}
                style={{
                  padding: '5px 14px', borderRadius: '9px',
                  border: `1px solid ${isEditing ? 'rgba(0,174,239,.4)' : 'var(--line-2)'}`,
                  background: isEditing ? 'rgba(0,174,239,.1)' : 'rgba(255,255,255,.04)',
                  color: isEditing ? 'var(--brand-2)' : 'var(--txt-3)',
                  fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                }}
              >
                {isEditing ? '↑ Cerrar' : 'Editar'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const lbl: React.CSSProperties = { display: 'block', fontSize: '10.5px', fontWeight: 600, color: 'var(--txt-4)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '5px' }
const inp: React.CSSProperties = { width: '100%', padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--line-2)', background: 'var(--bg-2)', color: 'var(--txt)', fontSize: '12.5px', outline: 'none', boxSizing: 'border-box' }
