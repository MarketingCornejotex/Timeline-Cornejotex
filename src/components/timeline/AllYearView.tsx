'use client'

import { ALL_YEAR } from '@/data/all-year'
import { getBrandStyle } from '@/data/brand-colors'
import type { SegmentKey } from '@/data/segments'

interface Props {
  logos: Record<string, string>
  displayName: (name: string) => string
  onLicenseClick: (name: string, type: string, licensor: string, segs: SegmentKey[]) => void
}

export function AllYearView({ logos, displayName, onLicenseClick }: Props) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
        <h2 style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '22px', fontWeight: 700, color: '#fff' }}>
          Todo el Año
        </h2>
        <span style={{ fontSize: '12px', color: 'var(--txt-3)', paddingLeft: '4px' }}>Licencias disponibles en cualquier trimestre</span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,var(--line-2),transparent)' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {ALL_YEAR.map(group => (
          <div key={group.licensor}>
            {/* Licensor header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <span style={{ fontSize: '18px' }}>{group.icon}</span>
              <span style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '14px', fontWeight: 700, color: '#fff', letterSpacing: '-.01em' }}>{group.licensor}</span>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,var(--line-2),transparent)' }} />
              <span style={{ fontSize: '11px', color: 'var(--txt-3)', fontWeight: 600 }}>{group.licenses.length} licencias</span>
            </div>

            {/* License chips grid */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {group.licenses.map(lic => {
                const [bg, fg] = getBrandStyle(lic)
                const hasLogo = !!logos[lic]
                const dName = displayName(lic)

                return (
                  <button
                    key={lic}
                    onClick={() => onLicenseClick(lic, 'ann', group.licensor, [])}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 14px 8px 8px',
                      borderRadius: '12px',
                      border: '1px solid var(--line-2)',
                      background: `linear-gradient(145deg,${bg}22,${bg}0a)`,
                      cursor: 'pointer',
                      transition: 'transform .2s var(--spring), border-color .2s var(--ease)',
                      backdropFilter: 'blur(8px)',
                    }}
                    className="ay-chip-hover"
                  >
                    {/* Mini color swatch / logo */}
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '9px',
                      background: hasLogo ? '#111c22' : `linear-gradient(145deg,${bg},${bg}99)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      overflow: 'hidden', flexShrink: 0,
                      boxShadow: `0 2px 8px -2px ${bg}66`,
                    }}>
                      {hasLogo ? (
                        <img src={logos[lic]} alt={dName} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }} />
                      ) : (
                        <span style={{ fontSize: '9px', fontWeight: 800, color: fg, textAlign: 'center', padding: '2px', lineHeight: 1.1, wordBreak: 'break-word' }}>
                          {dName.slice(0,6)}
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--txt)', whiteSpace: 'nowrap' }}>{dName}</span>
                    {hasLogo && (
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--badge-new)', flexShrink: 0, boxShadow: '0 0 6px var(--badge-new)' }} />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
