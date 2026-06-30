'use client'

import { useState } from 'react'
import { getBrandStyle } from '@/data/brand-colors'
import { getCategoriesForLicensor } from '@/data/categories'
import { BADGE_CLASS, BADGE_LABELS, SEG_LABELS, type LicenseType, type SegmentKey } from '@/data/segments'
import type { CategoryPhoto } from '@/types/database'
import { PhotoGallery } from './PhotoGallery'

export interface ModalLicense {
  name: string
  displayName: string
  type: LicenseType | string
  licensor: string
  segs: SegmentKey[]
  logoUrl?: string
}

interface Props {
  license: ModalLicense | null
  fetchCatPhotos: (licenseName: string, category: string) => Promise<CategoryPhoto[]>
  onClose: () => void
}

export function LicenseModal({ license, fetchCatPhotos, onClose }: Props) {
  const [gallery, setGallery] = useState<{ photos: CategoryPhoto[]; category: string } | null>(null)
  const [loading, setLoading] = useState<string | null>(null)

  if (!license) return null

  const [bg, fg] = getBrandStyle(license.name)
  const cats = getCategoriesForLicensor(license.licensor)

  async function openGallery(category: string) {
    setLoading(category)
    const photos = await fetchCatPhotos(license!.name, category)
    setLoading(null)
    setGallery({ photos, category })
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)', zIndex: 100, backdropFilter: 'blur(8px)' }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        zIndex: 101, width: 'min(540px,94vw)', maxHeight: '88vh',
        background: 'var(--surface)', border: '1px solid var(--line-2)',
        borderRadius: '24px', display: 'flex', flexDirection: 'column',
        boxShadow: '0 32px 80px -16px rgba(0,0,0,.9), 0 0 0 1px rgba(255,255,255,.04) inset',
        overflow: 'hidden',
      }}>
        {/* Hero */}
        <div style={{
          position: 'relative',
          height: '130px',
          background: license.logoUrl
            ? '#111c22'
            : `linear-gradient(145deg,${bg}dd,${bg}66)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {/* Shine */}
          {!license.logoUrl && (
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(70% 80% at 50% -10%,rgba(255,255,255,.18),transparent 70%)', pointerEvents: 'none' }} />
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 40%,rgba(9,12,18,.8))', pointerEvents: 'none' }} />

          {license.logoUrl ? (
            <img src={license.logoUrl} alt={license.displayName} style={{ maxWidth: '70%', maxHeight: '80px', objectFit: 'contain', filter: 'drop-shadow(0 4px 16px rgba(0,0,0,.6))', position: 'relative', zIndex: 2 }} />
          ) : (
            <div style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '26px', fontWeight: 700, color: fg, textAlign: 'center', padding: '0 24px', textShadow: '0 3px 16px rgba(0,0,0,.6)', position: 'relative', zIndex: 2, wordBreak: 'break-word' }}>
              {license.displayName}
            </div>
          )}

          {/* Close */}
          <button
            onClick={onClose}
            style={{ position: 'absolute', top: '12px', right: '12px', width: '30px', height: '30px', borderRadius: '8px', border: '1px solid rgba(255,255,255,.16)', background: 'rgba(0,0,0,.4)', color: 'rgba(255,255,255,.7)', fontSize: '16px', cursor: 'pointer', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ×
          </button>

          {/* Badge */}
          <span
            className={`lic-badge ${BADGE_CLASS[license.type as LicenseType] ?? ''}`}
            style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 3, fontSize: '9px', fontWeight: 800, padding: '3px 10px', borderRadius: '20px', letterSpacing: '.06em', textTransform: 'uppercase', color: '#06121A', border: '1px solid rgba(255,255,255,.28)' }}
          >
            {BADGE_LABELS[license.type as LicenseType] ?? license.type}
          </span>
        </div>

        {/* Info */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px 20px' }}>
          {/* License name + licensor */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '18px', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
              {license.displayName}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--txt-3)', fontWeight: 500 }}>
              {license.licensor}
            </div>
          </div>

          {/* Segments */}
          {license.segs.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', marginBottom: '18px' }}>
              {license.segs.map(s => (
                <span key={s} style={{ fontSize: '11px', fontWeight: 600, padding: '4px 12px', borderRadius: '30px', background: 'rgba(255,255,255,.07)', border: '1px solid var(--line-2)', color: 'var(--txt-2)' }}>
                  {SEG_LABELS[s]}
                </span>
              ))}
            </div>
          )}

          {/* Categories */}
          {cats.length > 0 && (
            <>
              <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--txt-4)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: '10px' }}>
                Categorías de producto
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {cats.map(cat => (
                  <button
                    key={cat}
                    onClick={() => openGallery(cat)}
                    disabled={loading === cat}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                      padding: '7px 13px', borderRadius: '10px',
                      border: '1px solid var(--line-2)',
                      background: loading === cat ? 'rgba(0,174,239,.12)' : 'rgba(255,255,255,.04)',
                      color: loading === cat ? 'var(--brand-2)' : 'var(--txt-2)',
                      fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                      transition: 'all .2s var(--ease)',
                    }}
                  >
                    {loading === cat ? (
                      <span style={{ display: 'inline-block', width: '10px', height: '10px', border: '2px solid var(--brand-2)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
                    ) : (
                      <span style={{ fontSize: '13px' }}>📂</span>
                    )}
                    {cat}
                  </button>
                ))}
              </div>
            </>
          )}

          {cats.length === 0 && (
            <div style={{ fontSize: '13px', color: 'var(--txt-4)', fontStyle: 'italic', marginTop: '8px' }}>
              Sin categorías configuradas para este licenciatario.
            </div>
          )}
        </div>
      </div>

      {/* Photo Gallery (stacked above modal) */}
      {gallery && (
        <PhotoGallery
          photos={gallery.photos}
          category={gallery.category}
          onClose={() => setGallery(null)}
        />
      )}
    </>
  )
}
