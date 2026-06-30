'use client'

interface Props {
  onAdminClick?: () => void
}

export function Header({ onAdminClick }: Props) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(9,12,18,.88)',
      backdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '1px solid var(--line)',
      boxShadow: '0 1px 0 rgba(0,174,239,.08)',
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 24px', height: '60px', display: 'flex', alignItems: 'center', gap: '18px' }}>
        {/* Brand mark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '9px',
            background: 'linear-gradient(145deg,#00AEEF,#0077A8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 0 1px rgba(0,174,239,.3), 0 4px 16px -4px rgba(0,174,239,.5)',
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 4.5L9 2L15 4.5V10C15 13 12 15.5 9 16.5C6 15.5 3 13 3 10V4.5Z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
              <path d="M6.5 9L8.5 11L11.5 7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '.02em', lineHeight: 1 }}>
              Cornejotex
            </div>
            <div style={{ fontSize: '9.5px', color: 'var(--brand-2)', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', marginTop: '3px' }}>
              Licencias 2026
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '28px', background: 'var(--line-2)', flexShrink: 0 }} />

        {/* Subtitle */}
        <div style={{ fontSize: '12px', color: 'var(--txt-3)', fontWeight: 500 }}>
          Catálogo de propiedades intelectuales · Ecuador
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Year chip */}
        <div style={{ padding: '5px 14px', borderRadius: '30px', background: 'rgba(0,174,239,.1)', border: '1px solid rgba(0,174,239,.24)', fontSize: '11px', fontWeight: 700, color: 'var(--brand-2)', letterSpacing: '.04em' }}>
          2026
        </div>

        {/* Admin link */}
        {onAdminClick ? (
          <button
            onClick={onAdminClick}
            style={{ padding: '7px 16px', borderRadius: '10px', background: 'rgba(255,255,255,.05)', border: '1px solid var(--line-2)', color: 'var(--txt-3)', fontSize: '12px', fontWeight: 600, cursor: 'pointer', transition: 'all .2s var(--ease)' }}
          >
            Administrar
          </button>
        ) : (
          <a
            href="/admin"
            style={{ padding: '7px 16px', borderRadius: '10px', background: 'rgba(255,255,255,.05)', border: '1px solid var(--line-2)', color: 'var(--txt-3)', fontSize: '12px', fontWeight: 600, textDecoration: 'none', transition: 'all .2s var(--ease)' }}
          >
            Administrar
          </a>
        )}
      </div>
    </header>
  )
}
