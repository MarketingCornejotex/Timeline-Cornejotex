'use client'

import { getBrandStyle } from '@/data/brand-colors'
import { BADGE_CLASS, BADGE_LABELS, SEG_CLASS, SEG_LABELS, type LicenseType, type SegmentKey } from '@/data/segments'

interface Props {
  name: string
  displayName: string
  type: LicenseType
  segs: SegmentKey[]
  logoUrl?: string
  activeFilter: string
  onClick: () => void
}

function calcFontSize(name: string) {
  const l = name.length
  if (l <= 4)  return '22px'
  if (l <= 7)  return '18px'
  if (l <= 10) return '16px'
  if (l <= 14) return '13px'
  if (l <= 18) return '12px'
  return '11px'
}

export function LicenseCard({ name, displayName, type, segs, logoUrl, activeFilter, onClick }: Props) {
  const [bg, fg] = getBrandStyle(name)
  const hidden = activeFilter !== 'todos' && !segs.includes(activeFilter as SegmentKey)

  if (hidden) return null

  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        borderRadius: '13px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: '1px solid var(--line-2)',
        transition: 'transform .26s var(--spring), box-shadow .26s var(--ease), border-color .26s var(--ease)',
        boxShadow: '0 1px 0 rgba(255,255,255,.05) inset, 0 6px 16px -8px rgba(0,0,0,.6)',
      }}
      className="lic-card-hover"
    >
      {/* Background */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: logoUrl ? '0' : '30px 12px 34px',
        minHeight: '118px',
        overflow: 'hidden',
        background: logoUrl ? '#111c22' : `linear-gradient(145deg,${bg}ee,${bg}99)`,
      }}>
        {/* Shine overlay */}
        {!logoUrl && (
          <div style={{
            position: 'absolute', left: '-30%', right: '-30%', top: '-60%', height: '120%',
            background: 'radial-gradient(60% 70% at 50% 0%,rgba(255,255,255,.20),transparent 70%)',
            pointerEvents: 'none', zIndex: 1,
          }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 40%,rgba(0,0,0,.34))', zIndex: 1, pointerEvents: 'none' }} />

        {/* Logo or Name */}
        {logoUrl ? (
          <>
            <img
              src={logoUrl}
              alt={displayName}
              style={{ width: '100%', height: '70px', objectFit: 'contain', padding: '4px 8px', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,.5))', position: 'relative', zIndex: 2 }}
            />
            <div style={{ position: 'relative', zIndex: 2, width: '100%', fontSize: '10px', fontWeight: 700, textAlign: 'center', padding: '4px 6px', background: 'rgba(0,0,0,.42)', color: '#fff' }}>
              {displayName}
            </div>
          </>
        ) : (
          <div style={{ position: 'relative', zIndex: 2, fontFamily: "'Space Grotesk','Inter',sans-serif", fontWeight: 700, textAlign: 'center', lineHeight: 1.12, color: fg, fontSize: calcFontSize(displayName), padding: '0 2px', wordBreak: 'break-word', textShadow: '0 2px 12px rgba(0,0,0,.55)' }}>
            {displayName}
          </div>
        )}

        {/* Badge */}
        <span className={`lic-badge ${BADGE_CLASS[type]}`} style={{ position: 'absolute', top: '8px', left: '8px', zIndex: 4, fontSize: '8px', fontWeight: 800, padding: '3px 8px', borderRadius: '20px', letterSpacing: '.06em', textTransform: 'uppercase', color: '#06121A', border: '1px solid rgba(255,255,255,.28)', boxShadow: '0 3px 10px -2px rgba(0,0,0,.5)' }}>
          {BADGE_LABELS[type]}
        </span>

        {/* Logo indicator dot */}
        {logoUrl && (
          <div style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--badge-new)', zIndex: 5, boxShadow: '0 0 9px var(--badge-new)' }} />
        )}
      </div>

      {/* Segments */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', padding: '8px 9px', background: 'rgba(255,255,255,.025)', borderTop: '1px solid var(--line)' }}>
        {segs.map(s => (
          <span key={s} className={`seg-dot ${SEG_CLASS[s]}`} style={{ fontSize: '8px', fontWeight: 700, padding: '2.5px 7px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '.04em' }}>
            {SEG_LABELS[s]}
          </span>
        ))}
      </div>
    </div>
  )
}
