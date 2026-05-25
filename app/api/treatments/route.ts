import { NextResponse } from 'next/server'
import { seedTreatments } from '@/lib/data'

// In-memory store (would be MongoDB in production)
let treatments = seedTreatments.map((t, i) => ({ ...t, _id: String(i + 1) }))

export async function GET() {
  try {
    return NextResponse.json(treatments)
  } catch (error) {
    console.error('Error fetching treatments:', error)
    return NextResponse.json(
      { message: 'Failed to fetch treatments' },
      { status: 500 }
    )
  }
}
