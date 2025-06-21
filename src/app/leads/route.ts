// =============================================
// src/app/api/leads/route.ts
// =============================================
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      phone,
      email,
      company,
      location,
      service_type,
      sub_service,
      message,
      source = 'website'
    } = body

    // Validation
    if (!name || !phone || !service_type) {
      return NextResponse.json(
        { error: 'Name, phone, and service_type are required' },
        { status: 400 }
      )
    }

    // Get request metadata
    const userAgent = request.headers.get('user-agent') || ''
    const referrer = request.headers.get('referer') || ''
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '127.0.0.1'

    // Extract UTM parameters from referrer
    const url = new URL(referrer || 'http://localhost')
    const utm_source = url.searchParams.get('utm_source')
    const utm_medium = url.searchParams.get('utm_medium') 
    const utm_campaign = url.searchParams.get('utm_campaign')

    // Create lead using stored procedure
    const { data, error } = await supabaseAdmin.rpc('create_lead_with_scoring', {
      p_name: name,
      p_phone: phone,
      p_email: email || null,
      p_company: company || null,
      p_location: location || null,
      p_service_type: service_type,
      p_sub_service: sub_service || null,
      p_message: message || null,
      p_source: source,
      p_utm_source: utm_source,
      p_utm_medium: utm_medium,
      p_utm_campaign: utm_campaign,
      p_referrer_url: referrer,
      p_landing_page: url.pathname,
      p_user_agent: userAgent,
      p_ip_address: ip
    })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to create lead' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        success: true, 
        lead_id: data,
        message: 'Lead created successfully' 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const service_type = searchParams.get('service_type')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabaseAdmin
      .from('lead_summary')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) {
      query = query.eq('status', status)
    }

    if (service_type) {
      query = query.eq('service_type', service_type)
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      )
    }

    return NextResponse.json({ leads: data })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
