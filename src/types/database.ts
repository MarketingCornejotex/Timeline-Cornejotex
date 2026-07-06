// ─── Legacy generic timeline types (keep for TypeScript compat) ─────────────
export interface TimelineEvent {
  id: string
  title: string
  description: string | null
  event_date: string
  category: string | null
  image_url: string | null
  color: string
  order_index: number
  is_published: boolean
  created_at: string
  updated_at: string
}
export type TimelineEventInsert = Omit<TimelineEvent, 'id' | 'created_at' | 'updated_at'>
export type TimelineEventUpdate = Partial<TimelineEventInsert>

// ─── Tipos de las tablas dinámicas en Supabase ──────────────────────────────

export interface LicenseLogo {
  id: string
  license_name: string
  logo_url: string
  notes: string | null
  is_hidden: boolean
  created_at: string
  updated_at: string
}

export interface CategoryPhoto {
  id: string
  license_name: string
  category: string
  segment: string
  file_url: string
  file_type: 'image' | 'pdf'
  file_name: string | null
  order_index: number
  created_at: string
}

export interface Estreno {
  id: string
  title: string
  type: string
  quarter: 'Q1' | 'Q2' | 'Q3' | 'Q4'
  event_date: string | null
  studio: string | null
  description: string | null
  poster_url: string | null
  color_bg: string
  color_fg: string
  order_index: number
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface NameOverride {
  id: string
  original_name: string
  override_type: 'license' | 'studio'
  display_name: string
  created_at: string
}

export type EstrenoInsert = Omit<Estreno, 'id' | 'created_at' | 'updated_at'>
export type EstrenoUpdate = Partial<EstrenoInsert>
