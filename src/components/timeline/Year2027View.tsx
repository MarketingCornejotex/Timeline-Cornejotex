'use client'

import { LicenseCard } from './LicenseCard'
import type { SegmentKey } from '@/data/segments'
import type { LicenseType } from '@/data/segments'

interface Item { name: string; segs: SegmentKey[]; licensor: string; type: LicenseType }

interface Props {
  items: Item[]
  logos: Record<string, string>
  displayName: (name: string) => string
  activeFilter: string
  hiddenNames: Set<string>
  onLicenseClick: (name: string, type: string, licensor: string, segs: SegmentKey[]) => void
}

export function Year2027View({ items, logos, displayName, activeFilter, hiddenNames, onLicenseClick }: Props) {
  const groups = new Map<string, { licensor: string; items: Item[] }>()
  items.forEach(it => {
    const key = it.licensor.toLowerCase()
    const g = groups.get(key)
    if (g) g.items.push(it); else groups.set(key, { licensor: it.licensor, items: [it] })
  })

  const visibleGroups = Array.from(groups.values())
    .map(g => ({
      ...g,
      items: g.items.filter(it =>
        !hiddenNames.has(it.name) &&
        (activeFilter === 'todos' || it.segs.includes(activeFilter as SegmentKey))
      ),
    }))
    .filter(g => g.items.length > 0)
    .sort((a, b) => a.licensor.localeCompare(b.licensor, 'es'))

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
        <h2 style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '22px', fontWeight: 700, color: '#fff' }}>
          Catálogo 2027
        </h2>
        <span style={{ fontSize: '12px', color: 'var(--txt-3)', paddingLeft: '4px' }}>
          En desarrollo — se va llenando desde el admin
        </span>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,var(--line-2),transparent)' }} />
      </div>

      {visibleGroups.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '64px 20px', color: 'var(--txt-4)', fontSize: '13px', border: '1px dashed var(--line-2)', borderRadius: '16px' }}>
          🚧 Todavía no hay propiedades cargadas para 2027.<br />
          Se van a ir mostrando acá a medida que se agreguen desde el panel de administración.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {visibleGroups.map(group => (
            <div key={group.licensor}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <span style={{ fontSize: '18px' }}>🚀</span>
                <span style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '14px', fontWeight: 700, color: '#fff', letterSpacing: '-.01em' }}>
                  {group.licensor}
                </span>
                <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,var(--line-2),transparent)' }} />
                <span style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '13px', fontWeight: 600, color: 'var(--brand-2)', minWidth: '30px', height: '30px', padding: '0 9px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '9px', background: 'rgba(0,174,239,.1)', border: '1px solid rgba(0,174,239,.24)' }}>
                  {group.items.length}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '11px' }}>
                {group.items.map(it => (
                  <LicenseCard
                    key={it.name}
                    name={it.name}
                    displayName={displayName(it.name)}
                    type={it.type}
                    segs={it.segs}
                    logoUrl={logos[it.name]}
                    activeFilter="todos"
                    onClick={() => onLicenseClick(it.name, it.type, group.licensor, it.segs)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
