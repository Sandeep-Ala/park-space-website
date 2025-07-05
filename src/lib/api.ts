// # =============================================
// # src/lib/api.ts
// # API helper functions
// # =============================================
import { supabase, createAdminClient } from './supabase'
import { calculateLeadScore } from './utils'
import type { CreateLeadRequest, Lead, Service, Brand } from '@/types'

// Lead management functions
export async function createLead(leadData: CreateLeadRequest): Promise<{ data: Lead | null; error: string | null }> {
  try {
    // Calculate lead score
    const lead_score = calculateLeadScore(leadData)
    const is_qualified = lead_score >= 60

    // Prepare lead data with scoring
    const newLead = {
      ...leadData,
      lead_score,
      is_qualified,
      status: 'new' as const,
      priority: lead_score >= 80 ? 'high' as const : 
                lead_score >= 60 ? 'medium' as const : 'low' as const,
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([newLead])
      .select()
      .single()

    if (error) {
      console.error('Database error creating lead:', error)
      return { data: null, error: error.message }
    }

    // Log lead activity
    await supabase
      .from('lead_activities')
      .insert([{
        lead_id: data.id,
        activity_type: 'lead_created',
        title: 'New lead created',
        description: `Lead created via ${leadData.source || 'website'}`,
      }])

    return { data, error: null }
  } catch (error) {
    console.error('Error creating lead:', error)
    return { data: null, error: 'Failed to create lead' }
  }
}

export async function getLeads(filters?: {
  status?: string
  service_type?: string
  priority?: string
  limit?: number
}): Promise<{ data: Lead[] | null; error: string | null }> {
  try {
    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (filters?.status) {
      query = query.eq('status', filters.status)
    }
    if (filters?.service_type) {
      query = query.eq('service_type', filters.service_type)
    }
    if (filters?.priority) {
      query = query.eq('priority', filters.priority)
    }
    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    const { data, error } = await query

    if (error) {
      console.error('Database error fetching leads:', error)
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching leads:', error)
    return { data: null, error: 'Failed to fetch leads' }
  }
}

// Service management functions
export async function getServices(): Promise<{ data: Service[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Database error fetching services:', error)
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching services:', error)
    return { data: null, error: 'Failed to fetch services' }
  }
}

export async function getServiceBySlug(slug: string): Promise<{ data: Service | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      console.error('Database error fetching service:', error)
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching service:', error)
    return { data: null, error: 'Failed to fetch service' }
  }
}

// Brand management functions
export async function getBrandsByService(serviceId: string): Promise<{ data: Brand[] | null; error: string | null }> {
  try {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('service_id', serviceId)
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Database error fetching brands:', error)
      return { data: null, error: error.message }
    }

    return { data, error: null }
  } catch (error) {
    console.error('Error fetching brands:', error)
    return { data: null, error: 'Failed to fetch brands' }
  }
}