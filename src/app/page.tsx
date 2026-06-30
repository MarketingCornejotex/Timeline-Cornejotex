'use client'

import { useState } from 'react'
import { QUARTERS } from '@/data/quarters'
import type { SegmentKey } from '@/data/segments'
import { useDynamicData } from '@/lib/hooks/useDynamicData'
import { Header } from '@/components/timeline/Header'
import { NavTabs, type TabKey } from '@/components/timeline/NavTabs'
import { FilterBar } from '@/components/timeline/FilterBar'
import { QuarterView } from '@/components/timeline/QuarterView'
import { AllYearView } from '@/components/timeline/AllYearView'
import { EstrenosView } from '@/components/timeline/EstrenosView'
import { LicenseModal, type ModalLicense } from '@/components/timeline/LicenseModal'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabKey>('Q1')
  const [activeFilter, setActiveFilter] = useState('todos')
  const [modal, setModal] = useState<ModalLicense | null>(null)
  const { data, loading, dispName, fetchCatPhotos } = useDynamicData()

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

      {/* Main content */}
      <main style={{ maxWidth: '1600px', margin: '0 auto', padding: '24px 20px 60px' }}>
        {/* Navigation */}
        <div style={{ marginBottom: '20px' }}>
          <NavTabs active={activeTab} onChange={setActiveTab} />
        </div>

        {/* Filter bar — hidden for all-year and estrenos tabs */}
        {activeTab !== 'all-year' && activeTab !== 'estrenos' && (
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
                onLicenseClick={handleLicenseClick}
              />
            )}

            {activeTab === 'all-year' && (
              <AllYearView
                logos={data.logos}
                displayName={dispName}
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

      {/* License modal */}
      <LicenseModal
        license={modal}
        fetchCatPhotos={fetchCatPhotos}
        onClose={() => setModal(null)}
      />
    </div>
  )
}
