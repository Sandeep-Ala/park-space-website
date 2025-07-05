// =============================================
// src/app/api/leads/route.ts (MINIMAL VERSION)
// Simplified leads API to test basic functionality
// =============================================
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET: Fetch leads
export async function GET(request: NextRequest) {
  try {
    console.log('GET /api/leads called')
    
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .limit(10)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { 
          success: false, 
          error: `Database error: ${error.message}` 
        },
        { status: 500 }
      )
    }

    console.log('Fetched leads:', data?.length || 0)
    
    return NextResponse.json({
      success: true,
      data: data || [],
      count: data?.length || 0
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      },
      { status: 500 }
    )
  }
}

// POST: Create lead
export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/leads called')
    
    const body = await request.json()
    console.log('Request body:', body)
    
    // Basic validation
    if (!body.name || !body.phone || !body.service_type) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: name, phone, service_type' 
        },
        { status: 400 }
      )
    }

    // Prepare minimal lead data
    const leadData = {
      name: body.name.trim(),
      phone: body.phone.trim(),
      email: body.email?.trim() || null,
      location: body.location?.trim() || null,
      service_type: body.service_type,
      message: body.message?.trim() || null,
      source: body.source || 'website',
      status: 'new',
      priority: 'medium',
      lead_score: 50,
      is_qualified: true
    }

    console.log('Inserting lead:', leadData)

    const { data, error } = await supabase
      .from('leads')
      .insert([leadData])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { 
          success: false, 
          error: `Database error: ${error.message}` 
        },
        { status: 500 }
      )
    }

    console.log('Lead created:', data)

    return NextResponse.json({
      success: true,
      data,
      message: 'Lead created successfully'
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      },
      { status: 500 }
    )
  }
}