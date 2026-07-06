'use client'

import type { MonthDef } from '@/data/quarters'
import { LicenseCard } from './LicenseCard'
import type { SegmentKey } from '@/data/segments'

interface Props {
  month: MonthDef
  logos: Record<string, string>
  displayName: (name: string) => string
  activeFilter: string
  hiddenNames: Set<string>
  onLicenseClick: (name: string, type: string, licensor: string, segs: SegmentKey[]) => void
}

export function MonthColumn({ month, logos, displayName, activeFilter, hiddenNames, onLicenseClick }: Props) {
  const visible = month.licenses.filter(l =>
    !hiddenNames.has(l.name) &&
    (activeFilter === 'todos' || l.segs.includes(activeFilter as SegmentKey))
  )

  return (
    <div style={{
      background: 'linear-gradient(180deg,var(--surface),var(--bg-2))',
      border: '1px solid var(--line)',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 1px 0 rgba(255,255,255,.03) inset, 0 18px 50px -18px rgba(0,0,0,.7)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderBottom: '1px solid var(--line)', background: 'linear-gradient(180deg,rgba(255,255,255,.03),transparent)' }}>
        <div>
          <div style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '.02em' }}>{month.id}</div>
          <div style={{ fontSize: '10px', color: 'var(--txt-3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.16em', marginTop: '5px' }}>{month.name} 2026</div>
        </div>
        <div style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--brand-2)', minWidth: '30px', height: '30px', padding: '0 9px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '9px', background: 'rgba(0,174,239,.1)', border: '1px solid rgba(0,174,239,.24)' }}>
          {visible.length}
        </div>
      </div>

      {/* Date pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', padding: '11px 16px', borderBottom: '1px solid var(--line)', background: 'rgba(0,0,0,.18)' }}>
        {month.dates.map(d => (
          <span key={d} style={{ fontSize: '10.5px', fontWeight: 600, padding: '4px 11px', borderRadius: '30px', background: 'rgba(255,255,255,.05)', color: 'var(--txt-2)', border: '1px solid var(--line-2)', whiteSpace: 'nowrap' }}>
            {d}
          </span>
        ))}
      </div>

      {/* License grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '11px', padding: '14px' }}>
        {month.licenses.map(lic => (
          <LicenseCard
            key={lic.name}
            name={lic.name}
            displayName={displayName(lic.name)}
            type={lic.type}
            segs={lic.segs}
            logoUrl={logos[lic.name]}
            activeFilter={activeFilter}
            onClick={() => onLicenseClick(lic.name, lic.type, lic.licensor, lic.segs)}
          />
        ))}
      </div>
    </div>
  )
}
