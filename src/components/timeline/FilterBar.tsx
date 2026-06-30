'use client'

import { SEG_LABELS, type SegmentKey } from '@/data/segments'

const SEG_ICONS: Record<string, string> = {
  todos: '✦',
  adultos: '👤',
  ninos: '🧒',
  bebes: '👶',
  hogar: '🏠',
  mascotas: '🐾',
}

const ALL_FILTERS = [
  { key: 'todos', label: 'Todos' },
  ...Object.entries(SEG_LABELS).map(([k, v]) => ({ key: k, label: v })),
]

interface Props {
  active: string
  onChange: (filter: string) => void
}

export function FilterBar({ active, onChange }: Props) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      overflowX: 'auto',
      scrollbarWidth: 'none',
    }}>
      <span style={{ fontSize: '11px', color: 'var(--txt-4)', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', whiteSpace: 'nowrap', flexShrink: 0 }}>
        Segmento
      </span>
      {ALL_FILTERS.map(f => {
        const isActive = f.key === active
        return (
          <button
            key={f.key}
            onClick={() => onChange(f.key)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '30px',
              border: `1px solid ${isActive ? 'rgba(0,174,239,.4)' : 'var(--line)'}`,
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              transition: 'all .2s var(--ease)',
              background: isActive
                ? 'linear-gradient(145deg,rgba(0,174,239,.18),rgba(0,174,239,.06))'
                : 'rgba(255,255,255,.028)',
              color: isActive ? '#fff' : 'var(--txt-3)',
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: '13px' }}>{SEG_ICONS[f.key] ?? '•'}</span>
            {f.label}
          </button>
        )
      })}
    </div>
  )
}
