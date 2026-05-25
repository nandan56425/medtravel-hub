import { NextResponse } from 'next/server'
import { seedTreatments } from '@/lib/data'

const treatments = seedTreatments.map((t, i) => ({ ...t, _id: String(i + 1) }))

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const treatment = treatments.find(t => t._id === id)
    
    if (!treatment) {
      return NextResponse.json(
        { message: 'Treatment not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(treatment)
  } catch (error) {
    console.error('Error fetching treatment:', error)
    return NextResponse.json(
      { message: 'Failed to fetch treatment' },
      { status: 500 }
    )
  }
}
