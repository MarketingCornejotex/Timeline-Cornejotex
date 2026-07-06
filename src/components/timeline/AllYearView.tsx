'use client'

import { ALL_YEAR } from '@/data/all-year'
import { LicenseCard } from './LicenseCard'
import type { SegmentKey } from '@/data/segments'

interface Props {
  logos: Record<string, string>
  displayName: (name: string) => string
  activeFilter: string
  hiddenNames: Set<string>
  onLicenseClick: (name: string, type: string, licensor: string, segs: SegmentKey[]) => void
}

export function AllYearView({ logos, displayName, activeFilter, hiddenNames, onLicenseClick }: Props) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
        <h2 style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '22px', fontWeight: 700, color: '#fff' }}>
          Todo el Año
        </h2>
        <span style={{ fontSize: '12px', color: 'var(--txt-3)', paddingLeft: '4px' }}>
          Licencias disponibles en cualquier trimestre
        </span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,var(--line-2),transparent)' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {ALL_YEAR.map(group => {
          const visible = group.licenses.filter(lic =>
            !hiddenNames.has(lic.name) &&
            (activeFilter === 'todos' || lic.segs.includes(activeFilter as SegmentKey))
          )
          if (visible.length === 0) return null

          return (
            <div key={group.licensor}>
              {/* Licensor header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span style={{ fontSize: '18px' }}>{group.icon}</span>
                <span style={{
                  fontFamily: "'Space Grotesk','Inter',sans-serif",
                  fontSize: '14px', fontWeight: 700, color: '#fff', letterSpacing: '-.01em',
                }}>
                  {group.licensor}
                </span>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,var(--line-2),transparent)' }} />
                <span style={{
                  fontFamily: "'Space Grotesk','Inter',sans-serif",
                  fontSize: '13px', fontWeight: 600, color: 'var(--brand-2)',
                  minWidth: '30px', height: '30px', padding: '0 9px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '9px', background: 'rgba(0,174,239,.1)',
                  border: '1px solid rgba(0,174,239,.24)',
                }}>
                  {visible.length}
                </span>
              </div>

              {/* License grid — same 2-col layout as MonthColumn */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '11px' }}>
                {visible.map(lic => (
                  <LicenseCard
                    key={lic.name}
                    name={lic.name}
                    displayName={displayName(lic.name)}
                    type="ann"
                    segs={lic.segs}
                    logoUrl={logos[lic.name]}
                    activeFilter={activeFilter}
                    onClick={() => onLicenseClick(lic.name, 'ann', group.licensor, lic.segs)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
