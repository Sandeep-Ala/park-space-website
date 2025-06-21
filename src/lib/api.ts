// =============================================
// src/lib/api.ts
// =============================================
import { supabase } from './supabase'
import { Service, Brand } from '@/types'

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching services:', error)
    return []
  }

  return data || []
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error) {
    console.error('Error fetching service:', error)
    return null
  }

  return data
}

export async function getBrandsByService(serviceId: string): Promise<Brand[]> {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('service_id', serviceId)
    .eq('is_active', true)
    .order('display_order')

  if (error) {
    console.error('Error fetching brands:', error)
    return []
  }

  return data || []
}

export async function createLead(leadData: any) {
  const response = await fetch('/api/leads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(leadData)
  })

  if (!response.ok) {
    throw new Error('Failed to create lead')
  }

  return response.json()
}
