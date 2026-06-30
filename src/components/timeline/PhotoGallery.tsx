'use client'

import { useState } from 'react'
import type { CategoryPhoto } from '@/types/database'

interface Props {
  photos: CategoryPhoto[]
  category: string
  onClose: () => void
}

export function PhotoGallery({ photos, category, onClose }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null)

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)', zIndex: 200, backdropFilter: 'blur(6px)' }}
      />

      {/* Panel */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        zIndex: 201, width: 'min(700px,94vw)', maxHeight: '82vh',
        background: 'var(--surface)', border: '1px solid var(--line-2)',
        borderRadius: '22px', display: 'flex', flexDirection: 'column',
        boxShadow: '0 32px 80px -16px rgba(0,0,0,.9)',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--line)', background: 'linear-gradient(180deg,rgba(255,255,255,.03),transparent)' }}>
          <span style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '15px', fontWeight: 600, color: '#fff' }}>{category}</span>
          <span style={{ marginLeft: '10px', fontSize: '12px', color: 'var(--txt-3)' }}>{photos.length} archivo{photos.length !== 1 ? 's' : ''}</span>
          <button
            onClick={onClose}
            style={{ marginLeft: 'auto', width: '30px', height: '30px', borderRadius: '8px', border: '1px solid var(--line-2)', background: 'rgba(255,255,255,.05)', color: 'var(--txt-3)', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          {photos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--txt-4)', fontSize: '14px' }}>
              No hay archivos en esta categoría
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '12px' }}>
              {photos.map(p => (
                <div key={p.id} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--line)', background: 'var(--bg-2)', cursor: p.file_type === 'image' ? 'pointer' : 'default' }}
                  onClick={() => p.file_type === 'image' && setLightbox(p.file_url)}
                >
                  {p.file_type === 'image' ? (
                    <img src={p.file_url} alt={p.file_name ?? ''} style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }} />
                  ) : (
                    <a href={p.file_url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '140px', gap: '8px', textDecoration: 'none' }}>
                      <span style={{ fontSize: '36px' }}>📄</span>
                      <span style={{ fontSize: '10.5px', color: 'var(--brand-2)', fontWeight: 600 }}>Ver PDF</span>
                    </a>
                  )}
                  {p.file_name && (
                    <div style={{ padding: '6px 9px', fontSize: '10.5px', color: 'var(--txt-3)', fontWeight: 500, borderTop: '1px solid var(--line)', background: 'rgba(0,0,0,.3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {p.file_name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}
        >
          <img src={lightbox} alt="preview" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 32px 80px -16px rgba(0,0,0,.9)' }} />
        </div>
      )}
    </>
  )
}
