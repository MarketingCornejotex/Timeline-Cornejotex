'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

// Mapa de usuario → email interno (solo admin conoce el email real)
const USER_MAP: Record<string, string> = {
  'cornejo':  'cornejo@cornejotex.com',
}

function resolveEmail(input: string): string {
  const key = input.trim().toLowerCase()
  return USER_MAP[key] ?? (key.includes('@') ? key : `${key}@cornejotex.com`)
}

export default function LoginPage() {
  const router = useRouter()
  const [usuario, setUsuario]   = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const email = resolveEmail(usuario)
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Usuario o contraseña incorrectos.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ width: '100%', maxWidth: '360px' }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'linear-gradient(145deg,#00AEEF,#0077A8)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', boxShadow: '0 0 0 1px rgba(0,174,239,.3),0 8px 24px -6px rgba(0,174,239,.5)' }}>
            <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
              <path d="M3 4.5L9 2L15 4.5V10C15 13 12 15.5 9 16.5C6 15.5 3 13 3 10V4.5Z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
              <path d="M6.5 9L8.5 11L11.5 7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '20px', fontWeight: 700, color: '#fff', margin: '0 0 4px' }}>Cornejotex</h1>
          <p style={{ fontSize: '12px', color: 'var(--txt-3)' }}>Panel de administración · Licencias 2026</p>
        </div>

        {/* Card */}
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line-2)', borderRadius: '22px', padding: '28px', boxShadow: '0 24px 60px -16px rgba(0,0,0,.8)' }}>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--txt-4)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '6px' }}>
                Usuario
              </label>
              <input
                required
                value={usuario}
                onChange={e => setUsuario(e.target.value)}
                placeholder="Cornejo"
                autoComplete="username"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--line-2)', background: 'var(--bg-2)', color: 'var(--txt)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '10.5px', fontWeight: 700, color: 'var(--txt-4)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '6px' }}>
                Contraseña
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '12px', border: '1px solid var(--line-2)', background: 'var(--bg-2)', color: 'var(--txt)', fontSize: '13px', outline: 'none' }}
              />
            </div>

            {error && (
              <div style={{ padding: '10px 14px', background: 'rgba(248,113,113,.12)', border: '1px solid rgba(248,113,113,.3)', borderRadius: '10px', color: 'var(--danger)', fontSize: '12px', marginBottom: '16px' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', padding: '11px', borderRadius: '12px', background: 'linear-gradient(145deg,#00AEEF,#0077A8)', color: '#fff', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', opacity: loading ? .7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 16px -4px rgba(0,174,239,.5)' }}
            >
              {loading && (
                <div style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,.5)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
              )}
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="/" style={{ fontSize: '12px', color: 'var(--txt-4)', textDecoration: 'none' }}>← Ver catálogo público</a>
        </div>
      </div>
    </div>
  )
}
