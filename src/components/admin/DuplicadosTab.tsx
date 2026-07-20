'use client'

import { useMemo, useState } from 'react'
import { usePropertiesAdmin } from '@/lib/hooks/usePropertiesAdmin'
import type { DynamicLicense } from '@/types/database'

const DISMISSED_KEY = 'timeline_admin_dismissed_dup_groups'

// ─── Normalización + similitud ──────────────────────────────────────────────
// Mismo criterio usado para depurar duplicados por consola: ignora acentos,
// mayúsculas, apóstrofes/acentos sueltos y puntuación al comparar nombres.

function normalize(s: string): string {
  return s
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[´'''`]/g, "'")
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))
  for (let i = 0; i <= m; i++) dp[i][0] = i
  for (let j = 0; j <= n; j++) dp[0][j] = j
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
    }
  }
  return dp[m][n]
}

// Coincide si una es prefijo de la otra (ej. "Universal" / "Universal Studios",
// abreviaturas típicas de esta base) o si la distancia de edición es chica.
function isFuzzyMatch(a: string, b: string): boolean {
  if (!a || !b || a === b) return false
  const shorter = a.length <= b.length ? a : b
  const longer = a.length <= b.length ? b : a
  if (shorter.length >= 4 && longer.startsWith(shorter)) return true
  const d = levenshtein(a, b)
  const ratio = 1 - d / longer.length
  return ratio >= 0.8 && d <= 5
}

// Agrupa claves normalizadas en clusters transitivos (union-find): si A~B y B~C,
// A/B/C terminan en un mismo grupo aunque A y C no sean parecidas directamente
// entre sí. Evita que una franquicia con varias variantes (ej. "Dragon Ball",
// "Dragon Ball Z", "Dragon Ball Super") aparezca repetida en varias tarjetas.
function clusterKeys(keys: string[], exactKeys: Set<string>): { keys: string[]; confidence: 'exact' | 'fuzzy' }[] {
  const parent = new Map<string, string>(keys.map(k => [k, k]))
  function find(x: string): string {
    let root = x
    while (parent.get(root) !== root) root = parent.get(root)!
    let cur = x
    while (parent.get(cur) !== root) { const next = parent.get(cur)!; parent.set(cur, root); cur = next }
    return root
  }
  function union(a: string, b: string) {
    const ra = find(a), rb = find(b)
    if (ra !== rb) parent.set(ra, rb)
  }

  for (let i = 0; i < keys.length; i++) {
    for (let j = i + 1; j < keys.length; j++) {
      if (isFuzzyMatch(keys[i], keys[j])) union(keys[i], keys[j])
    }
  }

  const clusters = new Map<string, { keys: string[]; hasExact: boolean }>()
  keys.forEach(k => {
    const root = find(k)
    const c = clusters.get(root) ?? { keys: [], hasExact: false }
    c.keys.push(k)
    if (exactKeys.has(k)) c.hasExact = true
    clusters.set(root, c)
  })

  return Array.from(clusters.values()).map(c => ({
    keys: c.keys,
    confidence: c.hasExact ? 'exact' as const : 'fuzzy' as const,
  }))
}

// ─── Duplicados de nombre de propiedad ──────────────────────────────────────

interface NameGroup {
  id: string
  confidence: 'exact' | 'fuzzy'
  members: DynamicLicense[]
}

function findNameDuplicates(items: DynamicLicense[]): NameGroup[] {
  const byNorm = new Map<string, DynamicLicense[]>()
  items.forEach(it => {
    const k = normalize(it.name)
    const arr = byNorm.get(k)
    if (arr) arr.push(it); else byNorm.set(k, [it])
  })

  const keys = Array.from(byNorm.keys())
  const exactKeys = new Set(keys.filter(k => byNorm.get(k)!.length > 1))

  return clusterKeys(keys, exactKeys)
    .map(c => ({
      id: `name:${c.keys.slice().sort().join('|')}`,
      confidence: c.confidence,
      members: c.keys.flatMap(k => byNorm.get(k)!),
    }))
    .filter(g => g.members.length > 1)
}

// ─── Duplicados de licenciante ──────────────────────────────────────────────

interface LicensorVariant { licensor: string; count: number }
interface LicensorGroup {
  id: string
  confidence: 'exact' | 'fuzzy'
  variants: LicensorVariant[]
}

function findLicensorDuplicates(items: DynamicLicense[]): LicensorGroup[] {
  const counts = new Map<string, number>()
  items.forEach(it => counts.set(it.licensor, (counts.get(it.licensor) ?? 0) + 1))

  const byNorm = new Map<string, LicensorVariant[]>()
  counts.forEach((count, licensor) => {
    const k = normalize(licensor)
    const arr = byNorm.get(k)
    const v = { licensor, count }
    if (arr) arr.push(v); else byNorm.set(k, [v])
  })

  const keys = Array.from(byNorm.keys())
  const exactKeys = new Set(keys.filter(k => byNorm.get(k)!.length > 1))

  return clusterKeys(keys, exactKeys)
    .map(c => ({
      id: `lic:${c.keys.slice().sort().join('|')}`,
      confidence: c.confidence,
      variants: c.keys.flatMap(k => byNorm.get(k)!),
    }))
    .filter(g => g.variants.length > 1)
}

function loadDismissed(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    const raw = window.localStorage.getItem(DISMISSED_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function saveDismissed(set: Set<string>) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(DISMISSED_KEY, JSON.stringify(Array.from(set)))
}

function quarterLabel(it: DynamicLicense) {
  if (!it.quarter) return 'Todo el año'
  return `Todo el año + ${it.quarter}${it.month_id ? ' · ' + it.month_id : ''}`
}

const YEARS = [2026, 2027] as const

export function DuplicadosTab() {
  const { items, loading, saving, error, bulkRenameLicensor, mergeProperties } = usePropertiesAdmin()
  const [year, setYear] = useState<number>(2026)
  const [dismissed, setDismissed] = useState<Set<string>>(() => loadDismissed())
  const [nameChoice, setNameChoice] = useState<Record<string, { winnerId: string; finalName: string }>>({})
  const [licChoice, setLicChoice] = useState<Record<string, string>>({})

  function dismiss(id: string) {
    setDismissed(prev => {
      const next = new Set(prev).add(id)
      saveDismissed(next)
      return next
    })
  }

  const yearItems = useMemo(() => items.filter(it => it.year === year), [items, year])

  const nameGroups = useMemo(
    () => findNameDuplicates(yearItems).filter(g => !dismissed.has(g.id)),
    [yearItems, dismissed]
  )
  const licGroups = useMemo(
    () => findLicensorDuplicates(yearItems).filter(g => !dismissed.has(g.id)),
    [yearItems, dismissed]
  )

  function defaultWinner(members: DynamicLicense[]): DynamicLicense {
    return [...members].sort((a, b) => {
      const score = (m: DynamicLicense) => (m.quarter ? 2 : 0) + (m.special_events ? 1 : 0)
      return score(b) - score(a)
    })[0]
  }

  function defaultLicensor(variants: LicensorVariant[]): string {
    return [...variants].sort((a, b) => b.licensor.length - a.licensor.length || b.count - a.count)[0].licensor
  }

  async function mergeNames(group: NameGroup) {
    const choice = nameChoice[group.id]
    const winner = choice ? group.members.find(m => m.id === choice.winnerId) ?? defaultWinner(group.members) : defaultWinner(group.members)
    const finalName = choice?.finalName?.trim() || winner.name
    const loserIds = group.members.filter(m => m.id !== winner.id).map(m => m.id)
    const ok = await mergeProperties(winner.id, finalName, loserIds)
    if (ok) dismiss(group.id)
  }

  async function mergeLicensors(group: LicensorGroup) {
    const finalLicensor = (licChoice[group.id] ?? defaultLicensor(group.variants)).trim()
    if (!finalLicensor) return
    const ok = await bulkRenameLicensor(group.variants.map(v => v.licensor), finalLicensor)
    if (ok) dismiss(group.id)
  }

  const totalFound = nameGroups.length + licGroups.length

  return (
    <div>
      <div style={{ marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,.03)', border: '1px solid var(--line)', borderRadius: '10px', padding: '3px', flexShrink: 0 }}>
            {YEARS.map(y => (
              <button
                key={y}
                type="button"
                onClick={() => setYear(y)}
                style={{
                  padding: '6px 14px', borderRadius: '7px', border: 'none', cursor: 'pointer', fontSize: '12.5px', fontWeight: 700,
                  background: year === y ? 'var(--brand)' : 'transparent',
                  color: year === y ? '#fff' : 'var(--txt-3)',
                }}
              >
                {y}
              </button>
            ))}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--txt-3)' }}>
            {loading ? 'Analizando inventario...' : `${totalFound} posible${totalFound === 1 ? '' : 's'} duplicado${totalFound === 1 ? '' : 's'} detectado${totalFound === 1 ? '' : 's'} en ${year}`}
          </div>
        </div>
        <p style={{ fontSize: '11.5px', color: 'var(--txt-4)', margin: '6px 0 0', maxWidth: '760px' }}>
          Detecta nombres de propiedades y licenciantes casi idénticos (acentos, mayúsculas, espacios, abreviaturas)
          que hoy conviven como filas separadas. Fusionar reescribe la base de datos directamente, así que el
          catálogo público deja de mostrar la versión duplicada de inmediato — sin conflicto con el timeline final,
          porque queda una sola fila haciendo de fuente de verdad.
        </p>
      </div>

      {error && (
        <div style={{ padding: '10px 14px', background: 'rgba(248,113,113,.12)', border: '1px solid rgba(248,113,113,.3)', borderRadius: '10px', color: 'var(--danger)', fontSize: '12px', marginBottom: '14px' }}>{error}</div>
      )}

      {loading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--txt-3)', fontSize: '13px', padding: '24px 0' }}>
          <div style={{ width: '14px', height: '14px', border: '2px solid var(--brand)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
          Cargando...
        </div>
      )}

      {!loading && totalFound === 0 && (
        <div style={{ textAlign: 'center', padding: '48px', color: 'var(--txt-4)', fontSize: '13px', border: '1px dashed var(--line-2)', borderRadius: '14px' }}>
          ✓ No se encontraron duplicados de propiedades ni de licenciantes.
        </div>
      )}

      {!loading && licGroups.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <div style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
            Licenciantes duplicados ({licGroups.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {licGroups.map(group => {
              const selected = licChoice[group.id] ?? defaultLicensor(group.variants)
              return (
                <div key={group.id} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '14px', padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                    {group.confidence === 'fuzzy' && (
                      <span style={{ fontSize: '9.5px', padding: '2px 7px', borderRadius: '5px', fontWeight: 700, background: 'rgba(251,191,36,.15)', color: '#fbbf24' }}>REVISAR — podrían ser distintos</span>
                    )}
                    <span style={{ fontSize: '12px', color: 'var(--txt-3)' }}>{group.variants.length} variantes encontradas</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
                    {group.variants.map(v => (
                      <label key={v.licensor} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12.5px', color: 'var(--txt-2)', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name={`lic-${group.id}`}
                          checked={selected === v.licensor}
                          onChange={() => setLicChoice(prev => ({ ...prev, [group.id]: v.licensor }))}
                        />
                        <strong style={{ color: '#fff' }}>{v.licensor}</strong>
                        <span style={{ color: 'var(--txt-4)' }}>({v.count} propiedad{v.count === 1 ? '' : 'es'})</span>
                      </label>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <input
                      value={selected}
                      onChange={e => setLicChoice(prev => ({ ...prev, [group.id]: e.target.value }))}
                      style={{ ...inp, flex: 1, minWidth: '200px', maxWidth: '320px' }}
                      placeholder="Nombre final del licenciante"
                    />
                    <button onClick={() => mergeLicensors(group)} disabled={saving} style={{ ...btnPrimary, opacity: saving ? .6 : 1 }}>
                      {saving ? 'Fusionando...' : `Fusionar en "${selected}"`}
                    </button>
                    <button onClick={() => dismiss(group.id)} style={btnGhost}>No son el mismo estudio</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {!loading && nameGroups.length > 0 && (
        <div>
          <div style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
            Propiedades duplicadas ({nameGroups.length})
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {nameGroups.map(group => {
              const winner = defaultWinner(group.members)
              const choice = nameChoice[group.id] ?? { winnerId: winner.id, finalName: winner.name }
              return (
                <div key={group.id} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '14px', padding: '14px 16px' }}>
                  {group.confidence === 'fuzzy' && (
                    <span style={{ display: 'inline-block', fontSize: '9.5px', padding: '2px 7px', borderRadius: '5px', fontWeight: 700, background: 'rgba(251,191,36,.15)', color: '#fbbf24', marginBottom: '10px' }}>REVISAR — podrían ser propiedades distintas</span>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '10px' }}>
                    {group.members.map(m => (
                      <label key={m.id} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12.5px', color: 'var(--txt-2)', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name={`name-${group.id}`}
                          checked={choice.winnerId === m.id}
                          onChange={() => setNameChoice(prev => ({ ...prev, [group.id]: { winnerId: m.id, finalName: m.name } }))}
                          style={{ marginTop: '3px' }}
                        />
                        <div>
                          <strong style={{ color: '#fff' }}>{m.name}</strong>
                          <span style={{ color: 'var(--txt-4)' }}> — {m.licensor}</span>
                          <div style={{ color: 'var(--txt-3)', fontSize: '11px' }}>
                            {quarterLabel(m)}{m.special_events ? ` · ${m.special_events}` : ''}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <input
                      value={choice.finalName}
                      onChange={e => setNameChoice(prev => ({ ...prev, [group.id]: { winnerId: choice.winnerId, finalName: e.target.value } }))}
                      style={{ ...inp, flex: 1, minWidth: '200px', maxWidth: '320px' }}
                      placeholder="Nombre final de la propiedad"
                    />
                    <button onClick={() => mergeNames(group)} disabled={saving} style={{ ...btnPrimary, opacity: saving ? .6 : 1 }}>
                      {saving ? 'Fusionando...' : 'Fusionar'}
                    </button>
                    <button onClick={() => dismiss(group.id)} style={btnGhost}>No son la misma propiedad</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

const inp: React.CSSProperties = { padding: '7px 10px', borderRadius: '9px', border: '1px solid var(--line-2)', background: 'var(--bg-2)', color: 'var(--txt)', fontSize: '12px', outline: 'none', boxSizing: 'border-box' }
const btnGhost: React.CSSProperties = { padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--line-2)', background: 'transparent', color: 'var(--txt-3)', fontSize: '11px', cursor: 'pointer', fontWeight: 500 }
const btnPrimary: React.CSSProperties = { padding: '6px 14px', borderRadius: '8px', border: 'none', background: 'var(--brand)', color: '#fff', fontSize: '11px', cursor: 'pointer', fontWeight: 600 }
