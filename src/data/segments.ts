export type SegmentKey = 'adultos' | 'ninos' | 'bebes' | 'hogar' | 'mascotas'

export const SEG_LABELS: Record<SegmentKey, string> = {
  adultos: 'Adultos',
  ninos: 'Niños',
  bebes: 'Bebés',
  hogar: 'Hogar',
  mascotas: 'Mascotas',
}

export const SEG_CLASS: Record<SegmentKey, string> = {
  adultos: 'seg-adultos',
  ninos: 'seg-ninos',
  bebes: 'seg-bebes',
  hogar: 'seg-hogar',
  mascotas: 'seg-mascotas',
}

export const SEG_DOT_CLASS: Record<SegmentKey, string> = {
  adultos: 'fc-adultos',
  ninos: 'fc-ninos',
  bebes: 'fc-bebes',
  hogar: 'fc-hogar',
  mascotas: 'fc-mascotas',
}

export type LicenseType = 'ann' | 'new' | 'opp' | 'ev'

export const BADGE_LABELS: Record<LicenseType, string> = {
  ann: 'Anniversary',
  new: 'Nueva Propiedad',
  opp: 'Oportunidad',
  ev: 'Estreno / Evento',
}

export const BADGE_CLASS: Record<LicenseType, string> = {
  ann: 'badge-ann',
  new: 'badge-new',
  opp: 'badge-opp',
  ev: 'badge-ev',
}

const A: SegmentKey = 'adultos'
const N: SegmentKey = 'ninos'
const B: SegmentKey = 'bebes'
const H: SegmentKey = 'hogar'
const M: SegmentKey = 'mascotas'

export { A, N, B, H, M }
