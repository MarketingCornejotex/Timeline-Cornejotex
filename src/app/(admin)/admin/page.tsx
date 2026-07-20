'use client'

import { useState } from 'react'
import { useAdminData } from '@/lib/hooks/useAdminData'
import { usePropertiesAdmin } from '@/lib/hooks/usePropertiesAdmin'
import { LicenciasTab } from '@/components/admin/LicenciasTab'
import { EstrenosTab } from '@/components/admin/EstrenosTab'
import { NombresTab } from '@/components/admin/NombresTab'
import { BooksTab } from '@/components/admin/BooksTab'
import { PropiedadesTab } from '@/components/admin/PropiedadesTab'
import { DetallePropiedadesTab } from '@/components/admin/DetallePropiedadesTab'
import { DuplicadosTab } from '@/components/admin/DuplicadosTab'

type Tab = 'licencias' | 'books' | 'estrenos' | 'nombres' | 'propiedades' | 'detalle-propiedades' | 'duplicados'
const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'licencias',            label: 'Logos de licencias',  icon: '🎨' },
  { key: 'books',                label: 'Books / Aspiración',   icon: '📸' },
  { key: 'estrenos',             label: 'Estrenos & Eventos',   icon: '🎬' },
  { key: 'nombres',              label: 'Nombres & Estudios',   icon: '✏️' },
  { key: 'propiedades',          label: 'Propiedades',          icon: '🏷️' },
  { key: 'detalle-propiedades',  label: 'Detalle Propiedades',  icon: '📋' },
  { key: 'duplicados',           label: 'Duplicados',           icon: '🧬' },
]

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('licencias')
  const {
    logos, estrenos, overrides, loading, saving, error,
    upsertLogo, uploadLogoFile, updateLicenseInfo, deleteLogo,
    createEstreno, updateEstreno, deleteEstreno,
    upsertOverride, deleteOverride,
  } = useAdminData()
  const { items: dynLicenses, remove: removeDynLicense } = usePropertiesAdmin()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '28px 24px 60px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
          <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--txt-3)', textDecoration: 'none', padding: '6px 12px', borderRadius: '9px', border: '1px solid var(--line)', background: 'rgba(255,255,255,.04)' }}>
            ← Ver catálogo
          </a>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '20px', fontWeight: 700, color: '#fff', margin: 0 }}>
              Editor · Licencias 2026
            </h1>
            <p style={{ fontSize: '12px', color: 'var(--txt-3)', margin: '3px 0 0' }}>Panel de administración</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
            {saving && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '12px', color: 'var(--brand-2)' }}>
                <div style={{ width: '14px', height: '14px', border: '2px solid var(--brand-2)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
                Guardando...
              </div>
            )}
            <form action="/api/auth/signout" method="POST">
              <button type="submit" style={{ padding: '6px 14px', borderRadius: '9px', border: '1px solid var(--line-2)', background: 'rgba(255,255,255,.04)', color: 'var(--txt-3)', fontSize: '12px', cursor: 'pointer' }}>
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ padding: '12px 16px', background: 'rgba(248,113,113,.12)', border: '1px solid rgba(248,113,113,.3)', borderRadius: '12px', color: 'var(--danger)', fontSize: '13px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', background: 'rgba(255,255,255,.03)', borderRadius: '16px', border: '1px solid var(--line)', padding: '4px', marginBottom: '24px', width: 'fit-content' }}>
          {TABS.map(t => {
            const active = t.key === tab
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '7px',
                  padding: '9px 18px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                  fontFamily: "'Space Grotesk','Inter',sans-serif", fontSize: '13px', fontWeight: 600,
                  transition: 'all .2s var(--ease)',
                  background: active ? 'linear-gradient(145deg,rgba(0,174,239,.22),rgba(0,174,239,.10))' : 'transparent',
                  color: active ? '#fff' : 'var(--txt-3)',
                  boxShadow: active ? '0 0 0 1px rgba(0,174,239,.35)' : 'none',
                }}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            )
          })}
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '48px 0', color: 'var(--txt-3)', fontSize: '14px' }}>
            <div style={{ width: '16px', height: '16px', border: '2px solid var(--brand)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
            Cargando datos...
          </div>
        )}

        {/* Content */}
        {!loading && (
          <>
            {tab === 'licencias' && (
              <LicenciasTab logos={logos} overrides={overrides} dynamicLicenses={dynLicenses.map(d => ({ id: d.id, name: d.name, licensor: d.licensor }))} onDeleteDynamic={removeDynLicense} saving={saving} onUploadFile={uploadLogoFile} onUpdateInfo={updateLicenseInfo} onUpsertOverride={upsertOverride} onDelete={deleteLogo} />
            )}
            {tab === 'books' && (
              <BooksTab />
            )}
            {tab === 'estrenos' && (
              <EstrenosTab estrenos={estrenos} saving={saving} onCreate={createEstreno} onUpdate={updateEstreno} onDelete={deleteEstreno} />
            )}
            {tab === 'nombres' && (
              <NombresTab overrides={overrides} saving={saving} onUpsert={upsertOverride} onDelete={deleteOverride} />
            )}
            {tab === 'propiedades' && (
              <PropiedadesTab />
            )}
            {tab === 'detalle-propiedades' && (
              <DetallePropiedadesTab />
            )}
            {tab === 'duplicados' && (
              <DuplicadosTab />
            )}
          </>
        )}
      </div>
    </div>
  )
}
