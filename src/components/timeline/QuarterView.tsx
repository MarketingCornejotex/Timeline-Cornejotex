'use client'

import type { LicenseDef, QuarterDef } from '@/data/quarters'
import { MonthColumn } from './MonthColumn'
import type { SegmentKey } from '@/data/segments'

interface Props {
  quarter: QuarterDef
  logos: Record<string, string>
  displayName: (name: string) => string
  activeFilter: string
  hiddenNames: Set<string>
  extraByMonth?: Record<string, LicenseDef[]>
  onLicenseClick: (name: string, type: string, licensor: string, segs: SegmentKey[]) => void
}

export function QuarterView({ quarter, logos, displayName, activeFilter, hiddenNames, extraByMonth, onLicenseClick }: Props) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
        <h2 style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '22px', fontWeight: 700, color: '#fff', letterSpacing: '-.02em' }}>
          {quarter.label}
        </h2>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,var(--line-2),transparent)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: '22px' }}>
        {quarter.months.map(month => (
          <MonthColumn
            key={month.id}
            month={month}
            logos={logos}
            displayName={displayName}
            activeFilter={activeFilter}
            hiddenNames={hiddenNames}
            extraLicenses={extraByMonth?.[month.id]}
            onLicenseClick={onLicenseClick}
          />
        ))}
      </div>
    </div>
  )
}
