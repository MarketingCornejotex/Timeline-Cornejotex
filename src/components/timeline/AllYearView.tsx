'use client'

import { ALL_YEAR } from '@/data/all-year'
import { LicenseCard } from './LicenseCard'
import type { SegmentKey } from '@/data/segments'

interface ExtraLic { name: string; segs: SegmentKey[]; licensor: string }

interface Props {
  logos: Record<string, string>
  displayName: (name: string) => string
  activeFilter: string
  hiddenNames: Set<string>
  extraAllYear?: ExtraLic[]
  overriddenNames?: Set<string>
  onLicenseClick: (name: string, type: string, licensor: string, segs: SegmentKey[]) => void
}

function LicensorSection({ licensor, icon, licenses, logos, displayName, activeFilter, hiddenNames, onLicenseClick }: {
  licensor: string; icon: string
  licenses: { name: string; segs: SegmentKey[] }[]
  logos: Record<string, string>
  displayName: (n: string) => string
  activeFilter: string
  hiddenNames: Set<string>
  onLicenseClick: (name: string, type: string, licensor: string, segs: SegmentKey[]) => void
}) {
  const visible = licenses.filter(lic =>
    !hiddenNames.has(lic.name) &&
    (activeFilter === 'todos' || lic.segs.includes(activeFilter as SegmentKey))
  )
  if (visible.length === 0) return null

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <span style={{ fontSize: '18px' }}>{icon}</span>
        <span style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '14px', fontWeight: 700, color: '#fff', letterSpacing: '-.01em' }}>
          {licensor}
        </span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,var(--line-2),transparent)' }} />
        <span style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--brand-2)', minWidth: '30px', height: '30px', padding: '0 9px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '9px', background: 'rgba(0,174,239,.1)', border: '1px solid rgba(0,174,239,.24)' }}>
          {visible.length}
        </span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '11px' }}>
        {visible.map(lic => (
          <LicenseCard
            key={lic.name}
            name={lic.name}
            displayName={displayName(lic.name)}
            type="ann"
            segs={lic.segs}
            logoUrl={logos[lic.name]}
            activeFilter="todos"
            onClick={() => onLicenseClick(lic.name, 'ann', licensor, lic.segs)}
          />
        ))}
      </div>
    </div>
  )
}

export function AllYearView({ logos, displayName, activeFilter, hiddenNames, extraAllYear, overriddenNames, onLicenseClick }: Props) {
  // Group extra licenses by licensor
  const extraGroups = extraAllYear && extraAllYear.length > 0
    ? Object.values(
        extraAllYear.reduce<Record<string, { licensor: string; licenses: ExtraLic[] }>>((acc, l) => {
          if (!acc[l.licensor]) acc[l.licensor] = { licensor: l.licensor, licenses: [] }
          acc[l.licensor].licenses.push(l)
          return acc
        }, {})
      )
    : []

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
        {ALL_YEAR.map(group => (
          <LicensorSection
            key={group.licensor}
            licensor={group.licensor}
            icon={group.icon}
            licenses={overriddenNames && overriddenNames.size > 0
              ? group.licenses.filter(l => !overriddenNames.has(l.name))
              : group.licenses}
            logos={logos}
            displayName={displayName}
            activeFilter={activeFilter}
            hiddenNames={hiddenNames}
            onLicenseClick={onLicenseClick}
          />
        ))}

        {extraGroups.map(g => (
          <LicensorSection
            key={`dyn-${g.licensor}`}
            licensor={g.licensor}
            icon="🏷️"
            licenses={g.licenses}
            logos={logos}
            displayName={displayName}
            activeFilter={activeFilter}
            hiddenNames={hiddenNames}
            onLicenseClick={onLicenseClick}
          />
        ))}
      </div>
    </div>
  )
}
