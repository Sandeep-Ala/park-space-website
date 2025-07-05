// =============================================
// src/app/api/analytics/route.ts
// Analytics API - Dashboard metrics and reports
// =============================================
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// GET: Fetch analytics data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30' // days
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - parseInt(period))

    // Fetch lead statistics
    const { data: totalLeads, error: totalError } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })

    const { data: recentLeads, error: recentError } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', startDate.toISOString())

    const { data: convertedLeads, error: convertedError } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'converted')
      .gte('created_at', startDate.toISOString())

    const { data: qualifiedLeads, error: qualifiedError } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('is_qualified', true)
      .gte('created_at', startDate.toISOString())

    // Fetch lead distribution by service
    const { data: serviceDistribution, error: serviceError } = await supabase
      .from('leads')
      .select('service_type')
      .gte('created_at', startDate.toISOString())

    // Fetch lead distribution by status
    const { data: statusDistribution, error: statusError } = await supabase
      .from('leads')
      .select('status')
      .gte('created_at', startDate.toISOString())

    // Fetch lead distribution by source
    const { data: sourceDistribution, error: sourceDistributionError } = await supabase
      .from('leads')
      .select('source')
      .gte('created_at', startDate.toISOString())

    // Fetch daily lead trends (last 30 days)
    const { data: dailyTrends, error: trendsError } = await supabase
      .from('leads')
      .select('created_at')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true })

    // Check for errors
    if (totalError || recentError || convertedError || qualifiedError || 
        serviceError || statusError || sourceDistributionError || trendsError) {
      console.error('Analytics API errors:', {
        totalError,
        recentError,
        convertedError,
        qualifiedError,
        serviceError,
        statusError,
        sourceDistributionError,
        trendsError
      })
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to fetch analytics data' 
        },
        { status: 500 }
      )
    }

    // Process service distribution
    const serviceStats = serviceDistribution?.reduce((acc: Record<string, number>, lead) => {
      acc[lead.service_type] = (acc[lead.service_type] || 0) + 1
      return acc
    }, {}) || {}

    // Process status distribution
    const statusStats = statusDistribution?.reduce((acc: Record<string, number>, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1
      return acc
    }, {}) || {}

    // Process source distribution
    const sourceStats = sourceDistribution?.reduce((acc: Record<string, number>, lead) => {
      acc[lead.source] = (acc[lead.source] || 0) + 1
      return acc
    }, {}) || {}

    // Process daily trends
    const trendsStats = dailyTrends?.reduce((acc: Record<string, number>, lead) => {
      const date = new Date(lead.created_at).toISOString().split('T')[0]
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {}) || {}

    // Calculate conversion rate
    const recentLeadsCount = recentLeads?.length || 0
    const convertedLeadsCount = convertedLeads?.length || 0
    const conversionRate = recentLeadsCount > 0 ? (convertedLeadsCount / recentLeadsCount) * 100 : 0

    // Calculate qualification rate
    const qualifiedLeadsCount = qualifiedLeads?.length || 0
    const qualificationRate = recentLeadsCount > 0 ? (qualifiedLeadsCount / recentLeadsCount) * 100 : 0

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalLeads: totalLeads?.length || 0,
          recentLeads: recentLeadsCount,
          convertedLeads: convertedLeadsCount,
          qualifiedLeads: qualifiedLeadsCount,
          conversionRate: Math.round(conversionRate * 100) / 100,
          qualificationRate: Math.round(qualificationRate * 100) / 100,
        },
        distributions: {
          byService: serviceStats,
          byStatus: statusStats,
          bySource: sourceStats,
        },
        trends: {
          daily: trendsStats,
        },
        period: period,
      }
    })

  } catch (error) {
    console.error('Unexpected error in analytics API:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}