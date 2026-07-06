'use client'

import { useRef, useState, useMemo, useCallback } from 'react'
import { QUARTERS } from '@/data/quarters'
import { ALL_YEAR } from '@/data/all-year'
import { getBrandStyle } from '@/data/brand-colors'
import type { LicenseLogo } from '@/types/database'

interface Props {
  logos: LicenseLogo[]
  saving: boolean
  onUploadFile: (name: string, file: File) => Promise<boolean>
  onUpdateInfo: (name: string, info: { notes?: string | null; is_hidden?: boolean }) => Promise<boolean>
  onDelete: (name: string) => Promise<boolean>
}

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
      if (!seen.has(l.name)) { seen.add(l.name); result.push({ name: l.name, licensor: g.licensor }) }
    }
  }
  return result.sort((a, b) => a.name.localeCompare(b.name))
}

export function LicenciasTab({ logos, saving, onUploadFile, onUpdateInfo, onDelete }: Props) {
  const [search, setSearch] = useState('')
  const [showHidden, setShowHidden] = useState(false)
  const [editName, setEditName] = useState<string | null>(null)

  // Logo upload state
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Info form state
  const [editNotes, setEditNotes] = useState('')
  const [editHidden, setEditHidden] = useState(false)

  const all = useMemo(() => getAllLicenses(), [])

  const logoMap = useMemo(() => {
    const m: Record<string, LicenseLogo> = {}
    logos.forEach(l => { m[l.license_name] = l })
    return m
  }, [logos])

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

  function startEdit(name: string) {
    const info = logoMap[name]
    setEditName(name)
    setSelectedFile(null)
    setPreviewUrl(info?.logo_url ?? null)
    setEditNotes(info?.notes ?? '')
    setEditHidden(info?.is_hidden ?? false)
  }

  function cancelEdit() {
    setEditName(null)
    setSelectedFile(null)
    if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setEditNotes('')
    setEditHidden(false)
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
    if (selectedFile) {
      ok = await onUploadFile(editName, selectedFile)
    }
    if (ok) {
      ok = await onUpdateInfo(editName, { notes: editNotes.trim() || null, is_hidden: editHidden })
    }
    if (ok) cancelEdit()
  }

  async function handleDelete(name: string) {
    await onDelete(name)
    cancelEdit()
  }

  return (
    <div>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px', flexWrap: 'wrap' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar licencia o licenciatario..."
          style={{
            flex: 1, minWidth: '220px', maxWidth: '380px', padding: '9px 14px', borderRadius: '12px',
            border: '1px solid var(--line-2)', background: 'var(--bg-2)', color: 'var(--txt)',
            fontSize: '13px', outline: 'none',
          }}
        />
        {hiddenCount > 0 && (
          <button
            onClick={() => setShowHidden(v => !v)}
            style={{
              padding: '8px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
              border: `1px solid ${showHidden ? 'rgba(248,113,113,.4)' : 'var(--line-2)'}`,
              background: showHidden ? 'rgba(248,113,113,.1)' : 'rgba(255,255,255,.04)',
              color: showHidden ? 'var(--danger)' : 'var(--txt-3)',
            }}
          >
            👁 {showHidden ? 'Ocultar' : 'Mostrar'} ocultas ({hiddenCount})
          </button>
        )}
      </div>

      {/* Stats */}
      <div style={{ fontSize: '12px', color: 'var(--txt-3)', marginBottom: '14px' }}>
        {logos.filter(l => !l.is_hidden).length} con logo · {all.length - logos.filter(l => !l.is_hidden).length} sin logo · {filtered.length} en vista
      </div>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onInputChange} />

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                background: 'var(--surface)',
                border: `1px solid ${isEditing ? 'rgba(0,174,239,.4)' : isHidden ? 'rgba(248,113,113,.25)' : 'var(--line)'}`,
                borderRadius: '14px', padding: '12px 16px', transition: 'border-color .2s var(--ease)',
                opacity: isHidden ? 0.65 : 1,
              }}
            >
              {/* Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Thumb */}
                <div style={{
                  width: '48px', height: '48px', borderRadius: '10px',
                  background: hasLogo ? '#111c22' : `linear-gradient(145deg,${bg},${bg}99)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, overflow: 'hidden',
                }}>
                  {hasLogo ? (
                    <img src={info!.logo_url} alt={lic.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
                  ) : (
                    <span style={{ fontSize: '10px', fontWeight: 700, color: fg, textAlign: 'center', padding: '2px', wordBreak: 'break-word' }}>
                      {lic.name.slice(0, 6)}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, fontSize: '13px', color: '#fff' }}>{lic.name}</span>
                    {isHidden && (
                      <span style={{ fontSize: '10px', padding: '2px 7px', borderRadius: '6px', background: 'rgba(248,113,113,.2)', color: 'var(--danger)', fontWeight: 600 }}>
                        Oculta
                      </span>
                    )}
                    {info?.notes && !isEditing && (
                      <span style={{ fontSize: '10px', color: 'var(--txt-3)', fontStyle: 'italic', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '200px' }}>
                        {info.notes}
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--txt-3)', marginTop: '2px' }}>{lic.licensor}</div>
                </div>

                {/* Status dot */}
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: hasLogo ? 'var(--badge-new)' : 'var(--line-3)', flexShrink: 0,
                }} />

                {/* Edit btn */}
                {!isEditing && (
                  <button
                    onClick={() => startEdit(lic.name)}
                    style={{
                      padding: '6px 14px', borderRadius: '9px', border: '1px solid var(--line-2)',
                      background: 'rgba(255,255,255,.04)', color: 'var(--txt-2)',
                      fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                    }}
                  >
                    Editar
                  </button>
                )}
              </div>

              {/* ── Formulario de edición ── */}
              {isEditing && (
                <div style={{ marginTop: '14px', paddingTop: '14px', borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '14px' }}>

                  {/* Logo upload section */}
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--txt-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '8px' }}>
                      Logo
                    </div>
                    <div
                      onDragOver={e => { e.preventDefault(); setDragging(true) }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={onDrop}
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        border: `2px dashed ${dragging ? 'var(--brand)' : 'var(--line-2)'}`,
                        borderRadius: '12px', padding: '18px',
                        textAlign: 'center', cursor: 'pointer',
                        background: dragging ? 'rgba(0,174,239,.06)' : 'rgba(255,255,255,.02)',
                        transition: 'all .2s var(--ease)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                      }}
                    >
                      {previewUrl ? (
                        <img src={previewUrl} alt="preview" style={{ maxHeight: '72px', maxWidth: '150px', objectFit: 'contain', borderRadius: '8px', marginBottom: '4px' }} />
                      ) : (
                        <div style={{ fontSize: '26px', lineHeight: 1 }}>🖼️</div>
                      )}
                      <div style={{ fontSize: '12px', color: 'var(--txt-2)', fontWeight: 500 }}>
                        {selectedFile ? selectedFile.name : 'Haz clic o arrastra una imagen'}
                      </div>
                      {!selectedFile && (
                        <div style={{ fontSize: '11px', color: 'var(--txt-3)' }}>PNG · JPG · SVG · WEBP — máx. 5 MB</div>
                      )}
                    </div>
                  </div>

                  {/* Notas internas */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', color: 'var(--txt-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '6px' }}>
                      Notas internas
                    </label>
                    <textarea
                      value={editNotes}
                      onChange={e => setEditNotes(e.target.value)}
                      placeholder="Notas para el equipo (no se muestran en el catálogo)..."
                      rows={2}
                      style={{
                        width: '100%', padding: '9px 12px', borderRadius: '10px',
                        border: '1px solid var(--line-2)', background: 'var(--bg-2)',
                        color: 'var(--txt)', fontSize: '12px', outline: 'none',
                        resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {/* Toggle ocultar */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '10px', background: editHidden ? 'rgba(248,113,113,.08)' : 'rgba(255,255,255,.03)', border: `1px solid ${editHidden ? 'rgba(248,113,113,.25)' : 'var(--line)'}` }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: editHidden ? 'var(--danger)' : 'var(--txt)' }}>
                        Ocultar del catálogo
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--txt-3)', marginTop: '2px' }}>
                        La licencia no aparecerá en ninguna vista pública
                      </div>
                    </div>
                    <button
                      onClick={() => setEditHidden(v => !v)}
                      style={{
                        width: '44px', height: '24px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                        background: editHidden ? 'var(--danger)' : 'var(--line-2)',
                        position: 'relative', flexShrink: 0, transition: 'background .2s',
                      }}
                    >
                      <span style={{
                        position: 'absolute', top: '3px',
                        left: editHidden ? '23px' : '3px',
                        width: '18px', height: '18px', borderRadius: '50%', background: '#fff',
                        transition: 'left .2s', boxShadow: '0 1px 3px rgba(0,0,0,.3)',
                      }} />
                    </button>
                  </div>

                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <button
                      onClick={saveEdit}
                      disabled={saving}
                      style={{
                        padding: '9px 22px', borderRadius: '10px',
                        background: 'var(--brand)', color: '#fff',
                        fontSize: '12px', fontWeight: 600, border: 'none',
                        cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? .6 : 1,
                      }}
                    >
                      {saving ? 'Guardando...' : 'Guardar cambios'}
                    </button>

                    {info?.logo_url && (
                      <button
                        onClick={() => handleDelete(lic.name)}
                        disabled={saving}
                        style={{
                          padding: '9px 16px', borderRadius: '10px',
                          border: '1px solid rgba(248,113,113,.3)',
                          background: 'rgba(248,113,113,.08)',
                          color: 'var(--danger)', fontSize: '12px', cursor: 'pointer', fontWeight: 500,
                        }}
                      >
                        Eliminar logo
                      </button>
                    )}

                    <button
                      onClick={cancelEdit}
                      style={{
                        marginLeft: 'auto', padding: '9px 14px', borderRadius: '10px',
                        border: '1px solid var(--line-2)', background: 'transparent',
                        color: 'var(--txt-3)', fontSize: '12px', cursor: 'pointer',
                      }}
                    >
                      ✕ Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
