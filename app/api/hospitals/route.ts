import { NextResponse } from 'next/server'
import { seedHospitals } from '@/lib/data'

// In-memory store (would be MongoDB in production)
let hospitals = seedHospitals.map((h, i) => ({ ...h, _id: String(i + 1) }))

export async function GET() {
  try {
    return NextResponse.json(hospitals)
  } catch (error) {
    console.error('Error fetching hospitals:', error)
    return NextResponse.json(
      { message: 'Failed to fetch hospitals' },
      { status: 500 }
    )
  }
}