// =============================================
// src/app/api/services/route.ts
// Services API - Fetch services and brands
// =============================================
import { NextRequest, NextResponse } from 'next/server'
import { getServices, getServiceBySlug, getBrandsByService } from '@/lib/api'

// GET: Fetch all services or specific service with brands
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const includeBrands = searchParams.get('brands') === 'true'

    // If slug is provided, fetch specific service
    if (slug) {
      const { data: service, error: serviceError } = await getServiceBySlug(slug)
      
      if (serviceError) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Service not found' 
          },
          { status: 404 }
        )
      }

      let brands = null
      if (includeBrands && service) {
        const { data: brandsData, error: brandsError } = await getBrandsByService(service.id)
        if (!brandsError) {
          brands = brandsData
        }
      }

      return NextResponse.json({
        success: true,
        data: {
          service,
          brands
        }
      })
    }

    // Fetch all services
    const { data, error } = await getServices()

    if (error) {
      console.error('API Error fetching services:', error)
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to fetch services' 
        },
        { status: 500 }
      )
    }

    // If brands are requested, fetch brands for all services
    if (includeBrands && data) {
      const servicesWithBrands = await Promise.all(
        data.map(async (service) => {
          const { data: brands } = await getBrandsByService(service.id)
          return {
            ...service,
            brands: brands || []
          }
        })
      )

      return NextResponse.json({
        success: true,
        data: servicesWithBrands,
        count: servicesWithBrands.length
      })
    }

    return NextResponse.json({
      success: true,
      data,
      count: data?.length || 0
    })

  } catch (error) {
    console.error('Unexpected error in services API:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}