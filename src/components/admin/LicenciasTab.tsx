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
  onDelete: (name: string) => Promise<boolean>
}

function getAllLicenses(): { name: string; licensor: string }[] {
  const seen = new Set<string>()
  const result: { name: string; licensor: string }[] = []

  for (const q of Object.values(QUARTERS)) {
    for (const m of q.months) {
      for (const l of m.licenses) {
        if (!seen.has(l.name)) {
          seen.add(l.name)
          result.push({ name: l.name, licensor: l.licensor })
        }
      }
    }
  }
  for (const g of ALL_YEAR) {
    for (const l of g.licenses) {
      if (!seen.has(l)) {
        seen.add(l)
        result.push({ name: l, licensor: g.licensor })
      }
    }
  }
  return result.sort((a, b) => a.name.localeCompare(b.name))
}

export function LicenciasTab({ logos, saving, onUploadFile, onDelete }: Props) {
  const [search, setSearch] = useState('')
  const [editName, setEditName] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const all = useMemo(() => getAllLicenses(), [])
  const logoMap = useMemo(() => {
    const m: Record<string, string> = {}
    logos.forEach(l => { m[l.license_name] = l.logo_url })
    return m
  }, [logos])

  const filtered = search
    ? all.filter(l =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.licensor.toLowerCase().includes(search.toLowerCase())
      )
    : all

  function startEdit(name: string) {
    setEditName(name)
    setSelectedFile(null)
    setPreviewUrl(logoMap[name] ?? null)
  }

  function cancelEdit() {
    setEditName(null)
    setSelectedFile(null)
    if (previewUrl && previewUrl.startsWith('blob:')) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
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
    if (!editName || !selectedFile) return
    const ok = await onUploadFile(editName, selectedFile)
    if (ok) {
      if (previewUrl?.startsWith('blob:')) URL.revokeObjectURL(previewUrl)
      setEditName(null)
      setSelectedFile(null)
      setPreviewUrl(null)
    }
  }

  async function handleDelete(name: string) {
    await onDelete(name)
    cancelEdit()
  }

  return (
    <div>
      {/* Search */}
      <div style={{ marginBottom: '18px' }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar licencia o licenciatario..."
          style={{
            width: '100%', maxWidth: '380px', padding: '9px 14px', borderRadius: '12px',
            border: '1px solid var(--line-2)', background: 'var(--bg-2)', color: 'var(--txt)',
            fontSize: '13px', outline: 'none',
          }}
        />
      </div>

      {/* Stats */}
      <div style={{ fontSize: '12px', color: 'var(--txt-3)', marginBottom: '14px' }}>
        {logos.length} con logo · {all.length - logos.length} sin logo · {filtered.length} en vista
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={onInputChange}
      />

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filtered.map(lic => {
          const [bg, fg] = getBrandStyle(lic.name)
          const hasLogo = !!logoMap[lic.name]
          const isEditing = editName === lic.name

          return (
            <div
              key={lic.name}
              style={{
                background: 'var(--surface)',
                border: `1px solid ${isEditing ? 'rgba(0,174,239,.4)' : 'var(--line)'}`,
                borderRadius: '14px',
                padding: '12px 16px',
                transition: 'border-color .2s var(--ease)',
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
                    <img
                      src={logoMap[lic.name]}
                      alt={lic.name}
                      style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
                    />
                  ) : (
                    <span style={{ fontSize: '10px', fontWeight: 700, color: fg, textAlign: 'center', padding: '2px', wordBreak: 'break-word' }}>
                      {lic.name.slice(0, 6)}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#fff', marginBottom: '2px' }}>{lic.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--txt-3)' }}>{lic.licensor}</div>
                </div>

                {/* Status dot */}
                <div style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: hasLogo ? 'var(--badge-new)' : 'var(--line-3)',
                  flexShrink: 0,
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
                    {hasLogo ? 'Cambiar logo' : 'Agregar logo'}
                  </button>
                )}
              </div>

              {/* Inline upload panel */}
              {isEditing && (
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>

                  {/* Drop zone */}
                  <div
                    onDragOver={e => { e.preventDefault(); setDragging(true) }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      border: `2px dashed ${dragging ? 'var(--brand)' : 'var(--line-2)'}`,
                      borderRadius: '12px',
                      padding: '20px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      background: dragging ? 'rgba(0,174,239,.06)' : 'rgba(255,255,255,.02)',
                      transition: 'all .2s var(--ease)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="preview"
                        style={{
                          maxHeight: '80px', maxWidth: '160px',
                          objectFit: 'contain', borderRadius: '8px',
                          marginBottom: '8px',
                        }}
                      />
                    ) : (
                      <div style={{ fontSize: '28px', lineHeight: 1 }}>🖼️</div>
                    )}
                    <div style={{ fontSize: '12px', color: 'var(--txt-2)', fontWeight: 500 }}>
                      {selectedFile ? selectedFile.name : 'Haz clic o arrastra una imagen aquí'}
                    </div>
                    {!selectedFile && (
                      <div style={{ fontSize: '11px', color: 'var(--txt-3)' }}>
                        PNG, JPG, SVG, WEBP — máx. 5 MB
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '10px', alignItems: 'center' }}>
                    <button
                      onClick={saveEdit}
                      disabled={!selectedFile || saving}
                      style={{
                        padding: '8px 20px', borderRadius: '10px',
                        background: selectedFile ? 'var(--brand)' : 'var(--line)',
                        color: '#fff', fontSize: '12px', fontWeight: 600,
                        border: 'none', cursor: selectedFile ? 'pointer' : 'not-allowed',
                        opacity: saving ? .6 : 1,
                      }}
                    >
                      {saving ? 'Subiendo...' : 'Guardar logo'}
                    </button>

                    {hasLogo && (
                      <button
                        onClick={() => handleDelete(lic.name)}
                        disabled={saving}
                        style={{
                          padding: '8px 14px', borderRadius: '10px',
                          border: '1px solid rgba(248,113,113,.3)',
                          background: 'rgba(248,113,113,.08)',
                          color: 'var(--danger)', fontSize: '12px',
                          cursor: 'pointer', fontWeight: 500,
                        }}
                      >
                        Eliminar logo
                      </button>
                    )}

                    <button
                      onClick={cancelEdit}
                      style={{
                        marginLeft: 'auto', padding: '8px 12px', borderRadius: '10px',
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
