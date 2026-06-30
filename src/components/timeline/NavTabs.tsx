'use client'

export type TabKey = 'Q1' | 'Q2' | 'Q3' | 'Q4' | 'all-year' | 'estrenos'

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: 'Q1',       label: 'Q1 · Ene–Mar', icon: '🌱' },
  { key: 'Q2',       label: 'Q2 · Abr–Jun', icon: '☀️' },
  { key: 'Q3',       label: 'Q3 · Jul–Sep', icon: '🍂' },
  { key: 'Q4',       label: 'Q4 · Oct–Dic', icon: '❄️' },
  { key: 'all-year', label: 'Todo el Año',   icon: '♾️' },
  { key: 'estrenos', label: 'Estrenos',      icon: '🎬' },
]

interface Props {
  active: TabKey
  onChange: (tab: TabKey) => void
}

export function NavTabs({ active, onChange }: Props) {
  return (
    <div style={{
      display: 'flex',
      gap: '4px',
      overflowX: 'auto',
      padding: '4px',
      background: 'rgba(255,255,255,.03)',
      borderRadius: '18px',
      border: '1px solid var(--line)',
      backdropFilter: 'blur(12px)',
      scrollbarWidth: 'none',
    }}>
      {TABS.map(tab => {
        const isActive = tab.key === active
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '9px 16px',
              borderRadius: '14px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: "'Space Grotesk','Inter',sans-serif",
              fontSize: '12.5px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              transition: 'all .22s var(--ease)',
              background: isActive
                ? 'linear-gradient(145deg,rgba(0,174,239,.22),rgba(0,174,239,.10))'
                : 'transparent',
              color: isActive ? '#fff' : 'var(--txt-3)',
              boxShadow: isActive
                ? '0 0 0 1px rgba(0,174,239,.35),0 2px 12px -4px rgba(0,174,239,.3)'
                : 'none',
            }}
          >
            <span style={{ fontSize: '14px' }}>{tab.icon}</span>
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
