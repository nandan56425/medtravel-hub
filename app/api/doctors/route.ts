import { NextResponse } from 'next/server'
import { seedDoctors } from '@/lib/data'

// In-memory store (would be MongoDB in production)
let doctors = seedDoctors.map((d, i) => ({ ...d, _id: String(i + 1) }))

export async function GET() {
  try {
    return NextResponse.json(doctors)
  } catch (error) {
    console.error('Error fetching doctors:', error)
    return NextResponse.json(
      { message: 'Failed to fetch doctors' },
      { status: 500 }
    )
  }
}
