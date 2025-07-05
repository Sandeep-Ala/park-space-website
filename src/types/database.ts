// # =============================================
// # src/types/database.ts
// # Supabase database type definitions
// # =============================================
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          name: string
          phone: string
          email: string | null
          company: string | null
          location: string | null
          service_type: string
          sub_service: string | null
          message: string | null
          source: string
          status: string
          priority: string
          estimated_value: number | null
          lead_score: number
          is_qualified: boolean
          assigned_to: string | null
          follow_up_date: string | null
          last_contacted: string | null
          utm_source: string | null
          utm_medium: string | null
          utm_campaign: string | null
          referrer_url: string | null
          landing_page: string | null
          user_agent: string | null
          ip_address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          email?: string | null
          company?: string | null
          location?: string | null
          service_type: string
          sub_service?: string | null
          message?: string | null
          source?: string
          status?: string
          priority?: string
          estimated_value?: number | null
          lead_score?: number
          is_qualified?: boolean
          assigned_to?: string | null
          follow_up_date?: string | null
          last_contacted?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          referrer_url?: string | null
          landing_page?: string | null
          user_agent?: string | null
          ip_address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          email?: string | null
          company?: string | null
          location?: string | null
          service_type?: string
          sub_service?: string | null
          message?: string | null
          source?: string
          status?: string
          priority?: string
          estimated_value?: number | null
          lead_score?: number
          is_qualified?: boolean
          assigned_to?: string | null
          follow_up_date?: string | null
          last_contacted?: string | null
          utm_source?: string | null
          utm_medium?: string | null
          utm_campaign?: string | null
          referrer_url?: string | null
          landing_page?: string | null
          user_agent?: string | null
          ip_address?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          short_description: string | null
          features: Json | null
          price_range: string | null
          is_active: boolean
          display_order: number
          meta_title: string | null
          meta_description: string | null
          keywords: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          short_description?: string | null
          features?: Json | null
          price_range?: string | null
          is_active?: boolean
          display_order?: number
          meta_title?: string | null
          meta_description?: string | null
          keywords?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          features?: Json | null
          price_range?: string | null
          is_active?: boolean
          display_order?: number
          meta_title?: string | null
          meta_description?: string | null
          keywords?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      brands: {
        Row: {
          id: string
          name: string
          service_id: string | null
          logo: string | null
          description: string | null
          features: Json | null
          price_starting_from: number | null
          is_popular: boolean
          is_active: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          service_id?: string | null
          logo?: string | null
          description?: string | null
          features?: Json | null
          price_starting_from?: number | null
          is_popular?: boolean
          is_active?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          service_id?: string | null
          logo?: string | null
          description?: string | null
          features?: Json | null
          price_starting_from?: number | null
          is_popular?: boolean
          is_active?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      lead_activities: {
        Row: {
          id: string
          lead_id: string | null
          activity_type: string
          title: string | null
          description: string | null
          notes: string | null
          performed_by: string | null
          scheduled_for: string | null
          completed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          lead_id?: string | null
          activity_type: string
          title?: string | null
          description?: string | null
          notes?: string | null
          performed_by?: string | null
          scheduled_for?: string | null
          completed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          lead_id?: string | null
          activity_type?: string
          title?: string | null
          description?: string | null
          notes?: string | null
          performed_by?: string | null
          scheduled_for?: string | null
          completed_at?: string | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
