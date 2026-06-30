'use client'

import { useState, useMemo } from 'react'
import { QUARTERS } from '@/data/quarters'
import { ALL_YEAR } from '@/data/all-year'
import { getBrandStyle } from '@/data/brand-colors'
import type { LicenseLogo } from '@/types/database'

interface Props {
  logos: LicenseLogo[]
  saving: boolean
  onUpsert: (name: string, url: string) => Promise<boolean>
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

export function LicenciasTab({ logos, saving, onUpsert, onDelete }: Props) {
  const [search, setSearch] = useState('')
  const [editName, setEditName] = useState<string | null>(null)
  const [editUrl, setEditUrl] = useState('')
  const [confirmDel, setConfirmDel] = useState<string | null>(null)

  const all = useMemo(() => getAllLicenses(), [])
  const logoMap = useMemo(() => {
    const m: Record<string, string> = {}
    logos.forEach(l => { m[l.license_name] = l.logo_url })
    return m
  }, [logos])

  const filtered = search
    ? all.filter(l => l.name.toLowerCase().includes(search.toLowerCase()) || l.licensor.toLowerCase().includes(search.toLowerCase()))
    : all

  function startEdit(name: string) {
    setEditName(name)
    setEditUrl(logoMap[name] ?? '')
    setConfirmDel(null)
  }

  async function saveEdit() {
    if (!editName) return
    if (!editUrl.trim()) {
      await onDelete(editName)
    } else {
      await onUpsert(editName, editUrl.trim())
    }
    setEditName(null)
    setEditUrl('')
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

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filtered.map(lic => {
          const [bg, fg] = getBrandStyle(lic.name)
          const hasLogo = !!logoMap[lic.name]
          const isEditing = editName === lic.name

          return (
            <div key={lic.name} style={{ background: 'var(--surface)', border: `1px solid ${isEditing ? 'rgba(0,174,239,.4)' : 'var(--line)'}`, borderRadius: '14px', padding: '12px 16px', transition: 'border-color .2s var(--ease)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Color swatch / logo */}
                <div style={{ width: '48px', height: '48px', borderRadius: '10px', background: hasLogo ? '#111c22' : `linear-gradient(145deg,${bg},${bg}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                  {hasLogo ? (
                    <img src={logoMap[lic.name]} alt={lic.name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
                  ) : (
                    <span style={{ fontSize: '10px', fontWeight: 700, color: fg, textAlign: 'center', padding: '2px', wordBreak: 'break-word' }}>{lic.name.slice(0,6)}</span>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: '#fff', marginBottom: '2px' }}>{lic.name}</div>
                  <div style={{ fontSize: '11px', color: 'var(--txt-3)' }}>{lic.licensor}</div>
                </div>

                {/* Status dot */}
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: hasLogo ? 'var(--badge-new)' : 'var(--line-3)', flexShrink: 0 }} />

                {/* Edit btn */}
                {!isEditing && (
                  <button
                    onClick={() => startEdit(lic.name)}
                    style={{ padding: '6px 14px', borderRadius: '9px', border: '1px solid var(--line-2)', background: 'rgba(255,255,255,.04)', color: 'var(--txt-2)', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}
                  >
                    {hasLogo ? 'Cambiar logo' : 'Agregar logo'}
                  </button>
                )}
              </div>

              {/* Inline edit */}
              {isEditing && (
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid var(--line)' }}>
                  <div style={{ marginBottom: '8px', fontSize: '11px', color: 'var(--txt-3)' }}>URL del logo (dejar vacío para eliminar)</div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      value={editUrl}
                      onChange={e => setEditUrl(e.target.value)}
                      placeholder="https://... (PNG, SVG, JPG)"
                      style={{ flex: 1, padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--line-2)', background: 'var(--bg-2)', color: 'var(--txt)', fontSize: '12px', outline: 'none' }}
                      autoFocus
                      onKeyDown={e => { if (e.key === 'Enter') saveEdit(); if (e.key === 'Escape') setEditName(null) }}
                    />
                    <button
                      onClick={saveEdit}
                      disabled={saving}
                      style={{ padding: '8px 16px', borderRadius: '10px', background: 'var(--brand)', color: '#fff', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer', opacity: saving ? .6 : 1 }}
                    >
                      {saving ? '...' : 'Guardar'}
                    </button>
                    <button
                      onClick={() => setEditName(null)}
                      style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--line-2)', background: 'transparent', color: 'var(--txt-3)', fontSize: '12px', cursor: 'pointer' }}
                    >
                      ✕
                    </button>
                  </div>
                  {editUrl && (
                    <div style={{ marginTop: '8px' }}>
                      <img src={editUrl} alt="preview" style={{ maxHeight: '60px', maxWidth: '120px', objectFit: 'contain', borderRadius: '6px', border: '1px solid var(--line)' }} onError={e => (e.currentTarget.style.display = 'none')} />
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
