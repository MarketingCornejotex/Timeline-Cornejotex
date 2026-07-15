'use client'

import { useMemo, useState } from 'react'
import { QUARTERS } from '@/data/quarters'
import type { LicenseDef } from '@/data/quarters'
import type { SegmentKey } from '@/data/segments'
import { useDynamicData } from '@/lib/hooks/useDynamicData'
import { Header } from '@/components/timeline/Header'
import { NavTabs, type TabKey } from '@/components/timeline/NavTabs'
import { FilterBar } from '@/components/timeline/FilterBar'
import { QuarterView } from '@/components/timeline/QuarterView'
import { AllYearView } from '@/components/timeline/AllYearView'
import { EstrenosView } from '@/components/timeline/EstrenosView'
import { LicenseModal, type ModalLicense } from '@/components/timeline/LicenseModal'

// Mapping quarter → months; usado cuando un dynamic license no tiene month_id específico
const QUARTER_MONTHS: Record<string, string[]> = {
  Q1: ['ENE', 'FEB', 'MAR'], Q2: ['ABR', 'MAY', 'JUN'],
  Q3: ['JUL', 'AGO', 'SEP'], Q4: ['OCT', 'NOV', 'DIC'],
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabKey>('Q1')
  const [activeFilter, setActiveFilter] = useState('todos')
  const [modal, setModal] = useState<ModalLicense | null>(null)
  const { data, loading, dispName, fetchCatPhotos } = useDynamicData()
  const hiddenNames = data.hiddenNames

  // Nombres presentes en dynamic_licenses (minúsculas) — para suprimir entradas duplicadas del static data
  const dynamicNames = useMemo(
    () => new Set(data.dynamicLicenses.map(l => l.name.toLowerCase())),
    [data.dynamicLicenses]
  )

  // Merge dynamic licenses en mapa mensual; si no tienen month_id se distribuyen a todos los meses del trimestre
  const dynamicByMonth = useMemo(() => {
    const map: Record<string, LicenseDef[]> = {}
    data.dynamicLicenses
      .filter(l => !l.is_all_year && l.quarter !== null)
      .forEach(l => {
        const months = l.month_id ? [l.month_id] : (QUARTER_MONTHS[l.quarter!] ?? [])
        const lic: LicenseDef = {
          name: l.name, licensor: l.licensor,
          type: l.type as LicenseDef['type'],
          segs: l.segs as SegmentKey[],
        }
        months.forEach(m => { map[m] = [...(map[m] ?? []), lic] })
      })
    return map
  }, [data.dynamicLicenses])

  // Incluye is_all_year=true Y el fallback: registros sin quarter y sin is_all_year (evita agujero negro)
  const dynamicAllYear = useMemo(() =>
    data.dynamicLicenses
      .filter(l => l.is_all_year || (!l.is_all_year && l.quarter === null))
      .map(l => ({ name: l.name, segs: l.segs as SegmentKey[], licensor: l.licensor })),
    [data.dynamicLicenses]
  )

  function handleLicenseClick(name: string, type: string, licensor: string, segs: SegmentKey[]) {
    setModal({
      name,
      displayName: dispName(name),
      type,
      licensor,
      segs,
      logoUrl: data.logos[name],
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Header />

      <main style={{ maxWidth: '1600px', margin: '0 auto', padding: '24px 20px 60px' }}>
        <div style={{ marginBottom: '20px' }}>
          <NavTabs active={activeTab} onChange={setActiveTab} />
        </div>

        {/* Filter bar — visible en todas las vistas excepto estrenos */}
        {activeTab !== 'estrenos' && (
          <div style={{ marginBottom: '22px', paddingBottom: '20px', borderBottom: '1px solid var(--line)' }}>
            <FilterBar active={activeFilter} onChange={setActiveFilter} />
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '64px 0', color: 'var(--txt-3)', fontSize: '14px' }}>
            <div style={{ width: '18px', height: '18px', border: '2px solid var(--brand)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
            Cargando catálogo...
          </div>
        )}

        {/* Views */}
        {!loading && (
          <>
            {(activeTab === 'Q1' || activeTab === 'Q2' || activeTab === 'Q3' || activeTab === 'Q4') && (
              <QuarterView
                quarter={QUARTERS[activeTab]}
                logos={data.logos}
                displayName={dispName}
                activeFilter={activeFilter}
                hiddenNames={hiddenNames}
                extraByMonth={dynamicByMonth}
                onLicenseClick={handleLicenseClick}
              />
            )}

            {activeTab === 'all-year' && (
              <AllYearView
                logos={data.logos}
                displayName={dispName}
                activeFilter={activeFilter}
                hiddenNames={hiddenNames}
                extraAllYear={dynamicAllYear}
                overriddenNames={dynamicNames}
                onLicenseClick={handleLicenseClick}
              />
            )}

            {activeTab === 'estrenos' && (
              <EstrenosView
                estrenos={data.estrenos}
                logos={data.logos}
              />
            )}
          </>
        )}
      </main>

      <LicenseModal
        license={modal}
        fetchCatPhotos={fetchCatPhotos}
        onClose={() => setModal(null)}
      />
    </div>
  )
}
