// =============================================
// src/app/api/test/route.ts
// Simple test route to verify API routing works
// =============================================
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'API routing is working!',
    timestamp: new Date().toISOString()
  })
}

export async function POST() {
  return NextResponse.json({
    success: true,
    message: 'POST endpoint is working!',
    timestamp: new Date().toISOString()
  })
}