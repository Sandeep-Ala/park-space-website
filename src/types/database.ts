// =============================================
// src/types/index.ts
// =============================================
export interface Lead {
  id: string
  name: string
  phone: string
  email?: string
  company?: string
  location?: string
  service_type: string
  sub_service?: string
  message?: string
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'quoted' | 'converted' | 'lost'
  priority: 'high' | 'medium' | 'low'
  estimated_value?: number
  lead_score: number
  is_qualified: boolean
  assigned_to?: string
  follow_up_date?: string
  last_contacted?: string
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  referrer_url?: string
  landing_page?: string
  user_agent?: string
  ip_address?: string
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  name: string
  slug: string
  description?: string
  short_description?: string
  features?: string[]
  price_range?: string
  is_active: boolean
  display_order: number
  meta_title?: string
  meta_description?: string
  keywords?: string[]
  created_at: string
  updated_at: string
}

export interface Brand {
  id: string
  name: string
  service_id: string
  logo?: string
  description?: string
  features?: string[]
  price_starting_from?: number
  is_popular: boolean
  is_active: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export interface LeadActivity {
  id: string
  lead_id: string
  activity_type: string
  title: string
  description?: string
  notes?: string
  performed_by?: string
  scheduled_for?: string
  completed_at?: string
  created_at: string
}
