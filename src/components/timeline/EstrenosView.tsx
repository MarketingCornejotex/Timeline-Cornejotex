'use client'

import type { Estreno } from '@/types/database'

const TYPE_COLORS: Record<string, [string, string]> = {
  'Película Marvel':   ['#9B0000','#fff'],
  'Película DC':       ['#1565C0','#fff'],
  'Película Animada':  ['#E65C00','#fff'],
  'Película Disney':   ['#1565C0','#fff'],
  'Película':          ['#1A237E','#fff'],
  'Serie Animada':     ['#1B5E20','#fff'],
  'Concierto':         ['#4A148C','#fff'],
  'Evento Global':     ['#003DA5','#fff'],
  'Temporada Alta':    ['#6D0000','#fff'],
}

const Q_LABELS: Record<string, string> = {
  Q1: 'Q1 · Enero – Marzo',
  Q2: 'Q2 · Abril – Junio',
  Q3: 'Q3 · Julio – Septiembre',
  Q4: 'Q4 · Octubre – Diciembre',
}

interface Props {
  estrenos: Estreno[]
  logos: Record<string, string>
}

export function EstrenosView({ estrenos, logos }: Props) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
        <span style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '15px', fontWeight: 600, color: '#fff', padding: '9px 18px', borderRadius: '12px', background: 'linear-gradient(150deg,rgba(0,174,239,.18),rgba(0,174,239,.05))', border: '1px solid rgba(0,174,239,.3)' }}>
          🎬 Estrenos & Lanzamientos · 2026
        </span>
        <span style={{ fontSize: '13px', color: 'var(--txt-3)' }}>Películas, series y eventos clave del año</span>
      </div>

      {(['Q1','Q2','Q3','Q4'] as const).map(q => {
        const items = estrenos.filter(e => e.quarter === q)
        if (!items.length) return null

        return (
          <div key={q}>
            {/* Section label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '13px', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '.1em', margin: '6px 0 16px' }}>
              {Q_LABELS[q]}
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg,var(--line-2),transparent)' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(268px,1fr))', gap: '18px', marginBottom: '34px' }}>
              {items.map(est => {
                const posterKey = `__estreno__${est.title}`
                const posterSrc = est.poster_url || logos[posterKey]
                const [tc, tf] = TYPE_COLORS[est.type] || ['#1A1A1A','#fff']

                return (
                  <div key={est.id} style={{
                    position: 'relative',
                    background: 'var(--surface)',
                    border: '1px solid var(--line)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 1px 0 rgba(255,255,255,.03) inset, 0 18px 50px -18px rgba(0,0,0,.7)',
                  }}>
                    {/* Poster */}
                    <div style={{ position: 'relative', width: '100%', height: '188px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: `linear-gradient(160deg,${est.color_bg}44,${est.color_bg}18)` }}>
                      {posterSrc ? (
                        <img src={posterSrc} alt={est.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--txt-4)', position: 'relative', zIndex: 2 }}>
                          <span style={{ fontSize: '38px', opacity: .7 }}>🎬</span>
                          <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,.3)' }}>{est.type}</span>
                        </div>
                      )}
                      {/* Gradient overlay */}
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,transparent 42%,rgba(8,12,18,.55) 78%,rgba(8,12,18,.92))', zIndex: 1 }} />
                      {/* Type chip */}
                      <span style={{ position: 'absolute', top: '11px', left: '11px', zIndex: 3, fontSize: '9.5px', fontWeight: 800, padding: '4px 11px', borderRadius: '20px', textTransform: 'uppercase', letterSpacing: '.06em', background: tc, color: tf, boxShadow: '0 4px 12px -2px rgba(0,0,0,.6)', border: '1px solid rgba(255,255,255,.16)' }}>
                        {est.type}
                      </span>
                    </div>

                    {/* Info */}
                    <div style={{ position: 'relative', zIndex: 2, padding: '15px 16px 17px', marginTop: '-30px' }}>
                      <div style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '16px', fontWeight: 600, color: '#fff', lineHeight: 1.22, marginBottom: '9px', textShadow: '0 2px 10px rgba(0,0,0,.6)' }}>
                        {est.title}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                        {est.event_date && (
                          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--brand-2)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                            📅 {est.event_date}
                          </span>
                        )}
                        {est.studio && (
                          <span style={{ marginLeft: 'auto', fontSize: '10.5px', color: 'var(--txt-3)', fontWeight: 500 }}>
                            {est.studio}
                          </span>
                        )}
                      </div>
                      {est.description && (
                        <div style={{ fontSize: '11.5px', color: 'var(--txt-3)', marginTop: '11px', lineHeight: 1.55, borderTop: '1px solid var(--line)', paddingTop: '11px' }}>
                          {est.description}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
